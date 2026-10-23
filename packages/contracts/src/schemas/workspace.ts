import { z } from "zod";

export const WorkspaceRoleSchema = z.enum(["ADMIN", "MEMBER", "VIEWER"]);
export type WorkspaceRole = z.infer<typeof WorkspaceRoleSchema>;

export const WorkspaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  ownerId: z.string().uuid(),
  createdAt: z.string().datetime(),
});

export type Workspace = z.infer<typeof WorkspaceSchema>;

export const CreateWorkspaceSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase alphanumeric characters and hyphens"),
});

export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceSchema>;
