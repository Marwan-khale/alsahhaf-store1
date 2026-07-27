import { query, where, getDocs, type UpdateData } from "firebase/firestore";

import { BaseRepository } from "@/repositories/BaseRepository";
import type { Timestamp, UnstructuredRecord, WithId } from "@/types/common";

// COLLECTION: auditLogs — not part of the Phase 3 types/ file set, so the
// entity is defined locally here, matching the documented schema exactly.
// Audit logs are immutable: no update or delete is exposed.
export interface AuditLog {
  userId: string;
  userRole: string;
  action: string;
  entity: string;
  entityId: string;
  before: UnstructuredRecord;
  after: UnstructuredRecord;
  ipAddress: string;
  device: string;
  createdAt: Timestamp;
}

export class AuditLogRepository extends BaseRepository<AuditLog> {
  constructor() {
    super("auditLogs");
  }

  findByUser(userId: string) {
    return this.findWhere("userId", "==", userId);
  }

  async findByEntity(entity: string, entityId: string): Promise<WithId<AuditLog>[]> {
    const q = query(
      this.collectionRef,
      where("entity", "==", entity),
      where("entityId", "==", entityId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }));
  }

  /** Audit logs are immutable — update is intentionally disabled. */
  override update(_id: string, _data: UpdateData<AuditLog>): Promise<void> {
    throw new Error("Audit logs are immutable and cannot be updated.");
  }

  // Deletion is intentionally not exposed: audit logs are immutable.
}
