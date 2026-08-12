// ─── Notification & Persistence Helpers ──────────────────────────────────────
//
// These values are read from .env and baked into the client bundle at build time.
// This is acceptable for a private, unlisted link sent to one person.
// DO NOT share the link publicly.
//
// Fill in your .env file (copy from .env.example):
//   VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
//   VITE_TELEGRAM_CHAT_ID=your_chat_id_here
//   VITE_SHEET_URL=your_apps_script_web_app_url_here

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined;
const CHAT_ID   = import.meta.env.VITE_TELEGRAM_CHAT_ID   as string | undefined;
const SHEET_URL = import.meta.env.VITE_SHEET_URL           as string | undefined;

// ─── Telegram ─────────────────────────────────────────────────────────────────

export async function notifyTelegram(text: string): Promise<void> {
  if (!BOT_TOKEN || !CHAT_ID || BOT_TOKEN === 'your_bot_token_here') {
    console.info('[notify] Telegram not configured — skipping.');
    return;
  }
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
    });
  } catch (err) {
    // Fail silently — never block or break the UI
    console.warn('[notify] Telegram send failed:', err);
  }
}

// ─── Google Sheets via Apps Script ───────────────────────────────────────────

export interface LogPayload {
  answer: string;
  noCount: number;
  foodChoice?: string;
  userAgent: string;
}

export async function logToSheet(payload: LogPayload): Promise<void> {
  if (!SHEET_URL || SHEET_URL === 'your_apps_script_web_app_url_here') {
    console.info('[log] Sheet URL not configured — skipping.');
    return;
  }
  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      // Apps Script requires text/plain to avoid a CORS preflight on doPost
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...payload,
      }),
    });
  } catch (err) {
    console.warn('[log] Sheet log failed:', err);
  }
}

// ─── Combined fire-and-forget helper ──────────────────────────────────────────

export function fireEvent(params: {
  answer: string;
  noCount: number;
  foodChoice?: string;
}): void {
  const ts = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const noStr = params.noCount === 0
    ? 'said Yes right away 🎉'
    : `after ${params.noCount} No${params.noCount > 1 ? 's' : ''}`;

  let tgText = '';
  if (params.answer === 'yes') {
    tgText = `🐾 <b>Nishtha said YES!</b> (${noStr})\n📅 ${ts}`;
  } else if (params.answer === 'no-final') {
    tgText = `😔 Nishtha said no to the trek (${noStr})\n📅 ${ts}`;
  } else if (params.foodChoice) {
    tgText = `🍱 Nishtha picked food: <b>${params.foodChoice}</b>\n📅 ${ts}`;
  }

  notifyTelegram(tgText);
  logToSheet({
    answer: params.answer,
    noCount: params.noCount,
    foodChoice: params.foodChoice,
    userAgent: navigator.userAgent,
  });
}
