import { Input } from "@/components/ui/input";

export function FilterDate(props: React.ComponentProps<"input">) {
  return (
    <Input
      type="date"
      className="w-full md:w-48"
      {...props}
    />
  );
}
