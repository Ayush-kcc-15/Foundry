import { useEffect, useState } from "react";

/**
 * Shows the global loading screen once per browser session for the first app load.
 * Returns { loading, done } — call done() to force-hide (rare).
 */
export function useInitialLoading({ minDuration = 2600, sessionKey = "foundry.boot.seen" } = {}) {
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(sessionKey) !== "1";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(sessionKey, "1");
      } catch {
        /* ignore */
      }
      setLoading(false);
    }, minDuration);
    return () => clearTimeout(t);
  }, [loading, minDuration, sessionKey]);

  return { loading, done: () => setLoading(false) };
}
