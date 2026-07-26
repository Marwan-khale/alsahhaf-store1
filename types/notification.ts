// Matches DATABASE SCHEMA → COLLECTION: notifications

import type { Timestamp } from "@/types/common";

export interface Notification {
  userId: string;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  createdAt: Timestamp;
}
