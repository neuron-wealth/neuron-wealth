import { Link } from "react-router-dom";
import { cx } from "../../utils/cx";
import { useTheme } from "../../hooks/useTheme";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { siteDefaults } from "../../config/siteDefaults";

export default function Logo({ className, imgClassName, darkImgClassName, priority = false, forceLight = false, forceDark = false }) {
  const { isDark } = useTheme();
  const branding = useSiteSettings("branding");
  const showDark = (isDark || forceDark) && !forceLight;
  const key = showDark ? "logoDark" : "logoLight";
  const logo = branding[key]?.url ? branding[key] : siteDefaults.branding[key];
  const fallback = siteDefaults.branding[key];

  return (
    <Link
      to="/"
      aria-label="Neuron Wealth Advisors LLP, Simplifying Financial Life"
      className={cx("inline-flex shrink-0 items-center rounded-sm focus-ring", className)}
    >
      <img
        key={logo.url}
        src={logo.url}
        alt={logo.alt || fallback.alt}
        width={logo.width || fallback.width}
        height={logo.height || fallback.height}
        decoding={priority ? "sync" : "async"}
        loading={priority ? "eager" : "lazy"}
        onError={(event) => {
          if (event.currentTarget.src.endsWith(fallback.url)) return;
          event.currentTarget.src = fallback.url;
        }}
        className={cx(
          "a11y-preserve h-14 w-auto max-w-full object-contain sm:h-16 lg:h-[4.75rem]",
          imgClassName,
          showDark ? darkImgClassName : undefined,
        )}
      />
    </Link>
  );
}
