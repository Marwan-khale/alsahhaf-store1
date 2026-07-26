// Payment method constants.
// Matches v1.1 "Payment Methods" section and v1.2 "PAYMENTS" / "PAYMENT ARCHITECTURE".

export const PAYMENT_METHODS = {
  BANK_TRANSFER: "bank_transfer",
  CASH_ON_DELIVERY: "cash_on_delivery",
  ELECTRONIC_GATEWAY: "electronic_gateway",
} as const;

// Documented as "Current Method" / "Version 1" — the only active method today.
export const ACTIVE_PAYMENT_METHODS = [PAYMENT_METHODS.BANK_TRANSFER] as const;

// Documented as "Future" methods — not yet active.
export const FUTURE_PAYMENT_METHODS = [
  PAYMENT_METHODS.CASH_ON_DELIVERY,
  PAYMENT_METHODS.ELECTRONIC_GATEWAY,
] as const;
