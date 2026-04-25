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
    const candidates = [
      path.join(DIST, "gingivite-marseille.html"),
      path.join(DIST, "gingivite-marseille", "index.html"),
    ];

    if (!candidates.some(existsSync)) {
      // Lance le build SSG une seule fois si dist n'est pas déjà présent.
      execSync("npm run build", {
        stdio: "inherit",
        cwd: path.resolve(__dirname, "../.."),
      });
    }

    const target = candidates.find(existsSync);
    expect(target, `Aucun HTML SSG trouvé pour /gingivite-marseille (testé: ${candidates.join(", ")})`).toBeTruthy();
    html = readFileSync(target!, "utf-8");
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

/**
 * Vérifie que le LocalBusinessSchema injecté sur la home est bien
 * un @graph unique regroupant Dentist + Person + WebSite, et qu'aucune
 * de ces entités ne fuit dans un second <script type="application/ld+json">.
 *
 * Bloque toute régression introduisant un doublon (ex: second Dentist #cabinet)
 * ou cassant la structure @graph attendue.
 */
describe("SSG JSON-LD — homepage @graph (Dentist + Person + WebSite)", () => {
  let doc: Document;
  let jsonLdBlocks: any[] = [];

  beforeAll(() => {
    const candidates = [
      path.join(DIST, "index.html"),
      path.join(DIST, "index", "index.html"),
    ];

    if (!candidates.some(existsSync)) {
      execSync("npm run build", {
        stdio: "inherit",
        cwd: path.resolve(__dirname, "../.."),
      });
    }

    const target = candidates.find(existsSync);
    expect(target, `Aucun HTML SSG trouvé pour / (testé: ${candidates.join(", ")})`).toBeTruthy();
    const html = readFileSync(target!, "utf-8");
    doc = new JSDOM(html).window.document;

    const scripts = Array.from(
      doc.head.querySelectorAll('script[type="application/ld+json"]')
    );
    jsonLdBlocks = scripts.map((s, i) => {
      const raw = s.textContent ?? "";
      try {
        return JSON.parse(raw);
      } catch (e) {
        throw new Error(`Bloc JSON-LD #${i} invalide (JSON.parse a échoué): ${(e as Error).message}`);
      }
    });
  });

  const collectTypes = (block: any): string[] => {
    const out: string[] = [];
    const visit = (node: any) => {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) { node.forEach(visit); return; }
      if (typeof node["@type"] === "string") out.push(node["@type"]);
      else if (Array.isArray(node["@type"])) out.push(...node["@type"].filter((t: any) => typeof t === "string"));
      if (Array.isArray(node["@graph"])) node["@graph"].forEach(visit);
    };
    visit(block);
    return out;
  };

  it("contient au moins un bloc JSON-LD dans le <head>", () => {
    expect(jsonLdBlocks.length).toBeGreaterThan(0);
  });

  it("expose une seule entité Dentist sur toute la page (pas de doublon)", () => {
    const dentistCount = jsonLdBlocks.reduce(
      (acc, b) => acc + collectTypes(b).filter((t) => t === "Dentist").length,
      0
    );
    expect(dentistCount).toBe(1);
  });

  it("expose une seule entité Person et une seule entité WebSite", () => {
    const personCount = jsonLdBlocks.reduce(
      (acc, b) => acc + collectTypes(b).filter((t) => t === "Person").length,
      0
    );
    const websiteCount = jsonLdBlocks.reduce(
      (acc, b) => acc + collectTypes(b).filter((t) => t === "WebSite").length,
      0
    );
    expect(personCount).toBe(1);
    expect(websiteCount).toBe(1);
  });

  it("regroupe Dentist + Person + WebSite dans un @graph unique", () => {
    const localBusinessBlocks = jsonLdBlocks.filter((b) => {
      const types = collectTypes(b);
      return types.includes("Dentist") || types.includes("Person") || types.includes("WebSite");
    });
    expect(
      localBusinessBlocks.length,
      "Dentist/Person/WebSite doivent vivre dans le même <script>, pas dans plusieurs"
    ).toBe(1);

    const block = localBusinessBlocks[0];
    expect(block["@context"]).toBe("https://schema.org");
    expect(Array.isArray(block["@graph"]), "Le bloc doit contenir un @graph (tableau)").toBe(true);

    const graph: any[] = block["@graph"];
    const types = graph.map((e) => e["@type"]).sort();
    expect(types).toEqual(["Dentist", "Person", "WebSite"]);
  });

  it("respecte les conventions d'@id (#dentist, #person, #website)", () => {
    const block = jsonLdBlocks.find((b) => collectTypes(b).includes("Dentist"));
    const graph: any[] = block["@graph"];
    const byType: Record<string, any> = {};
    for (const e of graph) byType[e["@type"]] = e;

    expect(byType.Dentist["@id"]).toMatch(/#dentist$/);
    expect(byType.Person["@id"]).toMatch(/#person$/);
    expect(byType.WebSite["@id"]).toMatch(/#website$/);
  });

  it("connecte Person et WebSite au Dentist via @id (cohérence du graphe)", () => {
    const block = jsonLdBlocks.find((b) => collectTypes(b).includes("Dentist"));
    const graph: any[] = block["@graph"];
    const byType: Record<string, any> = {};
    for (const e of graph) byType[e["@type"]] = e;

    const dentistId = byType.Dentist["@id"];
    expect(byType.Person.worksFor?.["@id"]).toBe(dentistId);
    expect(byType.WebSite.publisher?.["@id"]).toBe(dentistId);
  });
});
