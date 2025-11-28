import clsx from "clsx";

/**
 * Props for the ThreeDotLoader component.
 */
type ThreeDotLoaderProps = {
  /** Custom CSS class name */
  className?: string;
  /** Animation speed of the dots */
  pace?: "slow" | "medium" | "fast";
};

/**
 * A loading indicator with three animated dots.
 * 
 * Inherits text color from parent, so it adapts to theme colors.
 * Used internally by Button component when isLoading is true.
 * 
 * @example
 * ```tsx
 * <ThreeDotLoader pace="fast" className="h-4 w-4" />
 * ```
 * 
 * @param props - ThreeDotLoader props
 * @returns A three-dot loading animation
 */
export function ThreeDotLoader({
  className,
  pace = "medium",
}: ThreeDotLoaderProps) {
  const paceMap: Record<typeof pace, string> = {
    slow: "dot-slow",
    medium: "dot-medium",
    fast: "dot-fast",
  };

  return (
    <div className={clsx("flex items-center gap-[0.3em]", className)}>
      <span className={clsx("dot", paceMap[pace])} />
      <span className={clsx("dot delay-200", paceMap[pace])} />
      <span className={clsx("dot delay-400", paceMap[pace])} />
      <style>{`
        .dot {
          width: 0.6em;
          height: 0.6em;
          border-radius: 50%;
          background-color: currentColor;
          animation-name: dot-pulse;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        /* Pacing options */
        .dot-slow { animation-duration: 1.2s; }
        .dot-medium { animation-duration: 0.8s; }
        .dot-fast { animation-duration: 0.65s; }

        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }

        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}
