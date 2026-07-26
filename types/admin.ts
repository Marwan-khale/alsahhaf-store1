// Matches DATABASE SCHEMA → COLLECTION: admins
// Document ID: Firebase Authentication UID

import type { AuditFields, Timestamp } from "@/types/common";

export type AdminRole =
  | "system_admin"
  | "store_manager"
  | "products_staff"
  | "orders_staff"
  | "support_staff";

export interface Admin extends AuditFields {
  uid: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: string[];
  isActive: boolean;
  lastLoginAt: Timestamp;
}
