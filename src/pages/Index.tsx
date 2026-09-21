import Reveal from "@/components/site/Reveal";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import HowItWorks from "@/components/site/HowItWorks";
import Services from "@/components/site/Services";
import QuoteForm from "@/components/site/QuoteForm";
import WhyChooseUs from "@/components/site/WhyChooseUs";
import ServiceArea from "@/components/site/ServiceArea";
import FAQ from "@/components/site/FAQ";
import Testimonials from "@/components/site/Testimonials";
import { Contact, Footer } from "@/components/site/Contact";
import StickyCTA from "@/components/site/StickyCTA";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": "https://www.wowtires.com/#business",
    name: "Wheels on Wheels",
    url: "https://www.wowtires.com/",
    image: "https://www.wowtires.com/og-image.jpg",
    logo: "https://www.wowtires.com/logo.webp",
    description:
      "Scheduled mobile tire replacement and TPMS sensor service. We come to your home or workplace in Augusta & Rockingham County, VA.",
    telephone: "+1-540-458-4737",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Augusta County, Virginia" },
      { "@type": "AdministrativeArea", name: "Rockingham County, Virginia" },
    ],
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "17:00",
    }],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-540-458-4737",
      contactType: "customer service",
      availableLanguage: "English",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mobile tire services",
      itemListElement: [
        "Mobile tire replacement",
        "Tire mounting and balancing",
        "TPMS sensor replacement and programming",
        "Minor tire repairs",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <Hero />
        <Reveal direction="up">
          <Testimonials />
        </Reveal>
        <Reveal direction="up">
          <Services />
        </Reveal>
        <Reveal direction="up">
          <HowItWorks />
        </Reveal>
        <Reveal direction="up">
          <QuoteForm />
        </Reveal>
        <Reveal direction="up">
          <WhyChooseUs />
        </Reveal>
        <Reveal direction="up">
          <ServiceArea />
        </Reveal>
        <Reveal direction="up">
          <FAQ />
        </Reveal>


        <Reveal direction="up">
          <Contact />
        </Reveal>
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Index;
