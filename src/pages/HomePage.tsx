import HeroGlassCube from "@/components/sections/hero/HeroGlassCube";
import GalleryGlassRail from "@/components/sections/gallery/GalleryGlassRail";
import BespokeShowcaseGrid from "@/components/sections/gallery/BespokeShowcaseGrid";
import PricingGlassColumns from "@/components/sections/pricing/PricingGlassColumns";
import TestimonialGlassQuotes from "@/components/sections/testimonial/TestimonialGlassQuotes";
import FaqCrossAccordion from "@/components/sections/faq/FaqCrossAccordion";
import ContactGlassForm from "@/components/sections/contact/ContactGlassForm";
import FacetGlowBackdrop from "@/components/kit/FacetGlowBackdrop";
import LoaderGlowRise from "@/components/loaders/LoaderGlowRise";

export default function HomePage() {
  return (
    <>
      <FacetGlowBackdrop

      />

      <LoaderGlowRise
        wordmark={[
          "Baccara Flowers",
          "Artisanal Luxury Floral Design"
        ]}
        introDelay={1.3}
      />

      <div id="home" data-webild-section="HeroGlassCube" data-webild-section-id="HeroGlassCube-1" data-section="home">
        <HeroGlassCube
          titleLines={[
            {
              text: "Flowers that speak"
            },
            {
              text: "when words cannot"
            }
          ]}
          primaryButton={{
            text: "Explore collection",
            href: "#shop"
          }}
          tag="Luxury florals"
          statement="Artisanal arrangements crafted with care."
          label="Boutique studio"
          description="Ethereal floral designs for life's most cherished moments."
          shape="ring"
          introDelay={1.3}
        />
      </div>

      <div id="shop" data-webild-section="GalleryGlassRail" data-webild-section-id="GalleryGlassRail-1" data-section="shop">
        <GalleryGlassRail
          tag="Signature"
          title="Current arrangements"
          description="Artisanal luxury floral arrangements crafted daily with fresh seasonal stems."
          items={[
            {
              title: "Baccara Blush",
              meta: "From $145",
              imageSrc: "https://img.b2bpic.net/free-photo/bouquet-pink-roses-isolated-white-panoramic-view_268835-1376.jpg",
              imageAlt: "Bouquet of pink roses isolated on white, panoramic view",
              href: "#contact"
            },
            {
              title: "Ivory Grace",
              meta: "From $165",
              imageSrc: "https://img.b2bpic.net/free-photo/bouquet-roses-close-up-with-copy-space_23-2148822245.jpg",
              imageAlt: "Bouquet of roses close-up with copy space",
              href: "#contact"
            },
            {
              title: "Pink Dream",
              meta: "From $185",
              imageSrc: "https://img.b2bpic.net/free-photo/pink-bucket-with-bouquet-flowers-marble-surface_114579-21258.jpg",
              imageAlt: "A pink bucket with bouquet of flowers on marble surface.",
              href: "#contact"
            },
            {
              title: "Royal Bouquet",
              meta: "From $275",
              imageSrc: "https://img.b2bpic.net/free-photo/valentines-day-womens-mothers-day-red-rose-with-ribbon-heart-gift-surprise_114579-448.jpg",
              imageAlt: "Valentines day womens mothers day red rose with ribbon heart gift surprise",
              href: "#contact"
            },
            {
              title: "Garden Joy",
              meta: "From $135",
              imageSrc: "https://img.b2bpic.net/free-photo/floral-arrangement-with-glass-dish_58702-25693.jpg",
              imageAlt: "Floral arrangement with glass dish",
              href: "#contact"
            },
            {
              title: "Pearl White",
              meta: "From $150",
              imageSrc: "https://img.b2bpic.net/free-photo/white-flowers-bouquet-table_140725-878.jpg",
              imageAlt: "white flowers bouquet",
              href: "#contact"
            },
            {
              title: "Baccara Luxe Rose Spray",
              meta: "Bespoke",
              imageSrc: "https://storage.googleapis.com/webild/users/user_3MEwysOv31t7f9Ov9oDsUF6BXKv/uploaded-1795197095486-ajph9wbe.jpg",
              imageAlt: "Luxurious Baccara spray rose bouquet with eucalyptus accents",
              href: "#contact"
            },
            {
              title: "Ranunculus & Hydrangea Basket",
              meta: "Bespoke",
              imageSrc: "https://storage.googleapis.com/webild/users/user_3MEwysOv31t7f9Ov9oDsUF6BXKv/uploaded-1795197095487-sbtlvcdp.jpg",
              imageAlt: "Grand white woven basket arrangement with soft pink ranunculus and hydrangeas",
              href: "#contact"
            },
            {
              title: "Signature Pink Spray Sphere",
              meta: "Bespoke",
              imageSrc: "https://storage.googleapis.com/webild/users/user_3MEwysOv31t7f9Ov9oDsUF6BXKv/uploaded-1795197095489-82fdo6u1.jpg",
              imageAlt: "Grand sphere bouquet of fresh light pink spray roses with Baccara ribbons",
              href: "#contact"
            },
            {
              title: "Garden Rose & Silk Ribbon Basket",
              meta: "Bespoke",
              imageSrc: "https://storage.googleapis.com/webild/users/user_3MEwysOv31t7f9Ov9oDsUF6BXKv/uploaded-1795197095489-l5mdri96.jpg",
              imageAlt: "Woven basket arrangement with white and blush garden roses and silk ribbons",
              href: "#contact"
            },
            {
              title: "Velvet Rose & Hydrangea Luxe",
              meta: "Bespoke",
              imageSrc: "https://storage.googleapis.com/webild/users/user_3MEwysOv31t7f9Ov9oDsUF6BXKv/uploaded-1795197095490-nef1zs1q.jpg",
              imageAlt: "Luxury bespoke floral bouquet arrangement by Baccara Flowers",
              href: "#contact"
            }
          ]}
        />
      </div>

      <div id="creations" data-webild-section="BespokeShowcaseGrid" data-webild-section-id="BespokeShowcaseGrid-1" data-section="creations">
        <BespokeShowcaseGrid />
      </div>

      <div id="pricing" data-webild-section="PricingGlassColumns" data-webild-section-id="PricingGlassColumns-1" data-section="pricing">
        <PricingGlassColumns
          tag="Bespoke Services"
          title="Artisanal floral services and curation"
          description="Contact our studio directly for custom pricing, stem selection, and bespoke floral inquiries."
          items={[
            {
              title: "Signature Bouquets",
              price: "Contact us for pricing",
              description: "Hand-crafted arrangements featuring fresh luxury roses and seasonal botanical stems.",
              features: [
                "Hand-selected fresh stems",
                "Custom color palettes",
                "Signature boutique wrapping",
                "Local delivery & studio pickup"
              ],
              button: {
                text: "Request a custom quote",
                href: "#contact"
              }
            },
            {
              title: "Custom Arrangements",
              price: "Contact us for pricing",
              description: "Bespoke floral designs, custom gift boxes, and signature chocolate covered strawberries.",
              features: [
                "Tailored floral styling",
                "Chocolate covered strawberries",
                "Direct florist consultation",
                "Same-day & scheduled delivery"
              ],
              button: {
                text: "Contact us for pricing",
                href: "tel:2155947640"
              }
            },
            {
              title: "Events & Weddings",
              price: "Request a custom quote",
              description: "Full-service floral styling, tablescapes, and venue installations for special occasions.",
              features: [
                "Personalized event consultation",
                "Venue & tablescape styling",
                "Custom floral installations",
                "On-site delivery & setup"
              ],
              button: {
                text: "Request a custom quote",
                href: "#contact"
              }
            }
          ]}
        />
      </div>

      <div id="testimonial" data-webild-section="TestimonialGlassQuotes" data-webild-section-id="TestimonialGlassQuotes-1" data-section="testimonial">
        <TestimonialGlassQuotes
          tag="Reviews"
          title="Customer reviews"
          description="Real experiences from our clients celebrating life's special moments with Baccara Flowers."
          items={[
            {
              quote: "Absolutely stunning bouquets! 😍 The flowers are so fresh, and every arrangement is beautiful in its own way. Even more gorgeous in person! Thank you for putting so much love and care into every detail 🤍💐",
              name: "Sevinch Makhmudova",
              role: "Verified Client",
              rating: 5,
              imageSrc: "https://img.b2bpic.net/free-photo/gorgeous-portrait-bridesmaid-with-flower-boquete_23-2149278397.jpg",
              imageAlt: "Sevinch Makhmudova"
            },
            {
              quote: "You should try the chocolate covered strawberries 🍓 here! Worth every penny",
              name: "Parvina Ziyaeva",
              role: "Verified Client",
              rating: 5,
              imageSrc: "https://img.b2bpic.net/free-photo/side-view-adult-holding-plate-with-food_23-2149660909.jpg",
              imageAlt: "Parvina Ziyaeva"
            },
            {
              quote: "I had a wonderful experience with Baccara Flower Shop in Braselton. The flowers were absolutely stunning—fresh, beautifully arranged, and clearly prepared with great attention to detail. The staff was very professional, friendly, and helpful throughout the entire process.\n\nYou can truly see the passion they have for their work. The arrangement looked elegant and exceeded my expectations. If you are looking for high-quality flowers and excellent customer service, I highly recommend this",
              name: "Farangis Karimova",
              role: "Verified Client",
              rating: 5,
              imageSrc: "https://img.b2bpic.net/free-photo/woman-making-floral-bouquet_23-2148846527.jpg",
              imageAlt: "Farangis Karimova"
            },
            {
              quote: "Exceptional quality, freshest flowers, and outstanding customer service! Every arrangement is handled with utmost care and elegance. Highly recommended!",
              name: "JK",
              role: "Verified Client",
              rating: 5,
              imageSrc: "https://img.b2bpic.net/free-photo/elegant-stylish-girl-summer-garden_1157-24472.jpg",
              imageAlt: "JK"
            }
          ]}
        />
      </div>

      <div id="faq" data-webild-section="FaqCrossAccordion" data-webild-section-id="FaqCrossAccordion-1" data-section="faq">
        <FaqCrossAccordion
          tag="Help"
          title="Planning your order"
          description="Details on visiting our boutique flower shop or reserving bespoke floral arrangements."
          items={[
            {
              title: "Where is the flower studio located?",
              description: "We are located at 304 Bustleton Pike, Feasterville-Trevose, PA 19053."
            },
            {
              title: "What are your operating hours?",
              description: "We are open every day from 9:00 AM – 10:00 PM for walk-ins, phone orders, and pickups."
            },
            {
              title: "How do I place a custom floral order?",
              description: "Call us directly at (215) 594-7640 to speak with a florist and discuss bespoke arrangements."
            },
            {
              title: "Do you offer local flower delivery?",
              description: "Yes, we provide hand delivery for luxury arrangements across Feasterville-Trevose and the surrounding local area."
            },
            {
              title: "How do I maintain my fresh flowers?",
              description: "Keep your blooms in fresh water, away from direct sunlight and heat sources, trimming stems lightly every two days."
            }
          ]}
        />
      </div>

      <div id="contact" data-webild-section="ContactGlassForm" data-webild-section-id="ContactGlassForm-1" data-section="contact">
        <ContactGlassForm
          title="Reserve your bespoke floral arrangement"
          fields={[
            {
              name: "name",
              label: "Full Name",
              type: "text",
              placeholder: "Your full name"
            },
            {
              name: "phone",
              label: "Phone Number",
              type: "tel",
              placeholder: "(215) 594-7640"
            },
            {
              name: "email",
              label: "Email Address",
              type: "email",
              placeholder: "contact@baccaraflowers.com"
            },
            {
              name: "message",
              label: "Bespoke Request",
              type: "textarea",
              placeholder: "Tell us about your occasion"
            }
          ]}
          buttonText="Submit Inquiry"
          successText="Thank you. Our floral designers will contact you shortly to confirm."
          imageSrc="https://img.b2bpic.net/free-photo/boquet-pink-orchid_181624-731.jpg"
          imageAlt="assorted floral boutonnieres"
        />
      </div>
    </>
  );
}
