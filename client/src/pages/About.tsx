import React from "react";
import { ArrowUpRight, Award, Compass, Palette, PenTool, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import SiteChrome from "@/components/SiteChrome";

const PROFILE = "/manus-storage/profile_4442d81b.jpg";

function section(data: any, key: string) { return data?.sections?.find((item: any) => item.key === key); }

function AboutPortrait() {
  return <div className="about-portrait" aria-label="EmadAlddine profile portrait">
    <div className="about-portrait-orbit about-portrait-orbit-one" />
    <div className="about-portrait-orbit about-portrait-orbit-two" />
    <div className="about-portrait-wrap"><img src={PROFILE} alt="EmadAlddine profile" /></div>
    <div className="floating-note about-note-top"><Sparkles size={15} /><span>Ideas<br /><b>with intent</b></span></div>
    <div className="floating-note about-note-bottom"><Palette size={15} /><span>Branding<br /><b>that lasts</b></span></div>
  </div>;
}

export default function About() {
  const { data } = trpc.content.publicHome.useQuery();
  const about = section(data, "about");
  const hero = section(data, "hero");
  const text = about?.content || "Creative graphic designer with 9+ years of experience in branding and visual identity development.";
  return <SiteChrome>
    <div className="inner-page about-page">
      <section className="inner-hero site-shell" data-reveal="hero"><div><span className="eyebrow"><span className="eyebrow-line" /> A little about me</span><h1>Design with<br /><span>a point of view.</span></h1><p>{hero?.subtitle || "Transforming ideas into impactful visual experiences with 9+ years of expertise."}</p></div><div className="inner-hero-mark"><Compass size={24} /><span>Thoughtful<br />by default</span></div></section>
      <section className="about-story" data-reveal><div className="site-shell about-story-grid" data-reveal="stagger"><AboutPortrait /><div className="about-story-copy"><span className="eyebrow">The person behind the work</span><h2>Every detail should<br /><em>have a reason.</em></h2><p>{text}</p><p>My approach is grounded in clarity: understand the idea, find its strongest expression, and build a visual language that people can recognize and remember. I work across identity, logo, and print to help meaningful ideas become visible.</p><div className="signature-row"><span className="signature">EmadAlddine</span><span className="signature-caption">Senior Graphic Designer</span></div></div></div></section>
      <section className="about-values section-block site-shell" data-reveal><div className="section-heading"><div><span className="eyebrow">How I think</span><h2>Clarity over noise.</h2></div><p>Good collaboration makes good work. These are the principles I bring to every brief.</p></div><div className="values-grid" data-reveal="stagger"><article><div className="service-icon"><Compass size={20} /></div><span>01</span><h3>Find the signal</h3><p>Every project begins by finding the one idea that deserves to be seen first.</p></article><article><div className="service-icon"><PenTool size={20} /></div><span>02</span><h3>Make it useful</h3><p>Beautiful systems should also be practical, consistent, and easy to use.</p></article><article><div className="service-icon"><Award size={20} /></div><span>03</span><h3>Make it last</h3><p>Strong design is built for recognition today and relevance tomorrow.</p></article></div></section>
      <section className="about-cta-section" data-reveal><div className="site-shell"><span className="eyebrow eyebrow-light">A considered partnership</span><h2>Have an idea<br /><em>worth seeing?</em></h2><Link className="button button-light" href="/contact">Let’s talk <ArrowUpRight size={17} /></Link></div></section>
    </div>
  </SiteChrome>;
}
