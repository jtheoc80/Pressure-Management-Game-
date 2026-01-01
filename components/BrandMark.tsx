import * as React from "react";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  label?: string;
};

export function BrandMark({ className, label = "SiteSisters" }: BrandMarkProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "flex size-8 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15"
        )}
      >
        <span className="text-[11px] font-semibold tracking-tight text-white">SS</span>
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}

