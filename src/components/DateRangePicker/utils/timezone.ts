export function toZonedDate(
    date: Date,
    timeZone: string
) {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).formatToParts(date);

    const map: Record<string, string> = {};

    parts.forEach((p) => {
        if (p.type !== "literal") {
            map[p.type] = p.value;
        }
    });

    return new Date(
        `${map.year}-${map.month}-${map.day}T${map.hour}:${map.minute}:${map.second}`
    );
}
