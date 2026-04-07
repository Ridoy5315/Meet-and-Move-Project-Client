import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface InfoRowProps {
  label: string;
  value?: string | number | ReactNode;
  icon?: ReactNode;
  layout?: "vertical" | "horizontal";
}

const InfoRow = ({
  label,
  value,
  icon,
  layout = "vertical",
}: InfoRowProps) => {
  return (
    <div
      className={cn(
        "flex gap-3",
        layout === "vertical" ? "flex-col" : "items-center"
      )}
    >
      {icon && (
        <div className="mt-0.5 text-muted-foreground">
          {icon}
        </div>
      )}

      <div className="space-y-0.5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p
          className={cn(
            "text-sm font-semibold",
            !value && "italic text-muted-foreground"
          )}
        >
          {value || "Not available"}
        </p>
      </div>
    </div>
  );
};

export default InfoRow;
