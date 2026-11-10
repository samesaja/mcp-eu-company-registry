# `@samdhitosaja/mcp-eu-company-registry` — European Company Registry & B2B Enrichment MCP Server

Official Model Context Protocol (MCP) Server connecting AI Agents (Claude Desktop, Cursor, Windsurf, Cline, Smithery.ai, Glama.ai) to **16 European Official Company Registries & B2B Lead Directories** on Apify Store (`https://apify.com/samdhitosaja`).

## Supported European Registries (`country` parameter)
- **`NO`**: Norway Brønnøysundregistrene (`Brreg.no` — 9-digit Org.nr, MVA VAT, NACE, employees, email, phone)
- **`SE`**: Sweden Bolagsverket & Hitta.se (`10-digit Organisationsnummer`, EU VAT `SE...01`, `+46` phone, email)
- **`FI`**: Finland Patent & Registration Office (`PRH / YTJ` — `Y-tunnus`, EU VAT `FI...`, TOL industry code, email)
- **`DK`**: Denmark CVR / Virk (`8-digit CVR`, EU VAT `DK...`, `+45` phone, `.dk` email)
- **`PL`**: Poland Ministry of Justice KRS (`api-krs.ms.gov.pl` — `10-digit KRS`, `NIP`, `REGON`, PKD code, official email)
- **`IT`**: Italy Registro delle Imprese & MisterImprese (`11-digit Partita IVA`, PEC/email, `+39` phone)
- **`NL`**: Netherlands Kamer van Koophandel (`KVK.nl` — `8-digit KVK`, `12-digit Vestigingsnummer`)
- **`BENELUX`**: Belgium Crossroads Bank (`KBO/BCE`) + Netherlands `KVK` + `Goudengids`
- **`DE`**: Germany `Gelbe Seiten` (`gelbeseiten.de` B2B Leads)
- **`AT`**: Austria `WKO.at` (Wirtschaftskammer Österreich) & `Herold.at`
- **`CH`**: Switzerland `Local.ch` Official Swiss B2B Directory
- **`NL_HEALTHCARE`**: Netherlands `ZorgkaartNederland` Healthcare Providers
- **`NL_TRUCKS`**: Netherlands `Marktplaats.nl` Commercial Trucks + KVK
- **`EU_FREIGHT` / `EU_3PL` / `EU_FLEET`**: Pan-European Freight Forwarders, 3PL Warehouses & Road Carrier Fleets

## Quick Setup (Claude Desktop / Cursor)
```json
{
  "mcpServers": {
    "eu-company-registry": {
      "command": "npx",
      "args": ["-y", "@samdhitosaja/mcp-eu-company-registry"],
      "env": {
        "APIFY_TOKEN": "apify_api_YOUR_TOKEN"
      }
    }
  }
}
```
