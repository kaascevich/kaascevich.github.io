import { SITE } from "@/config";

/** A list of AI training crawlers. */
const aiCrawlers = [
  "AI2Bot",            "Ai2Bot-Dolma",        "Amazonbot",
  "Applebot-Extended", "Bytespider",          "CCBot",
  "ChatGPT-User",      "Claude-Web",          "ClaudeBot",
  "Diffbot",           "FacebookBot",         "FriendlyCrawler",
  "GPTBot",            "Google-Extended",     "GoogleOther",
  "GoogleOther-Image", "GoogleOther-Video",   "ICC-Crawler",
  "ImagesiftBot",      "Meta-ExternalAgent",  "Meta-ExternalFetcher",
  "OAI-SearchBot",     "PerplexityBot",       "PetalBot",
  "Scrapy",            "Timpibot",            "VelenPublicWebCrawler",
  "Webzio-Extended",   "YouBot",              "anthropic-ai",
  "cohere-ai",         "facebookexternalhit", "iaskspider/2.0",
  "img2dataset",       "omgili",              "omgilibot",
];

/** The contents of the `robots.txt` file. */
const robots = `
${aiCrawlers.map(bot => `User-agent: ${bot}`).join("\n")}
Disallow: /

User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", SITE.url).href}
`.trim();

export function GET() {
  return new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
}
