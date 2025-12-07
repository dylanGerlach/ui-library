import React, { useState } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { Typography } from "../typography/typography";
import { IconButton } from "../icon-button/icon-button";
import { Badge } from "../badge/badge";
import { useTheme } from "../../theme/ThemeProvider";

/**
 * Props for the Navbar1 component.
 *
 * @interface Navbar1Props
 */
export interface Navbar1Props {
  /** Logo - ReactNode to display on the left */
  logo?: React.ReactNode;
  /** Elements to display on the left side (next to logo) */
  leftElements?: React.ReactNode[];
  /** Elements to display on the right side (desktop) */
  rightElements?: React.ReactNode[];
  /** Elements that are always visible on the right (even on mobile) */
  alwaysRightElements?: React.ReactNode[];
}

/**
 * A simple navbar component with mobile menu support.
 *
 * Features:
 * - Logo on the left
 * - Navigation links in the center/right (desktop)
 * - Right-side action elements
 * - Mobile hamburger menu that slides down
 * - Mobile menu contains nav links
 *
 * Uses theme colors for styling, so ensure ThemeProvider is set up in your app.
 *
 * @example
 * ```tsx
 * <Navbar1
 *   logo={<img src="/logo.png" alt="Logo" />}
 *   leftElements={[
 *     <Typography href="/shop">Shop</Typography>,
 *     <Typography href="/support">Support</Typography>,
 *   ]}
 *   rightElements={[
 *     <IconButton><UserIcon /></IconButton>,
 *     <Badge count={3}><IconButton><CartIcon /></IconButton></Badge>,
 *   ]}
 * />
 * ```
 *
 * @param props - Navbar1 props
 * @returns A styled navbar component with mobile support
 */
export function Navbar1({
  logo,
  leftElements = [],
  rightElements = [],
  alwaysRightElements = [],
}: Navbar1Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();

  return (
    <div
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Main navbar */}
      <div
        className="px-6 py-3 flex items-center justify-between gap-4 w-full border-b"
        style={{
          backgroundColor: theme.palette.background.default,
          borderColor: theme.palette.border,
        }}
      >
        {/* Left side: Logo and left elements */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          {logo && <div className="shrink-0 flex items-center">{logo}</div>}

          {/* Left elements (desktop only) */}
          {leftElements && leftElements.length > 0 && (
            <div className="hidden md:flex gap-6 items-center">
              {leftElements.map((element, index) => (
                <React.Fragment key={`left-${index}`}>{element}</React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Right side elements */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Desktop right elements */}
          {rightElements.length > 0 && (
            <>
              {rightElements.map((element, index) => (
                <div key={`right-${index}`} className="hidden md:block">
                  {element}
                </div>
              ))}
            </>
          )}

          {/* Always visible right elements */}
          {alwaysRightElements.map((element, index) => (
            <React.Fragment key={`always-${index}`}>{element}</React.Fragment>
          ))}

          {/* Mobile hamburger menu button */}
          {((leftElements && leftElements.length > 0) ||
            (rightElements && rightElements.length > 0)) && (
            <button
              type="button"
              className="md:hidden text-primary hover:opacity-80 transition-opacity"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X size={28} strokeWidth={1.4} />
              ) : (
                <Menu size={28} strokeWidth={1.4} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {((leftElements && leftElements.length > 0) ||
        (rightElements && rightElements.length > 0)) && (
        <div
          className={clsx(
            "transition-all duration-300 overflow-hidden md:hidden border-b",
            menuOpen ? "max-h-96 py-4" : "max-h-0 py-0"
          )}
          style={{
            backgroundColor: theme.palette.background.default,
            borderColor: theme.palette.border,
          }}
        >
          {/* Mobile left elements */}
          {leftElements && leftElements.length > 0 && (
            <div className="flex flex-col items-start gap-4 pl-4">
              {leftElements.map((element, index) => (
                <div key={`mobile-left-${index}`}>{element}</div>
              ))}
            </div>
          )}

          {/* Mobile right elements */}
          {rightElements.length > 0 && (
            <div className="flex flex-col items-start gap-4 pl-4 mt-4">
              {rightElements.map((element, index) => (
                <div key={`mobile-right-${index}`}>{element}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
