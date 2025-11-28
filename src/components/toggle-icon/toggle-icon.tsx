import { IconButton } from "../icon-button/icon-button";

/**
 * Props for the ToggleIcon component.
 * 
 * @interface ToggleIconProps
 */
export interface ToggleIconProps {
  /** The icon to display */
  icon: React.ReactNode;
  /** Whether the toggle is in the active state */
  active: boolean;
  /** Callback fired when the toggle is clicked */
  onToggle: () => void;
  /** Accessible label for the toggle */
  label?: string;
  /** Whether the toggle is disabled */
  disabled?: boolean;
}

/**
 * A toggleable icon button component.
 * 
 * Wraps IconButton with toggle state management. Shows active state with
 * a border highlight. Uses theme colors for styling, so ensure ThemeProvider
 * is set up in your app.
 * 
 * @example
 * ```tsx
 * <ToggleIcon
 *   icon={<HeartIcon />}
 *   active={isFavorited}
 *   onToggle={() => setIsFavorited(!isFavorited)}
 *   label="Favorite"
 * />
 * ```
 * 
 * @param props - ToggleIcon props
 * @returns A toggleable icon button
 */
export function ToggleIcon({
  icon,
  active,
  onToggle,
  label,
  disabled,
}: ToggleIconProps) {
  return (
    <IconButton
      active={active}
      onClick={onToggle}
      label={label}
      disabled={disabled}
    >
      {icon}
    </IconButton>
  );
}
