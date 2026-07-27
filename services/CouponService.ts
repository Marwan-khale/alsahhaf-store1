import { CouponRepository } from "@/repositories/CouponRepository";
import type { Coupon } from "@/types/coupon";
import type { WithId } from "@/types/common";

/**
 * Orchestrates CouponRepository only.
 * Per COUPONS security section: customers "Read only valid coupons if
 * required"; admins "Create / Update / Disable / Expire" coupons.
 */
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository = new CouponRepository()) {}

  getByCode(code: string): Promise<WithId<Coupon>[]> {
    return this.couponRepository.findByCode(code);
  }

  /** Customer-facing: valid coupons only. */
  getActive(): Promise<WithId<Coupon>[]> {
    return this.couponRepository.findActive();
  }

  create(data: Coupon): Promise<string> {
    return this.couponRepository.create(data);
  }

  update(id: string, data: Partial<Coupon>): Promise<void> {
    return this.couponRepository.update(id, data);
  }

  /** Documented admin action "Disable". */
  disable(id: string): Promise<void> {
    return this.couponRepository.update(id, { isActive: false });
  }

  /** Documented admin action "Expire" — sets endDate to now using the existing field. */
  expire(id: string): Promise<void> {
    return this.couponRepository.update(id, { endDate: new Date().toISOString() });
  }

  softDelete(id: string): Promise<void> {
    return this.couponRepository.softDelete(id);
  }

  restore(id: string): Promise<void> {
    return this.couponRepository.restore(id);
  }
}

export const couponService = new CouponService();
