const userAgents = [
  'AI2Bot',
  'Ai2Bot-Dolma',
  'Amazonbot',
  'anthropic-ai',
  'Applebot',
  'Applebot-Extended',
  'Brightbot 1.0',
  'Bytespider',
  'CCBot',
  'ChatGPT-User',
  'Claude-Web',
  'ClaudeBot',
  'cohere-ai',
  'cohere-training-data-crawler',
  'Crawlspace',
  'Diffbot',
  'DuckAssistBot',
  'FacebookBot',
  'FriendlyCrawler',
  'Google-Extended',
  'GoogleOther',
  'GoogleOther-Image',
  'GoogleOther-Video',
  'GPTBot',
  'iaskspider/2.0',
  'ICC-Crawler',
  'ImagesiftBot',
  'img2dataset',
  'ISSCyberRiskCrawler',
  'Kangaroo Bot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'OAI-SearchBot',
  'omgili',
  'omgilibot',
  'PanguBot',
  'PerplexityBot',
  'PetalBot',
  'Scrapy',
  'SemrushBot-OCOB',
  'SemrushBot-SWA',
  'Sidetrade indexer bot',
  'Timpibot',
  'VelenPublicWebCrawler',
  'Webzio-Extended',
  'YouBot',
]

const userAgentDirectives = userAgents
  .map((x) => `User-agent: ${x}`)
  .join('\n')

const sitemapURL = new URL('sitemap-index.xml', import.meta.env.SITE).href

const robotsTxt = `\
${userAgentDirectives}
Disallow: /

User-agent: *
Allow: /

Sitemap: ${sitemapURL}
`

export function GET() {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
