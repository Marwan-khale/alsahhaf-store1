// Order status constants.
// Matches DATABASE SCHEMA → STATUS FIELDS and Business Rules (v1.0).

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

// Documented progression: pending → confirmed → processing → shipped → delivered
// "cancelled" may occur instead of the normal progression, as documented.
export const ORDER_STATUS_FLOW = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.PROCESSING,
  ORDER_STATUS.SHIPPED,
  ORDER_STATUS.DELIVERED,
] as const;
