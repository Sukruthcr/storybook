

type Preset = {
    label: string;
    getRange(): { start: Date; end: Date };
};

const presets: Preset[] = [
    {
        label: "Today",
        getRange() {
            const now = new Date();
            const start = new Date(now);
            start.setHours(0, 0, 0, 0);

            const end = new Date(now);
            end.setHours(23, 59, 59, 999);

            return { start, end };
        },
    },
    {
        label: "Last 7 Days",
        getRange() {
            const end = new Date();
            const start = new Date();
            start.setDate(end.getDate() - 6);
            return { start, end };
        },
    },
];

export function Presets({
    onApply,
}: {
    onApply(start: Date, end: Date): void;
}) {
    return (
        <div className="flex gap-2">
            {presets.map((preset) => (
                <button
                    key={preset.label}
                    className="border px-3 py-1 rounded-md text-sm"
                    onClick={() => {
                        const { start, end } = preset.getRange();
                        onApply(start, end);
                    }}
                >
                    {preset.label}
                </button>
            ))}
        </div>
    );
}
