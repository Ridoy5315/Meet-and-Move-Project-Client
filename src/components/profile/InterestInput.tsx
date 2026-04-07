"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Props {
  value?: string[];
  onChange: (value: string[]) => void;
}

export function InterestInput({ value = [], onChange }: Props) {
  const [input, setInput] = useState("");

  const addInterest = () => {
    if (!input.trim()) return;
    if (value.includes(input.trim())) return;

    onChange([...value, input.trim()]);
    setInput("");
  };

  const removeInterest = (interest: string) => {
    onChange(value.filter((i) => i !== interest));
  };

  return (
    <div className="space-y-2">
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {value.map((interest) => (
          <span
            key={interest}
            className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
          >
            {interest}
            <button type="button" onClick={() => removeInterest(interest)}>
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          placeholder="Add interest (press Add)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="button" onClick={addInterest} variant="outline">
          Add
        </Button>
      </div>
    </div>
  );
}
