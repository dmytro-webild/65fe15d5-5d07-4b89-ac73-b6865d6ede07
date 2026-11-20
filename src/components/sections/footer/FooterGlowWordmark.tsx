import { Fragment } from "react";
import FitText from "@/components/library/osmo/utilities/FitText";

type FooterGlowWordmarkProps = {
  brand?: string;
  note?: string;
  columns?: { title: string; links: { text: string; href: string }[] }[];
  copyright?: string;
  wordmark?: string[];
  className?: string;
};

export default function FooterGlowWordmark({
  brand = "Facet",
  note = "Hand-cast glass objects, made in small runs in our Lisbon studio.",
  columns = [
    { title: "Shop", links: [{ text: "Glass", href: "#" }, { text: "Symbols", href: "#" }, { text: "Editions", href: "#" }] },
    { title: "Studio", links: [{ text: "About", href: "#" }, { text: "Journal", href: "#" }, { text: "Contact", href: "#" }] },
    { title: "Follow", links: [{ text: "Instagram", href: "#" }, { text: "Pinterest", href: "#" }] },
  ],
  copyright = "© 2026 Facet Studio",
  wordmark = ["Facet", "27"],
  className,
}: FooterGlowWordmarkProps) {
  return (
    <footer aria-label="Footer" className={`relative isolate overflow-clip text-foreground ${className ?? ""}`}>
      <div className="mx-auto w-[var(--container)]">
        <div className="h-px bg-border" />
        <div className="grid grid-cols-2 gap-x-[var(--gap)] gap-y-10 pt-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-12">
          <div className="col-span-2 grid content-start gap-4 lg:col-span-5">
            <a href="#home" className="flex w-fit items-center gap-2.5 text-[length:var(--text-small)] font-medium uppercase tracking-[0.14em]">
              <svg viewBox="0 0 12 12" aria-hidden="true" className="size-[13px]">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <p>{brand}</p>
            </a>
            {note && <p className="max-w-[18.75rem] text-balance text-[length:var(--text-small)] leading-[1.35] text-muted-foreground">{note}</p>}
          </div>
          {columns.map((col) => (
            <div key={col.title} className="grid content-start gap-4 lg:col-span-2">
              <h3 className="font-sans text-[length:var(--text-label)] normal-case tracking-normal text-muted-foreground">{col.title}</h3>
              <ul className="grid gap-1.5">
                {col.links.map((link) => (
                  <li key={link.text}>
                    <a href={link.href} className="text-[length:var(--text-small)] transition-opacity duration-300 hover:opacity-60">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-[clamp(2.5rem,5vw,4.5rem)] h-px bg-border" />
        {copyright && <p className="relative z-10 py-5 text-[length:var(--text-label)] text-muted-foreground">{copyright}</p>}
      </div>
      {wordmark.length > 0 && (
        <FitText
          lines={[
            wordmark.map((part, index) => (
              <Fragment key={index}>
                {index > 0 && " "}
                <p className="inline">{part}</p>
              </Fragment>
            )),
          ]}
          className="mx-auto w-[var(--container)] pb-[calc(var(--gutter)*0.4)]"
          lineClassName="facet-wordmark -mt-[0.14em] pt-[0.14em] font-black leading-[0.78] tracking-[-0.01em]"
        />
      )}
    </footer>
  );
}
