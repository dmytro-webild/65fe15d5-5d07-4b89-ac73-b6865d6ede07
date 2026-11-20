import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Phone, Instagram, MapPin } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import IndentTitle from "@/components/kit/IndentTitle";
import BlurReveal from "@/components/kit/BlurReveal";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Field = { name: string; label: string; type?: "text" | "email" | "tel" | "textarea"; placeholder?: string };

type ContactGlassFormProps = {
  title?: string;
  fields?: Field[];
  buttonText?: string;
  successText?: string;
  imageSrc?: string;
  imageAlt?: string;
  ariaLabel?: string;
  className?: string;
};

const ContactGlassForm = ({
  title = "Start a piece with us",
  fields = [
    { name: "name", label: "Name", placeholder: "Your name" },
    { name: "email", label: "Email", type: "email", placeholder: "you@studio.com" },
    { name: "message", label: "Message", type: "textarea", placeholder: "What would you like us to make?" },
  ],
  buttonText = "Send message",
  successText = "Thank you. A maker will reply within two days.",
  imageSrc = "https://images.pexels.com/photos/13865606/pexels-photo-13865606.jpeg?auto=compress&w=1200",
  imageAlt = "A calm white gallery interior",
  ariaLabel,
  className,
}: ContactGlassFormProps) => {
  const kit = useKitMotion();
  const reduce = useReducedMotion();
  const baseId = useId();
  const [sent, setSent] = useState(false);

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className={cn("mx-auto grid w-[var(--container)] grid-cols-1 gap-y-10", imageSrc && "lg:grid-cols-12 lg:gap-x-[var(--gap)]")}>
        <div className={cn("flex flex-col gap-[clamp(1.5rem,3vw,3rem)]", imageSrc && "lg:col-span-5")}>
          <IndentTitle text={title} className="text-[length:var(--text-h1)]" />
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="tel:2155947640"
              className="btn-secondary flex items-center gap-2 py-2 text-[length:var(--text-small)]"
            >
              <Phone className="size-4 text-primary" />
              <span>(215) 594-7640</span>
            </a>
            <a
              href="https://www.instagram.com/baccara.buket_philadelphia/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2 py-2 text-[length:var(--text-small)]"
            >
              <Instagram className="size-4 text-primary" />
              <span>Instagram</span>
            </a>
            <a
              href="https://maps.app.goo.gl/b2Kueyuh7xVfXj758"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2 py-2 text-[length:var(--text-small)]"
            >
              <MapPin className="size-4 text-primary" />
              <span>Google Maps</span>
            </a>
          </div>
          <motion.div aria-hidden="true" initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "0px 0px -6% 0px" }} transition={{ duration: kit.slow, ease: kit.ease }} className="h-px origin-left bg-border" />
          <BlurReveal
            as="form"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
            className="flex flex-1 flex-col gap-2.5"
          >
            {fields.map((field) => {
              const id = `${baseId}-${field.name}`;
              const inputClass = "w-full border-0 bg-transparent p-0 text-[length:var(--text-body-lg)] text-foreground outline-none placeholder:text-muted-foreground";
              return (
                <div key={field.name} className="kit-card flex flex-col gap-1.5 px-4 py-3.5 transition-[border-color] duration-300 focus-within:border-[color-mix(in_srgb,var(--foreground)_45%,transparent)]">
                  <label htmlFor={id} className="text-[length:var(--text-label)] text-muted-foreground">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea id={id} name={field.name} required rows={4} placeholder={field.placeholder} className={cn(inputClass, "resize-none")} />
                  ) : (
                    <input id={id} name={field.name} type={field.type ?? "text"} required placeholder={field.placeholder} className={inputClass} />
                  )}
                </div>
              );
            })}
            <div className="mt-auto flex flex-col items-start gap-4 pt-4">
              <button type="submit" disabled={sent} className="btn-primary disabled:cursor-default">
                {buttonText}
              </button>
              {sent && <p role="status" className="text-[length:var(--text-small)] text-muted-foreground">{successText}</p>}
            </div>
          </BlurReveal>
        </div>
        {imageSrc && (
          <motion.div initial={reduce ? "show" : "hide"} whileInView="show" viewport={{ once: true, margin: "0px 0px -8% 0px" }} className="min-h-[18rem] lg:col-span-6 lg:col-start-7 lg:min-h-0">
            <motion.div
              variants={{ hide: { clipPath: "inset(100% 0% 0% 0% round var(--radius-image))" }, show: { clipPath: "inset(0% 0% 0% 0% round var(--radius-image))" } }}
              transition={{ duration: kit.slow, ease: kit.ease, delay: 0.1 }}
              className="h-full"
            >
              <ImageScrollParallax imageSrc={imageSrc} imageAlt={imageAlt} strength={0.12} className="aspect-[4/3] h-full rounded-[var(--radius-image)] lg:aspect-auto" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ContactGlassForm;
