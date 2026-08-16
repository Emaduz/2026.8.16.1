import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useMemo } from "react";
import { trpc } from "@/lib/trpc";
import SiteChrome from "@/components/SiteChrome";

function section(data: any, key: string) { return data?.sections?.find((item: any) => item.key === key); }
function parseLinks(content?: string) { try { return content ? JSON.parse(content) : {}; } catch { return {}; } }

export default function Contact() {
  const { data } = trpc.content.publicHome.useQuery();
  const contact = section(data, "contact");
  const links = parseLinks(section(data, "links")?.content);
  const email = contact?.title || "info@emadalddine.com";
  const phone = contact?.subtitle || "+966 504487308";
  const whatsappHref = `https://wa.me/${phone.replace(/\D/g, "")}`;
  const address = contact?.content || "Al-Madina, Saudi Arabia";
  const social = useMemo(() => ({ instagram: links.instagram || "https://instagram.com/emadalddine", linkedin: links.linkedin || "https://linkedin.com/in/emadalddine", behance: links.behance || "https://behance.net/emadalddine" }), [links.instagram, links.linkedin, links.behance]);
  return <SiteChrome>
    <div className="inner-page contact-page">
      <section className="inner-hero site-shell" data-reveal="hero"><div><span className="eyebrow"><span className="eyebrow-line" /> Let’s create something</span><h1>Ready to start<br /><span>your project?</span></h1><p>Tell me what you are building, where you are going, and what you want people to feel.</p></div><div className="inner-hero-mark"><Send size={24} /><span>Let’s make<br />it visible</span></div></section>
      <section className="contact-detail section-block site-shell" data-reveal><div className="contact-detail-grid" data-reveal="stagger"><div><span className="eyebrow">Get in touch</span><h2>Start with<br /><em>a hello.</em></h2><p className="contact-lead">Whether you have a clear brief or a half-formed idea, I would love to hear about it.</p><div className="contact-list"><a href={`mailto:${email}`}><span className="contact-icon"><Mail size={18} /></span><span><small>Email</small><strong>{email}</strong></span><ArrowUpRight size={18} /></a><a href={`tel:${phone.replaceAll(" ", "")}`}><span className="contact-icon"><MessageCircle size={18} /></span><span><small>Phone / WhatsApp</small><strong>{phone}</strong></span><ArrowUpRight size={18} /></a><div><span className="contact-icon"><MapPin size={18} /></span><span><small>Based in</small><strong>{address}</strong></span></div></div></div><div className="contact-form-card"><span className="eyebrow">A quick note</span><h3>Let’s talk about<br />what’s next.</h3><p>Send an email or message and I’ll get back to you with a clear next step.</p><a className="button button-primary" href={`mailto:${email}?subject=Project%20inquiry`}>Write an email <ArrowUpRight size={17} /></a><a className="button button-ghost" href={whatsappHref} target="_blank" rel="noreferrer">Message on WhatsApp <MessageCircle size={17} /></a></div></div></section>
      <section className="contact-social" data-reveal><div className="site-shell"><span className="eyebrow">Find me elsewhere</span><div className="social-row" data-reveal="stagger"><a href={social.instagram} target="_blank" rel="noreferrer"><Instagram size={18} /> Instagram <ArrowUpRight size={16} /></a><a href={social.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={16} /></a><a href={social.behance} target="_blank" rel="noreferrer"><span className="behance-mark">Bē</span> Behance <ArrowUpRight size={16} /></a></div></div></section>
    </div>
  </SiteChrome>;
}
