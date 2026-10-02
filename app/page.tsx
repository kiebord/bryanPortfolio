import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projects, site, stats } from "@/lib/content";

export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line/70">
        <div className="page-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-[140px]" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-14 sm:pt-20 lg:grid-cols-12 lg:px-10 lg:pb-28">
          <div className="lg:col-span-8">
            <p className="rise rise-1 text-base font-semibold text-accent-soft sm:text-lg">
              {site.course}, {site.year}
            </p>
            <h1 className="mt-5 font-extrabold leading-[0.85] tracking-tighter text-[clamp(4rem,15vw,12.5rem)]">
              <span className="rise rise-2 block">{site.firstName}</span>
              <span className="rise rise-3 text-outline block">{site.lastName}</span>
            </h1>
            <p className="rise rise-4 mt-10 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              {site.tagline}
            </p>
            <div className="rise rise-5 mt-10 flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-bold text-white shadow-glow transition-colors hover:bg-accent-deep"
              >
                View portfolio
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-sm font-bold text-white transition-colors hover:border-accent"
              >
                About me
              </Link>
            </div>
          </div>

          <div className="rise rise-3 lg:col-span-4">
            <div className="drift overflow-hidden rounded-[2rem] border border-line bg-panel shadow-glow">
              <Image
                src="/images/bryan-portrait.png"
                alt="Formal portrait of Bryan Andrade"
                width={974}
                height={974}
                priority
                unoptimized
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Quick stats" className="border-b border-line/70">
        <dl className="mx-auto grid max-w-7xl divide-y divide-line/70 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-10">
          {stats.map((s) => (
            <div key={s.label} className="py-10 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <dd className="text-[clamp(3.5rem,8vw,6rem)] font-extrabold leading-none tracking-tighter text-accent">
                {s.value}
              </dd>
              <dt className="mt-3 text-sm font-semibold text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-tighter">
            Selected work
          </h2>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent-soft transition-colors hover:text-white"
          >
            See all projects
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <section className="border-t border-line/70">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <h2 className="max-w-4xl text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-tighter">
            Have a project in mind?
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-bold text-white shadow-glow transition-colors hover:bg-accent-deep"
          >
            <Mail size={18} />
            Email {site.firstName}
          </a>
        </div>
      </section>
    </>
  );
}
