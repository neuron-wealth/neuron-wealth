import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { clearNotifications, fetchNotifications } from "../services/notificationService";

const POLL_MS = 45 * 1000;

/** Admin pages whose badge clears once the page is opened. */
export const KIND_PATHS = {
  enquiries: "/enquiries",
  callbacks: "/callbacks",
  assessments: "/assessments",
  subscribers: "/subscribers",
  careers: "/careers",
  comments: "/blogs/comments",
};
const KIND_BY_PATH = Object.fromEntries(Object.entries(KIND_PATHS).map(([kind, path]) => [path, kind]));

/** Badge text: exact up to 9, then "9+". */
export const badgeText = (count) => (count > 9 ? "9+" : String(count));

const empty = { items: [], unread: 0, byKind: {} };
const NotificationsContext = createContext({ ...empty, ready: false, refresh: () => {}, clear: () => {} });

export function NotificationsProvider({ children }) {
  const { pathname } = useLocation();
  const [state, setState] = useState(empty);
  const [ready, setReady] = useState(false);
  const busy = useRef(false);

  const refresh = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    try {
      setState(await fetchNotifications());
      setReady(true);
    } catch {
      // Keep the last known state; the next poll tries again.
    } finally {
      busy.current = false;
    }
  }, []);

  // Seen notifications are removed rather than kept as read.
  const clear = useCallback(async (target) => {
    try {
      const next = await clearNotifications(target);
      setState({ items: next.items, unread: next.unread, byKind: next.byKind });
    } catch {
      // Not critical: the badge stays until the next successful attempt.
    }
  }, []);

  useEffect(() => {
    refresh();
    const timer = window.setInterval(refresh, POLL_MS);
    const onFocus = () => refresh();
    window.addEventListener("focus", onFocus);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", onFocus);
    };
  }, [refresh]);

  // Opening a submissions page (or Blog Comments) removes its notifications.
  const kindHere = KIND_BY_PATH[pathname];
  const unreadHere = kindHere ? state.byKind[kindHere] || 0 : 0;
  useEffect(() => {
    if (kindHere && unreadHere > 0) clear({ kind: kindHere });
  }, [kindHere, unreadHere, clear]);

  const value = useMemo(() => ({ ...state, ready, refresh, clear }), [state, ready, refresh, clear]);
  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export const useNotifications = () => useContext(NotificationsContext);
