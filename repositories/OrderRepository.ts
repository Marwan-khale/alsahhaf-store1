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
import type { Order, OrderItem, OrderStatus } from "@/types/order";

// Reuses the same Timestamp-to-ISO conversion approach as BaseRepository,
// scoped to the items subcollection (not a top-level collection).
function createOrderItemConverter(): FirestoreDataConverter<OrderItem> {
  return {
    toFirestore(data: WithFieldValue<OrderItem>): DocumentData {
      return data as DocumentData;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): OrderItem {
      const raw = snapshot.data(options);
      const entries = Object.entries(raw).map(([key, value]) => [
        key,
        value instanceof Timestamp ? value.toDate().toISOString() : value,
      ]);
      return Object.fromEntries(entries) as OrderItem;
    },
  };
}

/** COLLECTION: orders — orders must never be deleted (documented data-integrity rule). */
export class OrderRepository extends BaseRepository<Order> {
  constructor() {
    super("orders");
  }

  findByUser(userId: string) {
    return this.findWhere("userId", "==", userId);
  }

  findByStatus(status: OrderStatus) {
    return this.findWhere("status", "==", status);
  }

  updateStatus(id: string, status: OrderStatus) {
    const data: UpdateData<Order> = { status };
    return this.update(id, data);
  }

  // Deletion is intentionally not exposed: orders must never be deleted.

  // Subcollection: orders/{orderId}/items/{itemId}
  private itemsRef(orderId: string) {
    return collection(db, "orders", orderId, "items").withConverter(createOrderItemConverter());
  }

  async findItems(orderId: string): Promise<WithId<OrderItem>[]> {
    const snapshot = await getDocs(this.itemsRef(orderId));
    return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }));
  }

  async addItem(orderId: string, data: WithFieldValue<OrderItem>): Promise<string> {
    const ref = doc(this.itemsRef(orderId));
    await setDoc(ref, data);
    return ref.id;
  }
}
