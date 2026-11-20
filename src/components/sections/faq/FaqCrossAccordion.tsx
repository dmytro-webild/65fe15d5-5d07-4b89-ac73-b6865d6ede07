import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import IndentTitle from "@/components/kit/IndentTitle";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Question = { title: string; description: string };

type FaqCrossAccordionProps = {
  tag?: string;
  title?: string;
  description?: string;
  items?: Question[];
  ariaLabel?: string;
  className?: string;
};

const FaqCrossAccordion = ({
  tag = "FAQ",
  title = "Questions",
  description = "Anything else, write to us and a maker will answer within two days.",
  items = [
    { title: "How long does an order take?", description: "Pieces from the collection ship in about two weeks. Editions and commissions take eight to twelve weeks, depending on the mould." },
    { title: "Can I choose my own colour?", description: "Yes. Pick from the 38 colours in our library, or we can mix a new one for editions of twenty pieces or more." },
    { title: "Is every piece the same?", description: "No two are identical. Small bubbles and shifts in tone are part of hand-cast glass and are never treated as flaws." },
    { title: "How do you ship glass?", description: "Every piece travels in a fitted crate with full insurance. If anything arrives damaged, we cast it again." },
    { title: "Can I visit the studio?", description: "We open the studio on the first Saturday of each month. Book a slot and you can watch a pour." },
  ],
  ariaLabel,
  className,
}: FaqCrossAccordionProps) => {
  const kit = useKitMotion();
  const reduce = useReducedMotion();
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-12 lg:gap-x-[var(--gap)]">
          {tag && <p className="text-[length:var(--text-label)] text-muted-foreground lg:col-span-3 lg:pt-[0.55em]">{tag}</p>}
          <IndentTitle text={title} className="text-[length:var(--text-h1)] lg:col-span-5 lg:col-start-4" />
          {description && <p className="max-w-[24rem] text-balance text-[length:var(--text-body)] leading-[1.5] text-muted-foreground lg:col-span-3 lg:col-start-10 lg:self-end">{description}</p>}
        </div>
        <motion.div aria-hidden="true" initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "0px 0px -6% 0px" }} transition={{ duration: kit.slow, ease: kit.ease }} className="mt-[clamp(1.5rem,3vw,3rem)] h-px origin-left bg-border" />
        <ul className="flex flex-col">
          {items.map((item, index) => {
            const isOpen = open === index;
            const panelId = `${baseId}-${index}`;
            return (
              <li key={index} className="border-b border-border">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="group grid w-full cursor-pointer grid-cols-[2.5rem_1fr_auto] items-start gap-x-[var(--gap)] py-[clamp(1.25rem,2.4vw,2rem)] text-left transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--foreground)_4%,transparent)] lg:grid-cols-12"
                >
                  <p aria-hidden="true" className="pt-[0.3em] text-[length:var(--text-label)] tabular-nums text-muted-foreground lg:col-span-3">{String(index + 1).padStart(2, "0")}</p>
                  <p className={cn("min-w-0 text-balance text-[length:var(--text-h3)] leading-[1.1] tracking-[var(--heading-tracking)] transition-colors duration-300 [overflow-wrap:anywhere] lg:col-span-7 lg:col-start-4", isOpen ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>{item.title}</p>
                  <motion.svg
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: reduce ? 0 : kit.base, ease: kit.ease }}
                    className="mt-[0.35em] size-3.5 shrink-0 justify-self-end lg:col-span-2 lg:col-start-11"
                  >
                    <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.4" />
                  </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : kit.base, ease: kit.ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-[2.5rem_1fr] gap-x-[var(--gap)] pb-[clamp(1.5rem,2.4vw,2rem)] lg:grid-cols-12">
                        <p className="col-start-2 max-w-[34rem] text-balance text-[length:var(--text-body)] leading-[1.55] text-muted-foreground lg:col-span-6 lg:col-start-4">{item.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FaqCrossAccordion;
