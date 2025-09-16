import clsx from "clsx";

type SpinnerProps = {
  className?: string;
};

export function Spinner({ className }: SpinnerProps) {
  return (
    <svg
      className={clsx("animate-spin text-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-30"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        className="opacity-75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M22 12a10 10 0 00-10 -10"
      />
    </svg>
  );
}
