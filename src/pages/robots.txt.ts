import type { APIRoute } from "astro";
import { SITE } from "@config";

const darkVisitors = await fetch("https://api.darkvisitors.com/robots-txts", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${import.meta.env.DARK_VISITORS_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    agent_types: [
      "AI Assistant",
      "AI Data Scraper",
      "AI Search Crawler",
      "Undocumented AI Agent",
    ],
    disallow: "/",
  }),
}).then(response => response.text());

const robots = `
${darkVisitors}


# This is pretty much just for things like Siri and Spotlight results.
# As far as I'm aware, there's nothing really sketchy here.
User-agent: Applebot
Allow: /

User-agent: *
Disallow: 

Sitemap: ${new URL("sitemap-index.xml", SITE.website).href}
`.trim();

export const GET: APIRoute = () => new Response(robots, {
  headers: { "Content-Type": "text/plain" },
});
