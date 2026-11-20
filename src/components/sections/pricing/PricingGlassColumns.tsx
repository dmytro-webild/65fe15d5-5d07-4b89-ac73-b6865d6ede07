import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import IndentTitle from "@/components/kit/IndentTitle";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Plan = {
  title: string;
  price?: string;
  period?: string;
  description?: string;
  features?: string[];
  button?: { text: string; href: string };
};

type PricingGlassColumnsProps = {
  tag?: string;
  title?: string;
  description?: string;
  items?: Plan[];
  ariaLabel?: string;
  className?: string;
};

const PricingGlassColumns = ({
  tag = "Bespoke Services",
  title = "Artisanal floral services and curation",
  description = "Contact our studio directly for custom pricing, stem selection, and bespoke floral inquiries.",
  items = [
    {
      title: "Signature Bouquets",
      price: "Contact us for pricing",
      description: "Hand-crafted arrangements featuring fresh luxury roses and seasonal botanical stems.",
      features: [
        "Hand-selected fresh stems",
        "Custom color palettes",
        "Signature boutique wrapping",
        "Local delivery & studio pickup",
      ],
      button: {
        text: "Request a custom quote",
        href: "#contact",
      },
    },
    {
      title: "Custom Arrangements",
      price: "Contact us for pricing",
      description: "Bespoke floral designs, custom gift boxes, and signature chocolate covered strawberries.",
      features: [
        "Tailored floral styling",
        "Chocolate covered strawberries",
        "Direct florist consultation",
        "Same-day & scheduled delivery",
      ],
      button: {
        text: "Contact us for pricing",
        href: "tel:2155947640",
      },
    },
    {
      title: "Events & Weddings",
      price: "Request a custom quote",
      description: "Full-service floral styling, tablescapes, and venue installations for special occasions.",
      features: [
        "Personalized event consultation",
        "Venue & tablescape styling",
        "Custom floral installations",
        "On-site delivery & setup",
      ],
      button: {
        text: "Request a custom quote",
        href: "#contact",
      },
    },
  ],
  ariaLabel,
  className,
}: PricingGlassColumnsProps) => {
  const kit = useKitMotion();
  const reduce = useReducedMotion();

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative py-[var(--section-space)] text-[#2d1a1e]", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#f0e4dd] bg-gradient-to-b from-[#fffcf8] via-[#faf4f0] to-[#f7eee9] p-6 sm:p-10 lg:p-14 shadow-xl shadow-rose-950/5">
          {/* Subtle ambient light glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-rose-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-amber-100/40 blur-3xl" />

          <div className="relative z-10">
            <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-12 lg:gap-x-[var(--gap)]">
              {tag && (
                <div className="lg:col-span-3 lg:pt-[0.35em]">
                  <span className="inline-block rounded-full border border-[#e8d2cb] bg-[#f5e8e4]/80 px-3.5 py-1 text-[length:var(--text-label)] font-medium tracking-wide text-[#9c4a43]">
                    {tag}
                  </span>
                </div>
              )}
              <IndentTitle text={title} className="text-[length:var(--text-h1)] text-[#2d1a1e] font-serif font-normal lg:col-span-5 lg:col-start-4" />
              {description && (
                <p className="max-w-[24rem] text-balance text-[length:var(--text-body)] leading-[1.6] text-[#6e5d59] lg:col-span-3 lg:col-start-10 lg:self-end">
                  {description}
                </p>
              )}
            </div>

            <motion.div
              aria-hidden="true"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -6% 0px" }}
              transition={{ duration: kit.slow, ease: kit.ease }}
              className="mt-[clamp(2rem,4vw,3.5rem)] mb-[clamp(1.5rem,3vw,2.5rem)] h-px origin-left bg-[#e8ded5]"
            />

            <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={reduce ? "show" : "hide"}
                  whileInView="show"
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  className={cn(
                    "relative flex min-w-0 flex-col gap-6 rounded-2xl border border-[#ede0d7] bg-[#ffffff]/85 p-6 sm:p-8 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#e2cecf]",
                    index === 1 && "border-[#e0b8b2] bg-[#fffaf8]/95 ring-1 ring-[#e0b8b2]/40 shadow-rose-900/5"
                  )}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="min-w-0 text-balance text-[length:var(--text-h3)] font-serif font-semibold text-[#2d1a1e] leading-[1.15] [overflow-wrap:anywhere]">
                      {item.title}
                    </h3>
                    <span aria-hidden="true" className="text-[length:var(--text-label)] font-mono font-medium text-[#b59892]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {item.price && (
                    <div className="flex flex-col gap-1.5 border-y border-[#f2e7e1] py-4">
                      <div className="overflow-hidden pb-[0.12em] -mb-[0.12em]">
                        <motion.p
                          variants={{ hide: { y: "105%" }, show: { y: "0%" } }}
                          transition={{ duration: kit.slow, ease: kit.ease, delay: 0.1 + (index % 4) * 0.08 }}
                          className={cn(
                            "text-[#2d1a1e] font-serif font-medium tracking-tight",
                            item.price.length > 12 ? "text-[clamp(1.2rem,1.05rem+0.6vw,1.5rem)] leading-snug" : "text-[length:var(--text-h1)] leading-[1]"
                          )}
                        >
                          {item.price}
                        </motion.p>
                      </div>
                      {item.period && <p className="text-[length:var(--text-label)] text-[#8c7772]">{item.period}</p>}
                    </div>
                  )}

                  {item.description && (
                    <p className="max-w-[22rem] text-balance text-[length:var(--text-body)] leading-[1.55] text-[#6e5d59]">
                      {item.description}
                    </p>
                  )}

                  {item.features && item.features.length > 0 && (
                    <ul className="flex flex-col border-t border-[#f0e4dd] pt-2">
                      {item.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2.5 border-b border-[#f5eae3] py-2.5 text-[length:var(--text-small)] leading-[1.45] text-[#4d3d3a]">
                          <span className="size-1.5 shrink-0 rounded-full bg-[#d98880]" />
                          <span className="min-w-0">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.button && (
                    <a
                      href={item.button.href}
                      className={cn(
                        "mt-auto inline-flex items-center justify-center rounded-full px-6 py-3 text-center text-sm font-medium transition-all duration-200",
                        index === 1
                          ? "bg-[#2d1a1e] text-[#fffdfb] hover:bg-[#4a2e33] shadow-md"
                          : "bg-[#f5e8e4] text-[#2d1a1e] hover:bg-[#ebd8d3] border border-[#e8d2cb]"
                      )}
                    >
                      {item.button.text}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingGlassColumns;
