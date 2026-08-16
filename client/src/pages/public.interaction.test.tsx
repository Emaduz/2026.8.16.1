// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Router } from "wouter";
import SiteChrome from "@/components/SiteChrome";
import Portfolio from "@/pages/Portfolio";
import { AppRouter } from "@/App";
import { LocaleProvider } from "@/contexts/LocaleContext";

vi.mock("@/lib/trpc", () => ({
  trpc: {
    content: {
      publicHome: {
        useQuery: () => ({ data: { sections: [], projects: [], posts: [] }, isLoading: false }),
      },
    },
  },
}));

vi.mock("embla-carousel-react", async () => {
  const React = await import("react");
  return {
    default: () => {
      const [, forceRender] = React.useState(0);
      const selected = React.useRef(0);
      const listeners = React.useRef(new Set<(api: any) => void>());
      const api = React.useMemo(() => ({
        canScrollPrev: () => true,
        canScrollNext: () => true,
        selectedScrollSnap: () => selected.current,
        scrollNext: () => { selected.current = (selected.current + 1) % 3; forceRender(value => value + 1); listeners.current.forEach(listener => listener(api)); },
        scrollPrev: () => { selected.current = (selected.current + 2) % 3; forceRender(value => value + 1); listeners.current.forEach(listener => listener(api)); },
        scrollTo: (index: number) => { selected.current = index; forceRender(value => value + 1); listeners.current.forEach(listener => listener(api)); },
        on: (_event: string, listener: (api: any) => void) => { listeners.current.add(listener); },
        off: (_event: string, listener: (api: any) => void) => { listeners.current.delete(listener); },
      }), []);
      return [React.useRef<HTMLDivElement>(null), api];
    },
  };
});

const navigateSpy = vi.fn();
let appPath = "/";
function useSpyLocation() {
  return [appPath, navigateSpy] as [string, (path: string, ...args: any[]) => void];
}

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
  navigateSpy.mockReset();
  window.localStorage.removeItem("emad-locale");
  document.documentElement.dir = "ltr";
  document.documentElement.lang = "en";
  Object.defineProperty(window, "matchMedia", { writable: true, value: () => ({ matches: false, addEventListener: () => undefined, removeEventListener: () => undefined }) });
});

describe("public navigation and carousel interactions", () => {
  it("moves the active top tab when the user selects Portfolio", async () => {
    render(<Router hook={useSpyLocation}><SiteChrome><div>Home content</div></SiteChrome></Router>);
    const portfolioLink = screen.getByRole("link", { name: "Portfolio" });
    expect(portfolioLink.classList.contains("is-active")).toBe(false);
    fireEvent.click(portfolioLink);
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy.mock.calls[0]?.[0]).toBe("/portfolio");
  });

  it("exposes the floating WhatsApp action with the current contact number", () => {
    render(<SiteChrome><div>Home content</div></SiteChrome>);
    const whatsappLink = screen.getByRole("link", { name: "Message on WhatsApp" });
    expect(whatsappLink.getAttribute("href")).toBe("https://wa.me/966504487308");
    expect(whatsappLink.getAttribute("target")).toBe("_blank");
  });

  it("switches to Arabic RTL and keeps the Control tab visible", () => {
    render(<LocaleProvider><SiteChrome><div>Home content</div></SiteChrome></LocaleProvider>);
    expect(screen.getByRole("link", { name: "Control" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Switch language" }));
    expect(screen.getByRole("link", { name: "التحكم" })).toBeTruthy();
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
  });

  it("renders distinct Home and Portfolio output through the actual AppRouter", () => {
    appPath = "/";
    const home = render(<Router hook={useSpyLocation}><AppRouter /></Router>);
    expect(screen.getByRole("heading", { name: /Solutions/i })).toBeTruthy();
    home.unmount();
    appPath = "/portfolio";
    const portfolio = render(<Router hook={useSpyLocation}><AppRouter /></Router>);
    expect(screen.getByText("Move through the work.")).toBeTruthy();
    portfolio.unmount();
  });

  it("advances and reverses the portfolio carousel from controls and mouse wheel", async () => {
    render(<Portfolio />);
    const nextButtons = screen.getAllByRole("button", { name: "Next slide" });
    const next = nextButtons[nextButtons.length - 1];
    expect(next).toBeTruthy();
    fireEvent.click(next);
    await waitFor(() => expect(screen.getByText("02 / 03")).toBeTruthy());
    const carousel = document.querySelector(".portfolio-carousel-wrap");
    expect(carousel).toBeTruthy();
    fireEvent.wheel(carousel as Element, { deltaY: 40, deltaX: 0 });
    await waitFor(() => expect(screen.getByText("03 / 03")).toBeTruthy());
    const previousButtons = screen.getAllByRole("button", { name: "Previous slide" });
    const previous = previousButtons[previousButtons.length - 1];
    expect(previous).toBeTruthy();
    fireEvent.click(previous);
    await waitFor(() => expect(screen.getByText("02 / 03")).toBeTruthy());
  });
});
