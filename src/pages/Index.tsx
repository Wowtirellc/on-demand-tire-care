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
    name: "Wheels on Wheels",
    description:
      "Scheduled mobile tire replacement and TPMS sensor service. We come to your home or workplace in Augusta & Rockingham County, VA.",
    telephone: "+1-540-458-4737",
    areaServed: ["Augusta County, VA", "Rockingham County, VA"],
    openingHours: "Mo-Sa 08:00-18:00",
    serviceType: ["Mobile tire replacement", "Tire mounting and balancing", "TPMS sensor replacement", "TPMS programming"],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Services />
        <QuoteForm />
        <WhyChooseUs />
        <ServiceArea />
        <FAQ />
        {/* <Testimonials /> Temporarily hidden until we have legitimate reviews. Re-enable to restore. */}
        <Contact />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Index;
