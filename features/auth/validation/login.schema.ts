import { z } from "zod";

// Matches v1.0 "Authentication" — email + password login.
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;
