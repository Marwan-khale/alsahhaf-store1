// Country constants.
// The approved documentation states the store serves customers inside
// Yemen only. No other country or ISO code is documented.

export const COUNTRIES = {
  YEMEN: {
    name_ar: "اليمن",
    name_en: "Yemen",
  },
} as const;

export const DEFAULT_COUNTRY = COUNTRIES.YEMEN;
