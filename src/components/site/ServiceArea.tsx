import { MapPin } from "lucide-react";

const ServiceArea = () => {
  return (
    <section id="area" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-muted/40 p-8 sm:p-12 lg:p-16 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/15 text-secondary mb-6">
            <MapPin className="h-7 w-7" />
          </div>
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Service area</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
            Proudly serving Augusta & Rockingham County, Virginia.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Not sure if you're in our area? Send a quote request and we'll let you know right away.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
            {["Staunton", "Waynesboro", "Harrisonburg", "Bridgewater", "Verona", "Fishersville", "Stuarts Draft", "Mount Crawford"].map((city) => (
              <span key={city} className="rounded-full border border-border bg-background px-3 py-1 text-muted-foreground">
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
