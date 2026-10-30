export default function SkipLink() {
  return (
    <a
      id="skip-link"
      href="#main-content"
      data-skip-link
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-brand-dark focus:px-4 focus:py-3 focus:text-base focus:font-semibold focus:text-white focus:focus-ring-inverse"
    >
      Skip to main content
    </a>
  );
}
