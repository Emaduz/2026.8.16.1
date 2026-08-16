import { describe, expect, it } from "vitest";
import { appRouter, getAdminAccessToken } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function makeContext(role: "admin" | "user", openId = "sample-user"): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId,
    email: "sample@example.com",
    name: "Sample User",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: { cookie: `admin_panel_access=${getAdminAccessToken()}` } } as TrpcContext["req"],
    res: { clearCookie: () => undefined, cookie: () => undefined } as TrpcContext["res"],
  };
}

describe("content owner authorization", () => {
  it("rejects a regular authenticated user from the private content workspace", async () => {
    const caller = appRouter.createCaller(makeContext("user"));
    await expect(caller.content.adminData()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects an admin identity that is not the configured owner", async () => {
    const caller = appRouter.createCaller(makeContext("admin", "not-the-owner"));
    await expect(caller.content.adminData()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("keeps the public auth procedure available without exposing admin content", async () => {
    const user = makeContext("user").user;
    const caller = appRouter.createCaller({ ...makeContext("user"), user });
    await expect(caller.auth.me()).resolves.toEqual(user);
  });
});
