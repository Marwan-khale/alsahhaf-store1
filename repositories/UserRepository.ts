import type { WithFieldValue } from "firebase/firestore";

import { BaseRepository } from "@/repositories/BaseRepository";
import type { User } from "@/types/user";

/** COLLECTION: users — Document ID: Firebase Authentication UID. */
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super("users");
  }

  findByEmail(email: string) {
    return this.findWhere("email", "==", email);
  }

  /** Creates the user document at the given Auth UID. */
  createWithId(uid: string, data: WithFieldValue<User>) {
    return this.setById(uid, data);
  }
}
