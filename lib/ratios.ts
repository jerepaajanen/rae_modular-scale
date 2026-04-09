export type RatioPreset = { name: string; value: number }

export const RATIO_MIN = 1.01
export const RATIO_MAX = 4.0

export const RATIO_PRESETS: RatioPreset[] = [
  { name: "Minor Second", value: 1.067 },
  { name: "Major Second", value: 1.125 },
  { name: "Minor Third", value: 1.2 },
  { name: "Major Third", value: 1.25 },
  { name: "Perfect Fourth", value: 1.333 },
  { name: "Augmented Fourth", value: 1.414 },
  { name: "Perfect Fifth", value: 1.5 },
  { name: "Minor Sixth", value: 1.6 },
  { name: "Golden Ratio", value: 1.618 },
  { name: "Major Sixth", value: 1.667 },
  { name: "Octave", value: 2.0 },
]
