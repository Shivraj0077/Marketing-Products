export interface SerperResult {
  organic: Array<{
    title: string;
    link: string;
    snippet: string;
    position: number;
  }>;
  searchParameters?: {
    q: string;
    num: number;
  };
}

/**
 * Perform a Google search via Serper.dev
 */
export async function serperSearch(
  query: string,
  num = 10
): Promise<SerperResult> {
  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: {
      'X-API-KEY': process.env.SERPER_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ q: query, num }),
  });

  if (!res.ok) {
    throw new Error(`Serper API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Find competitors for a given product/niche
 */
export async function findCompetitors(
  productName: string,
  category: string
): Promise<SerperResult> {
  return serperSearch(`top ${category} brands alternatives to ${productName} competitors India`);
}

/**
 * Find market trends
 */
export async function findMarketTrends(category: string): Promise<SerperResult> {
  return serperSearch(`${category} market trends 2025 India D2C brand insights`);
}

/**
 * Find customer reviews for a brand
 */
export async function findReviews(brandName: string): Promise<SerperResult> {
  return serperSearch(`"${brandName}" customer reviews complaints 2025`);
}
