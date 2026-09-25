import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type MouseEventHandler,
  type ReactNode,
} from "react";

type Navigate = (to: string) => void;

type Project = {
  number: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  disciplines: string[];
  image: string;
  imageAlt: string;
  statement: string;
  challenge: string;
  approach: string;
  result: string;
  technology: string[];
};

type Service = {
  number: string;
  slug: string;
  title: string;
  summary: string;
  detail: string;
  visual: string;
  deliverables: string[];
};

const projects: Project[] = [
  {
    number: "01",
    slug: "stillform",
    title: "Stillform",
    client: "Stillform Architecture",
    year: "2025",
    category: "Architecture / Digital flagship",
    disciplines: ["Digital strategy", "Creative direction", "Web development"],
    image: "/images/project-01.jpg",
    imageAlt: "A quiet concrete pavilion reflecting across dark water at dusk",
    statement: "Space to think. A digital world with the same quiet conviction as the work it holds.",
    challenge: "Stillform's architecture was built around restraint, material and light. Its digital presence needed to carry that same feeling without turning a considered body of work into a catalogue.",
    approach: "We gave the portfolio room to breathe: a slower editorial rhythm, precise transitions and a flexible publishing system that lets each project have its own point of view.",
    result: "A new digital home for the practice: calm to explore, clear to navigate and built to grow with the next generation of work.",
    technology: ["React", "TypeScript", "Sanity", "GSAP"],
  },
  {
    number: "02",
    slug: "morrow",
    title: "Morrow",
    client: "Morrow Objects",
    year: "2025",
    category: "E-commerce / Brand experience",
    disciplines: ["Experience design", "Shopify", "Performance"],
    image: "/images/project-02.jpg",
    imageAlt: "Amber glass fragrance and stone objects in a dramatic pool of light",
    statement: "A little more ritual. An online shop made to slow the scroll and sharpen the senses.",
    challenge: "A new fragrance house needed a store that could feel intimate and tactile while making a small, considered product range effortless to discover and buy.",
    approach: "We paired an expressive art direction with a deliberately simple shopping journey. Product details, storytelling and checkout share one visual language, from the first note to the final click.",
    result: "A focused commerce experience that puts the object first and makes every step from discovery to delivery feel considered.",
    technology: ["Shopify", "Liquid", "React", "Motion design"],
  },
  {
    number: "03",
    slug: "afterhours",
    title: "Afterhours",
    client: "Afterhours Culture",
    year: "2024",
    category: "Digital platform / Culture",
    disciplines: ["Product design", "Creative technology", "Web development"],
    image: "/images/project-03.jpg",
    imageAlt: "A dancer in a cobalt rehearsal room, caught mid-movement",
    statement: "Culture after dark. A restless digital platform for people who make things happen.",
    challenge: "Afterhours connects a changing community of artists, venues and ideas. The old site could not keep up with the energy or the pace of the programme.",
    approach: "We made a living index: flexible enough for last-minute changes, expressive enough for each event to feel like its own world, and fast on the devices people actually use.",
    result: "A cultural platform with a stronger voice and a lighter publishing workflow for the people behind it.",
    technology: ["Next.js", "Headless CMS", "GSAP", "Vercel"],
  },
  {
    number: "04",
    slug: "form-field",
    title: "Form / Field",
    client: "Form / Field Studio",
    year: "2024",
    category: "E-commerce / Editorial",
    disciplines: ["Digital art direction", "Shopify", "Frontend"],
    image: "/images/project-04.jpg",
    imageAlt: "A solitary figure in a sculptural black garment inside a limestone corridor",
    statement: "Objects with a point of view. A considered store for a studio that moves between form and fashion.",
    challenge: "Form / Field needed one coherent place for limited collections, studio notes and product stories without flattening the differences between them.",
    approach: "We shaped a modular editorial system around large images, concise writing and a direct path to each piece. The visual language is intentionally quiet; the collections do the talking.",
    result: "A storefront that feels like an extension of the studio and can shift as new collections and collaborations arrive.",
    technology: ["Shopify", "Liquid", "TypeScript", "CSS motion"],
  },
];

