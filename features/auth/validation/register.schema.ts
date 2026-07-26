import { z } from "zod";

import type { User } from "@/types/user";

// Reuses User fields (name, email, phone) from the approved schema.
// "password" is not a Firestore field — it is the documented
// authentication credential (v1.0 "Authentication").
export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().nullable(),
  password: z.string().min(1),
}) satisfies z.ZodType<Pick<User, "name" | "email" | "phone"> & { password: string }>;

export type RegisterInput = z.infer<typeof registerSchema>;
