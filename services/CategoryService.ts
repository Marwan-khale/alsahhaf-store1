import { CategoryRepository } from "@/repositories/CategoryRepository";
import type { Category, SubCategory } from "@/types/category";
import type { WithId } from "@/types/common";

/**
 * Orchestrates CategoryRepository only.
 * Per CATEGORIES security section: "Delete must be Soft Delete" — no
 * hard delete method is exposed.
 */
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository = new CategoryRepository()
  ) {}

  getById(id: string): Promise<WithId<Category> | null> {
    return this.categoryRepository.findById(id);
  }

  getAll(): Promise<WithId<Category>[]> {
    return this.categoryRepository.findAll();
  }

  getActive(): Promise<WithId<Category>[]> {
    return this.categoryRepository.findActive();
  }

  create(data: Category): Promise<string> {
    return this.categoryRepository.create(data);
  }

  update(id: string, data: Partial<Category>): Promise<void> {
    return this.categoryRepository.update(id, data);
  }

  softDelete(id: string): Promise<void> {
    return this.categoryRepository.softDelete(id);
  }

  restore(id: string): Promise<void> {
    return this.categoryRepository.restore(id);
  }

  getSubCategories(categoryId: string): Promise<WithId<SubCategory>[]> {
    return this.categoryRepository.findSubCategories(categoryId);
  }

  createSubCategory(categoryId: string, data: SubCategory): Promise<string> {
    return this.categoryRepository.createSubCategory(categoryId, data);
  }
}

export const categoryService = new CategoryService();
