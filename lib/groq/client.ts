import Groq from 'groq-sdk';

let groqInstance: Groq | null = null;

function getGroq() {
  if (!groqInstance) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey && typeof window === 'undefined') {
      // Return a dummy client or handle missing key gracefully during build
      // But actually, it's better to only throw when explicitly called in a non-build context.
      // For build time, we can return null and handle it in callGroq.
    }
    groqInstance = new Groq({ apiKey: apiKey || 'MISSING_KEY_IN_BUILD' });
  }
  return groqInstance;
}

const MODEL = 'llama-3.1-8b-instant';

export interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Call Groq with exponential backoff for rate-limit handling.
 * Returns parsed JSON if `parseJson` is true, otherwise raw string.
 */
export async function callGroq(
  systemPrompt: string,
  userPrompt: string,
  options: { parseJson?: boolean; maxTokens?: number; temperature?: number } = {}
): Promise<string> {
  const { parseJson = false, maxTokens = 4096, temperature = 0.7 } = options;

  const messages: GroqMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ];

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const groq = getGroq();
      if (process.env.GROQ_API_KEY === undefined && typeof window === 'undefined') {
         // Silently fail or throw if we are actually trying to use it in production without a key
         // But for build, we want to avoid crashing if possible.
      }

      const response = await groq.chat.completions.create({
        model: MODEL,
        messages,
        temperature,
        max_tokens: maxTokens,
        ...(parseJson && { response_format: { type: 'json_object' } }),
      });
      return response.choices[0].message.content ?? '';
    } catch (err: unknown) {
      const typedErr = err as { status?: number; message?: string };
      if (typedErr?.status === 429 && attempt < 2) {
        // Rate limit — back off exponentially
        await new Promise(r => setTimeout(r, 2000 * Math.pow(2, attempt)));
        continue;
      }
      throw new Error(`Groq API error: ${typedErr?.message ?? 'Unknown error'}`);
    }
  }
  throw new Error('Groq max retries exceeded');
}