const services: Service[] = [
  {
    number: "01",
    slug: "web-development",
    title: "Web development",
    summary: "Digital foundations, made to last.",
    detail: "We turn ambitious direction into resilient, responsive websites. Carefully engineered from the first component to the last pixel, with performance and maintainability built in.",
    visual: "/images/project-01.jpg",
    deliverables: ["Marketing websites", "Creative development", "CMS integration", "Frontend systems"],
  },
  {
    number: "02",
    slug: "ui-ux",
    title: "UI / UX design",
    summary: "Useful can be unforgettable.",
    detail: "We give complex ideas a clear shape. Research, interaction design and visual systems come together in experiences that feel natural to use and distinct to remember.",
    visual: "/images/project-03.jpg",
    deliverables: ["Research and strategy", "Information architecture", "Interaction design", "Design systems"],
  },
  {
    number: "03",
    slug: "digital-experiences",
    title: "Digital experiences",
    summary: "More feeling, less formula.",
    detail: "From immersive storytelling to useful product moments, we build digital experiences with a point of view: expressive on the surface, thoughtful underneath.",
    visual: "/images/letwise-hero.jpg",
    deliverables: ["Creative direction", "Motion and interaction", "Campaign experiences", "Prototyping"],
  },
  {
    number: "04",
    slug: "e-commerce",
    title: "E-commerce",
    summary: "A better reason to stay, a simpler way to buy.",
    detail: "We make commerce feel like part of the brand, not a separate utility. Clear journeys, considered product storytelling and robust integrations help customers move with confidence.",
    visual: "/images/project-02.jpg",
    deliverables: ["Shopify storefronts", "Commerce strategy", "Product storytelling", "Checkout optimization"],
  },
  {
    number: "05",
    slug: "web-applications",
    title: "Web applications",
    summary: "Tools people want to use.",
    detail: "We design and develop practical web products for real people and real workflows, balancing useful functionality with the care and clarity of a crafted interface.",
    visual: "/images/project-03.jpg",
    deliverables: ["Product definition", "Interface systems", "Full-stack development", "Ongoing iteration"],
  },
  {
    number: "06",
    slug: "performance",
    title: "Performance",
    summary: "Fast is a feeling.",
    detail: "A beautiful experience should be immediate. We find the friction, remove the weight and make every interaction feel more responsive across devices and networks.",
    visual: "/images/project-04.jpg",
    deliverables: ["Technical audits", "Core Web Vitals", "Accessibility reviews", "Continuous optimization"],
  },
];

const processSteps = [
  { number: "01", title: "Discover", text: "We get close to the people, context and ambition behind the brief." },
  { number: "02", title: "Define", text: "We find the sharpest idea, then give it a clear structure and direction." },
  { number: "03", title: "Design", text: "We shape the visual system and interactions around the experience." },
  { number: "04", title: "Develop", text: "We build the idea into a fast, accessible and flexible digital product." },
  { number: "05", title: "Refine", text: "We test the details, tune the performance and make the small things matter." },
  { number: "06", title: "Launch", text: "We put it into the world, then stay close as it learns and grows." },
];

const technologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "GSAP",
  "Three.js",
  "WebGL",
  "WordPress",
  "Shopify",
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
      focusable="false"
    >
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" />
      ) : (
        <path d="M2.5 10h14m-5.5-5.5L16.5 10 11 15.5" />
      )}
    </svg>
  );
}

type SiteLinkProps = {
  to: string;
  navigate: Navigate;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  tabIndex?: number;
  "aria-label"?: string;
  "aria-current"?: "page" | undefined;
  "data-cursor"?: string;
  "data-magnetic"?: string;
};

