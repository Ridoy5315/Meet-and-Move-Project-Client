"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface PriceRangeFilterProps {
  minParam?: string;
  maxParam?: string;
}

export function PriceRangeFilter({
  minParam = "minPrice",
  maxParam = "maxPrice",
}: PriceRangeFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const minPrice = searchParams.get(minParam) ?? "";
  const maxPrice = searchParams.get(maxParam) ?? "";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        placeholder="Min price"
        className="w-28"
        value={minPrice}
        onChange={(e) => updateParams(minParam, e.target.value)}
        min={0}
      />
      <span className="text-muted-foreground text-sm">–</span>
      <Input
        type="number"
        placeholder="Max price"
        className="w-28"
        value={maxPrice}
        onChange={(e) => updateParams(maxParam, e.target.value)}
        min={0}
      />
    </div>
  );
}
