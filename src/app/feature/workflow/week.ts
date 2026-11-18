/** ISO week key such as `2026-W47`; keys sort chronologically as strings. */
export const weekKey = (date = new Date()) => {
	const day = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
	day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7));

	const year = day.getUTCFullYear();
	const week = Math.ceil(((day.getTime() - Date.UTC(year, 0, 1)) / 86400000 + 1) / 7);

	return `${year}-W${String(week).padStart(2, '0')}`;
};

const format = (date: Date, options: Intl.DateTimeFormatOptions) =>
	new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...options }).format(date);

/** Week number and a readable Monday to Sunday range, for example `16–22 Nov 2026`. */
export const weekLabel = (key: string) => {
	const [yearPart, weekPart] = key.split('-W');
	const year = Number(yearPart);
	const number = Number(weekPart);

	const monday = new Date(Date.UTC(year, 0, 4));
	monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() || 7) - 1) + (number - 1) * 7);

	const sunday = new Date(monday);
	sunday.setUTCDate(monday.getUTCDate() + 6);

	const sameYear = monday.getUTCFullYear() === sunday.getUTCFullYear();
	const sameMonth = sameYear && monday.getUTCMonth() === sunday.getUTCMonth();

	const range = sameMonth
		? `${format(monday, { day: 'numeric' })}–${format(sunday, { day: 'numeric', month: 'short', year: 'numeric' })}`
		: sameYear
			? `${format(monday, { day: 'numeric', month: 'short' })} – ${format(sunday, { day: 'numeric', month: 'short', year: 'numeric' })}`
			: `${format(monday, { day: 'numeric', month: 'short', year: 'numeric' })} – ${format(sunday, { day: 'numeric', month: 'short', year: 'numeric' })}`;

	return { number, range };
};

export const weekText = (key: string) => {
	const { number, range } = weekLabel(key);

	return `Week ${number}: ${range}`;
};
