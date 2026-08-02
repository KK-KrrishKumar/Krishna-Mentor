import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Send, ArrowRight } from "lucide-react";
import { ChatMessage } from "../types";
import { trackEvent } from "../lib/analytics";
import { CHATBOT_KNOWLEDGE_BASE, ALL_SPECIFIC_ITEMS } from "../data/chatbotKnowledge";

const STOPWORDS = new Set([
  "and", "the", "for", "with", "in", "of", "a", "an", "to", "on", "do", "you", "your",
  "is", "are", "have", "has", "does", "offer", "provide", "about", "course", "courses"
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s&]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

/**
 * Tier 1: exact-item lookup. Checks whether the question is asking about
 * one specific degree/certificate name (e.g. "BBA Data Science", "MBA in
 * Finance") rather than a broad category — this is what lets the bot
 * confirm individual programs from the 100+ item course list, not just
 * top-level categories.
 */
function findSpecificItemAnswer(question: string): { text: string; link?: { path: string; label: string } } | null {
  const qTokens = new Set(tokenize(question));
  if (qTokens.size === 0) return null;

  let best: { item: (typeof ALL_SPECIFIC_ITEMS)[number]; score: number; matched: number } | null = null;

  for (const item of ALL_SPECIFIC_ITEMS) {
    const itemTokens = tokenize(item.name);
    if (itemTokens.length === 0) continue;

    const matched = itemTokens.filter((t) => qTokens.has(t)).length;
    const fraction = matched / itemTokens.length;
    const requiredMatches = itemTokens.length <= 2 ? itemTokens.length : Math.ceil(itemTokens.length * 0.6);

    if (matched >= requiredMatches && matched >= 2) {
      if (!best || fraction > best.score || (fraction === best.score && matched > best.matched)) {
        best = { item, score: fraction, matched };
      }
    }
  }

  if (!best) return null;

  const isDegree = best.item.kind === "degree";
  return {
    text: isDegree
      ? `Yes — we guide students into "${best.item.name}", part of our ${best.item.categoryTitle} track. Visit the Courses page for full details, or book a free counseling session to discuss eligibility and process.`
      : `Yes — "${best.item.name}" is one of our short-term certificate courses under ${best.item.categoryTitle}. See the Certificates page for details, or book a free counseling session to get started.`,
    link: isDegree
      ? { path: "/courses", label: `See ${best.item.name}` }
      : { path: "/certificates", label: `See ${best.item.name}` }
  };
}

/**
 * Tier 2: broad FAQ matching across the full knowledge base (general FAQ,
 * services, course categories, certificate groups, blog articles) using
 * keyword overlap scoring. Uses word-boundary matching (not raw substring)
 * so short keywords like "on" or "fee" don't false-positive inside unrelated
 * words (e.g. "confession", "coffee").
 */
function findFaqAnswer(question: string): { text: string; link?: { path: string; label: string } } | null {
  const qWords = new Set(tokenize(question));
  const q = question.toLowerCase();
  let best: { score: number; answer: string; link?: { path: string; label: string } } | null = null;

  for (const item of CHATBOT_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      const kwLower = kw.toLowerCase();
      // Multi-word keywords (phrases) still use substring match; single
      // words use the tokenized set so partial-word matches don't count.
      const isPhrase = kwLower.includes(" ");
      if (isPhrase ? q.includes(kwLower) : qWords.has(kwLower)) score += 1;
    }
    // Small boost if the question closely echoes the FAQ item's own title —
    // helps quick-prompt buttons (which reuse these titles verbatim) win cleanly.
    if (q.includes(item.question.toLowerCase())) score += 2;

    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: item.answer, link: item.link };
    }
  }

  return best ? { text: best.answer, link: best.link } : null;
}

const FALLBACK_ANSWER =
  "That's a great question for our team to answer directly. Please use the contact form below or WhatsApp us, and a Krishna Mentor advisor will get back to you shortly.";

