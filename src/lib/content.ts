/**
 * All company copy lives here. Every statement is taken from, or a close
 * paraphrase of, docs/handoff/company-profile-source.txt — the only approved
 * source of company facts. Do not add claims that are not in that file.
 */

export const company = {
  name: "Kingswell Orion Ltd",
  location: "Ireland-based",
  tagline: "IT Consultancy | Software Quality Assurance | Regulatory Compliance | Technology Risk Management",
  // Section 1 — Company Overview
  overview: [
    "Kingswell Orion Ltd is an Ireland-based Information Technology and Consultancy company specialising in IT solutions, software quality assurance, regulatory compliance, digital transformation and technology risk management.",
    "The company provides professional consultancy and technology services to businesses seeking to improve operational efficiency, strengthen internal controls, enhance software quality and maintain compliance with applicable industry standards and regulatory requirements.",
    "Our services focus on supporting organisations in developing reliable IT systems, establishing effective quality management frameworks and implementing structured compliance processes.",
  ],
  aim: "The company aims to deliver technology solutions that meet business requirements while maintaining high standards of quality, security, documentation and regulatory compliance.",
  short:
    "An Ireland-based IT and consultancy company specialising in IT solutions, software quality assurance, regulatory compliance, digital transformation and technology risk management.",
  // Section 7 — Commitment to Quality and Compliance
  commitment: [
    "Kingswell Orion Ltd is committed to delivering reliable technology and consultancy services through professional standards, effective quality management and responsible business practices.",
    "The company recognises the importance of maintaining appropriate regulatory compliance processes, transparent documentation, risk management and continuous improvement.",
    "Through its quality assurance and regulatory compliance activities, the company aims to strengthen service delivery, protect client interests and support sustainable business development.",
  ],
};

export const conditionalNotice =
  "Specialist services are undertaken only where the necessary technical competence, resources and client requirements are in place.";

export type ServiceSlug =
  | "it-consultancy-digital-transformation"
  | "software-quality-assurance"
  | "regulatory-compliance-governance"
  | "it-risk-management"
  | "regulated-industry-quality";

export type Service = {
  slug: ServiceSlug;
  number: string;
  title: string;
  short: string;
  summary: string;
  areas: string[];
};

// Section 2 — Core Business Activities (A–E). Lists are "Services may include".
export const services: Service[] = [
  {
    slug: "it-consultancy-digital-transformation",
    number: "01",
    title: "IT Consultancy & Digital Transformation",
    short: "IT Consultancy",
    summary:
      "Consultancy services to support the planning, development, implementation and improvement of business technology systems.",
    areas: [
      "IT systems assessment and business process analysis",
      "Digital transformation planning and implementation",
      "Software implementation and system integration",
      "IT process improvement and workflow optimisation",
      "Technology documentation and operational reporting",
      "IT project coordination and systems performance evaluation",
    ],
  },
  {
    slug: "software-quality-assurance",
    number: "02",
    title: "Software Quality Assurance & Quality Management",
    short: "Software QA",
    summary:
      "Supporting organisations in establishing structured quality assurance processes for software applications and IT systems.",
    areas: [
      "Development and implementation of software quality assurance procedures",
      "Software quality standards and compliance assessments",
      "Quality management system documentation",
      "Software testing governance and quality review",
      "Identification and management of quality-related risks",
      "Preparation of quality reports and corrective action plans",
      "Continuous improvement of quality management procedures",
    ],
  },
  {
    slug: "regulatory-compliance-governance",
    number: "03",
    title: "Regulatory Compliance & Technology Governance",
    short: "Compliance & Governance",
    summary:
      "Consultancy and support services relating to regulatory compliance, technology governance and organisational quality standards.",
    areas: [
      "Assessment of applicable regulatory and compliance requirements",
      "Development and review of internal compliance procedures",
      "Regulatory documentation and compliance reporting",
      "Technology governance and risk assessments",
      "Internal compliance monitoring and audit preparation",
      "Review of policies, procedures and operational controls",
      "Corrective and preventive action (CAPA) management",
      "Monitoring changes to applicable regulations and industry standards",
    ],
  },
  {
    slug: "it-risk-management",
    number: "04",
    title: "IT Risk Management & Internal Controls",
    short: "IT Risk",
    summary:
      "Assisting businesses in identifying, assessing and managing operational and technology-related risks.",
    areas: [
      "IT risk assessments and compliance reviews",
      "Development of risk management procedures",
      "Internal control evaluation",
      "Documentation of compliance findings",
      "Risk mitigation planning",
      "Internal quality and compliance audits",
      "Monitoring and reporting of corrective actions",
    ],
  },
  {
    slug: "regulated-industry-quality",
    number: "05",
    title: "Quality & Compliance Solutions for Regulated Industries",
    short: "Regulated Industries",
    summary:
      "Where relevant to the company's actual client services, support may be offered to organisations operating in regulated industries, including healthcare, pharmaceuticals, biotechnology and medical technology.",
    areas: [
      "Quality management documentation",
      "Regulatory compliance process reviews",
      "Computerised systems validation documentation",
      "Software quality assurance for regulated applications",
      "Compliance with applicable GxP requirements",
      "Electronic records and data integrity assessments",
      "Audit readiness and quality system improvements",
      "Risk-based quality management",
    ],
  },
];

