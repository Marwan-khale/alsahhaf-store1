import { BannerRepository } from "@/repositories/BannerRepository";
import type { Banner } from "@/types/banner";
import type { WithId } from "@/types/common";

/** Orchestrates BannerRepository only. Delete is soft-delete only, per the SOFT DELETE rule. */
export class BannerService {
  constructor(private readonly bannerRepository: BannerRepository = new BannerRepository()) {}

  getById(id: string): Promise<WithId<Banner> | null> {
    return this.bannerRepository.findById(id);
  }

  getAll(): Promise<WithId<Banner>[]> {
    return this.bannerRepository.findAll();
  }

  getActive(): Promise<WithId<Banner>[]> {
    return this.bannerRepository.findActive();
  }

  create(data: Banner): Promise<string> {
    return this.bannerRepository.create(data);
  }

  update(id: string, data: Partial<Banner>): Promise<void> {
    return this.bannerRepository.update(id, data);
  }

  softDelete(id: string): Promise<void> {
    return this.bannerRepository.softDelete(id);
  }

  restore(id: string): Promise<void> {
    return this.bannerRepository.restore(id);
  }
}

export const bannerService = new BannerService();
