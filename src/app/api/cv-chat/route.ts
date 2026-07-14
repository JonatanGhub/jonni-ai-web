import type { NextRequest } from 'next/server';
import { buildSystemPrompt } from '@/lib/cv/chat-context';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

// El contenedor es un proceso Node persistente en el VPS (no serverless
// multi-instancia), así que un Map en memoria basta como rate-limit.
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return Response.json({ error: 'rate_limited' }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const locale = body?.locale === 'en' ? 'en' : 'es';
  const rawMessages = Array.isArray(body?.messages) ? body.messages : [];

  const messages: ChatMessage[] = rawMessages
    .filter(
      (m: unknown): m is ChatMessage =>
        !!m &&
        typeof m === 'object' &&
        ((m as ChatMessage).role === 'user' || (m as ChatMessage).role === 'assistant') &&
        typeof (m as ChatMessage).content === 'string',
    )
    .slice(-8)
    .map((m: ChatMessage) => ({ role: m.role, content: m.content.slice(0, 800) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return Response.json({ error: 'invalid_request' }, { status: 400 });
  }

  const baseUrl = process.env.LITELLM_BASE_URL;
  const apiKey = process.env.LITELLM_API_KEY;
  if (!baseUrl || !apiKey) {
    return Response.json({ error: 'not_configured' }, { status: 503 });
  }

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'neo-small',
        messages: [{ role: 'system', content: buildSystemPrompt(locale) }, ...messages],
        max_tokens: 400,
        temperature: 0.4,
      }),
    });

    if (!res.ok) {
      return Response.json({ error: 'upstream_error' }, { status: 502 });
    }

    const data = await res.json();
    const reply: string = data?.choices?.[0]?.message?.content ?? '';
    return Response.json({ reply });
  } catch {
    return Response.json({ error: 'upstream_error' }, { status: 502 });
  }
}
