import type { Metadata } from "next";
import { PhotoBand } from "@/components/visuals/PhotoBand";
import { AreasMatrix, DetailHero, RelatedServices, ScopeSteps, ServiceEnquiry } from "@/components/services/ServiceDetail";
import { getService } from "@/lib/content";

const service = getService("it-risk-management");

export const metadata: Metadata = { title: service.title, description: service.summary };

export default function Page() {
  return (
    <>
      <DetailHero service={service} variant="split" titleLines={["IT Risk Management", "& Internal Controls"]} />
      <PhotoBand src="/images/server-aisle.jpg" alt="Long aisle between rows of server equipment racks" lines={["Identifying, assessing and", "managing technology risk."]} />
      <AreasMatrix areas={service.areas} />
      <ScopeSteps
        eyebrow="Scope of the service"
        title="Identify. Assess. Manage."
        steps={["Identifying risks", "Assessing risks", "Managing risks"]}
        caption="Reflects how the service is described: assisting businesses in identifying, assessing and managing operational and technology-related risks. Not a fixed methodology."
      />
      <RelatedServices current={service.slug} light />
      <ServiceEnquiry service={service} />
    </>
  );
}
