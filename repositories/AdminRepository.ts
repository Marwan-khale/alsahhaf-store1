import type { WithFieldValue } from "firebase/firestore";

import { BaseRepository } from "@/repositories/BaseRepository";
import type { Admin, AdminRole } from "@/types/admin";

/** COLLECTION: admins — Document ID: Firebase Authentication UID. */
export class AdminRepository extends BaseRepository<Admin> {
  constructor() {
    super("admins");
  }

  findByEmail(email: string) {
    return this.findWhere("email", "==", email);
  }

  findByRole(role: AdminRole) {
    return this.findWhere("role", "==", role);
  }

  /** Creates the admin document at the given Auth UID. */
  createWithId(uid: string, data: WithFieldValue<Admin>) {
    return this.setById(uid, data);
  }
}
