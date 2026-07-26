// Currency constants.
// Matches Project Overview (v1.0) and DATABASE SCHEMA → CURRENCY section.

export const CURRENCIES = {
  YER: "YER",
  SAR: "SAR",
} as const;

// YER is the active launch currency; SAR is documented as a future currency.
export const DEFAULT_CURRENCY = CURRENCIES.YER;

export const CURRENCY_LABELS_AR = {
  YER: "الريال اليمني",
  SAR: "الريال السعودي",
} as const;
