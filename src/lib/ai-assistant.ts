import type {
  AssistantConfig,
  AssistantReply,
  ChatMessage,
} from "@/types/ai-assistant";

// Mock data imports — replace with real API calls later
import assistantData from "@/data/mock/ai-assistant.json";

// ─── API Service Layer ─────────────────────────────────────────────
// Replace mock implementations below with real fetch() calls when ready.
// The function signatures stay the same — no page changes needed.
// ────────────────────────────────────────────────────────────────────

/**
 * GET /api/assistant/config
 * Returns the greeting, suggested prompts, and capabilities shown on the page.
 */
export async function fetchAssistantConfig(): Promise<AssistantConfig> {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/assistant/config`);
  return assistantData.config as AssistantConfig;
}

/**
 * POST /api/assistant/chat
 * Sends the user's message (with prior history) and returns the assistant reply.
 */
export async function sendAssistantMessage(
  message: string,
  // Unused by the mock; the real API needs it for conversational context.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  history: ChatMessage[]
): Promise<AssistantReply> {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/assistant/chat`, { method: "POST", body: JSON.stringify({ message, history }) });
  await new Promise((resolve) => setTimeout(resolve, 800));

  const text = message.toLowerCase();

  if (assistantData.urgentKeywords.some((keyword) => text.includes(keyword))) {
    return assistantData.urgentReply as AssistantReply;
  }

  const match = assistantData.replies.find((reply) =>
    reply.keywords.some((keyword) => text.includes(keyword))
  );

  return (match ?? assistantData.fallbackReply) as AssistantReply;
}
