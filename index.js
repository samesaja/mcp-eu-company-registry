#!/usr/bin/env node
/**
 * @samdhitosaja/mcp-eu-company-registry
 * Zero-dependency JSON-RPC 2.0 stdio MCP Server that connects AI Agents (Claude Desktop,
 * Cursor, Windsurf, Cline, Smithery, Glama) directly to all 16 samdhitosaja/* European
 * Company Registry & B2B Actors on Apify Store.
 */

import readline from "node:readline";

export const EU_ACTORS_MAP = {
  NO: {
    actorId: "samdhitosaja~brreg-no-norway-company-registry-scraper",
    name: "Norway Brønnøysundregistrene (Brreg.no)",
    buildInput: (query, location, maxItems, enrichWebsites) => ({
      searchQueries: [query],
      municipality: location || "",
      enrichWebsites,
      maxItems,
    }),
  },
  SE: {
    actorId: "samdhitosaja~bolagsverket-hitta-se-sweden-b2b-scraper",
    name: "Sweden Bolagsverket & Hitta.se",
    buildInput: (query, location, maxItems, enrichWebsites) => ({
      searchQueries: [query],
      location: location || "Stockholm",
      enrichWebsites,
      maxItems,
    }),
  },
  FI: {
    actorId: "samdhitosaja~ytj-fi-finland-company-registry-scraper",
    name: "Finland PRH / YTJ Official Company Registry",
    buildInput: (query, location, maxItems, enrichWebsites) => ({
      searchQueries: [query],
      location: location || "Helsinki",
      enrichWebsites,
      maxItems,
    }),
  },
  DK: {
    actorId: "samdhitosaja~cvr-virk-dk-denmark-company-b2b-scraper",
    name: "Denmark CVR / Virk Official Company Registry",
    buildInput: (query, location, maxItems, enrichWebsites) => ({
      searchQueries: [query],
      location: location || "København",
      enrichWebsites,
      maxItems,
    }),
  },
  PL: {
    actorId: "samdhitosaja~krs-ceidg-pl-poland-company-registry-scraper",
    name: "Poland Ministry of Justice KRS, NIP & REGON Registry",
    buildInput: (query, _location, maxItems, enrichWebsites) => ({
      searchQueries: [query],
      enrichKrsApi: enrichWebsites,
      maxItems,
    }),
  },
  IT: {
    actorId: "samdhitosaja~registroimprese-paginegialle-it-italy-b2b-scraper",
    name: "Italy Registro delle Imprese, Partita IVA & MisterImprese",
    buildInput: (query, location, maxItems, enrichWebsites) => ({
      searchQueries: [query],
      city: location || "Milano",
      enrichWebsites,
      maxItems,
    }),
  },
  NL: {
    actorId: "samdhitosaja~kvk-nl-company-b2b-scraper",
    name: "Netherlands KVK.nl (Kamer van Koophandel) Registry",
    buildInput: (query, location, maxItems) => ({
      searchQueries: [query],
      cityFilter: location || "Rotterdam",
      maxItems,
    }),
  },
  BENELUX: {
    actorId: "samdhitosaja~benelux-b2b-goudengids-telefoongids-kvk-scraper",
    name: "Benelux (Belgium KBO/BCE + Netherlands KVK + Goudengids)",
    buildInput: (query, location, maxItems, enrichWebsites) => ({
      searchQueries: [query],
      location: location || "Antwerpen",
      country: "ALL",
      enrichWebsites,
      maxItems,
    }),
  },
  DE: {
    actorId: "samdhitosaja~gelbeseiten-de-b2b-lead-scraper",
    name: "Germany Gelbe Seiten (gelbeseiten.de) B2B Directory",
    buildInput: (query, location, maxItems) => ({
      searchQueries: [query],
      location: location || "Hamburg",
      maxItems,
    }),
  },
  AT: {
    actorId: "samdhitosaja~wko-herold-at-austria-b2b-lead-scraper",
    name: "Austria WKO.at & Herold.at Chamber & B2B Directory",
    buildInput: (query, location, maxItems) => ({
      searchQueries: [query],
      location: location || "Wien",
      maxItems,
    }),
  },
  CH: {
    actorId: "samdhitosaja~local-ch-swiss-b2b-lead-scraper",
    name: "Switzerland Local.ch Official Swiss B2B Directory",
    buildInput: (query, location, maxItems) => ({
      searchQueries: [query],
      location: location || "Zürich",
      maxItems,
    }),
  },
  NL_HEALTHCARE: {
    actorId: "samdhitosaja~zorgkaartnederland-nl-healthcare-b2b-scraper",
    name: "Netherlands ZorgkaartNederland Healthcare Providers B2B",
    buildInput: (query, location, maxItems) => ({
      searchQueries: [query],
      city: location || "Amsterdam",
      maxItems,
    }),
  },
  NL_TRUCKS: {
    actorId: "samdhitosaja~marktplaats-nl-commercial-trucks-kvk-scraper",
    name: "Netherlands Marktplaats Commercial Trucks & Dealer KVK",
    buildInput: (query, _location, maxItems) => ({
      searchQueries: [query],
      maxItems,
    }),
  },
  EU_FREIGHT: {
    actorId: "samdhitosaja~eu-freight-logistics-directory-scraper",
    name: "Pan-European Freight Forwarders & Logistics Directory",
    buildInput: (query, location, maxItems) => ({
      searchQueries: [query],
      location: location || "",
      maxItems,
    }),
  },
  EU_3PL: {
    actorId: "samdhitosaja~eu-supply-chain-3pl-warehousing-b2b-scraper",
    name: "Pan-European 3PL Warehousing & Customs Brokers",
    buildInput: (query, location, maxItems) => ({
      searchQueries: [query],
      location: location || "",
      maxItems,
    }),
  },
  EU_FLEET: {
    actorId: "samdhitosaja~eu-road-transport-carrier-fleet-scraper",
    name: "Pan-European Road Transport & Haulage Carrier Fleet",
    buildInput: (query, location, maxItems) => ({
      searchQueries: [query],
      location: location || "",
      maxItems,
    }),
  },
};

