// Matches DATABASE SCHEMA → COLLECTION: users
// Document ID: Firebase Authentication UID

import type { Address, AuditFields, Currency, Timestamp } from "@/types/common";

export type UserRole = "customer";

export type PreferredLanguage = "ar";

export interface User extends AuditFields {
  uid: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  isBlocked: boolean;
  addresses: Address[];
  totalOrders: number;
  totalSpent: number;
  lastLoginAt: Timestamp;
  emailVerified: boolean;
  preferredCurrency: Currency;
  preferredLanguage: PreferredLanguage;
  avatarUrl: string | null;
  wishlistCount: number;
  cartItemsCount: number;
}
