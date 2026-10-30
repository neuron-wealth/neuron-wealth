import { Building2, ExternalLink, MessageSquare } from "lucide-react";

const DEFAULT_MAPS_URL =
  "https://www.google.com/maps/search/Mauryansh+Elanza+Nr.Parekh's+Hospital,,+Shyamal+Crossroad+Shyamal+Ahmedabad,+Gujarat+380015/@23.012939,72.529865,1603m/data=!3m1!1e3?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D";

const DEFAULT_MAP_EMBED = "https://maps.google.com/maps?q=23.012939,72.529865&z=15&output=embed";

const DEFAULT_WHATSAPP_URL =
  "https://wa.me/919099942563?text=Hello%20Neuron%20Wealth%20Advisors%2C%20I%20would%20like%20to%20inquire%20about%20your%20fiduciary%20wealth%20advisory%20services.";

export default function ContactMap({ id, content, design, root }) {
  const title = content?.title || "Advisory Headquarters Location — Satellite, Ahmedabad";
  const whatsappUrl = content?.whatsappUrl || DEFAULT_WHATSAPP_URL;
  const mapsUrl = content?.mapsUrl || DEFAULT_MAPS_URL;
  const mapEmbedUrl = content?.mapEmbedUrl || DEFAULT_MAP_EMBED;

  return (
    <section
      id={id || "contact-map"}
      {...root}
      aria-label="Advisory Headquarters Map"
      className="w-full border-t border-slate-200 dark:border-white/10"
    >
      <div className="site-frame flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 bg-white dark:bg-[#0c1828]">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <Building2 className="h-4 w-4 text-[#21649A] dark:text-sky-400" />
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-3">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp Inquiry</span>
            </a>
          ) : null}
          {whatsappUrl && mapsUrl ? <span className="text-slate-300 dark:text-white/20">•</span> : null}
          {mapsUrl ? (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B6198] dark:text-sky-300 hover:underline"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : null}
        </div>
      </div>
      <div className="w-full leading-none">
        <iframe
          title="Map showing Mauryansh Elanza, Satellite, Ahmedabad"
          src={mapEmbedUrl}
          className="block h-[220px] w-full border-0 sm:h-[260px] lg:h-[280px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
