export function getEventDateParts(date: string | Date) {
  const d = new Date(date);

  return {
    dateDay: d.getDate().toString(), // "29"
    dateMonth: d.toLocaleString("en-US", { month: "short" }), // "May"
  };
}
