import React, { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers3, Mouse } from "lucide-react";
import SiteChrome from "@/components/SiteChrome";
import { trpc } from "@/lib/trpc";
import { getWheelDirection } from "@/lib/navigationInteractions";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const CORPORATE_IMG = "/manus-storage/corporate-branding_c33e39f0.jpg";
const LOGO_IMG = "/manus-storage/logo-collection_8e7aa400.jpg";
const PRINT_IMG = "/manus-storage/print-materials_2f16b717.jpg";

export const fallbackProjects = [
  {
    id: 1,
    title: "ERA shopping Logo & Brand",
    category: "Branding & Identity",
    description: "A comprehensive brand identity system featuring logo design, symbol library, retail touchpoints, and brand pattern applications.",
    imageUrl: CORPORATE_IMG,
    clientName: "ERA Shopping",
    slides: [
      { id: 101, title: "01 / Main Logo & Symbol", description: "The primary logotype and monogram paired with geometric geometric brand patterns.", imageUrl: CORPORATE_IMG, displayOrder: 1 },
      { id: 102, title: "02 / Brand Applications", description: "Stationery, retail packaging, and contextual brand touchpoints in action.", imageUrl: LOGO_IMG, displayOrder: 2 },
      { id: 103, title: "03 / Typography & Guidelines", description: "Color palettes and typography hierarchy designed for long-term recognition.", imageUrl: PRINT_IMG, displayOrder: 3 },
    ]
  },
  {
    id: 2,
    title: "Logo Design Collection",
    category: "Logo Design",
    description: "A curated series of distinctive wordmarks and brand symbols crafted to give each idea its own memorable signature.",
    imageUrl: LOGO_IMG,
    clientName: "Symbol Library",
    slides: [
      { id: 201, title: "01 / Monogram Concepts", description: "Explorations of letterforms and organic geometry for bespoke identities.", imageUrl: LOGO_IMG, displayOrder: 1 },
      { id: 202, title: "02 / Symbol Variations", description: "Alternative lockups designed for digital and print environments.", imageUrl: CORPORATE_IMG, displayOrder: 2 },
    ]
  },
  {
    id: 3,
    title: "Print & Editorial Suite",
    category: "Print Design",
    description: "Tactile brand touchpoints, menus, and editorial layouts where composition and detail do the talking.",
    imageUrl: PRINT_IMG,
    clientName: "Editorial Suite",
    slides: [
      { id: 301, title: "01 / Menu Layout & Typography", description: "Clear grid hierarchy and warm editorial spacing for hospitality branding.", imageUrl: PRINT_IMG, displayOrder: 1 },
      { id: 302, title: "02 / Packaging & Touchpoints", description: "Printed collateral designed for tactile engagement and lasting recall.", imageUrl: CORPORATE_IMG, displayOrder: 2 },
    ]
  }
];

