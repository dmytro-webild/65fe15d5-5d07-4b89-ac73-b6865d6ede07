import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import IndentTitle from "@/components/kit/IndentTitle";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Plan = { title: string; price?: string; period?: string; description?: string; features?: string[]; button?: { text: string; href: string } };

type PricingGlassColumnsProps = {
  tag?: string;
  title?: string;
  description?: string;
  items?: Plan[];
  ariaLabel?: string;
  className?: string;
};

const PricingGlassColumns = ({
  tag = "Pricing",
  title = "Ways to work with us",
  description = "Every price includes casting, finishing and insured delivery.",
  items = [
    { title: "Single object", price: "€480", period: "from, per piece", description: "A piece from the current collection.", features: ["Choice of 38 colours", "Signed and numbered", "Ships in two weeks"], button: { text: "Shop objects", href: "#" } },
    { title: "Edition", price: "€6,200", period: "from, per run", description: "A small run made for your brand or space.", features: ["Up to fifty pieces", "Your own colour", "Two sampling rounds"], button: { text: "Plan an edition", href: "#" } },
    { title: "Commission", price: "Custom", period: "quoted per project", description: "One piece, designed with you from scratch.", features: ["Site visit and sketches", "Full-size mould", "Installation on site"], button: { text: "Start a commission", href: "#" } },
  ],
  ariaLabel,
  className,
}: PricingGlassColumnsProps) => {
  const kit = useKitMotion();
  const reduce = useReducedMotion();

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-12 lg:gap-x-[var(--gap)]">
          {tag && <p className="text-[length:var(--text-label)] text-muted-foreground lg:col-span-3 lg:pt-[0.55em]">{tag}</p>}
          <IndentTitle text={title} className="text-[length:var(--text-h1)] lg:col-span-5 lg:col-start-4" />
          {description && <p className="max-w-[24rem] text-balance text-[length:var(--text-body)] leading-[1.5] text-muted-foreground lg:col-span-3 lg:col-start-10 lg:self-end">{description}</p>}
        </div>
        <motion.div aria-hidden="true" initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "0px 0px -6% 0px" }} transition={{ duration: kit.slow, ease: kit.ease }} className="mt-[clamp(1.5rem,3vw,3rem)] h-px origin-left bg-border" />
        <ul className="grid grid-cols-1 lg:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
          {items.map((item, index) => (
            <motion.li
              key={index}
              initial={reduce ? "show" : "hide"}
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              className="flex min-w-0 flex-col gap-6 border-b border-border py-[clamp(1.75rem,3.5vw,3rem)] last:border-b-0 lg:border-b-0 lg:border-l lg:px-[var(--gap)] lg:first:border-l-0 lg:first:pl-0"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="min-w-0 text-balance text-[length:var(--text-h3)] leading-[1.05] [overflow-wrap:anywhere]">{item.title}</h3>
                <p aria-hidden="true" className="text-[length:var(--text-label)] tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
              </div>
              {item.price && (
                <div className="flex flex-col gap-2">
                  <div className="overflow-hidden pb-[0.12em] -mb-[0.12em]">
                    <motion.p
                      variants={{ hide: { y: "105%" }, show: { y: "0%" } }}
                      transition={{ duration: kit.slow, ease: kit.ease, delay: 0.1 + (index % 4) * 0.08 }}
                      className="whitespace-nowrap text-[length:var(--text-h1)] leading-[1] tracking-[-0.045em] tabular-nums"
                    >
                      {item.price}
                    </motion.p>
                  </div>
                  {item.period && <p className="whitespace-nowrap text-[length:var(--text-label)] text-muted-foreground">{item.period}</p>}
                </div>
              )}
              {item.description && <p className="max-w-[22rem] text-balance text-[length:var(--text-body)] leading-[1.5] text-muted-foreground">{item.description}</p>}
              {item.features && item.features.length > 0 && (
                <ul className="flex flex-col border-t border-border">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="border-b border-border py-2.5 text-[length:var(--text-small)] leading-[1.45]">
                      <p className="min-w-0">{feature}</p>
                    </li>
                  ))}
                </ul>
              )}
              {item.button && (
                <a href={item.button.href} className="btn-secondary mt-auto w-full">
                  {item.button.text}
                </a>
              )}
            </motion.li>
          ))}
        </ul>
        <div aria-hidden="true" className="h-px bg-border" />
      </div>
    </section>
  );
};

export default PricingGlassColumns;
