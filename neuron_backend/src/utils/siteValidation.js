const { randomUUID } = require("crypto");
const { HttpError } = require("./http");
const { NAV_ICONS, SOCIAL_PLATFORMS } = require("../config/siteDefaults");

const LIMITS = {
  headerItems: 10,
  headerChildren: 12,
  footerColumns: 5,
  footerLinks: 15,
  addressLines: 6,
  socialLinks: 12,
};

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const bool = (value, fallback = true) => (typeof value === "boolean" ? value : fallback);

function text(value, label, { max = 120, required = false } = {}) {
  const result = typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
  if (required && !result) throw new HttpError(400, `${label} is required.`);
  if (result.length > max) throw new HttpError(400, `${label} must be ${max} characters or fewer.`);
  return result;
}

function href(value, label) {
  const result = text(value, label, { max: 300, required: true });
  const allowed =
    (result.startsWith("/") && !result.startsWith("//")) ||
    result.startsWith("#") ||
    /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(result) ||
    /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(result) ||
    /^tel:\+?[0-9\s-]{6,20}$/i.test(result);
  if (!allowed) {
    throw new HttpError(400, `${label} must start with "/", "#", "https://", "mailto:" or "tel:".`);
  }
  return result;
}

function color(value, label) {
  const raw = typeof value === "string" ? value.trim() : "";
  const short = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(raw);
  const result = short ? `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}` : raw;
  if (!/^#[0-9a-f]{6}$/i.test(result)) throw new HttpError(400, `${label} must be a hex colour such as #21649A.`);
  return result.toUpperCase();
}

function list(value, label, max) {
  if (!Array.isArray(value)) throw new HttpError(400, `${label} must be a list.`);
  if (value.length > max) throw new HttpError(400, `${label} can have at most ${max} entries.`);
  return value;
}

function idFor(value, used) {
  let id = typeof value === "string" && /^[a-z0-9-]{1,40}$/i.test(value) ? value : "";
  if (!id || used.has(id)) id = randomUUID().slice(0, 8);
  used.add(id);
  return id;
}

function colors(input, defaults, label) {
  const source = isObject(input) ? input : {};
  return Object.fromEntries(
    Object.keys(defaults).map((key) => [key, color(source[key] ?? defaults[key], `${label} ${key} colour`)])
  );
}

function header(input, defaults) {
  if (!isObject(input)) throw new HttpError(400, "Header settings are missing.");
  const used = new Set();
  const items = list(input.items, "Menu items", LIMITS.headerItems).map((item, index) => {
    const where = `Menu item ${index + 1}`;
    if (!isObject(item)) throw new HttpError(400, `${where} is invalid.`);
    const label = text(item.label, `${where} label`, { max: 40, required: true });
    const children = list(item.children || [], `${label} submenu`, LIMITS.headerChildren).map((child, childIndex) => {
      const childWhere = `${label} submenu link ${childIndex + 1}`;
      if (!isObject(child)) throw new HttpError(400, `${childWhere} is invalid.`);
      const icon = typeof child.icon === "string" && NAV_ICONS.includes(child.icon) ? child.icon : "";
      return {
        id: idFor(child.id, used),
        label: text(child.label, `${childWhere} label`, { max: 60, required: true }),
        href: href(child.href, `${childWhere} link`),
        description: text(child.description, `${childWhere} description`, { max: 120 }),
        icon,
        visible: bool(child.visible),
      };
    });
    return {
      id: idFor(item.id, used),
      label,
      href: href(item.href, `${label} link`),
      visible: bool(item.visible),
      menuTitle: text(item.menuTitle, `${label} menu title`, { max: 60 }),
      menuSubtitle: text(item.menuSubtitle, `${label} menu subtitle`, { max: 60 }),
      layout: item.layout === "grid" ? "grid" : "list",
      children,
    };
  });
  return { colors: colors(input.colors, defaults.colors, "Header"), items };
}

function footer(input, defaults) {
  if (!isObject(input)) throw new HttpError(400, "Footer settings are missing.");
  const used = new Set();
  const subscribe = isObject(input.subscribe) ? input.subscribe : {};
  const address = isObject(input.address) ? input.address : {};
  const contact = isObject(input.contact) ? input.contact : {};
  const bottom = isObject(input.bottom) ? input.bottom : {};

  const email = text(contact.email, "Footer email", { max: 120 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, "Footer email is not a valid address.");
  const emailIcon = typeof contact.emailIcon === "string" && NAV_ICONS.includes(contact.emailIcon) ? contact.emailIcon : "Mail";
  const phone = text(contact.phone, "Footer phone", { max: 30 });
  if (phone && !/^\+?[0-9\s()-]{6,30}$/.test(phone)) throw new HttpError(400, "Footer phone may only contain digits, spaces, +, - and brackets.");
  const phoneIcon = typeof contact.phoneIcon === "string" && NAV_ICONS.includes(contact.phoneIcon) ? contact.phoneIcon : "Phone";
  const addressIcon = typeof address.icon === "string" && NAV_ICONS.includes(address.icon) ? address.icon : "MapPin";

  const columns = list(input.columns, "Footer columns", LIMITS.footerColumns).map((column, index) => {
    const where = `Footer column ${index + 1}`;
    if (!isObject(column)) throw new HttpError(400, `${where} is invalid.`);
    const heading = text(column.heading, `${where} heading`, { max: 40, required: true });
    return {
      id: idFor(column.id, used),
      heading,
      links: list(column.links || [], `${heading} links`, LIMITS.footerLinks).map((entry, linkIndex) => {
        const linkWhere = `${heading} link ${linkIndex + 1}`;
        if (!isObject(entry)) throw new HttpError(400, `${linkWhere} is invalid.`);
        const icon = typeof entry.icon === "string" && NAV_ICONS.includes(entry.icon) ? entry.icon : "";
        return {
          id: idFor(entry.id, used),
          label: text(entry.label, `${linkWhere} label`, { max: 60, required: true }),
          href: href(entry.href, `${linkWhere} link`),
          icon,
          visible: bool(entry.visible),
        };
      }),
    };
  });

  return {
    colors: colors(input.colors, defaults.colors, "Footer"),
    description: text(input.description, "Footer description", { max: 400 }),
    subscribe: {
      enabled: bool(subscribe.enabled),
      heading: text(subscribe.heading, "Subscribe heading", { max: 80, required: bool(subscribe.enabled) }),
      text: text(subscribe.text, "Subscribe text", { max: 160 }),
      buttonLabel: text(subscribe.buttonLabel, "Subscribe button label", { max: 24, required: bool(subscribe.enabled) }),
    },
    address: {
      heading: text(address.heading, "Address heading", { max: 40 }),
      icon: addressIcon,
      lines: list(address.lines || [], "Address lines", LIMITS.addressLines)
        .map((line, index) => text(line, `Address line ${index + 1}`, { max: 100 }))
        .filter(Boolean),
    },
    contact: { phone, phoneIcon, email, emailIcon },
    columns,
    bottom: {
      copyright: text(bottom.copyright, "Copyright name", { max: 80, required: true }),
      socialLabel: text(bottom.socialLabel, "Social label", { max: 40 }),
      showSocial: bool(bottom.showSocial),
    },
  };
}

function social(input) {
  const used = new Set();
  return list(input, "Social links", LIMITS.socialLinks).map((entry, index) => {
    const where = `Social link ${index + 1}`;
    if (!isObject(entry)) throw new HttpError(400, `${where} is invalid.`);
    if (!SOCIAL_PLATFORMS.includes(entry.platform)) throw new HttpError(400, `${where} has an unsupported platform.`);
    const label = text(entry.label, `${where} name`, { max: 40, required: true });
    let url = text(entry.url, `${label} URL`, { max: 300, required: true });
    if (entry.platform === "email") {
      const address = url.replace(/^mailto:/i, "");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) throw new HttpError(400, `${label} must be a valid email address.`);
      url = `mailto:${address}`;
    } else if (!/^https:\/\/[^\s/$.?#].[^\s]*$/i.test(url)) {
      throw new HttpError(400, `${label} URL must start with https://.`);
    }
    return { id: idFor(entry.id, used), platform: entry.platform, label, url, visible: bool(entry.visible) };
  });
}

function accessibility(input, defaults) {
  if (!isObject(input)) throw new HttpError(400, "Accessibility settings are missing.");
  const offset = Number(input.offset);
  if (!Number.isFinite(offset) || offset < 8 || offset > 240) {
    throw new HttpError(400, "Button distance from the bottom must be between 8 and 240 pixels.");
  }
  const features = isObject(input.features) ? input.features : {};
  return {
    enabled: bool(input.enabled),
    position: input.position === "left" ? "left" : "right",
    offset: Math.round(offset),
    buttonLabel: text(input.buttonLabel, "Button label", { max: 24, required: true }),
    buttonColor: color(input.buttonColor ?? defaults.buttonColor, "Button colour"),
    features: Object.fromEntries(Object.keys(defaults.features).map((key) => [key, bool(features[key])])),
  };
}

function branding(input, current) {
  const source = isObject(input) ? input : {};
  const alt = text(source.logoLight?.alt ?? current.logoLight.alt, "Logo alt text", { max: 120, required: true });
  return {
    logoLight: { url: current.logoLight.url, alt },
    logoDark: { url: current.logoDark.url, alt },
  };
}

module.exports = { header, footer, social, accessibility, branding, LIMITS };
