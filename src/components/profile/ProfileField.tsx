import { ReactNode } from "react";

export function ProfileField({
  label,
  value,
}: {
  label: string;
  value?: string | number | ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="text-base font-medium text-foreground">
        {value ?? "Not provided"}
      </div>
    </div>
  );
}
