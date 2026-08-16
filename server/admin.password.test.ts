import { describe, expect, it } from "vitest";
import { appRouter, getAdminAccessToken } from "./routers";
import type { TrpcContext } from "./_core/context";

function makeContext(cookieHeader = ""): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: { cookie: cookieHeader } } as TrpcContext["req"],
    res: { clearCookie: () => undefined, cookie: () => undefined } as TrpcContext["res"],
  };
}

describe("auth.verifyAdminPassword", () => {
  it("accepts the configured admin panel password through the lightweight API procedure", async () => {
    const configuredPassword = process.env.ADMIN_PANEL_PASSWORD;
    expect(configuredPassword).toBeTruthy();
    const caller = appRouter.createCaller(makeContext());
    await expect(caller.auth.verifyAdminPassword({ password: configuredPassword ?? "" })).resolves.toEqual({ success: true });
  });

  it("restores an authenticated status from the derived cookie on reload", async () => {
    const caller = appRouter.createCaller(makeContext(`admin_panel_access=${getAdminAccessToken()}`));
    await expect(caller.auth.adminPasswordStatus()).resolves.toEqual({ authenticated: true });
    await expect(appRouter.createCaller(makeContext()).auth.adminPasswordStatus()).resolves.toEqual({ authenticated: false });
  });

  it("rejects an incorrect admin panel password", async () => {
    const caller = appRouter.createCaller(makeContext());
    await expect(caller.auth.verifyAdminPassword({ password: "definitely-not-the-admin-password" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});
