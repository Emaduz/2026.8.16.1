import { describe, expect, it } from "vitest";
import { navItems } from "@/components/SiteChrome";
import { fallbackProjects } from "@/pages/Portfolio";
import { getWheelDirection, isActiveRoute } from "@/lib/navigationInteractions";

describe("public navigation and portfolio contracts", () => {
  it("keeps each top tab on its own public route", () => {
    expect(navItems).toEqual([
      ["Home", "/"],
      ["Portfolio", "/portfolio"],
      ["About", "/about"],
      ["Services", "/services"],
      ["Contact", "/contact"],
    ]);
    expect(new Set(navItems.map(([, path]) => path)).size).toBe(navItems.length);
  });

  it("marks only the current tab active and maps wheel movement to carousel direction", () => {
    expect(isActiveRoute("/portfolio", "/portfolio")).toBe(true);
    expect(isActiveRoute("/portfolio", "/about")).toBe(false);
    expect(getWheelDirection(40, 0)).toBe(1);
    expect(getWheelDirection(-40, 0)).toBe(-1);
    expect(getWheelDirection(4, 0)).toBe(0);
    expect(getWheelDirection(40, 60)).toBe(0);
  });

  it("keeps the carousel fallback populated with distinct work items", () => {
    expect(fallbackProjects).toHaveLength(3);
    expect(new Set(fallbackProjects.map(project => project.id)).size).toBe(3);
    expect(fallbackProjects.every(project => project.title && project.imageUrl && project.description)).toBe(true);
    expect(fallbackProjects.every(project => project.slides && project.slides.length >= 2)).toBe(true);
  });
});
