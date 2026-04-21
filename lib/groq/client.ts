import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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
