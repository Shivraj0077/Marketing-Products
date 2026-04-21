
const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
const INSTAGRAM_ACTOR_ID = 'JNb6iSRuMKLF3OA3v';

export interface ApifyInfluencerData {
  username: string;
  fullName?: string;
  biography?: string;
  followersCount?: number;
  followsCount?: number;
  postsCount?: number;
  profilePicUrl?: string;
  isVerified?: boolean;
  externalUrl?: string;
  businessEmail?: string;
  [key: string]: unknown;
}

/**
 * Discover Instagram influencers by niche or usernames using Apify REST API
 * Bypasses the SDK to avoid Turbopack bundling issues
 */
export async function discoverInfluencers(
  usernames: string[],
  limit = 10
): Promise<ApifyInfluencerData[]> {
  if (!APIFY_API_TOKEN) {
    throw new Error('APIFY_API_TOKEN is missing');
  }

  // Start the run
  // Documentation: https://docs.apify.com/api/v2#/reference/actors/run-collection/run-actor
  const response = await fetch(
    `https://api.apify.com/v2/acts/${INSTAGRAM_ACTOR_ID}/runs?token=${APIFY_API_TOKEN}&wait=60`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usernames: usernames, 
        resultsLimit: limit,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Apify API error: ${response.status} - ${errorText}`);
  }

  const runData = await response.json();
  const datasetId = runData.data.defaultDatasetId;

  // Fetch results from dataset
  const datasetResponse = await fetch(
    `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_API_TOKEN}`
  );

  if (!datasetResponse.ok) {
    throw new Error('Failed to fetch dataset results from Apify');
  }

  const items = await datasetResponse.json();
  return items as ApifyInfluencerData[];
}

/**
 * Legacy wrapper for compatibility
 */
export async function discoverByNiche(
  keywords: string[],
  limit = 20
): Promise<ApifyInfluencerData[]> {
  return discoverInfluencers(keywords, limit);
}
