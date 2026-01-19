export type DateRange =
    | { kind: "empty" }
    | { kind: "start"; start: Date }
    | { kind: "complete"; start: Date; end: Date };

export type PickerConstraints = {
    min?: Date;
    max?: Date;
    blackout?: Date[];
    maxRangeDays?: number;
};

export type TimezoneOption = {
    label: string;
    value: string; // "Asia/Kolkata"
};
