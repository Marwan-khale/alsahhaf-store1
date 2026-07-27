import type { UpdateData } from "firebase/firestore";

import { BaseRepository } from "@/repositories/BaseRepository";
import type { Banner } from "@/types/banner";

/** COLLECTION: banners — soft delete required (SOFT DELETE rule). */
export class BannerRepository extends BaseRepository<Banner> {
  constructor() {
    super("banners");
  }

  findActive() {
    return this.findWhere("isActive", "==", true);
  }

  softDelete(id: string) {
    const data: UpdateData<Banner> = { isDeleted: true, deletedAt: new Date().toISOString() };
    return this.update(id, data);
  }

  restore(id: string) {
    const data: UpdateData<Banner> = { isDeleted: false, deletedAt: null };
    return this.update(id, data);
  }
}
