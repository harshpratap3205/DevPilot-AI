import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().nullable(),
  displayName: z.string().min(1),
  avatarUrl: z.string().url().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = z.object({
  email: z.string().email().optional(),
  displayName: z.string().min(1).max(255),
  avatarUrl: z.string().url().optional(),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
