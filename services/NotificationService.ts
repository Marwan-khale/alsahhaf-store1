import { NotificationRepository } from "@/repositories/NotificationRepository";
import type { Notification } from "@/types/notification";
import type { WithId } from "@/types/common";

/**
 * Orchestrates NotificationRepository only.
 * Per NOTIFICATIONS security section: customers can read their own
 * notifications and mark them as read but "Cannot delete notifications";
 * admins can create notifications. No delete method is exposed here.
 */
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository = new NotificationRepository()
  ) {}

  getByUser(userId: string): Promise<WithId<Notification>[]> {
    return this.notificationRepository.findByUser(userId);
  }

  markAsRead(id: string): Promise<void> {
    return this.notificationRepository.markAsRead(id);
  }

  create(data: Notification): Promise<string> {
    return this.notificationRepository.create(data);
  }
}

export const notificationService = new NotificationService();
