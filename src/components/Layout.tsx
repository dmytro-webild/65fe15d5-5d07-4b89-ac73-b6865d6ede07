import { Outlet } from "react-router-dom";
import NavbarCrossMark from "@/components/navbars/NavbarCrossMark";
import FooterGlowWordmark from "@/components/sections/footer/FooterGlowWordmark";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="default" data-card="glass" data-pattern="grain">
      <header data-webild-section="Header">
        <NavbarCrossMark
          brand="Baccara Flowers"
          navItems={[
            {
              name: "Boutique",
              href: "#home"
            },
            {
              name: "Arrangements",
              href: "#shop"
            },
            {
              name: "Pricing",
              href: "#pricing"
            },
            {
              name: "Client Stories",
              href: "#testimonial"
            },
            {
              name: "Contact",
              href: "#contact"
            }
          ]}
        />
      </header>
      <main className="flex-grow" data-button="default" data-card="glass" data-pattern="grain">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterGlowWordmark
          brand="Baccara Flowers"
          note="Artisanal luxury floral design and custom arrangements tailored for every occasion in Feasterville-Trevose, PA."
          columns={[
            {
              title: "Explore",
              links: [
                {
                  text: "Arrangements",
                  href: "#shop"
                },
                {
                  text: "Bespoke Pricing",
                  href: "#pricing"
                },
                {
                  text: "Client Stories",
                  href: "#testimonial"
                }
              ]
            },
            {
              title: "Boutique",
              links: [
                {
                  text: "Ordering FAQ",
                  href: "#faq"
                },
                {
                  text: "Visit Studio",
                  href: "#contact"
                },
                {
                  text: "Directions",
                  href: "https://maps.app.goo.gl/b2Kueyuh7xVfXj758"
                }
              ]
            },
            {
              title: "Connect",
              links: [
                {
                  text: "Instagram",
                  href: "https://www.instagram.com/baccara.buket_philadelphia/"
                },
                {
                  text: "(215) 594-7640",
                  href: "tel:2155947640"
                }
              ]
            }
          ]}
          copyright="© 2026 Baccara Flowers. All rights reserved."
          wordmark={[
            "BACCARA",
            "FLOWERS"
          ]}
        />
      </footer>
    </div>
  );
}
