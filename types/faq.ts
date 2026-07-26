// Matches DATABASE SCHEMA → COLLECTION: faqs

import type { AuditFields } from "@/types/common";

export interface Faq extends AuditFields {
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
}
