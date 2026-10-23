import { AboutData } from "./about-types";

export const ABOUT_UPDATE_EVENT = "portfolio-about-updated";
export const ABOUT_SYNC_CHANNEL = "portfolio-sync";
export const ABOUT_STORAGE_KEY = "portfolio-about-updated";

/**
 * Broadcasts an about data update across the current window, all open browser tabs,
 * and any listeners (like the homepage and live preview).
 */
export function broadcastAboutUpdate(data: AboutData): void {
  if (typeof window === "undefined") return;

  // 1. Same-window CustomEvent (e.g. for components within the same tab)
  try {
    window.dispatchEvent(
      new CustomEvent(ABOUT_UPDATE_EVENT, { detail: data })
    );
  } catch (err) {
    console.warn("Failed to dispatch custom event:", err);
  }

  // 2. Modern BroadcastChannel API across tabs/windows
  try {
    if (typeof window.BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel(ABOUT_SYNC_CHANNEL);
      channel.postMessage({ type: "ABOUT_UPDATED", data });
      channel.close();
    }
  } catch (err) {
    // BroadcastChannel unsupported or blocked
  }

  // 3. Cross-tab localStorage storage event fallback
  try {
    localStorage.setItem(
      ABOUT_STORAGE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch (err) {
    // localStorage disabled/restricted
  }
}
