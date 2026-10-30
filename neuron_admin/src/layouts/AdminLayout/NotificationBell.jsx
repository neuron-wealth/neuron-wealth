import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, BellOff, MessageSquareText, Trash2, X } from "lucide-react";
import { RECORD_PAGES } from "../../config/records";
import { badgeText, useNotifications } from "../../context/NotificationsContext";
import useDismiss from "../../hooks/useDismiss";
import { timeAgo } from "../../utils/format";

const KIND_STYLE = {
  ...Object.fromEntries(RECORD_PAGES.map((page) => [page.key, { icon: page.icon, color: page.color, label: page.label }])),
  comments: { icon: MessageSquareText, color: "#7C5CBF", label: "Blog Comments" },
};

function NotificationRow({ item, onOpen, onRemove }) {
  const style = KIND_STYLE[item.kind] || { icon: Bell, color: "#21649A" };
  const Icon = style.icon;
  return (
    <li className="group relative">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="focus-ring flex w-full items-start gap-3 py-3 pl-4 pr-12 text-left transition-colors hover:bg-subtle"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: style.color }}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold">{item.title}</span>
          {item.message ? <span className="muted mt-0.5 block truncate text-xs">{item.message}</span> : null}
          <span className="muted mt-1 block text-[0.6875rem] font-semibold">{timeAgo(item.createdAt)}</span>
        </span>
      </button>
      <button
        type="button"
        onClick={() => onRemove(item)}
        aria-label={`Remove notification: ${item.title}`}
        title="Remove"
        className="icon-btn focus-ring absolute right-2 top-3 h-8 w-8 text-soft opacity-60 transition-opacity hover:text-red-600 group-hover:opacity-100 focus-visible:opacity-100"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </li>
  );
}

export default function NotificationBell() {
  const navigate = useNavigate();
  const { items, unread, ready, clear } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, ref, close);

  // Opening a notification removes it.
  const openItem = (item) => {
    clear({ ids: [item.id] });
    setOpen(false);
    if (item.link) navigate(item.link);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={unread ? `Notifications, ${unread} new` : "Notifications"}
        title="Notifications"
        className="icon-btn focus-ring relative"
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
        {unread ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-600 px-1 text-[0.625rem] font-bold leading-none text-white ring-2 ring-[var(--surface)]">
            {badgeText(unread)}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Notifications"
          className="panel absolute right-0 top-full z-50 mt-2 w-[min(23rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl shadow-xl"
        >
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <div>
              <p className="font-bold">Notifications</p>
              <p className="muted text-xs">{unread ? `${unread} new` : "You're all caught up"}</p>
            </div>
            {items.length ? (
              <button
                type="button"
                onClick={() => clear({ all: true })}
                className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-bold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Clear all
              </button>
            ) : null}
          </div>

          {items.length ? (
            <ul className="max-h-[26rem] divide-y divide-line overflow-y-auto overscroll-contain">
              {items.map((item) => (
                <NotificationRow key={item.id} item={item} onOpen={openItem} onRemove={(entry) => clear({ ids: [entry.id] })} />
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-subtle text-soft">
                <BellOff className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm font-bold">{ready ? "No new notifications" : "Loading…"}</p>
              <p className="muted text-xs">New form submissions and blog comments will appear here.</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
