// Role constants.
// Matches DATABASE SCHEMA → COLLECTION: users (role) and COLLECTION: admins (Roles).

export const USER_ROLES = {
  CUSTOMER: "customer",
} as const;

export const ADMIN_ROLES = {
  SYSTEM_ADMIN: "system_admin",
  STORE_MANAGER: "store_manager",
  PRODUCTS_STAFF: "products_staff",
  ORDERS_STAFF: "orders_staff",
  SUPPORT_STAFF: "support_staff",
} as const;
