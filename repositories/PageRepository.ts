import type { WithFieldValue } from "firebase/firestore";

import { BaseRepository } from "@/repositories/BaseRepository";
import type { Timestamp } from "@/types/common";

// COLLECTION: pages — not part of the Phase 3 types/ file set, so the
// entity is defined locally here, matching the documented schema exactly.
// Document IDs: about, privacy, return-policy, shipping-policy, terms, contact.
export interface Page {
  title: string;
  content: string;
  updatedAt: Timestamp;
}

export type PageId =
  | "about"
  | "privacy"
  | "return-policy"
  | "shipping-policy"
  | "terms"
  | "contact";

export class PageRepository extends BaseRepository<Page> {
  constructor() {
    super("pages");
  }

  getByPageId(pageId: PageId) {
    return this.findById(pageId);
  }

  setByPageId(pageId: PageId, data: WithFieldValue<Page>) {
    return this.setById(pageId, data);
  }
}
