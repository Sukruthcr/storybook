import { DateRangePicker } from "./DateRangePicker";

export default {
    title: "Components/DateRangePicker",
    component: DateRangePicker,
};

export const Default = {};

export const KeyboardOnly = {
    parameters: {
        docs: {
            description: {
                story: "Fully operable using keyboard only.",
            },
        },
    },
};

export const WithConstraints = {
    args: {
        constraints: {
            min: new Date(),
            maxRangeDays: 7,
        },
    },
};

export const DSTTransition = {
    args: {
        initialDate: new Date("2026-03-08T01:30:00"),
        timezone: "America/New_York",
    },
};

export const TimezoneSwitch = {
    args: {
        timezone: "Asia/Kolkata",
    },
};

export const BlackoutDates = {
    args: {
        constraints: {
            blackout: [
                new Date(new Date().setDate(new Date().getDate() + 2)), // 2 days from now
                new Date(new Date().setDate(new Date().getDate() + 3)), // 3 days from now
            ],
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Demonstrates dates that are disabled (blacked out) and cannot be selected.",
            },
        },
    },
};

export const MaxDuration7Days = {
    args: {
        constraints: {
            maxRangeDays: 7,
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Enforces a maximum range of 7 days. Selecting more triggers an error.",
            },
        },
    },
};

export const LeapYearFeb29 = {
    args: {
        initialDate: new Date("2024-02-01"),
    },
    parameters: {
        docs: {
            description: {
                story: "Testing selection around February 29th in a leap year (2024).",
            },
        },
    },
};
