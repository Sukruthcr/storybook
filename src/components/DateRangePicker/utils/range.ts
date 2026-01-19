import type { DateRange } from "../types";

export function selectDate(
    current: DateRange,
    date: Date
): DateRange {
    if (current.kind === "empty") {
        return { kind: "start", start: date };
    }

    if (current.kind === "start") {
        if (date < current.start) {
            return { kind: "complete", start: date, end: current.start };
        }
        return { kind: "complete", start: current.start, end: date };
    }

    return { kind: "start", start: date };
}
