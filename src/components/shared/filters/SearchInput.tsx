import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function FilterSearch({
  placeholder = "Search...",
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <div className="relative w-full md:w-64">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-9"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
