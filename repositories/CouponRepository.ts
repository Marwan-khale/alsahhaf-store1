import type { UpdateData } from "firebase/firestore";

import { BaseRepository } from "@/repositories/BaseRepository";
import type { Coupon } from "@/types/coupon";

/** COLLECTION: coupons — soft delete required (SOFT DELETE rule). */
export class CouponRepository extends BaseRepository<Coupon> {
  constructor() {
    super("coupons");
  }

  findByCode(code: string) {
    return this.findWhere("code", "==", code);
  }

  findActive() {
    return this.findWhere("isActive", "==", true);
  }

  softDelete(id: string) {
    const data: UpdateData<Coupon> = { isDeleted: true, deletedAt: new Date().toISOString() };
    return this.update(id, data);
  }

  restore(id: string) {
    const data: UpdateData<Coupon> = { isDeleted: false, deletedAt: null };
    return this.update(id, data);
  }
}
