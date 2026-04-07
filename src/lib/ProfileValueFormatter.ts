

export function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "Not provided";
  }

  if (typeof value === "boolean") {
    return value ? "Verified" : "Not Verified";
  }

  // String (ENUM / DATE / NORMAL TEXT)
  if (typeof value === "string") {
    // ISO date
    const date = new Date(value);
    if (!isNaN(date.getTime()) && value.includes("T")) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    // ENUM → Title Case
    if (value === value.toUpperCase()) {
      return value
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    return value;
  }

  return String(value);
}
