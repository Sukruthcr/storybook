import type { PickerConstraints } from "../types";

export function validateRange(
    start: Date,
    end: Date,
    constraints: PickerConstraints
): string | null {
    if (constraints.min && start < constraints.min) {
        return "Start date is before minimum allowed date.";
    }

    if (constraints.max && end > constraints.max) {
        return "End date exceeds maximum allowed date.";
    }

    if (constraints.maxRangeDays) {
        const diff =
            (end.getTime() - start.getTime()) /
            (1000 * 60 * 60 * 24);

        if (diff > constraints.maxRangeDays) {
            return `Range cannot exceed ${constraints.maxRangeDays} days.`;
        }
    }

    if (constraints.blackout?.some(
        (d) =>
            d.toDateString() === start.toDateString() ||
            d.toDateString() === end.toDateString()
    )) {
        return "Selected date is unavailable.";
    }

    return null;
}
