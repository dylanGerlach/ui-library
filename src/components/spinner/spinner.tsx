import clsx from "clsx";
import { Loader2 } from "lucide-react";

/**
 * Props for the Spinner component.
 */
type SpinnerProps = {
  /** Size of the spinner (e.g., "h-6 w-6") */
  size?: string;
};

/**
 * A loading spinner component using a rotating icon.
 * 
 * Inherits text color from parent, so it adapts to theme colors.
 * 
 * @example
 * ```tsx
 * <Spinner size="h-6 w-6" />
 * ```
 * 
 * @param props - Spinner props
 * @returns A spinning loader icon
 */
export function Spinner({ size = "h-4 w-4" }: SpinnerProps) {
  return <Loader2 className={clsx("animate-spin text-current", size)} />;
}
