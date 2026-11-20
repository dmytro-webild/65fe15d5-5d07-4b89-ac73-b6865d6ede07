import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import IndentTitle from "@/components/kit/IndentTitle";
import { useKitMotion, usePreloadImages } from "@/components/kit/kitMotion";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const pad = (n: number) => String(n).padStart(2, "0");

type Testimonial = { quote: string; name: string; role?: string; rating?: number; imageSrc?: string; imageAlt?: string };

type TestimonialGlassQuotesProps = {
  tag?: string;
  title?: string;
  description?: string;
  items?: Testimonial[];
  ariaLabel?: string;
  className?: string;
};

const TestimonialGlassQuotes = ({
  tag = "Clients",
  title = "Kind words",
  description,
  items = [
    { quote: "The vase catches the morning light and throws it across the whole room. Guests always ask about it.", name: "Ines Rocha", role: "Collector", rating: 5 },
    { quote: "They cast forty shades for our lobby and every one matched the sample to the hair.", name: "Jonas Reid", role: "Architect", rating: 5 },
    { quote: "Patient, precise and honest about what glass can and cannot do. We will work with them again.", name: "Mara Voss", role: "Interior designer", rating: 5 },
  ],
  ariaLabel,
  className,
}: TestimonialGlassQuotesProps) => {
  const kit = useKitMotion();
  const reduce = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", duration: reduce ? 0 : 30 });
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef, "150%");
  const [current, setCurrent] = useState(0);
  const progress = useMotionValue(items.length > 1 ? 0 : 1);

  const sync = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const track = useCallback(() => {
    if (!emblaApi) return;
    progress.set(items.length > 1 ? Math.min(1, Math.max(0, emblaApi.scrollProgress())) : 1);
  }, [emblaApi, progress, items.length]);

  useEffect(() => {
    if (!emblaApi) return;
    sync();
    track();
    emblaApi.on("select", sync).on("reInit", sync).on("scroll", track).on("reInit", track);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync).off("scroll", track).off("reInit", track);
    };
  }, [emblaApi, sync, track]);

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? title} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-12 lg:gap-x-[var(--gap)]">
          {tag && <p className="text-[length:var(--text-label)] text-muted-foreground lg:col-span-3 lg:pt-[0.55em]">{tag}</p>}
          <IndentTitle text={title} className="text-[length:var(--text-h1)] lg:col-span-5 lg:col-start-4" />
          {description && <p className="max-w-[24rem] text-balance text-[length:var(--text-body)] leading-[1.5] text-muted-foreground lg:col-span-3 lg:col-start-10 lg:self-end">{description}</p>}
        </div>
        <motion.div aria-hidden="true" initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "0px 0px -6% 0px" }} transition={{ duration: kit.slow, ease: kit.ease }} className="mt-[clamp(1.5rem,3vw,3rem)] h-px origin-left bg-border" />
        <div className="mt-[clamp(1.5rem,3vw,3rem)] grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-[var(--gap)]">
          <div className="flex items-center justify-between gap-6 lg:col-span-3 lg:flex-col lg:items-start lg:justify-between">
            <div className="flex whitespace-nowrap text-[length:var(--text-label)] tabular-nums">
              <p aria-hidden="true">{pad(current + 1)}</p>
              <p aria-hidden="true" className="whitespace-pre text-muted-foreground">{` / ${pad(items.length)}`}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" aria-label="Previous testimonial" disabled={current === 0} onClick={() => emblaApi?.scrollPrev()} className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)] transition-colors duration-300 hover:bg-foreground hover:text-background disabled:cursor-default disabled:opacity-30 disabled:hover:bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)] disabled:hover:text-foreground">
                <ArrowLeft className="size-4" strokeWidth={1.4} />
              </button>
              <button type="button" aria-label="Next testimonial" disabled={current >= items.length - 1} onClick={() => emblaApi?.scrollNext()} className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)] transition-colors duration-300 hover:bg-foreground hover:text-background disabled:cursor-default disabled:opacity-30 disabled:hover:bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)] disabled:hover:text-foreground">
                <ArrowRight className="size-4" strokeWidth={1.4} />
              </button>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-9 lg:col-start-4">
            <div ref={emblaRef} className="cursor-grab overflow-hidden active:cursor-grabbing">
              <div className="flex">
                {items.map((item, index) => (
                  <figure key={index} className="flex min-w-0 shrink-0 grow-0 basis-full flex-col gap-6 pr-[var(--gap)]">
                    <motion.blockquote
                      initial={false}
                      animate={reduce || current === index ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 12 }}
                      transition={{ duration: kit.slow, ease: kit.ease }}
                      className="max-w-[46rem] text-balance text-[length:var(--text-h2)] leading-[1.3] tracking-[-0.025em] whitespace-pre-line [overflow-wrap:anywhere]"
                    >
                      <div className="flex items-center gap-1.5 pb-2 text-amber-500" aria-label={`${item.rating ?? 5} out of 5 stars`}>
                        {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
                          <Star key={i} className="size-5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      {item.quote}
                    </motion.blockquote>
                    <figcaption className="flex items-center gap-4">
                      {item.imageSrc && (
                        <div className="relative size-11 shrink-0 overflow-hidden rounded-full">
                          <Media src={item.imageSrc} alt={item.imageAlt ?? item.name} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
                        </div>
                      )}
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <p className="text-[length:var(--text-body)] font-medium [overflow-wrap:anywhere]">{item.name}</p>
                        {item.role && <p className="text-[length:var(--text-label)] text-muted-foreground [overflow-wrap:anywhere]">{item.role}</p>}
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div aria-hidden="true" className="relative mt-10 h-px bg-border">
              <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-foreground will-change-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialGlassQuotes;
