// Rules for when the "Request a callback" popup may appear, stored in the visitor's browser.

const DISMISSED_AT_KEY = 'ethereal_callback_popup_dismissed_at'; // × or "Later": snooze
const COMPLETED_KEY = 'ethereal_callback_popup_completed';       // sent a callback request or contacted us: never again
const SHOWN_THIS_SESSION_KEY = 'ethereal_callback_popup_shown';  // at most once per browser session

const SNOOZE_MS = 3 * 24 * 60 * 60 * 1000;

export function canShowCallbackPopup(): boolean {
  try {
    if (localStorage.getItem(COMPLETED_KEY)) return false;
    const dismissedAt = Number(localStorage.getItem(DISMISSED_AT_KEY) || 0);
    if (dismissedAt && Date.now() - dismissedAt < SNOOZE_MS) return false;
    return !sessionStorage.getItem(SHOWN_THIS_SESSION_KEY);
  } catch {
    // Storage blocked (e.g. strict private mode): never show, rather than show on every page.
    return false;
  }
}

function write(storage: 'local' | 'session', key: string, value: string) {
  try {
    (storage === 'local' ? localStorage : sessionStorage).setItem(key, value);
  } catch {
    // Storage unavailable; nothing to remember.
  }
}

export const markCallbackPopupShown = () => write('session', SHOWN_THIS_SESSION_KEY, '1');
export const snoozeCallbackPopup = () => write('local', DISMISSED_AT_KEY, String(Date.now()));
/** The visitor has already reached out (callback request, WhatsApp or call), so don't ask again. */
export const completeCallbackPopup = () => write('local', COMPLETED_KEY, String(Date.now()));
