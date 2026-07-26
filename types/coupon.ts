// Matches DATABASE SCHEMA → COLLECTION: coupons
// type values (percentage/fixed) as defined in the approved documentation.
// Soft delete fields included per the SOFT DELETE rule, which lists
// coupons as a collection requiring isDeleted/deletedAt.

import type { AuditFields, SoftDeleteFields, Timestamp } from "@/types/common";

export type CouponType = "percentage" | "fixed";

export interface Coupon extends AuditFields, SoftDeleteFields {
  code: string;
  type: CouponType;
  value: number;
  minimumOrder: number;
  maximumDiscount: number;
  usageLimit: number;
  usedCount: number;
  startDate: Timestamp;
  endDate: Timestamp;
  isActive: boolean;
}
