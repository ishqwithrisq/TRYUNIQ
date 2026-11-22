import { describe, expect, it } from "vitest";
import { logoBurgundyUrl, logoIvoryUrl } from "./logos";

describe("Portable logo URLs", () => {
  it.each([
    [logoBurgundyUrl, "tryuniq_logo_burgundy.png"],
    [logoIvoryUrl, "tryuniq_logo_ivory.png"],
  ])("resolves %s on the hosted asset origin instead of localhost", (src, filename) => {
    const url = new URL(src, "http://localhost:8080");
    expect(url.origin).toBe("https://id-preview--9b150e50-b10d-4b62-b38d-9fbb6efe0b76.lovable.app");
    expect(url.pathname).toMatch(/^\/__l5e\/assets-v1\//);
    expect(url.pathname.endsWith(`/${filename}`)).toBe(true);
  });
});