import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  Timestamp,
  type CollectionReference,
  type DocumentData,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  type UpdateData,
  type WhereFilterOp,
  type WithFieldValue,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";
import type { WithId } from "@/types/common";

/**
 * Converts Firestore Timestamp fields to ISO strings on read, so entity
 * data matches the domain models in types/ (Timestamp = ISO string).
 * Write-side data passes through unchanged — Firestore accepts
 * serverTimestamp()/FieldValue via WithFieldValue<T>/UpdateData<T>.
 */
function createConverter<T extends DocumentData>(): FirestoreDataConverter<T> {
  return {
    toFirestore(data: WithFieldValue<T>): DocumentData {
      return data as DocumentData;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): T {
      const raw = snapshot.data(options);
      const entries = Object.entries(raw).map(([key, value]) => [
        key,
        value instanceof Timestamp ? value.toDate().toISOString() : value,
      ]);
      return Object.fromEntries(entries) as T;
    },
  };
}

/**
 * Base repository: data access only. No business validation, no
 * price/discount/permission/workflow calculations. Every method maps
 * directly to a single Firestore Modular SDK operation.
 */
export abstract class BaseRepository<T extends DocumentData> {
  protected readonly collectionRef: CollectionReference<T>;

  protected constructor(collectionPath: string) {
    this.collectionRef = collection(db, collectionPath).withConverter(createConverter<T>());
  }

  async findById(id: string): Promise<WithId<T> | null> {
    const snapshot = await getDoc(doc(this.collectionRef, id));
    if (!snapshot.exists()) {
      return null;
    }
    return { id: snapshot.id, ...snapshot.data() };
  }

  async findAll(): Promise<WithId<T>[]> {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }));
  }

  /** Shared single-field query helper — reused by subclasses to avoid duplicated query code. */
  protected async findWhere(
    field: keyof T & string,
    op: WhereFilterOp,
    value: unknown
  ): Promise<WithId<T>[]> {
    const q = query(this.collectionRef, where(field, op, value));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }));
  }

  /** Creates a document with an auto-generated ID. */
  async create(data: WithFieldValue<T>): Promise<string> {
    const ref = await addDoc(this.collectionRef, data);
    return ref.id;
  }

  /** Creates or overwrites a document at an explicit ID (e.g. users/admins keyed by uid). */
  async setById(id: string, data: WithFieldValue<T>): Promise<void> {
    await setDoc(doc(this.collectionRef, id), data);
  }

  async update(id: string, data: UpdateData<T>): Promise<void> {
    await updateDoc(doc(this.collectionRef, id), data);
  }

  /** Hard delete. Not exposed by repositories whose collection requires soft delete or immutability. */
  protected async hardDelete(id: string): Promise<void> {
    await deleteDoc(doc(this.collectionRef, id));
  }
}