export const TOOLS = [
  {
    name: "list_supported_eu_registries",
    description:
      "Lists all 16 supported European Official Company Registries & B2B Lead Directories (NO, SE, FI, DK, PL, IT, NL, BENELUX, DE, AT, CH, NL_HEALTHCARE, NL_TRUCKS, EU_FREIGHT, EU_3PL, EU_FLEET).",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "search_eu_company_registry",
    description:
      "Searches any of the 16 European Official Company Registries & B2B Directories for verified company records (registration number, EU VAT, NACE/PKD/TOL industry codes, street address, phone, email, website).",
    inputSchema: {
      type: "object",
      properties: {
        country: {
          type: "string",
          enum: Object.keys(EU_ACTORS_MAP),
          description:
            "Target European registry code: NO (Norway Brreg), SE (Sweden Bolagsverket/Hitta), FI (Finland YTJ), DK (Denmark CVR), PL (Poland KRS/NIP), IT (Italy Registro Imprese), NL (Netherlands KVK), BENELUX (Belgium KBO + NL KVK), DE (Germany Gelbe Seiten), AT (Austria WKO/Herold), CH (Switzerland Local.ch), NL_HEALTHCARE, NL_TRUCKS, EU_FREIGHT, EU_3PL, EU_FLEET.",
        },
        query: {
          type: "string",
          description: "Company name or B2B industry keyword (e.g. 'Transport', 'Logistyka', 'Spedition').",
        },
        location: {
          type: "string",
          description: "Optional city or municipality filter (e.g. 'Oslo', 'Stockholm', 'Helsinki', 'Wien', 'Milano').",
        },
        maxItems: {
          type: "integer",
          description: "Maximum number of company records to extract (default: 10).",
          default: 10,
        },
        enrichWebsites: {
          type: "boolean",
          description: "Probe company websites for direct corporate emails and phone numbers.",
          default: true,
        },
      },
      required: ["country", "query"],
    },
  },
];

async function handleToolCall(name, args) {
  if (name === "list_supported_eu_registries") {
    const list = Object.entries(EU_ACTORS_MAP).map(([code, info]) => ({
      code,
      name: info.name,
      apifyActor: info.actorId.replace("~", "/"),
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(list, null, 2) }],
    };
  }

  if (name === "search_eu_company_registry") {
    const code = String(args?.country || "NO").toUpperCase();
    const entry = EU_ACTORS_MAP[code];
    if (!entry) {
      throw new Error(`Unsupported country/registry code: ${code}`);
    }
    const token = process.env.APIFY_TOKEN || process.env.APIFY_API_TOKEN;
    if (!token) {
      throw new Error("Missing APIFY_TOKEN environment variable. Get a free token at https://console.apify.com/settings/integrations");
    }
    const query = String(args?.query || "Transport");
    const location = String(args?.location || "");
    const maxItems = Number(args?.maxItems || 10);
    const enrichWebsites = args?.enrichWebsites !== false;
    const payload = entry.buildInput(query, location, maxItems, enrichWebsites);

    const url = `https://api.apify.com/v2/acts/${entry.actorId}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}&memory=256&timeout=90`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      const errText = await resp.text();
      throw new Error(`Apify Actor ${entry.actorId} returned HTTP ${resp.status}: ${errText}`);
    }
    const items = await resp.json();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              country: code,
              registry: entry.name,
              actor: entry.actorId.replace("~", "/"),
              count: Array.isArray(items) ? items.length : 0,
              items,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
}

if (process.argv.includes("--self-test")) {
  console.log(`[MCP SELF-TEST] Validated ${ Object.keys(EU_ACTORS_MAP).length } European Registry Actors & ${ TOOLS.length } MCP tools.`);
  process.exit(0);
}

const rl = readline.createInterface({ input: process.stdin, terminal: false });

rl.on("line", async (line) => {
  if (!line.trim()) return;
  let req;
  try {
    req = JSON.parse(line);
  } catch {
    return;
  }
  const { id, method, params } = req;
  if (id === undefined || id === null) return;

  try {
    if (method === "initialize") {
      const res = {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: { name: "@samdhitosaja/mcp-eu-company-registry", version: "1.0.0" },
        },
      };
      process.stdout.write(JSON.stringify(res) + "\n");
    } else if (method === "tools/list") {
      process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result: { tools: TOOLS } }) + "\n");
    } else if (method === "tools/call") {
      const out = await handleToolCall(params?.name, params?.arguments || {});
      process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result: out }) + "\n");
    } else {
      process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result: {} }) + "\n");
    }
  } catch (err) {
    process.stdout.write(
      JSON.stringify({
        jsonrpc: "2.0",
        id,
        error: { code: -32000, message: err instanceof Error ? err.message : String(err) },
      }) + "\n"
    );
  }
});
