import { UserRepository } from "@/repositories/UserRepository";
import type { User } from "@/types/user";
import type { WithId } from "@/types/common";

/**
 * Orchestrates UserRepository only.
 * Per USER COLLECTION security section, users may update their own
 * profile, addresses, preferred currency, and preferred language, but
 * may NOT change role/totalSpent/totalOrders/emailVerified/createdAt/
 * blocked status. updateProfile's input type enforces this restriction
 * at compile time.
 */
type AllowedProfileFields = Pick<
  User,
  "name" | "phone" | "avatarUrl" | "addresses" | "preferredCurrency" | "preferredLanguage"
>;

export class UserService {
  constructor(private readonly userRepository: UserRepository = new UserRepository()) {}

  getById(uid: string): Promise<WithId<User> | null> {
    return this.userRepository.findById(uid);
  }

  getByEmail(email: string): Promise<WithId<User>[]> {
    return this.userRepository.findByEmail(email);
  }

  createProfile(uid: string, data: User): Promise<void> {
    return this.userRepository.createWithId(uid, data);
  }

  updateProfile(uid: string, data: Partial<AllowedProfileFields>): Promise<void> {
    return this.userRepository.update(uid, data);
  }
}

export const userService = new UserService();
