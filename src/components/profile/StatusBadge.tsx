import clsx from "clsx";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toUpperCase();

  const badgeClass = clsx(
    "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
    {
      // Account status
      "bg-green-100 text-green-700":
        normalized === "ACTIVE" || normalized === "APPROVED",

      "bg-yellow-100 text-yellow-700": normalized === "PENDING",

      "bg-red-100 text-red-700":
        normalized === "REJECTED" || normalized === "INACTIVE",

      // Fallback
      "bg-gray-100 text-gray-700": ![
        "ACTIVE",
        "APPROVED",
        "PENDING",
        "REJECTED",
        "INACTIVE",
      ].includes(normalized),
    }
  );

  const label = normalized
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span className={badgeClass}>
      <span className="mr-2 h-2 w-2 rounded-full bg-current inline-block" />
      {label}
    </span>
  );
}
