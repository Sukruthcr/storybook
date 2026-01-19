export function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

export function getFirstWeekday(year: number, month: number) {
    return new Date(year, month, 1).getDay(); // 0–6
}

export function buildCalendar(year: number, month: number) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstWeekday(year, month);

    const cells: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
        cells.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        cells.push(new Date(year, month, d));
    }

    return cells;
}
