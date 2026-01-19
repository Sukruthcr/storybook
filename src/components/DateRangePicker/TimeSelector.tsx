

type Props = {
    date: Date;
    onChange(date: Date): void;
};

export function TimeSelector({ date, onChange }: Props) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    function update(h: number, m: number) {
        const next = new Date(date);
        next.setHours(h);
        next.setMinutes(m);
        onChange(next);
    }

    return (
        <div className="flex gap-2 items-center">
            <input
                type="number"
                min={0}
                max={23}
                value={hours}
                onChange={(e) => update(Number(e.target.value), minutes)}
                className="border p-1 w-16"
            />

            :

            <input
                type="number"
                min={0}
                max={59}
                value={minutes}
                onChange={(e) => update(hours, Number(e.target.value))}
                className="border p-1 w-16"
            />
        </div>
    );
}
