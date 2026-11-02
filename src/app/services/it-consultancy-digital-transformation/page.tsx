import type { Metadata } from "next";
import { PhotoBand } from "@/components/visuals/PhotoBand";
import { AreasBento, DetailHero, RelatedServices, ScopeSteps, ServiceEnquiry } from "@/components/services/ServiceDetail";
import { getService } from "@/lib/content";

const service = getService("it-consultancy-digital-transformation");

export const metadata: Metadata = { title: service.title, description: service.summary };

export default function Page() {
  return (
    <>
      <DetailHero service={service} variant="split" titleLines={["IT Consultancy &", "Digital Transformation"]} />
      <PhotoBand src="/images/code-screen.jpg" alt="Source code on a monitor in a dimly lit workspace" lines={["Planning, development,", "implementation, improvement."]} />
      <ScopeSteps
        eyebrow="Scope of the service"
        title="From planning to improvement."
        steps={["Planning", "Development", "Implementation", "Improvement"]}
        caption="These stages reflect how the service is described: supporting the planning, development, implementation and improvement of business technology systems. They are not a fixed project methodology."
      />
      <AreasBento areas={service.areas} />
      <RelatedServices current={service.slug} />
      <ServiceEnquiry service={service} />
    </>
  );
}
