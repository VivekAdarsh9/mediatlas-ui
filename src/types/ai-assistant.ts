// --- Chat ---
export type ChatRole = "user" | "assistant";

export interface ChatSource {
  title: string;
  href: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  sources?: ChatSource[];
  isUrgent?: boolean;
}

// --- Config API Response ---
export interface AssistantSuggestion {
  category: string;
  prompt: string;
}

export interface AssistantCapability {
  icon: string;
  title: string;
  description: string;
}

export interface AssistantConfig {
  greeting: string;
  suggestions: AssistantSuggestion[];
  capabilities: AssistantCapability[];
  safetyNotice: string;
}

// --- Chat API Response ---
export interface AssistantReply {
  content: string;
  sources?: ChatSource[];
  isUrgent?: boolean;
}
