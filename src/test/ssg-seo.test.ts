import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import path from "node:path";

const DIST = path.resolve(__dirname, "../../dist");

/**
 * Vérifie que les balises SEO critiques sont correctement injectées
 * dans le HTML pré-rendu au build SSG, et qu'elles ne sont jamais
 * tronquées ni absentes.
 *
 * Si le build n'a pas été exécuté, on le lance une seule fois ici.
 * Le test se concentre sur /gingivite-marseille (régression historique).
 */
describe("SSG SEO output — /gingivite-marseille", () => {
  let html = "";
  let doc: Document;

  beforeAll(() => {
    const target = path.join(DIST, "gingivite-marseille", "index.html");

    if (!existsSync(target)) {
      // Lance le build SSG une seule fois si dist n'est pas déjà présent.
      execSync("npm run build", {
        stdio: "inherit",
        cwd: path.resolve(__dirname, "../.."),
      });
    }

    expect(existsSync(target), `Fichier SSG manquant: ${target}`).toBe(true);
    html = readFileSync(target, "utf-8");
    doc = new JSDOM(html).window.document;
  });

  it("contient une balise <title> non vide et non générique", () => {
    const title = doc.querySelector("title")?.textContent?.trim() ?? "";
    expect(title.length).toBeGreaterThan(0);
    // Doit contenir le mot-clé principal de la page (pas un titre homepage générique)
    expect(title.toLowerCase()).toContain("gingivite");
    expect(title.toLowerCase()).toContain("marseille");
  });

  it("a un <title> dans les limites SEO (≤ 70 caractères, non tronqué)", () => {
    const title = doc.querySelector("title")?.textContent?.trim() ?? "";
    expect(title.length).toBeGreaterThanOrEqual(20);
    expect(title.length).toBeLessThanOrEqual(70);
    // Ne doit pas se terminer par "..." (signe de troncature)
    expect(title.endsWith("...")).toBe(false);
    expect(title.endsWith("…")).toBe(false);
  });

  it("contient une <meta name=\"description\"> non vide", () => {
    const desc = doc
      .querySelector('meta[name="description"]')
      ?.getAttribute("content")
      ?.trim() ?? "";
    expect(desc.length).toBeGreaterThan(0);
  });

  it("a une meta description dans les limites SEO (50–170 caractères, non tronquée)", () => {
    const desc = doc
      .querySelector('meta[name="description"]')
      ?.getAttribute("content")
      ?.trim() ?? "";
    expect(desc.length).toBeGreaterThanOrEqual(50);
    expect(desc.length).toBeLessThanOrEqual(170);
    expect(desc.endsWith("...")).toBe(false);
    expect(desc.endsWith("…")).toBe(false);
  });

  it("contient une <link rel=\"canonical\"> pointant vers /gingivite-marseille", () => {
    const canonical = doc
      .querySelector('link[rel="canonical"]')
      ?.getAttribute("href")
      ?.trim() ?? "";
    expect(canonical).toMatch(/\/gingivite-marseille\/?$/);
  });
});
