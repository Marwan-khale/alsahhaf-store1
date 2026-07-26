// Matches DATABASE SCHEMA → COLLECTION: banners
// Soft delete fields included per the SOFT DELETE rule, which lists
// banners as a collection requiring isDeleted/deletedAt.

import type { AuditFields, SoftDeleteFields, Timestamp } from "@/types/common";

export interface Banner extends AuditFields, SoftDeleteFields {
  title: string;
  imageUrl: string;
  linkType: string;
  linkTarget: string;
  sortOrder: number;
  isActive: boolean;
  startDate: Timestamp;
  endDate: Timestamp;
}
