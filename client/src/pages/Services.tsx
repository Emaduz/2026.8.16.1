import { ArrowUpRight, BriefcaseBusiness, Layers3, PenTool, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useMemo } from "react";
import { trpc } from "@/lib/trpc";
import SiteChrome from "@/components/SiteChrome";

const fallbackServices = [
  { number: "01", title: "Branding", description: "Visual direction and identity systems with a strong, consistent point of view.", details: "Strategy / Positioning / Visual language" },
  { number: "02", title: "Logo Design", description: "Distinctive symbols and wordmarks that give brands their own signature.", details: "Naming / Symbols / Wordmarks" },
  { number: "03", title: "Print Design", description: "Editorial and printed touchpoints that feel as considered as the brand itself.", details: "Editorial / Packaging / Collateral" },
];

const fallbackCopy = {
  eyebrow: "What I do",
  title: "Crafted for",
  accent: "clarity.",
  intro: "From first sketch to final system, every detail has a reason to be there.",
  offerEyebrow: "The studio offer",
  offerTitle: "Small list.",
  offerAccent: "Deep attention.",
  offerDescription: "Focused services for people and teams who want their ideas to look as considered as they feel.",
};

const fallbackProcess = {
  eyebrow: "The process",
  title: "Simple, thoughtful,",
  accent: "intentional.",
  description: "Good work gets better when the path to it is clear.",
  steps: [
    { number: "01", title: "Discover", description: "We clarify the idea, audience, and opportunity before making anything." },
    { number: "02", title: "Define", description: "We shape a visual direction that gives the project a clear point of view." },
    { number: "03", title: "Deliver", description: "We build the final system and hand over the tools to use it with confidence." },
  ],
};

function parseJson(value: unknown, fallback: any) {
  try { const parsed = JSON.parse(String(value || "null")); return parsed || fallback; } catch { return fallback; }
}

export default function Services() {
  const { data } = trpc.content.publicHome.useQuery();
  const sections = data?.sections || [];
  const services = useMemo(() => { const parsed = parseJson(sections.find((item: any) => item.key === "services")?.content, null); return Array.isArray(parsed) && parsed.length === 3 ? parsed : fallbackServices; }, [sections]);
  const copy = useMemo(() => ({ ...fallbackCopy, ...parseJson(sections.find((item: any) => item.key === "services_copy")?.content, {}) }), [sections]);
  const process = useMemo(() => { const parsed = parseJson(sections.find((item: any) => item.key === "services_process")?.content, fallbackProcess); return { ...fallbackProcess, ...parsed, steps: Array.isArray(parsed.steps) && parsed.steps.length === 3 ? parsed.steps : fallbackProcess.steps }; }, [sections]);

  return <SiteChrome>
    <div className="inner-page services-page">
      <section className="inner-hero site-shell" data-reveal="hero"><div><span className="eyebrow"><span className="eyebrow-line" /> {copy.eyebrow}</span><h1>{copy.title}<br /><span>{copy.accent}</span></h1><p>{copy.intro}</p></div><div className="inner-hero-mark"><Layers3 size={24} /><span>Strategy<br />meets craft</span></div></section>
      <section className="services-detail section-block site-shell" data-reveal><div className="section-heading"><div><span className="eyebrow">{copy.offerEyebrow}</span><h2>{copy.offerTitle}<br />{copy.offerAccent}</h2></div><p>{copy.offerDescription}</p></div><div className="services-detail-grid" data-reveal="stagger">{services.map((service: any, index: number) => { const Icon = [PenTool, Sparkles, BriefcaseBusiness][index] || PenTool; return <article className="service-detail-card" key={service.title}><div className="service-detail-top"><div className="service-icon"><Icon size={20} /></div><span>{service.number || String(index + 1).padStart(2, "0")}</span></div><h3>{service.title}</h3><p>{service.description}</p><small>{service.details}</small><ArrowUpRight className="service-detail-arrow" size={22} /></article>; })}</div></section>
      <section className="process-section" data-reveal><div className="site-shell"><div className="section-heading"><div><span className="eyebrow eyebrow-light">{process.eyebrow}</span><h2>{process.title}<br /><em>{process.accent}</em></h2></div><p>{process.description}</p></div><div className="process-grid" data-reveal="stagger">{process.steps.map((step: any) => <div key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></div>)}</div><Link className="button button-light" href="/contact">Discuss your project <ArrowUpRight size={17} /></Link></div></section>
    </div>
  </SiteChrome>;
}
