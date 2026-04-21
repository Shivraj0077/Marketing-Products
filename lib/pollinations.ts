/**
 * Generate a Pollinations.ai image URL from a text prompt.
 * No API key required — completely free.
 */
export function generateImageUrl(
  prompt: string,
  options: {
    width?: number;
    height?: number;
    seed?: number;
    model?: string;
  } = {}
): string {
  const { width = 1024, height = 1024, seed, model = 'flux' } = options;
  const encoded = encodeURIComponent(prompt);
  const params = new URLSearchParams({
    width: String(width),
    height: String(height),
    nologo: 'true',
    model,
    ...(seed !== undefined && { seed: String(seed) }),
  });
  return `https://image.pollinations.ai/prompt/${encoded}?${params.toString()}`;
}

/**
 * Generate a marketing image URL for a product
 */
export function generateProductImageUrl(
  productName: string,
  style: 'ad' | 'lifestyle' | 'story' | 'banner' = 'ad'
): string {
  const stylePrompts: Record<string, string> = {
    ad: `Professional marketing advertisement for ${productName}, vibrant colors, product showcase, modern design, high quality`,
    lifestyle: `Lifestyle photography featuring ${productName}, natural lighting, people using product, aspirational brand feel`,
    story: `Instagram story vertical format for ${productName}, bold typography overlay, engaging social media graphic`,
    banner: `Wide banner advertisement for ${productName}, clean background, brand colors, call to action space`,
  };

  return generateImageUrl(stylePrompts[style], { width: 1024, height: 1024 });
}
