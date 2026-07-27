import type { UpdateData } from "firebase/firestore";

import { BaseRepository } from "@/repositories/BaseRepository";
import type { Notification } from "@/types/notification";

/** COLLECTION: notifications — not listed under the SOFT DELETE rule; hard delete is allowed. */
export class NotificationRepository extends BaseRepository<Notification> {
  constructor() {
    super("notifications");
  }

  findByUser(userId: string) {
    return this.findWhere("userId", "==", userId);
  }

  markAsRead(id: string) {
    const data: UpdateData<Notification> = { isRead: true };
    return this.update(id, data);
  }

  delete(id: string) {
    return this.hardDelete(id);
  }
}
