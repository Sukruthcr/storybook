import { useState } from "react";
import { CalendarGrid } from "./CalendarGrid";
import { Presets } from "./Presets";
import { TimeSelector } from "./TimeSelector";
import { selectDate } from "./utils/range";
import { toZonedDate } from "./utils/timezone";
import { validateRange } from "./utils/constraints";
import { useCalendarKeyboard } from "./hooks/useCalendarKeyboard";
import type { DateRange, PickerConstraints } from "./types";

const TIMEZONES = [
    "UTC",
    "Asia/Kolkata",
    "America/New_York",
    "Europe/London",
];

interface Props {
    constraints?: PickerConstraints;
    initialDate?: Date;
    timezone?: string;
    onChange?: (range: DateRange) => void;
}

export function DateRangePicker({
    constraints = {},
    initialDate,
    timezone: initialTimezone = "UTC",
    onChange
}: Props) {
    const [activeTimezone, setActiveTimezone] = useState(initialTimezone);



    // Initialize view based on prop or today
    const [visibleMonth, setVisibleMonth] = useState(() => {
        const d = initialDate || new Date();
        return new Date(d.getFullYear(), d.getMonth(), 1);
    });

    const [range, setRange] = useState<DateRange>({ kind: "empty" });
    const [focusedDate, setFocusedDate] = useState(initialDate || new Date());

    function handleSelect(date: Date) {
        if (constraints.blackout?.some(d => d.toDateString() === date.toDateString())) {
            return;
        }

        const newRange = selectDate(range, date);
        setRange(newRange);
        onChange?.(newRange);
    }

    const keyboard = useCalendarKeyboard(
        focusedDate,
        (d) => {
            setFocusedDate(d);
            // Auto-switch month if navigating out of view
            if (d.getMonth() !== visibleMonth.getMonth() || d.getFullYear() !== visibleMonth.getFullYear()) {
                setVisibleMonth(new Date(d.getFullYear(), d.getMonth(), 1));
            }
        },
        (d) => handleSelect(d)
    );

    function updateTime(date: Date) {
        if (range.kind === "start") {
            const newRange = { kind: "start" as const, start: date };
            setRange(newRange);
            onChange?.(newRange);
        }
        if (range.kind === "complete") {
            const newRange = { ...range, start: date };
            setRange(newRange);
            onChange?.(newRange);
        }
    }

    const error = range.kind === "complete"
        ? validateRange(range.start, range.end, constraints)
        : null;

    const displayStart = range.kind !== "empty"
        ? toZonedDate(range.start, activeTimezone)
        : null;

    return (
        <div
            className="w-[320px] space-y-4 p-4 border rounded-md font-sans bg-white text-gray-900"
            role="application"
        >
            <div className="flex justify-between items-center">
                <button
                    onClick={() =>
                        setVisibleMonth(
                            new Date(
                                visibleMonth.getFullYear(),
                                visibleMonth.getMonth() - 1,
                                1
                            )
                        )
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                    aria-label="Previous Month"
                >
                    ◀
                </button>

                <div className="font-medium">
                    {visibleMonth.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                    })}
                </div>

                <button
                    onClick={() =>
                        setVisibleMonth(
                            new Date(
                                visibleMonth.getFullYear(),
                                visibleMonth.getMonth() + 1,
                                1
                            )
                        )
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                    aria-label="Next Month"
                >
                    ▶
                </button>
            </div>

            <div className="flex justify-end">
                <select
                    value={activeTimezone}
                    onChange={(e) => setActiveTimezone(e.target.value)}
                    className="border p-1 text-sm rounded"
                    aria-label="Timezone"
                >
                    {TIMEZONES.map((tz) => (
                        <option key={tz} value={tz}>
                            {tz}
                        </option>
                    ))}
                </select>
            </div>

            <div className="outline-none">
                <CalendarGrid
                    year={visibleMonth.getFullYear()}
                    month={visibleMonth.getMonth()}
                    selectedStart={range.kind !== "empty" ? range.start : undefined}
                    selectedEnd={range.kind === "complete" ? range.end : undefined}
                    focusedDate={focusedDate}
                    onSelect={handleSelect}
                    onFocus={setFocusedDate}
                    onKeyDown={keyboard.onKeyDown}
                />
            </div>

            {range.kind !== "empty" && (
                <TimeSelector
                    date={range.start}
                    onChange={updateTime}
                />
            )}

            {displayStart && (
                <div className="text-xs text-gray-500">
                    In {activeTimezone}: {displayStart.toLocaleString()}
                </div>
            )}

            {error && (
                <div role="alert" className="text-red-600 text-sm font-medium bg-red-50 p-2 rounded">
                    {error}
                </div>
            )}

            <Presets
                onApply={(start, end) => {
                    const newRange = { kind: "complete" as const, start, end };
                    setRange(newRange);
                    onChange?.(newRange);
                }}
            />
        </div>
    );
}