export function getService(slug: ServiceSlug): Service {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service: ${slug}`);
  return s;
}

export const sectors = [
  { key: "healthcare", name: "Healthcare" },
  { key: "pharmaceuticals", name: "Pharmaceuticals" },
  { key: "biotechnology", name: "Biotechnology" },
  { key: "medtech", name: "Medical Technology" },
] as const;

// Section 3 — Quality Assurance & Regulatory Compliance Function
export const qualityFunction = {
  intro:
    "As part of its business operations, Kingswell Orion Ltd maintains a dedicated focus on quality assurance, regulatory compliance and risk management.",
  scope:
    "This function supports the development and implementation of quality standards across the company's IT consultancy services, software solutions and internal operational processes.",
  responsibility:
    "The function is responsible for ensuring that applicable quality management procedures, regulatory requirements and compliance controls are appropriately documented, implemented, monitored and reviewed.",
  // The ten activities, verbatim from the profile.
  activities: [
    "Reviewing applicable regulatory and quality requirements",
    "Developing and maintaining quality assurance policies and procedures",
    "Monitoring compliance with relevant industry standards",
    "Conducting quality and compliance risk assessments",
    "Coordinating internal quality audits and compliance reviews",
    "Maintaining regulatory and quality documentation",
    "Investigating quality-related non-conformances",
    "Supporting corrective and preventive action programmes",
    "Preparing quality and compliance reports for management",
    "Supporting continuous improvement initiatives",
  ],
};

/**
 * Visual organisation of the stated quality activities into eight stages for
 * the timeline. Each stage cites the profile activities it groups. This is
 * not an official or mandatory workflow.
 */
export const qualityStages = [
  {
    label: "Requirements",
    title: "Reviewing applicable requirements",
    activities: [0],
  },
  {
    label: "Policies",
    title: "Documented policies and procedures",
    activities: [1],
  },
  {
    label: "Risk",
    title: "Quality and compliance risk assessments",
    activities: [3],
  },
  {
    label: "Audits",
    title: "Internal audits and compliance reviews",
    activities: [4, 2],
  },
  {
    label: "Records",
    title: "Documentation and reporting",
    activities: [5, 8],
  },
  {
    label: "Non-conformance",
    title: "Investigating non-conformances",
    activities: [6],
  },
  {
    label: "CAPA",
    title: "Corrective and preventive action",
    activities: [7],
  },
  {
    label: "Improvement",
    title: "Continuous improvement",
    activities: [9],
  },
] as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/quality-compliance", label: "Quality & Compliance" },
  { href: "/contact", label: "Contact" },
] as const;
