import { UserRepository } from "@/repositories/UserRepository";
import { AdminRepository } from "@/repositories/AdminRepository";
import type { User } from "@/types/user";
import type { Admin } from "@/types/admin";
import type { WithId } from "@/types/common";

/**
 * Orchestrates the Firestore profile side of authentication
 * (users/admins collections) through repositories only.
 *
 * Firebase Authentication itself (sign in/up/out, sessions) is accessed
 * through firebase/auth.ts directly by the caller, since no repository
 * wraps Authentication — this service never calls the Firebase SDK.
 */
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository = new UserRepository(),
    private readonly adminRepository: AdminRepository = new AdminRepository()
  ) {}

  getUserProfile(uid: string): Promise<WithId<User> | null> {
    return this.userRepository.findById(uid);
  }

  getAdminProfile(uid: string): Promise<WithId<Admin> | null> {
    return this.adminRepository.findById(uid);
  }

  findUserByEmail(email: string): Promise<WithId<User>[]> {
    return this.userRepository.findByEmail(email);
  }

  createUserProfile(uid: string, data: User): Promise<void> {
    return this.userRepository.createWithId(uid, data);
  }
}

export const authService = new AuthService();
