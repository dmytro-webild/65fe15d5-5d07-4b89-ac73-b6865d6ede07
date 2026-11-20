import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import HorizontalScrollSection from "@/components/animation/HorizontalScrollSection";
import IndentTitle from "@/components/kit/IndentTitle";
import { useImageReady, useKitMotion } from "@/components/kit/kitMotion";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Work = { title: string; meta?: string; imageSrc: string; imageAlt?: string; href?: string };

type GalleryGlassRailProps = {
  tag?: string;
  title?: string;
  description?: string;
  items?: Work[];
  ariaLabel?: string;
  className?: string;
};

const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&w=1000`;

const GlassItem = ({ reduce, className, children }: { reduce: boolean; className: string; children: ReactNode }) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const ready = useImageReady(ref, inView);
  return (
    <motion.article ref={ref} initial={reduce ? "show" : "hide"} animate={reduce || (inView && ready) ? "show" : "hide"} className={className}>
      {children}
    </motion.article>
  );
};

const GalleryGlassRail = ({
  tag = "Collection",
  title = "Recent work",
  description = "Pieces from the last two seasons, each cast in a run of fifty or fewer.",
  items = [
    { title: "Stoneware vase", meta: "Object, 2026", imageSrc: px(4207892) },
    { title: "Two vessels", meta: "Edition, 2026", imageSrc: px(6767787) },
    { title: "Amber set", meta: "Commission, 2025", imageSrc: px(26348192) },
    { title: "Plinth candle", meta: "Object, 2025", imageSrc: px(12336392) },
  ],
  ariaLabel,
  className,
}: GalleryGlassRailProps) => {
  const kit = useKitMotion();
  const reduce = useReducedMotion();

  const header = (
    <>
      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-12 lg:gap-x-[var(--gap)]">
        {tag && <p className="text-[length:var(--text-label)] text-muted-foreground lg:col-span-3 lg:pt-[0.55em]">{tag}</p>}
        <IndentTitle text={title} className="text-[length:var(--text-h1)] lg:col-span-5 lg:col-start-4" />
        {description && <p className="max-w-[24rem] text-balance text-[length:var(--text-body)] leading-[1.5] text-muted-foreground lg:col-span-3 lg:col-start-10 lg:self-end">{description}</p>}
      </div>
      <motion.div aria-hidden="true" initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "0px 0px -6% 0px" }} transition={{ duration: kit.slow, ease: kit.ease }} className="mt-[clamp(1.5rem,3vw,3rem)] h-px origin-left bg-border" />
    </>
  );

  return (
    <section data-scene aria-label={ariaLabel ?? title} className={cn("relative overflow-x-clip pb-[var(--section-space)] text-foreground", className)}>
      <HorizontalScrollSection
        compact
        progress={false}
        header={header}
        headerClassName="w-[var(--container)] max-w-none px-0"
        trackClassName="items-start gap-[var(--gap)] px-[calc((100vw-var(--container))/2)]"
      >
        {items.map((item, index) => (
          <GlassItem
            key={index}
            reduce={!!reduce}
            className="group flex w-[72vw] shrink-0 flex-col gap-4 sm:w-[min(22rem,56vw)] lg:w-[calc((min(100vw-2*var(--gutter),var(--max-w))-3*var(--gap))/3.5)]"
          >
            <motion.div
              variants={{ hide: { clipPath: "inset(100% 0% 0% 0% round var(--radius-image))" }, show: { clipPath: "inset(0% 0% 0% 0% round var(--radius-image))" } }}
              transition={{ duration: kit.slow, ease: kit.ease, delay: (index % 4) * 0.06 }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-image)] lg:aspect-auto lg:h-[min(46svh,30rem)]"
            >
              <MotionMedia
                src={item.imageSrc}
                alt={item.imageAlt ?? item.title}
                loading="lazy"
                decoding="async"
                variants={{ hide: { scale: 1.12 }, show: { scale: 1 } }}
                transition={{ duration: kit.slow * 1.3, ease: kit.ease, delay: (index % 4) * 0.06 }}
                className="absolute inset-0 size-full object-cover"
              />
            </motion.div>
            <div className="flex flex-col gap-1.5 border-t border-border pt-4">
              <div className="flex items-baseline justify-between gap-4">
                <p aria-hidden="true" className="text-[length:var(--text-label)] tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
                {item.meta && <p className="shrink-0 whitespace-nowrap text-[length:var(--text-label)] text-muted-foreground">{item.meta}</p>}
              </div>
              <h3 className="min-w-0 text-balance text-[length:var(--text-h3)] leading-[1.05] [overflow-wrap:anywhere]">
                {item.href ? (
                  <a href={item.href} className="transition-opacity duration-300 hover:opacity-70">
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </h3>
            </div>
          </GlassItem>
        ))}
      </HorizontalScrollSection>
    </section>
  );
};

export default GalleryGlassRail;
