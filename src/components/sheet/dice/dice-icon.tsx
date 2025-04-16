import { cn } from "@/lib/utils";

interface DiceIconProps {
  type: "d4" | "d6" | "d8" | "d10" | "d12" | "d20";
  className?: string;
}

export function DiceIcon({ type, className }: DiceIconProps) {
  return (
    <div
      className={cn(
        "w-6 h-6 flex items-center justify-center rounded border border-gray-300 bg-white",
        className
      )}
    >
      <span className="text-xs font-bold">{type}</span>
    </div>
  );
}