// Finds the best available answer for a given question, checking specific
// course/certificate names first, then falling back to general FAQ topics.
function findAnswer(question: string): { text: string; isFallback: boolean; link?: { path: string; label: string } } {
  const match = findSpecificItemAnswer(question) || findFaqAnswer(question);
  return match ? { text: match.text, isFallback: false, link: match.link } : { text: FALLBACK_ANSWER, isFallback: true };
}

// Local storage key for persisting the conversation across page reloads/navigation.
const STORAGE_KEY = "km_chatbot_history";
const WHATSAPP_NUMBER = "919899078020";

type ChatbotMessage = ChatMessage & {
  isFallback?: boolean;
  link?: { path: string; label: string };
  sourceQuestion?: string;
};

function loadStoredMessages(): ChatbotMessage[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as (Omit<ChatbotMessage, "timestamp"> & { timestamp: string })[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }));
  } catch {
    return null;
  }
}


const WELCOME_MESSAGE: ChatbotMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Namaste! I'm the Krishna Mentor assistant. Ask me about our programs, locations, or the admissions process — I can answer common questions right away.",
  timestamp: new Date()
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatbotMessage[]>(() => loadStoredMessages() || [WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickPrompts = CHATBOT_KNOWLEDGE_BASE.slice(0, 4).map((f) => f.question);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) setTimeout(scrollToBottom, 100);
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Storage can fail (private browsing, quota) — the chat still works
      // in-memory for the session, it just won't persist across reloads.
    }
  }, [messages]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatbotMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Small simulated-thinking delay makes the reply feel considered rather
    // than instant/robotic, and gives the typing indicator a moment to show.
    const { text, isFallback, link } = findAnswer(textToSend);

    // Track every question (not just unanswered ones) — this is the only
    // way to see what visitors are actually asking the bot, which doubles
    // as a live list of content/blog gaps once reviewed in GA4.
    trackEvent("chatbot_question_asked", { question: textToSend.slice(0, 100), matched: !isFallback });

    setTimeout(() => {
      const assistantMsg: ChatbotMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: "assistant",
        content: text,
        timestamp: new Date(),
        isFallback,
        link,
        sourceQuestion: textToSend
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 500 + Math.random() * 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Greeting bubble — invites the person to chat, only shown when the widget is closed */}
      {!isOpen && (
        <div className="relative animate-fade-in-up">
          <div className="bg-white/85 backdrop-blur-md border border-antique-gold/30 rounded-2xl rounded-br-sm px-3 py-2 shadow-[0_8px_24px_rgba(122,27,36,0.18)] max-w-[160px]">
            <p className="font-serif text-sm font-semibold text-heritage-burgundy leading-snug">
              I'm here for all your queries!
            </p>
          </div>
        </div>
      )}

      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="km-chatbot-window"
        className="w-20 h-20 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        title="Krishna Mentor Assistant"
      >
        {isOpen ? (
          <span className="w-12 h-12 rounded-full bg-gradient-to-br from-heritage-burgundy via-heritage-maroon to-heritage-crimson shadow-2xl border border-antique-gold/40 flex items-center justify-center">
            <X className="w-5 h-5 text-sunlight-gold" />
          </span>
        ) : (
          <>
            <picture>
              <source
                srcSet="/chatbot-krishna-icon-160w.webp 160w, /chatbot-krishna-icon.webp 320w"
                sizes="80px"
                type="image/webp"
              />
              <img
                src="/chatbot-krishna-icon.png"
                alt="Krishna Mentor Assistant"
                width={320}
                height={320}
                loading="eager"
                className="w-20 h-20 object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.35)] group-hover:scale-110 transition-transform duration-500"
              />
            </picture>
            <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-antique-gold animate-ping" />
            <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-sunlight-gold border border-cream" />
          </>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          id="km-chatbot-window"
          role="dialog"
          aria-label="Krishna Mentor Assistant chat"
          className="absolute bottom-14 right-0 w-[88vw] sm:w-[340px] h-[470px] rounded-2xl shadow-2xl glass-card border border-antique-gold/30 flex flex-col overflow-hidden animate-fade-in-up"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-heritage-burgundy to-heritage-maroon border-b border-antique-gold/20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-antique-gold to-sunlight-gold flex items-center justify-center shadow-inner">
                <picture>
                  <source
                    srcSet="/chatbot-krishna-icon-160w.webp 160w, /chatbot-krishna-icon.webp 320w"
                    sizes="28px"
                    type="image/webp"
                  />
                  <img
                    src="/chatbot-krishna-icon.png"
                    alt="Krishna Mentor Assistant"
                    width={320}
                    height={320}
                    loading="eager"
                    className="w-7 h-7 object-contain"
                  />
                </picture>
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-cream leading-none">Krishna Mentor Assistant</h4>
                <span className="text-[10px] uppercase font-sans tracking-widest text-peach-soft/90 block mt-1">
                  Quick Answers
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMessages([WELCOME_MESSAGE])}
                aria-label="Reset conversation"
                title="Reset conversation"
                className="text-cream/60 hover:text-cream text-[10px] font-sans uppercase tracking-wider transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="text-cream/70 hover:text-cream transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            className="flex-grow p-4 overflow-y-auto space-y-4 bg-parchment"
            role="log"
            aria-live="polite"
            aria-label="Conversation"
          >
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={`flex flex-col ${isUser ? "items-end" : "items-start"} animate-fade-in-up`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md ${
                      isUser
                        ? "bg-gradient-to-r from-heritage-maroon to-heritage-crimson text-cream rounded-br-none border border-heritage-maroon/10"
                        : "bg-cream text-ink border border-antique-gold/20 rounded-bl-none shadow-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                  {/* Lead-capture CTA: shown only under fallback replies, so an
                      unanswered question always gives the visitor a one-tap
                      way to reach a human instead of a dead end. The
                      WhatsApp message is pre-filled with their original
                      question so they don't have to retype it. */}
                  {!isUser && m.isFallback && (
                    <div className="flex gap-2 mt-2">
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          m.sourceQuestion ? `Hi, I asked your chatbot: "${m.sourceQuestion}"` : "Hi, I have a question"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("chatbot_fallback_contact", { channel: "whatsapp" })}
                        className="text-[10px] font-sans font-bold bg-green-600 hover:bg-green-700 text-white rounded-full px-3 py-1.5 transition-colors"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  )}

                  {/* Answer CTA: when a question was successfully answered
                      and it points to a relevant page, offer a direct next
                      step instead of leaving the visitor to find it
                      themselves — every answer should lead somewhere. */}
                  {!isUser && !m.isFallback && m.link && (
                    <Link
                      to={m.link.path}
                      onClick={() => {
                        setIsOpen(false);
                        trackEvent("chatbot_answer_link_click", { path: m.link!.path });
                      }}
                      className="flex items-center gap-1 mt-2 text-[10px] font-sans font-bold text-heritage-maroon hover:text-heritage-burgundy bg-cream border border-antique-gold/30 hover:border-antique-gold rounded-full px-3 py-1.5 transition-colors"
                    >
                      {m.link.label}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              );
            })}
            {isTyping && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="max-w-[60%] rounded-2xl rounded-bl-none px-4 py-3 bg-cream border border-antique-gold/20 shadow-sm flex gap-1 items-center" aria-label="Assistant is typing">
                  <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon/50 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon/50 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon/50 animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-4 py-2 bg-parchment flex flex-wrap gap-2 border-t border-heritage-maroon/10">
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSend(p)}
                disabled={isTyping}
                className="text-[10px] font-sans font-medium bg-cream hover:bg-peach/40 border border-heritage-maroon/15 hover:border-antique-gold text-ink/75 hover:text-heritage-burgundy rounded-full px-2.5 py-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 bg-gradient-to-r from-heritage-burgundy to-heritage-maroon border-t border-antique-gold/20 flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our programs..."
              aria-label="Type your question"
              disabled={isTyping}
              className="flex-grow bg-cream/15 focus:bg-cream/25 border border-cream/25 focus:border-antique-gold text-cream text-sm placeholder-cream/50 rounded-full px-4 py-2 outline-none transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-antique-gold to-sunlight-gold flex items-center justify-center text-cosmic-midnight shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_10px_#F9DF8D] transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
