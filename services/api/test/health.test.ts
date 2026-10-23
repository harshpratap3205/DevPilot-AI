import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../src/app";

describe("Health API", () => {
  const app = createApp();

  it("GET /health should return 200 with status ok and request-id", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.service).toBe("@devpilot/api");
    expect(res.headers["x-request-id"]).toBeDefined();
  });

  it("GET /non-existent-route should return 404 with standard ApiErrorResponse", async () => {
    const res = await request(app).get("/random-route-404");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("NOT_FOUND");
    expect(res.body.meta.requestId).toBeDefined();
  });
});
