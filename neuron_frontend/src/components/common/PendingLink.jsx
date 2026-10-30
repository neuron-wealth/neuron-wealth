import { Link } from "react-router-dom";

/**
 * Home routes through React Router.
 * Later-phase routes keep their href in config and do not navigate yet.
 */
export default function PendingLink({ item = {}, className, children, onClick, role, ...rest }) {
  const content = children ?? item.label ?? item.title ?? "";
  const href = item.href || "";
  const isExternal = /^https?:\/\//.test(href);

  const isImplementedRoute =
    item.available === true ||
    (item.available !== false &&
      Boolean(
        href &&
          (href === "/" ||
            href.startsWith("/about") ||
            href.startsWith("/vision-and-mission") ||
            href.startsWith("/vision-mission") ||
            href.startsWith("/why-associate") ||
            href.startsWith("/team") ||
            href.startsWith("/advisory") ||
            href.startsWith("/family-office") ||
            href.startsWith("/investment-advisory") ||
            href.startsWith("/nri") ||
            href.startsWith("/services")),
      ));

  if (isImplementedRoute && isExternal) {
    return (
      <a
        {...rest}
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        role={role}
      >
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  if (isImplementedRoute && !href.startsWith("mailto:") && !href.startsWith("tel:") && !href.startsWith("#")) {
    return (
      <Link
        {...rest}
        to={href}
        className={className}
        aria-current={item.current ? "page" : undefined}
        onClick={onClick}
        role={role}
      >
        {content}
      </Link>
    );
  }

  if (isImplementedRoute || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a {...rest} href={href || "#"} className={className} onClick={onClick} role={role}>
        {content}
      </a>
    );
  }

  return (
    <a
      {...rest}
      href={href || "#"}
      className={className}
      aria-disabled="true"
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
      role={role}
    >
      {content}
      <span className="sr-only"> (not available yet)</span>
    </a>
  );
}
