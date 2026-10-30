import { socialIcons } from "./SocialIcons";
import { useSiteSettings, visibleOnly } from "../../hooks/useSiteSettings";
import { cx } from "../../utils/cx";

export function useSocialLinks() {
  return visibleOnly(useSiteSettings("social")).filter((item) => socialIcons[item.platform] && item.url);
}

export default function SocialLinks({ className, linkClassName, iconClassName }) {
  const links = useSocialLinks();
  if (!links.length) return null;

  return (
    <ul className={cx("flex flex-wrap items-center gap-1", className)}>
      {links.map((item) => {
        const Icon = socialIcons[item.platform];
        const isEmail = item.url.startsWith("mailto:");
        return (
          <li key={item.id}>
            <a
              href={item.url}
              className={cx(
                "group inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 transition-all focus-ring-inverse",
                linkClassName,
              )}
              target={isEmail ? undefined : "_blank"}
              rel={isEmail ? undefined : "noopener noreferrer"}
              aria-label={isEmail ? item.label : `${item.label} (opens in a new tab)`}
            >
              <Icon className={iconClassName} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
