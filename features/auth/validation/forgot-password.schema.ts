import { z } from "zod";

import type { User } from "@/types/user";

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
}) satisfies z.ZodType<Pick<User, "email">>;

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
