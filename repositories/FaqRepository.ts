import { BaseRepository } from "@/repositories/BaseRepository";
import type { Faq } from "@/types/faq";

/** COLLECTION: faqs — not listed under the SOFT DELETE rule; hard delete is allowed. */
export class FaqRepository extends BaseRepository<Faq> {
  constructor() {
    super("faqs");
  }

  findActive() {
    return this.findWhere("isActive", "==", true);
  }

  delete(id: string) {
    return this.hardDelete(id);
  }
}
