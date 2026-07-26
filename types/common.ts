// Shared, Firebase-agnostic domain types (Vendor Independence principle).
// Reused across all entity interfaces in this folder.

// ISO 8601 date-time string. Represents a Firestore Server Timestamp
// once read into the domain layer — no Firebase types leak here.
export type Timestamp = string;

// Supported store currencies, per the approved database schema.
export type Currency = "YER" | "SAR";

// Structure not yet defined in the approved schema beyond "array"/"object".
// Used as a documented placeholder until the schema is extended.
export type UnstructuredRecord = Record<string, unknown>;

// A single saved address entry (schema only defines "addresses : array").
export type Address = UnstructuredRecord;

// Standard audit timestamp pair required on every document.
export interface AuditFields {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Standard soft-delete fields for collections that require them
// (products, categories, banners, coupons, pages).
export interface SoftDeleteFields {
  isDeleted: boolean;
  deletedAt: Timestamp | null;
}

// Utility for attaching a Firestore document ID to an entity without
// adding an "id" field to the entity schema itself.
export type WithId<T> = T & { id: string };
