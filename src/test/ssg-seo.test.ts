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

/**
 * Vérifie que les champs critiques du Dentist (NAP : Name, Address,
 * Phone + geo + horaires) restent cohérents avec le contenu réel du
 * site (cabinet du Dr Meriot, 23 Bd de la Fédération, Marseille 4ème).
 *
 * Ces données sont consommées par Google Business / Maps / Voice Search :
 * une dérive silencieuse (mauvais code postal, téléphone formaté différemment,
 * horaires incomplets) dégrade le SEO local sans erreur visible.
 */
describe("SSG JSON-LD — homepage Dentist (NAP, geo, horaires)", () => {
  let dentist: any;

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
    const target = candidates.find(existsSync)!;
    const html = readFileSync(target, "utf-8");
    const doc = new JSDOM(html).window.document;

    const scripts = Array.from(
      doc.head.querySelectorAll('script[type="application/ld+json"]')
    ) as HTMLScriptElement[];
    for (const s of scripts) {
      const block = JSON.parse(s.textContent ?? "{}");
      const graph: any[] = Array.isArray(block["@graph"]) ? block["@graph"] : [];
      const found = graph.find((e) => e["@type"] === "Dentist");
      if (found) { dentist = found; break; }
    }
    expect(dentist, "Aucune entité Dentist trouvée dans les JSON-LD de la home").toBeTruthy();
  });

  it("name et alternateName mentionnent Dr Meriot et sa spécialité", () => {
    expect(dentist.name).toMatch(/M[eé]riot/i);
    expect(dentist.name).toMatch(/dentiste/i);
    expect(dentist.alternateName).toMatch(/parodont/i);
    expect(dentist.alternateName).toMatch(/marseille/i);
  });

  it("address est une PostalAddress complète et cohérente avec le cabinet réel", () => {
    const a = dentist.address;
    expect(a, "Le Dentist doit avoir une address").toBeTruthy();
    expect(a["@type"]).toBe("PostalAddress");
    expect(a.streetAddress).toMatch(/F[eé]d[eé]ration/i);
    expect(a.streetAddress).toMatch(/^\s*23\b/);
    expect(a.addressLocality).toBe("Marseille");
    expect(a.postalCode).toBe("13004");
    expect(a.addressCountry).toBe("FR");
    expect(a.addressRegion).toMatch(/Provence/i);
  });

  it("telephone est au format E.164 français (+33…) et non vide", () => {
    expect(typeof dentist.telephone).toBe("string");
    // Format international attendu pour Google : +33 suivi de 9 chiffres, sans espaces.
    expect(dentist.telephone).toMatch(/^\+33\d{9}$/);
  });

  it("email est une adresse @dr-meriot-chirurgien-dentiste.fr valide", () => {
    expect(typeof dentist.email).toBe("string");
    expect(dentist.email).toMatch(/^[^\s@]+@dr-meriot-chirurgien-dentiste\.fr$/);
  });

  it("geo correspond à la position du cabinet (Marseille 4ème, ~43.30 / 5.40)", () => {
    const g = dentist.geo;
    expect(g, "Le Dentist doit avoir un geo").toBeTruthy();
    expect(g["@type"]).toBe("GeoCoordinates");
    expect(typeof g.latitude).toBe("number");
    expect(typeof g.longitude).toBe("number");
    // Bounding box autour de Marseille — détecte une coordonnée perdue (0,0 ou ailleurs)
    expect(g.latitude).toBeGreaterThan(43.2);
    expect(g.latitude).toBeLessThan(43.4);
    expect(g.longitude).toBeGreaterThan(5.3);
    expect(g.longitude).toBeLessThan(5.5);
  });

  it("openingHoursSpecification couvre lundi → vendredi avec des plages valides", () => {
    const oh = dentist.openingHoursSpecification;
    expect(Array.isArray(oh), "openingHoursSpecification doit être un tableau").toBe(true);
    expect(oh.length).toBeGreaterThanOrEqual(3);

    const expectedDays = ["Monday", "Tuesday", "Thursday", "Friday"];
    const coveredDays = new Set<string>();
    const timeRe = /^([01]\d|2[0-3]):[0-5]\d$/;

    for (const slot of oh) {
      expect(slot["@type"]).toBe("OpeningHoursSpecification");
      const days = Array.isArray(slot.dayOfWeek) ? slot.dayOfWeek : [slot.dayOfWeek];
      days.forEach((d: string) => coveredDays.add(d));

      expect(slot.opens, `opens manquant pour ${days.join(",")}`).toMatch(timeRe);
      expect(slot.closes, `closes manquant pour ${days.join(",")}`).toMatch(timeRe);
      expect(slot.closes > slot.opens, `closes (${slot.closes}) doit suivre opens (${slot.opens}) pour ${days.join(",")}`).toBe(true);
    }

    for (const d of expectedDays) {
      expect(coveredDays.has(d), `Jour ouvré manquant : ${d}`).toBe(true);
    }
    // Le cabinet est fermé le mercredi (cohérent avec le site)
    expect(coveredDays.has("Wednesday")).toBe(false);
  });

  it("sameAs contient le lien Doctolib du cabinet", () => {
    const sameAs: string[] = Array.isArray(dentist.sameAs) ? dentist.sameAs : [dentist.sameAs];
    expect(sameAs.some((u) => /doctolib\.fr\/dentiste\/marseille\/stephanie-meriot/i.test(u))).toBe(true);
  });

  it("medicalSpecialty inclut Periodontics et Dental Implants", () => {
    const specs: string[] = Array.isArray(dentist.medicalSpecialty) ? dentist.medicalSpecialty : [dentist.medicalSpecialty];
    expect(specs).toContain("Periodontics");
    expect(specs).toContain("Dental Implants");
  });

  it("areaServed couvre Marseille et au moins quelques communes périphériques", () => {
    const area: string[] = Array.isArray(dentist.areaServed) ? dentist.areaServed : [dentist.areaServed];
    expect(area).toContain("Marseille");
    expect(area).toContain("Marseille 4ème");
    expect(area).toContain("Allauch");
    expect(area).toContain("Aubagne");
    expect(area.length).toBeGreaterThanOrEqual(20);
  });

  it("isAcceptingNewPatients est explicitement true", () => {
    expect(dentist.isAcceptingNewPatients).toBe(true);
  });
});
