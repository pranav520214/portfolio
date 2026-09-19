/**
 * Motion Design Tokens
 * Central constants for all animation timing, easing, and spring configurations.
 * Import these instead of using arbitrary values in components.
 */

// Duration constants (seconds)
export const DURATION = {
  /** Micro-interactions: button clicks, hover states */
  FAST: 0.2,
  /** UI transitions: small element movements, opacity changes */
  UI: 0.35,
  /** Scene transitions: section entrances, card movements */
  SCENE: 0.8,
  /** Cinematic: camera moves, gate transitions */
  CINEMATIC: 1.8,
  /** Epic sequences: full constellation formation */
  EPIC: 3.0,
} as const;

// Cubic-bezier easing curves (Framer Motion format)
export const EASE = {
  /** Fast deceleration — objects arriving into position */
  outExpo: [0.16, 1, 0.3, 1] as const,
  /** Smooth symmetric — section transitions */
  inOutCubic: [0.65, 0, 0.35, 1] as const,
  /** Slight overshoot — playful arrivals */
  outBack: [0.34, 1.56, 0.64, 1] as const,
  /** Smooth deceleration — general purpose */
  outQuart: [0.25, 1, 0.5, 1] as const,
} as const;

// Spring configurations (Framer Motion spring)
export const SPRING = {
  /** Standard responsive spring — letter assembly, card movements */
  standard: { type: "spring" as const, stiffness: 180, damping: 22 },
  /** Heavy mechanical spring — gate opening, book covers */
  heavy: { type: "spring" as const, stiffness: 120, damping: 18 },
  /** Gentle settling — particles, ambient drift */
  gentle: { type: "spring" as const, stiffness: 60, damping: 15 },
  /** Snappy — menu items, toggles */
  snappy: { type: "spring" as const, stiffness: 300, damping: 26 },
} as const;

// Stagger delays
export const STAGGER = {
  /** Between letters in text assembly */
  letter: 0.04,
  /** Between cards in a grid */
  card: 0.08,
  /** Between constellation nodes */
  node: 0.12,
  /** Between major scene elements */
  section: 0.15,
} as const;
