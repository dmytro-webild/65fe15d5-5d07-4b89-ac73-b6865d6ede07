import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import IndentTitle from "@/components/kit/IndentTitle";
import { useKitMotion } from "@/components/kit/kitMotion";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type ShowcaseItem = {
  title: string;
  tag: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
};

type BespokeShowcaseGridProps = {
  tag?: string;
  title?: string;
  description?: string;
  items?: ShowcaseItem[];
  ariaLabel?: string;
  className?: string;
};

const DEFAULT_ITEMS: ShowcaseItem[] = [
  {
    title: "Baccara Luxe Rose Spray",
    tag: "Signature Bouquet",
    imageSrc: "https://storage.googleapis.com/webild/users/user_3MEwysOv31t7f9Ov9oDsUF6BXKv/uploaded-1795197095486-ajph9wbe.jpg",
    imageAlt: "Luxurious Baccara spray rose bouquet with eucalyptus accents",
    description: "An extraordinary arrangement of vibrant pink, peach, and deep crimson spray roses finished with custom branded ribbons."
  },
  {
    title: "Ranunculus & Hydrangea Basket",
    tag: "Luxury Curation",
    imageSrc: "https://storage.googleapis.com/webild/users/user_3MEwysOv31t7f9Ov9oDsUF6BXKv/uploaded-1795197095487-sbtlvcdp.jpg",
    imageAlt: "Grand white woven basket arrangement with soft pink ranunculus and hydrangeas",
    description: "Soft pink ranunculus paired with airy white hydrangeas and fresh greenery in a hand-woven artisan basket."
  },
  {
    title: "Signature Pink Spray Sphere",
    tag: "Bespoke Sphere",
    imageSrc: "https://storage.googleapis.com/webild/users/user_3MEwysOv31t7f9Ov9oDsUF6BXKv/uploaded-1795197095489-82fdo6u1.jpg",
    imageAlt: "Grand sphere bouquet of fresh light pink spray roses with Baccara ribbons",
    description: "Hundreds of delicate blush spray roses masterfully shaped into a seamless, dense floral sphere."
  },
  {
    title: "Garden Rose & Silk Ribbon Basket",
    tag: "Artisan Basket",
    imageSrc: "https://storage.googleapis.com/webild/users/user_3MEwysOv31t7f9Ov9oDsUF6BXKv/uploaded-1795197095489-l5mdri96.jpg",
    imageAlt: "Woven basket arrangement with white and blush garden roses and silk ribbons",
    description: "Blush-tipped garden roses with silver branch highlights and cascading silk ribbons."
  },
  {
    title: "Velvet Rose & Hydrangea Luxe",
    tag: "Grand Statement",
    imageSrc: "https://storage.googleapis.com/webild/users/user_3MEwysOv31t7f9Ov9oDsUF6BXKv/uploaded-1795197095490-nef1zs1q.jpg",
    imageAlt: "Luxury bespoke floral bouquet arrangement by Baccara Flowers",
    description: "Opulent combination of premium stems curated for unforgettable celebrations."
  }
];

export default function BespokeShowcaseGrid({
  tag = "New Additions",
  title = "Latest studio creations",
  description = "Explore our newest bespoke floral arrangements, hand-crafted with luxury seasonal stems and signature details.",
  items = DEFAULT_ITEMS,
  ariaLabel,
  className,
}: BespokeShowcaseGridProps) {
  const kit = useKitMotion();
  const reduce = useReducedMotion();

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative py-[var(--section-space)] text-[#2d1a1e]", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#f0e4dd] bg-gradient-to-b from-[#fffcf8] via-[#faf4f0] to-[#f7eee9] p-6 sm:p-10 lg:p-14 shadow-xl shadow-rose-950/5">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -top-20 -right-20 size-96 rounded-full bg-rose-200/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 size-96 rounded-full bg-amber-100/35 blur-3xl" />

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

            {/* Grid display for the 5 new studio creations */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => {
                const isHero = index === 0;
                return (
                  <motion.article
                    key={index}
                    initial={reduce ? "show" : "hide"}
                    whileInView="show"
                    viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                    className={cn(
                      "group relative flex flex-col overflow-hidden rounded-2xl border border-[#ede0d7] bg-[#ffffff]/90 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md hover:border-[#e0c4bd]",
                      isHero && "md:col-span-2 lg:col-span-2"
                    )}
                  >
                    <div className={cn("relative overflow-hidden bg-[#f7ede8]", isHero ? "aspect-[16/10] sm:aspect-[21/9]" : "aspect-[4/3]")}>
                      <MotionMedia
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        loading="lazy"
                        decoding="async"
                        variants={{ hide: { scale: 1.08 }, show: { scale: 1 } }}
                        transition={{ duration: kit.slow * 1.2, ease: kit.ease, delay: index * 0.08 }}
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
                      <span className="absolute top-4 left-4 rounded-full border border-white/30 bg-white/80 px-3 py-1 text-xs font-medium backdrop-blur-md text-[#2d1a1e]">
                        {item.tag}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-[length:var(--text-h3)] font-semibold text-[#2d1a1e]">
                            {item.title}
                          </h3>
                          <span className="font-mono text-xs text-[#b59892]">0{index + 1}</span>
                        </div>
                        <p className="text-[length:var(--text-body)] text-[#6e5d59] leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-[#f2e7e1] flex items-center justify-between">
                        <span className="text-xs font-medium text-[#9c4a43]">Bespoke Order</span>
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2d1a1e] transition-colors hover:text-[#d98880]"
                        >
                          Inquire about this design
                          <svg viewBox="0 0 14 14" className="size-3">
                            <path d="M4 10 10 4M5.5 4H10v4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
