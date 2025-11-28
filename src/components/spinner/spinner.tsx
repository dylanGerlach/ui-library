import clsx from "clsx";
import { Loader2 } from "lucide-react";

/**
 * Props for the Spinner component.
 */
type SpinnerProps = {
  /** Custom CSS class name */
  className?: string;
};

/**
 * A loading spinner component using a rotating icon.
 * 
 * Inherits text color from parent, so it adapts to theme colors.
 * 
 * @example
 * ```tsx
 * <Spinner className="h-6 w-6" />
 * ```
 * 
 * @param props - Spinner props
 * @returns A spinning loader icon
 */
export function Spinner({ className }: SpinnerProps) {
  return <Loader2 className={clsx("animate-spin text-current", className)} />;
}
