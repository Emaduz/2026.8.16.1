import { ArrowUpRight, BriefcaseBusiness, ChevronRight, FileText, Palette, PenTool, Sparkles } from "lucide-react";
import React, { useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import SiteChrome from "@/components/SiteChrome";

const ASSETS = {
  profile: "/manus-storage/profile_4442d81b.jpg",
  corporate: "/manus-storage/corporate-branding_c33e39f0.jpg",
  logos: "/manus-storage/logo-collection_8e7aa400.jpg",
  print: "/manus-storage/print-materials_2f16b717.jpg",
};

const fallbackProjects = [
  { id: 1, title: "Corporate Branding", category: "Branding", description: "A cohesive visual identity built to make brands clear, credible, and memorable.", imageUrl: ASSETS.corporate },
  { id: 2, title: "Logo Design Collection", category: "Logo Design", description: "A collection of distinctive marks designed to give every idea its own signature.", imageUrl: ASSETS.logos },
  { id: 3, title: "Print Materials", category: "Print Design", description: "Tactile brand touchpoints where composition, typography, and detail do the talking.", imageUrl: ASSETS.print },
];

const fallbackStats = [
  { value: "9+", label: "Years Experience" },
  { value: "200+", label: "Happy Clients" },
  { value: "500+", label: "Projects Completed" },
];

function getSection(sections: any[] | undefined, key: string) {
  return sections?.find(section => section.key === key);
}

function splitWords(value: string) {
  const words = value.split(" ");
  if (words.length < 3) return value;
  return <>{words.slice(0, -1).join(" ")}<br /><span>{words[words.length - 1]}</span></>;
}

export default function Home() {
  const { data, isLoading } = trpc.content.publicHome.useQuery();
  const hero = getSection(data?.sections, "hero");
  const about = getSection(data?.sections, "about");
  const contact = getSection(data?.sections, "contact");
  const statsSection = getSection(data?.sections, "stats");
  const projects = data?.projects?.length ? data.projects : fallbackProjects;
  const stats = useMemo(() => {
    try {
      const parsed = statsSection?.content ? JSON.parse(statsSection.content) : null;
      return Array.isArray(parsed) && parsed.length ? parsed : fallbackStats;
    } catch {
      return fallbackStats;
    }
  }, [statsSection?.content]);
  const displayHeroTitle = hero?.title || "Creative Design Solutions";
  const displayHeroSubtitle = hero?.subtitle || "Transforming ideas into impactful visual experiences with 9+ years of expertise";
  const displayAbout = about?.content || "Creative graphic designer with 9+ years of experience in branding and visual identity development.";
  const phone = contact?.subtitle || "+966 504487308";
  const whatsappHref = `https://wa.me/${phone.replace(/\D/g, "")}`;

  return <SiteChrome>
    <div className="home-page">
      <section className="hero-section site-shell" data-reveal="hero">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> Independent creative partner</div><h1>{splitWords(displayHeroTitle)}</h1><p className="hero-description">{displayHeroSubtitle}</p><div className="hero-actions"><Link className="button button-primary" href="/portfolio">See My Work <ArrowUpRight size={17} /></Link><Link className="button button-ghost" href="/contact">Hire Me <ChevronRight size={17} /></Link></div><div className="stats-row" aria-label="Experience statistics">{stats.map((stat: any) => <div className="stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div>
        <div className="hero-visual" data-reveal="media" aria-label="EmadAlddine profile image"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-image-wrap"><img src={ASSETS.profile} alt="EmadAlddine profile" /></div><div className="floating-note note-top"><Sparkles size={15} /><span>Ideas<br /><b>with intent</b></span></div><div className="floating-note note-bottom"><Palette size={15} /><span>Branding<br /><b>that lasts</b></span></div></div>
      </section>

      <section className="section-block site-shell home-preview-section" data-reveal><div className="section-heading"><div><span className="eyebrow">Selected work</span><h2>Featured Work</h2></div><p>A showcase of recent creative projects and design solutions.</p></div>{isLoading ? <div className="loading-line">Loading the latest work...</div> : <div className="projects-grid" data-reveal="stagger">{projects.slice(0, 3).map((project: any, index: number) => <article className={`project-card project-card-${index + 1}`} key={project.id}><div className="project-image"><img src={project.imageUrl || ASSETS.corporate} alt={project.title} /><span className="project-index">0{index + 1}</span></div><div className="project-meta"><div><span>{project.category}</span><h3>{project.title}</h3><p>{project.description}</p></div><ArrowUpRight size={21} /></div></article>)}</div>}<div className="section-link-row"><Link className="text-link" href="/portfolio">Explore the full portfolio <ArrowUpRight size={16} /></Link><span>Branding / Logo Design / Print Design</span></div></section>

      <section className="about-section" data-reveal><div className="site-shell about-grid"><div className="about-image"><img src={ASSETS.profile} alt="EmadAlddine profile" /><span>Profile</span></div><div className="about-copy"><span className="eyebrow">A little about me</span><h2>Design with a point of view.</h2><p>{displayAbout}</p><p className="muted-copy">Every project is an opportunity to make an idea more visible, more considered, and easier to remember.</p><div className="signature-row"><span className="signature">EmadAlddine</span><span className="signature-caption">Senior Graphic Designer</span></div><Link className="button button-light about-cta" href="/about">More about me <ArrowUpRight size={17} /></Link></div></div></section>

      <section className="section-block services-section site-shell" data-reveal><div className="section-heading"><div><span className="eyebrow">What I do</span><h2>Crafted for clarity.</h2></div><p>From first sketch to final system, every detail has a reason to be there.</p></div><div className="services-grid" data-reveal="stagger"><div className="service-item"><div className="service-icon"><PenTool size={20} /></div><span>01</span><h3>Branding</h3><p>Visual direction and identity systems with a strong, consistent point of view.</p></div><div className="service-item"><div className="service-icon"><Sparkles size={20} /></div><span>02</span><h3>Logo Design</h3><p>Distinctive symbols and wordmarks that give brands their own signature.</p></div><div className="service-item"><div className="service-icon"><BriefcaseBusiness size={20} /></div><span>03</span><h3>Print Design</h3><p>Editorial and printed touchpoints that feel as considered as the brand itself.</p></div></div><div className="section-link-row"><Link className="text-link" href="/services">View services <ArrowUpRight size={16} /></Link><span>Strategy / Identity / Print</span></div></section>

      <section className="section-block posts-section site-shell" data-reveal><div className="section-heading"><div><span className="eyebrow">Journal</span><h2>Notes & updates.</h2></div><p>Published thoughts, observations, and useful details from the studio.</p></div>{data?.posts?.length ? <div className="posts-grid" data-reveal="stagger">{data.posts.slice(0, 3).map((post: any) => <article className="post-card" key={post.id}><div className="post-card-top">{post.imageUrl ? <img src={post.imageUrl} alt="" /> : <div className="post-placeholder"><FileText size={20} /></div>}</div><div className="post-card-body"><span>{new Date(post.publishedAt).toLocaleDateString()}</span><h3>{post.title}</h3><p>{post.summary}</p></div></article>)}</div> : <div className="posts-empty"><FileText size={20} /><p>No published posts yet.</p><span>New notes will appear here when they are published from the control panel.</span></div>}</section>

      <section className="contact-section site-shell" data-reveal><div className="contact-inner"><div><span className="eyebrow eyebrow-light">Let’s create something</span><h2>Ready to start<br /><em>your project?</em></h2><p>Let’s work together to create something amazing. Contact me today to discuss your design needs.</p></div><div className="contact-actions"><Link className="button button-light" href="/contact">Contact <ArrowUpRight size={17} /></Link><a className="button button-outline-light" href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={17} /></a></div></div></section>
    </div>
  </SiteChrome>;
}
