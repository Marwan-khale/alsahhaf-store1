import {
  collection,
  doc,
  getDocs,
  setDoc,
  Timestamp,
  type DocumentData,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  type UpdateData,
  type WithFieldValue,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";
import { BaseRepository } from "@/repositories/BaseRepository";
import type { WithId } from "@/types/common";
import type { Category, SubCategory } from "@/types/category";

// Reuses the same Timestamp-to-ISO conversion approach as BaseRepository,
// scoped to the subcategories subcollection (not a top-level collection).
function createSubCategoryConverter(): FirestoreDataConverter<SubCategory> {
  return {
    toFirestore(data: WithFieldValue<SubCategory>): DocumentData {
      return data as DocumentData;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): SubCategory {
      const raw = snapshot.data(options);
      const entries = Object.entries(raw).map(([key, value]) => [
        key,
        value instanceof Timestamp ? value.toDate().toISOString() : value,
      ]);
      return Object.fromEntries(entries) as SubCategory;
    },
  };
}

/** COLLECTION: categories — soft delete required (SOFT DELETE rule). */
export class CategoryRepository extends BaseRepository<Category> {
  constructor() {
    super("categories");
  }

  findActive() {
    return this.findWhere("isActive", "==", true);
  }

  softDelete(id: string) {
    const data: UpdateData<Category> = { isDeleted: true, deletedAt: new Date().toISOString() };
    return this.update(id, data);
  }

  restore(id: string) {
    const data: UpdateData<Category> = { isDeleted: false, deletedAt: null };
    return this.update(id, data);
  }

  // Subcollection: categories/{categoryId}/subcategories/{subCategoryId}
  private subCategoriesRef(categoryId: string) {
    return collection(db, "categories", categoryId, "subcategories").withConverter(
      createSubCategoryConverter()
    );
  }

  async findSubCategories(categoryId: string): Promise<WithId<SubCategory>[]> {
    const snapshot = await getDocs(this.subCategoriesRef(categoryId));
    return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }));
  }

  async createSubCategory(categoryId: string, data: WithFieldValue<SubCategory>): Promise<string> {
    const ref = doc(this.subCategoriesRef(categoryId));
    await setDoc(ref, data);
    return ref.id;
  }
}
