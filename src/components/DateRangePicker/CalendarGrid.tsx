import { buildCalendar } from "./utils/calendar";

type Props = {
    year: number;
    month: number;
    selectedStart?: Date;
    selectedEnd?: Date;
    focusedDate: Date;
    onSelect(date: Date): void;
    onFocus(date: Date): void;
    onKeyDown(e: React.KeyboardEvent): void;
};

export function CalendarGrid({
    year,
    month,
    selectedStart,
    selectedEnd,
    focusedDate,
    onSelect,
    onFocus,
    onKeyDown,
}: Props) {
    const cells = buildCalendar(year, month);

    // Chunk cells into weeks
    const weeks: (Date | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }

    function isInRange(date: Date) {
        if (!selectedStart || !selectedEnd) return false;
        return date >= selectedStart && date <= selectedEnd;
    }

    const getCellId = (date: Date) => `drp-cell-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const activeId = getCellId(focusedDate);

    return (
        <div
            role="grid"
            className="grid gap-1 outline-none"
            onKeyDown={onKeyDown}
            tabIndex={0}
            aria-label="Calendar Month"
            aria-activedescendant={activeId}
        >
            {weeks.map((week, weekIndex) => (
                <div key={weekIndex} role="row" className="grid grid-cols-7 gap-1">
                    {week.map((date, dayIndex) => {
                        if (!date) {
                            return <div key={dayIndex} role="gridcell" />;
                        }

                        const isSelected =
                            date.toDateString() === selectedStart?.toDateString() ||
                            date.toDateString() === selectedEnd?.toDateString();

                        const isFocused =
                            date.toDateString() === focusedDate.toDateString();

                        // We still use isFocused for styling, but NOT for tabIndex
                        const cellId = getCellId(date);

                        return (
                            <button
                                key={dayIndex}
                                id={cellId}
                                role="gridcell"
                                tabIndex={-1}
                                aria-selected={isSelected}
                                onClick={() => {
                                    onSelect(date);
                                    onFocus(date);
                                }}
                                // onFocus removed: Focus stays on grid container
                                className={`
                  p-2 rounded-md text-sm w-full
                  ${isSelected ? "bg-accent text-white" : ""}
                  ${isInRange(date) ? "bg-accent/20" : ""}
                  ${isFocused ? "ring-2 ring-accent" : ""}
                `}
                            >
                                {date.getDate()}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