function SiteLink({
  to,
  navigate,
  children,
  className,
  onClick,
  ...attributes
}: SiteLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    navigate(to);
  }

  return (
    <a href={to} className={className} onClick={handleClick} {...attributes}>
      {children}
    </a>
  );
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Header({ path, navigate }: { path: string; navigate: Navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);
  const normalizedPath = path.replace(/\/$/, "") || "/";
  const links = [
    { label: "Work", to: "/work" },
    { label: "Services", to: "/services" },
    { label: "Studio", to: "/studio" },
    { label: "Contact", to: "/contact" },
  ];

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    if (menuOpen) {
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLAnchorElement>("#mobile-navigation nav a")?.focus();
      });
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
      if (menuOpen && event.key === "Tab") {
        const menuItems = Array.from(document.querySelectorAll<HTMLAnchorElement>("#mobile-navigation a"));
        const first = menuItems[0];
        const last = menuItems[menuItems.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("menu-is-open");
      if (menuOpen) menuToggleRef.current?.focus();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <SiteLink
          to="/"
          navigate={navigate}
          className="wordmark"
          aria-label="LETWISE home"
          onClick={() => setMenuOpen(false)}
        >
          LETWISE<span>.</span>
        </SiteLink>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => {
            const isActive =
              normalizedPath === link.to || normalizedPath.startsWith(`${link.to}/`);
            return (
              <SiteLink
                key={link.to}
                to={link.to}
                navigate={navigate}
                className={`nav-link ${isActive ? "is-current" : ""}`}
                aria-current={isActive ? "page" : undefined}
                data-cursor="OPEN"
              >
                {link.label}
              </SiteLink>
            );
          })}
          <span className="nav-signal" aria-hidden="true">
            <span />
          </span>
        </nav>

        <button
          ref={menuToggleRef}
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-toggle-label">{menuOpen ? "Close" : "Menu"}</span>
          <span className="menu-toggle-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </header>

      <div
        id="mobile-navigation"
        className={`mobile-navigation ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-nav-topline">
          <span>MENU / 01 - 04</span>
          <span>INDEPENDENT DIGITAL STUDIO</span>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <SiteLink
              key={link.to}
              to={link.to}
              navigate={navigate}
              className="mobile-nav-link"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mobile-nav-number">0{index + 1}</span>
              <span>{link.label}</span>
              <ArrowIcon diagonal />
            </SiteLink>
          ))}
        </nav>
        <a className="mobile-nav-email" href="mailto:hello@letwise.com">
          HELLO@LETWISE.COM
        </a>
      </div>
    </>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!cursor || !finePointer.matches) return;

    document.body.dataset.customCursor = "true";
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      });
      const magnet = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-magnetic]");
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        magnet.classList.add("is-magnetized");
        magnet.style.setProperty("--mag-x", `${(event.clientX - rect.left - rect.width / 2) * 0.09}px`);
        magnet.style.setProperty("--mag-y", `${(event.clientY - rect.top - rect.height / 2) * 0.11}px`);
      }
    };
    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      cursor.classList.toggle("is-active", Boolean(target));
      const label = target?.getAttribute("data-cursor") || "";
      cursor.classList.toggle("has-label", Boolean(label));
      const text = cursor.querySelector<HTMLElement>(".cursor-label");
      if (text) text.textContent = label;
    };
    const onOut = (event: PointerEvent) => {
      const related = event.relatedTarget as HTMLElement | null;
      const leavingMagnet = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-magnetic]");
      const nextMagnet = related?.closest<HTMLElement>("[data-magnetic]");
      if (leavingMagnet && leavingMagnet !== nextMagnet) {
        leavingMagnet.classList.remove("is-magnetized");
        leavingMagnet.style.setProperty("--mag-x", "0px");
        leavingMagnet.style.setProperty("--mag-y", "0px");
      }
      const next = related?.closest(
        "[data-cursor], a, button",
      );
      if (next) return;
      cursor.classList.remove("is-active", "has-label");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.body.removeAttribute("data-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span className="cursor-label" />
    </div>
  );
}

function PageIntro({
  marker,
  title,
  body,
}: {
  marker: string;
  title: ReactNode;
  body?: ReactNode;
}) {
  return (
    <section className="page-intro">
      <p className="eyebrow page-intro-marker"><span className="lime-dot" />{marker}</p>
      <h1>{title}</h1>
      {body && <p className="page-intro-body">{body}</p>}
    </section>
  );
}

function ProjectFeature({
  project,
  navigate,
  indexPage = false,
}: {
  project: Project;
  navigate: Navigate;
  indexPage?: boolean;
}) {
  return (
    <SiteLink
      to={`/work/${project.slug}`}
      navigate={navigate}
      className={`project-feature ${indexPage ? "project-feature-index" : ""}`}
      data-cursor="VIEW"
      aria-label={`View ${project.title} case study`}
    >
      <div className="project-feature-topline">
        <span>{project.number} / {project.client}</span>
        <span>{project.category}</span>
      </div>
      <div className="project-art">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
        />
        <span className="project-art-action">Explore project <ArrowIcon diagonal /></span>
      </div>
      <div className="project-feature-caption">
        <h3>{project.title}<span>.</span></h3>
        <span>{project.disciplines.slice(0, 2).join(" / ")}</span>
      </div>
    </SiteLink>
  );
}

function HomeWorkRail({ navigate }: { navigate: Navigate }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (
        window.matchMedia("(max-width: 820px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        section.style.height = "auto";
        track.style.transform = "none";
        if (progressRef.current) progressRef.current.style.width = "100%";
        return;
      }

      const travel = Math.max(0, track.scrollWidth - window.innerWidth * 0.88);
      const scrollLength = window.innerHeight + travel;
      section.style.height = `${scrollLength}px`;
      const top = window.scrollY + section.getBoundingClientRect().top;
      const distance = Math.max(1, scrollLength - window.innerHeight);
      const progress = Math.min(1, Math.max(0, (window.scrollY - top) / distance));
      track.style.transform = `translate3d(${-travel * progress}px, 0, 0)`;
      if (progressRef.current) progressRef.current.style.width = `${progress * 100}%`;
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(requestUpdate) : null;
    resizeObserver?.observe(track);
    requestUpdate();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <section className="work-rail" ref={sectionRef} aria-labelledby="selected-work-title">
      <div className="work-rail-sticky">
        <div className="work-rail-head">
          <div>
            <p className="eyebrow"><span className="lime-dot" />01 - 04 / SELECTED WORK</p>
            <h2 id="selected-work-title">SELECTED<br />WORK<span>.</span></h2>
          </div>
          <SiteLink to="/work" navigate={navigate} className="text-link" data-cursor="OPEN">
            All projects <ArrowIcon diagonal />
          </SiteLink>
        </div>
        <div className="work-rail-track-wrap">
          <div className="work-rail-track" ref={trackRef}>
            {projects.map((project) => (
              <ProjectFeature key={project.slug} project={project} navigate={navigate} />
            ))}
          </div>
        </div>
        <div className="rail-progress" aria-hidden="true">
          <span ref={progressRef} />
        </div>
        <div className="rail-counter" aria-hidden="true">SCROLL TO EXPLORE <span>01 / 04</span></div>
      </div>
    </section>
  );
}

function ServicesSection({
  navigate,
  fullPage = false,
}: {
  navigate: Navigate;
  fullPage?: boolean;
}) {
  const [active, setActive] = useState(services[0]);

  return (
    <section className={`services-section ${fullPage ? "services-section-page" : ""}`} id="services" data-active={active.slug} aria-labelledby="services-heading">
      <div className="services-side">
        <p className="eyebrow"><span className="lime-dot" />02 / CAPABILITIES</p>
        <h2 id="services-heading">WHAT<br />WE<br />DO<span>.</span></h2>
        <p className="services-note">Design instinct.<br />Engineering depth.</p>
      </div>

      <div className="services-main">
        <div className="services-list" role="group" aria-label="LETWISE services">
          {services.map((service) => (
            <button
              className={`service-row ${active.slug === service.slug ? "is-active" : ""}`}
              key={service.slug}
              type="button"
              onPointerEnter={() => setActive(service)}
              onFocus={() => setActive(service)}
              onClick={() => setActive(service)}
              aria-pressed={active.slug === service.slug}
              data-cursor="EXPLORE"
            >
              <span className="service-row-number">{service.number}</span>
              <span className="service-row-title">{service.title}</span>
              <span className="service-row-arrow"><ArrowIcon diagonal /></span>
            </button>
          ))}
        </div>
        <div className="service-detail-line" aria-live="polite" aria-atomic="true">
          <span className="service-detail-number">{active.number} / 06</span>
          <p>{active.summary}</p>
          <div className="service-preview" key={active.slug}>
            <img src={active.visual} alt="" loading="lazy" decoding="async" />
          </div>
          <SiteLink to={`/services/${active.slug}`} navigate={navigate} className="service-detail-link" data-cursor="OPEN">
            Explore service <ArrowIcon diagonal />
          </SiteLink>
        </div>
        {!fullPage && (
          <SiteLink to="/services" navigate={navigate} className="services-all-link text-link" data-cursor="OPEN">
            Discover our approach <ArrowIcon diagonal />
          </SiteLink>
        )}
      </div>
      <span className="services-index-ghost" aria-hidden="true">{active.number}</span>
    </section>
  );
}

function StatLine({ number, label }: { number: string; label: string }) {
  return (
    <div className="stat-line">
      <span className="stat-number">{number}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function StudioTeaser({ navigate }: { navigate: Navigate }) {
  return (
    <section className="studio-teaser" id="studio" aria-labelledby="studio-heading">
      <div className="studio-teaser-heading">
        <p className="eyebrow"><span className="lime-dot" />03 / THE STUDIO</p>
        <h2 id="studio-heading">WE DESIGN<br />WITH PURPOSE.<br /><span>WE BUILD</span><br />WITH PRECISION.</h2>
      </div>
      <div className="studio-teaser-aside">
        <p className="studio-teaser-copy">LETWISE is an independent digital studio bringing design, development and technology into one conversation.</p>
        <p className="studio-teaser-subcopy">Small by choice. Curious by nature. Here to make the useful feel unforgettable.</p>
        <SiteLink to="/studio" navigate={navigate} className="text-link" data-cursor="OPEN">
          Meet the studio <ArrowIcon diagonal />
        </SiteLink>
        <div className="studio-stat-grid">
          <StatLine number="08" label="YEARS OF BUILDING" />
          <StatLine number="126" label="PROJECTS DELIVERED" />
          <StatLine number="18M" label="LINES OF CODE" />
          <StatLine number="21" label="CLIENTS & PARTNERS" />
        </div>
      </div>
      <span className="studio-side-note">INDEPENDENT BY DESIGN / 2026</span>
    </section>
  );
}

function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const active = processSteps[activeStep];

  return (
    <section className="process-section" aria-labelledby="process-heading">
      <div className="process-intro">
        <p className="eyebrow"><span className="lime-dot" />04 / HOW WE MOVE</p>
        <h2 id="process-heading">GOOD WORK<br />IS A <span>PROCESS.</span></h2>
        <p>Clear thinking at every turn. Enough structure to make room for the unexpected.</p>
      </div>
      <div className="process-body">
        <div className="process-list" role="group" aria-label="Project process">
          {processSteps.map((step, index) => (
            <button
              className={`process-step ${index === activeStep ? "is-active" : ""}`}
              key={step.number}
              type="button"
              onPointerEnter={() => setActiveStep(index)}
              onFocus={() => setActiveStep(index)}
              onClick={() => setActiveStep(index)}
              aria-pressed={index === activeStep}
            >
              <span className="process-step-number">{step.number}</span>
              <span>{step.title}</span>
              <span className="process-step-mark" aria-hidden="true">+</span>
            </button>
          ))}
        </div>
        <div className="process-current" aria-live="polite" aria-atomic="true">
          <span className="process-current-number">{active.number} / 06</span>
          <h3>{active.title}<span>.</span></h3>
          <p>{active.text}</p>
          <span className="process-current-rule" />
        </div>
      </div>
    </section>
  );
}

function TechnologyMarquee() {
  return (
    <section className="technology-section" aria-label="Technology we work with">
      <div className="technology-topline">
        <p className="eyebrow"><span className="lime-dot" />A TOOLKIT, NOT A TEMPLATE</p>
        <p>Curious with technology.<br />Careful with the choices.</p>
      </div>
      <div className="technology-marquee" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="technology-track" key={copy}>
            {technologies.map((technology) => (
              <span className="technology-word" key={`${copy}-${technology}`}>
                {technology}<i />
              </span>
            ))}
          </div>
        ))}
      </div>
      <ul className="sr-only" aria-label="Technologies">
        {technologies.map((technology) => <li key={technology}>{technology}</li>)}
      </ul>
      <p className="technology-footnote">The right tools for the right idea. Always.</p>
    </section>
  );
}

function ContactBand({ navigate }: { navigate: Navigate }) {
  return (
    <section className="contact-band" aria-labelledby="contact-band-heading">
      <p className="eyebrow"><span className="lime-dot" />05 / HAVE A GOOD ONE?</p>
      <div className="contact-band-main">
        <h2 id="contact-band-heading">HAVE AN<br /><span>IDEA?</span></h2>
        <div className="contact-band-aside">
          <p>Somewhere between a first thought and a real thing, there's a good conversation.</p>
          <SiteLink to="/contact" navigate={navigate} className="round-link" data-cursor="START" data-magnetic="true">
            <span>Start a project</span>
            <span className="round-link-icon"><ArrowIcon diagonal /></span>
          </SiteLink>
        </div>
      </div>
      <a className="contact-band-email" href="mailto:hello@letwise.com">HELLO@LETWISE.COM</a>
    </section>
  );
}

function HomePage({ navigate }: { navigate: Navigate }) {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!pointer.matches) return;
    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        hero.style.setProperty("--hero-shift-x", `${x * -10}px`);
        hero.style.setProperty("--hero-shift-y", `${y * -8}px`);
      });
    };
    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <main id="main" className="home-page">
      <section className="hero" ref={heroRef} aria-labelledby="hero-title">
        <img className="hero-image" src="/images/letwise-hero.jpg" alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
        <div className="hero-veil" aria-hidden="true" />
        <div className="hero-topline">
          <span>INDEPENDENT DIGITAL STUDIO</span>
          <span>EST. 2017 / EVERYWHERE</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="lime-dot" />DIGITAL PRODUCT & WEB DEVELOPMENT</p>
          <h1 id="hero-title">LETWISE<span>.</span></h1>
          <div className="hero-lower">
            <p className="hero-manifesto">We make the web<br />feel <em>alive.</em></p>
            <p className="hero-description">We design and build memorable digital experiences for brands, businesses and ambitious ideas.</p>
            <a className="hero-scroll" href="#point-of-view" data-cursor="SCROLL" data-magnetic="true">
              <span>SCROLL TO EXPLORE</span>
              <span className="hero-scroll-mark"><ArrowIcon /></span>
            </a>
          </div>
        </div>
        <div className="hero-side-index" aria-hidden="true">00 / DIGITAL EXPERIENCE</div>
      </section>

      <section className="manifesto-section" id="point-of-view" aria-labelledby="manifesto-heading">
        <div className="section-index">
          <p className="eyebrow"><span className="lime-dot" />01 / A POINT OF VIEW</p>
          <span>SCROLLING IS A MATERIAL</span>
        </div>
        <Reveal className="manifesto-copy">
          <h2 id="manifesto-heading">A digital experience should <em>feel like something.</em></h2>
          <div className="manifesto-bottom">
            <span className="manifesto-rule" />
            <p>Not just look right.<br />Move people somewhere.</p>
            <p className="manifesto-explainer">We bring design, code and curiosity together to make digital feel less like a screen and more like a place worth being.</p>
          </div>
        </Reveal>
      </section>

      <HomeWorkRail navigate={navigate} />
      <ServicesSection navigate={navigate} />
      <StudioTeaser navigate={navigate} />
      <ProcessSection />
      <TechnologyMarquee />
      <ContactBand navigate={navigate} />
    </main>
  );
}

function WorkPage({ navigate }: { navigate: Navigate }) {
  return (
    <main id="main" className="route-page work-page">
      <PageIntro
        marker="WORK / A SELECTION"
        title={<>Made to<br /><em>mean something.</em></>}
        body={<>A few ideas we've helped take further.<br />Each one starts with a different question.</>}
      />
      <section className="work-index" aria-label="Selected projects">
        {projects.map((project, index) => (
          <Reveal className={`work-index-entry work-index-entry-${index + 1}`} key={project.slug}>
            <ProjectFeature project={project} navigate={navigate} indexPage />
          </Reveal>
        ))}
      </section>
      <div className="work-page-outro">
        <span className="eyebrow">GOOD THINGS START SOMEWHERE</span>
        <h2>YOURS COULD<br />START HERE<span>.</span></h2>
        <SiteLink to="/contact" navigate={navigate} className="text-link" data-cursor="START">
          Start a conversation <ArrowIcon diagonal />
        </SiteLink>
      </div>
    </main>
  );
}

function ServiceOverviewPage({ navigate }: { navigate: Navigate }) {
  return (
    <main id="main" className="route-page services-page">
      <PageIntro
        marker="CAPABILITIES / 01 - 06"
        title={<>A good idea<br />deserves <em>good craft.</em></>}
        body="Strategy, design and technology in the same room, from first thought to what happens next."
      />
      <ServicesSection navigate={navigate} fullPage />
      <section className="service-note-section">
        <p className="eyebrow"><span className="lime-dot" />ONE TEAM, END TO END</p>
        <p>We work as a close extension of yours. A small senior team for the things that matter, with a network of trusted collaborators when the idea calls for more.</p>
        <SiteLink to="/contact" navigate={navigate} className="text-link" data-cursor="START">
          Tell us what you're thinking <ArrowIcon diagonal />
        </SiteLink>
      </section>
    </main>
  );
}

function ServiceDetailPage({ service, navigate }: { service: Service; navigate: Navigate }) {
  return (
    <main id="main" className="route-page service-detail-page">
      <section className="service-detail-hero">
        <p className="eyebrow"><span className="lime-dot" />SERVICE / {service.number}</p>
        <h1>{service.title}<span>.</span></h1>
        <div className="service-detail-hero-bottom">
          <p>{service.summary}</p>
          <SiteLink to="/services" navigate={navigate} className="text-link" data-cursor="BACK">
            All capabilities <ArrowIcon diagonal />
          </SiteLink>
        </div>
      </section>
      <section className="service-detail-content">
        <p className="eyebrow">01 / THE THINKING</p>
        <h2>{service.detail}</h2>
        <div className="service-deliverables">
          <p className="eyebrow">02 / WHAT IT CAN INCLUDE</p>
          <ul>
            {service.deliverables.map((item, index) => (
              <li key={item}><span>0{index + 1}</span>{item}<ArrowIcon diagonal /></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="service-detail-end">
        <p className="eyebrow">MAKE SOMETHING MATTER</p>
        <h2>Let's give it<br /><em>a good start.</em></h2>
        <SiteLink to="/contact" navigate={navigate} className="round-link" data-cursor="START" data-magnetic="true">
          <span>Start a project</span><span className="round-link-icon"><ArrowIcon diagonal /></span>
        </SiteLink>
      </section>
    </main>
  );
}

function StudioPage({ navigate }: { navigate: Navigate }) {
  return (
    <main id="main" className="route-page studio-page">
      <PageIntro
        marker="STUDIO / INDEPENDENT BY DESIGN"
        title={<>WE DESIGN<br />WITH <em>PURPOSE.</em></>}
        body="We build with precision, stay curious about what could be and care about the feeling as much as the function."
      />
      <section className="studio-statement">
        <p className="eyebrow"><span className="lime-dot" />DESIGN + DEVELOPMENT + TECHNOLOGY</p>
        <h2>LETWISE is an independent digital studio for people who want to make something <em>matter.</em></h2>
        <div className="studio-statement-aside">
          <p>We partner with thoughtful teams to find the idea inside the brief, then give it the design and engineering to travel further.</p>
          <p>Small enough to stay close. Experienced enough to make the complex feel clear. Always making room for the unexpected.</p>
        </div>
      </section>
      <section className="studio-numbers" aria-label="Studio at a glance">
        <StatLine number="08" label="YEARS OF BUILDING" />
        <StatLine number="126" label="PROJECTS DELIVERED" />
        <StatLine number="18M" label="LINES OF CODE" />
        <StatLine number="21" label="CLIENTS & PARTNERS" />
      </section>
      <ProcessSection />
      <section className="studio-cta">
        <p className="eyebrow">THE NEXT THING ISN'T MADE YET</p>
        <h2>LET'S MAKE<br /><em>IT REAL.</em></h2>
        <SiteLink to="/contact" navigate={navigate} className="round-link" data-cursor="START" data-magnetic="true">
          <span>Start a conversation</span><span className="round-link-icon"><ArrowIcon diagonal /></span>
        </SiteLink>
      </section>
    </main>
  );
}

function CaseStudyPage({ project, navigate }: { project: Project; navigate: Navigate }) {
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(projectIndex + 1) % projects.length];

  return (
    <main id="main" className="case-page">
      <section className="case-hero">
        <img src={project.image} alt={project.imageAlt} fetchPriority="high" decoding="async" />
        <div className="case-hero-veil" />
        <div className="case-hero-copy">
          <p className="eyebrow"><span className="lime-dot" />CASE STUDY / {project.number}</p>
          <h1>{project.title}<span>.</span></h1>
          <p>{project.statement}</p>
        </div>
        <div className="case-hero-bottom"><span>{project.category}</span><span>{project.year} / DIGITAL EXPERIENCE</span></div>
      </section>

      <section className="case-meta-grid" aria-label="Project details">
        <div><span>CLIENT</span><p>{project.client}</p></div>
        <div><span>YEAR</span><p>{project.year}</p></div>
        <div><span>SCOPE</span><p>{project.disciplines.join(", ")}</p></div>
        <div><span>PLATFORM</span><p>{project.technology.slice(0, 2).join(" / ")}</p></div>
      </section>

      <section className="case-opening">
        <p className="eyebrow"><span className="lime-dot" />A LITTLE CONTEXT</p>
        <h2>{project.statement}</h2>
      </section>

      <section className="case-story-grid">
        <div className="case-story-label"><span className="eyebrow">01 / THE CHALLENGE</span></div>
        <div className="case-story-copy"><h3>Find the real question.</h3><p>{project.challenge}</p></div>
      </section>

      <figure className="case-image-full">
        <img src={project.image} alt={`${project.title} visual direction and digital experience`} loading="lazy" decoding="async" />
        <figcaption>ART DIRECTION / {project.title.toUpperCase()} / {project.year}</figcaption>
      </figure>

      <section className="case-story-grid case-story-approach">
        <div className="case-story-label"><span className="eyebrow">02 / THE APPROACH</span></div>
        <div className="case-story-copy"><h3>Make it feel inevitable.</h3><p>{project.approach}</p></div>
      </section>

      <section className="case-outcome">
        <div>
          <p className="eyebrow"><span className="lime-dot" />03 / THE RESULT</p>
          <h2>A better place<br />to <em>go next.</em></h2>
        </div>
        <p>{project.result}</p>
      </section>

      <section className="case-tech">
        <p className="eyebrow">MADE WITH</p>
        <div>{project.technology.map((technology) => <span key={technology}>{technology}</span>)}</div>
      </section>

      <SiteLink to={`/work/${next.slug}`} navigate={navigate} className="next-project" data-cursor="NEXT PROJECT">
        <img src={next.image} alt="" loading="lazy" decoding="async" />
        <span className="next-project-veil" />
        <span className="next-project-label"><span>UP NEXT / {next.number}</span><strong>{next.title}<i>.</i></strong><span>View the next project <ArrowIcon diagonal /></span></span>
      </SiteLink>
    </main>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const company = String(form.get("company") || "Not provided");
    const details = String(form.get("details") || "");
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nProject details:\n${details}`,
    );
    window.location.href = `mailto:hello@letwise.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <main id="main" className="route-page contact-page">
      <section className="contact-page-heading">
        <p className="eyebrow"><span className="lime-dot" />CONTACT / START HERE</p>
        <h1>HAVE AN<br /><em>IDEA?</em></h1>
        <p className="contact-heading-note">Let's make it real.</p>
      </section>
      <div className="contact-page-layout">
        <div className="contact-direct">
          <p className="eyebrow">OR START WITH A NOTE</p>
          <a href="mailto:hello@letwise.com">HELLO@LETWISE.COM <ArrowIcon diagonal /></a>
          <p>Thoughts, questions, strange ideas - all welcome.</p>
          <span className="contact-coordinate">REMOTE / WORKING EVERYWHERE</span>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <p className="eyebrow">TELL US A LITTLE ABOUT IT</p>
          <label>
            <span>01 / YOUR NAME</span>
            <input name="name" type="text" autoComplete="name" placeholder="Name" required />
          </label>
          <label>
            <span>02 / EMAIL ADDRESS</span>
            <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
          </label>
          <label>
            <span>03 / COMPANY <i>OPTIONAL</i></span>
            <input name="company" type="text" autoComplete="organization" placeholder="Company or project" />
          </label>
          <label>
            <span>04 / THE IDEA</span>
            <textarea name="details" rows={4} placeholder="A little about what you have in mind..." required />
          </label>
          <button className="form-submit" type="submit" data-cursor="SEND" data-magnetic="true">
            <span>Start a project</span><ArrowIcon diagonal />
          </button>
          {submitted && (
            <p className="form-success" role="status">
              Your email draft is ready. If it did not open, write to <a href="mailto:hello@letwise.com">hello@letwise.com</a>.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}

function NotFoundPage({ navigate }: { navigate: Navigate }) {
  return (
    <main id="main" className="route-page not-found-page">
      <PageIntro marker="404 / OUT OF FRAME" title={<>THIS PAGE<br /><em>WENT ELSEWHERE.</em></>} body="The link may have moved. The next good thing is still close." />
      <SiteLink to="/" navigate={navigate} className="round-link" data-cursor="HOME">
        <span>Back to the beginning</span><span className="round-link-icon"><ArrowIcon diagonal /></span>
      </SiteLink>
    </main>
  );
}

function Footer({ navigate }: { navigate: Navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <SiteLink to="/" navigate={navigate} className="footer-wordmark">LETWISE<span>.</span></SiteLink>
          <p>Digital experiences<br />& web development.</p>
        </div>
        <div className="footer-links-block">
          <span className="eyebrow">ELSEWHERE / CONNECT</span>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <ArrowIcon diagonal /></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn <ArrowIcon diagonal /></a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub <ArrowIcon diagonal /></a>
          <a href="mailto:hello@letwise.com">Email <ArrowIcon diagonal /></a>
        </div>
        <div className="footer-back-top">
          <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }}>
            Back to top <span><ArrowIcon diagonal /></span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>LETWISE / INDEPENDENT DIGITAL STUDIO</span>
        <span>© 2026 LETWISE STUDIO</span>
        <span>BUILT WITH INTENTION</span>
      </div>
    </footer>
  );
}

function routeMeta(path: string) {
  const project = path.startsWith("/work/") ? projects.find((item) => path.endsWith(item.slug)) : undefined;
  const service = path.startsWith("/services/") ? services.find((item) => path.endsWith(item.slug)) : undefined;
  if (project) return { title: `${project.title} - Case Study | LETWISE`, description: project.statement };
  if (service) return { title: `${service.title} | LETWISE`, description: service.detail };
  const pages: Record<string, { title: string; description: string }> = {
    "/": {
      title: "LETWISE - Digital Experiences Made to Feel Alive",
      description: "LETWISE is an independent digital studio designing and building memorable websites, digital products and experiences.",
    },
    "/work": {
      title: "Selected Work | LETWISE Digital Studio",
      description: "Explore selected digital experiences, websites and products created by LETWISE.",
    },
    "/services": {
      title: "Capabilities | LETWISE Digital Studio",
      description: "Web development, experience design, e-commerce and creative technology from LETWISE.",
    },
    "/studio": {
      title: "Studio | LETWISE Digital Experiences",
      description: "Meet LETWISE, an independent digital studio combining design, development and technology.",
    },
    "/contact": {
      title: "Start a Project | LETWISE",
      description: "Have an idea? Start a conversation with LETWISE about your next digital experience.",
    },
  };
  return pages[path] || { title: "Not Found | LETWISE", description: "This page could not be found. Explore LETWISE digital experiences." };
}

function PageContent({ path, navigate }: { path: string; navigate: Navigate }) {
  const normalizedPath = path.replace(/\/$/, "") || "/";
  const project = normalizedPath.startsWith("/work/")
    ? projects.find((item) => normalizedPath === `/work/${item.slug}`)
    : undefined;
  const service = normalizedPath.startsWith("/services/")
    ? services.find((item) => normalizedPath === `/services/${item.slug}`)
    : undefined;

  if (normalizedPath === "/") return <HomePage navigate={navigate} />;
  if (normalizedPath === "/work") return <WorkPage navigate={navigate} />;
  if (normalizedPath === "/services") return <ServiceOverviewPage navigate={navigate} />;
  if (normalizedPath === "/studio") return <StudioPage navigate={navigate} />;
  if (normalizedPath === "/contact") return <ContactPage />;
  if (project) return <CaseStudyPage project={project} navigate={navigate} />;
  if (service) return <ServiceDetailPage service={service} navigate={navigate} />;
  return <NotFoundPage navigate={navigate} />;
}

export default function App() {
  const [path, setPath] = useState(() => window.location.pathname);
  const [transition, setTransition] = useState<"idle" | "cover" | "reveal">("idle");
  const [loading, setLoading] = useState(true);
  const transitionTimers = useRef<number[]>([]);

  const navigate = useCallback((to: string) => {
    const destination = to.replace(/\/$/, "") || "/";
    if (destination === window.location.pathname) return;
    transitionTimers.current.forEach((timer) => window.clearTimeout(timer));
    setTransition("cover");
    transitionTimers.current = [
      window.setTimeout(() => {
        window.history.pushState({}, "", destination);
        setPath(destination);
        window.scrollTo(0, 0);
        setTransition("reveal");
      }, 340),
      window.setTimeout(() => setTransition("idle"), 860),
    ];
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname);
      setTransition("idle");
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", onPopState);
    const timer = window.setTimeout(() => setLoading(false), 620);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.clearTimeout(timer);
      transitionTimers.current.forEach((transitionTimer) => window.clearTimeout(transitionTimer));
    };
  }, []);

  useEffect(() => {
    const normalizedPath = path.replace(/\/$/, "") || "/";
    const { title, description } = routeMeta(normalizedPath);
    document.title = title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute("content", description);
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", `https://letwise.com${normalizedPath}`);
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute("content", `https://letwise.com${normalizedPath}`);
  }, [path]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header path={path} navigate={navigate} />
      <div key={path} id="top" className="route-stage">
        <PageContent path={path} navigate={navigate} />
      </div>
      <Footer navigate={navigate} />
      <CustomCursor />
      <div className={`page-transition ${transition === "cover" ? "is-cover" : ""} ${transition === "reveal" ? "is-reveal" : ""}`} aria-hidden="true">
        <span>LETWISE / DIGITAL EXPERIENCE STUDIO</span>
        <span className="transition-index">01 - 04</span>
      </div>
      {loading && (
        <div className="loading-screen" aria-hidden="true">
          <span className="loading-wordmark">LETWISE<span>.</span></span>
          <span className="loading-track"><i /></span>
          <span className="loading-caption">A DIGITAL STUDIO / 001</span>
        </div>
      )}
    </>
  );
}