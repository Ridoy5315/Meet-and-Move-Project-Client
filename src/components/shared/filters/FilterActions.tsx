// components/layout/FilterActions.tsx
"use client";

import { Button } from "@/components/ui/button";

export default function FilterActions() {
  const handleReset = () => {
    console.log("reset");
  };

  return (
    <div className="ml-auto flex gap-2">
      <Button variant="outline" onClick={handleReset}>
        Reset
      </Button>
      <Button>Apply</Button>
    </div>
  );
}
