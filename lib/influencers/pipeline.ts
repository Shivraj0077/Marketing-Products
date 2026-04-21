import { serperSearch } from '@/lib/serper/client';
import { discoverInfluencers, type ApifyInfluencerData } from '@/lib/apify/client';

/**
 * Smart Influencer Discovery Pipeline
 * Step 1: Search Serper for Instagram profiles based on keywords
 * Step 2: Extract usernames via Regex
 * Step 3: Enrich data via Apify
 */
export async function runInfluencerDiscoveryPipeline(keywords: string[], limit = 5): Promise<ApifyInfluencerData[]> {
  const searchQuery = `site:instagram.com instagram influencers ${keywords.join(' ')} "followers"`;
  
  // 1. Search Google via Serper
  const searchResults = await serperSearch(searchQuery, 10);
  
  if (!searchResults.organic || searchResults.organic.length === 0) {
    return [];
  }

  // 2. Extract Usernames using Regex from URLs
  // Matches instagram.com/username/ or instagram.com/username
  const usernameRegex = /(?:instagram\.com\/|@)([a-zA-Z0-9_\.]{1,30})/;
  const foundUsernames = new Set<string>();

  searchResults.organic.forEach((result: { link: string }) => {
    const match = result.link.match(usernameRegex);
    if (match && match[1] && !['p', 'reels', 'stories', 'explore'].includes(match[1])) {
      foundUsernames.add(match[1]);
    }
  });

  const uniqueUsernames = Array.from(foundUsernames).slice(0, limit);

  if (uniqueUsernames.length === 0) {
    return [];
  }

  // 3. Enrich with high-fidelity Apify data
  try {
    const richData = await discoverInfluencers(uniqueUsernames, limit);
    return richData;
  } catch (error) {
    console.error('Apify enrichment failed, returning basic handles:', error);
    return uniqueUsernames.map(u => ({ 
      username: u,
      followersCount: 0,
      biography: '',
      businessEmail: undefined
    }));
  }
}