function ProjectCarouselCard({ project, globalIndex }: { project: any; globalIndex: number }) {
  const [api, setApi] = useState<CarouselApi>();
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = project.slides && project.slides.length > 0 ? project.slides : [
    { id: 1, title: project.title, description: project.description, imageUrl: project.imageUrl || CORPORATE_IMG, displayOrder: 1 }
  ];

  useEffect(() => {
    if (!api) return;
    const update = () => setSlideIndex(api.selectedScrollSnap());
    update();
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const dir = getWheelDirection(event.deltaY, event.deltaX);
    if (!api || dir === 0) return;
    event.preventDefault();
    if (dir > 0) api.scrollNext(); else api.scrollPrev();
  };

  return (
    <article className="portfolio-card portfolio-nested-card" data-reveal="media">
      <div className="portfolio-card-media" onWheel={handleWheel}>
        <Carousel setApi={setApi} opts={{ loop: true, align: "start" }}>
          <CarouselContent>
            {slides.map((slide: any, sIdx: number) => (
              <CarouselItem key={slide.id || sIdx} className="portfolio-subslide">
                <div className="subslide-image-wrap">
                  <img src={slide.imageUrl || project.imageUrl || CORPORATE_IMG} alt={slide.title} />
                  <span className="portfolio-card-index">0{globalIndex + 1} • slide {sIdx + 1}/{slides.length}</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="carousel-control carousel-control-prev" />
          <CarouselNext className="carousel-control carousel-control-next" />
        </Carousel>
      </div>
      <div className="portfolio-card-copy">
        <div>
          <span className="eyebrow">{project.category}</span>
          <h3>{project.title}</h3>
          <p>{slides[slideIndex]?.description || project.description}</p>
          <div className="project-slide-meta">
            <span className="slide-title-tag">{slides[slideIndex]?.title || project.clientName || "Project stage"}</span>
            <span className="slide-counter">{String(slideIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>
        <ArrowUpRight size={24} />
      </div>
    </article>
  );
}

export default function Portfolio() {
  const { data, isLoading } = trpc.content.publicHome.useQuery();
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const rawProjects = data?.projects?.length ? data.projects : fallbackProjects;
  const projects = rawProjects.map((p: any) => ({
    ...p,
    slides: p.slides && p.slides.length > 0 ? p.slides : [
      { id: p.id * 10, title: p.title, description: p.description, imageUrl: p.imageUrl || CORPORATE_IMG, displayOrder: 1 }
    ]
  }));

  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update();
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);

  const handleMainWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const direction = getWheelDirection(event.deltaY, event.deltaX);
    if (!api || direction === 0) return;
    event.preventDefault();
    if (direction > 0) api.scrollNext(); else api.scrollPrev();
  };

  return (
    <SiteChrome>
      <div className="inner-page portfolio-page">
        <section className="inner-hero site-shell" data-reveal="hero">
          <div>
            <span className="eyebrow"><span className="eyebrow-line" /> Selected work</span>
            <h1>Projects with<br /><span>a point of view.</span></h1>
            <p>Explore a curated selection of identity, logo, and print work crafted for clarity and lasting recognition.</p>
          </div>
          <div className="inner-hero-mark">
            <Layers3 size={24} />
            <span>{String(projects.length).padStart(2, "0")}<br />selected projects</span>
          </div>
        </section>

        <section className="portfolio-carousel-section site-shell" data-reveal>
          <div className="carousel-intro">
            <div>
              <span className="eyebrow">The portfolio</span>
              <h2>Move through the work.</h2>
            </div>
            <p><Mouse size={16} /> Use project carousels for stages, mockups, and explanations.</p>
          </div>

          <div className="portfolio-carousel-wrap" data-reveal="media" onWheel={handleMainWheel}>
              <Carousel setApi={setApi} opts={{ loop: true, align: "start" }}>
                <CarouselContent>
                  {projects.map((project: any, index: number) => (
                    <CarouselItem key={project.id} className="portfolio-slide">
                      <ProjectCarouselCard project={project} globalIndex={index} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="carousel-control carousel-control-prev" />
                <CarouselNext className="carousel-control carousel-control-next" />
              </Carousel>
          </div>

          <div className="carousel-footer" data-reveal="stagger">
            <div className="carousel-dots">
              {projects.map((project: any, index: number) => (
                <button key={project.id} aria-label={`Go to project ${index + 1}`} className={selected === index ? "is-active" : ""} onClick={() => api?.scrollTo(index)}>
                  <span>0{index + 1}</span>
                </button>
              ))}
            </div>
            <div className="carousel-caption">
              <span>Scroll to explore projects</span>
              <div className="caption-line" />
              <span>{String(selected + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            </div>
          </div>
        </section>

        <section className="portfolio-note" data-reveal>
          <div className="site-shell">
            <span className="eyebrow eyebrow-light">Built with intention</span>
            <h2>Good design makes<br /><em>ideas easier to remember.</em></h2>
            <p>Every project starts with a question, then becomes a visual system made to work in the real world.</p>
            <a href="mailto:info@emadalddine.com" className="button button-light">Start a project <ArrowUpRight size={17} /></a>
          </div>
        </section>
      </div>
    </SiteChrome>
  );
}
