type DateFormatOptions = {
  locale?: string; // "en-US", "en-GB", "zh-CN"
};

/* ===========================
   Absolute Date (Readable)
   =========================== */
export function formatDate(
  value?: string | Date,
  options: DateFormatOptions = {}
): string {
  if (!value) return "Not available";

  const date = typeof value === "string" ? new Date(value) : value;
  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString(options.locale ?? "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ===========================
   Relative Time (Smart)
   =========================== */
export function formatRelativeTime(
  value?: string | Date,
  options: DateFormatOptions = {}
): string {
  if (!value) return "Not available";

  const date = typeof value === "string" ? new Date(value) : value;
  if (isNaN(date.getTime())) return "Invalid date";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const rtf = new Intl.RelativeTimeFormat(options.locale ?? "en", {
    numeric: "auto",
  });

  if (years > 0) return rtf.format(-years, "year");
  if (months > 0) return rtf.format(-months, "month");
  if (days > 0) return rtf.format(-days, "day");
  if (hours > 0) return rtf.format(-hours, "hour");
  if (minutes > 0) return rtf.format(-minutes, "minute");

  return "Just now";
}
