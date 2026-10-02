import type { Metadata } from "next";
import Image from "next/image";
import { Mail } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import { about, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "About Bryan Andrade, second-year BS Information Technology student.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        title="About"
        intro={`${site.role}. ${site.course}, ${site.year}.`}
      />

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-[2rem] border border-line bg-panel shadow-glow">
            <Image
              src="/images/portrait.svg"
              alt={`Portrait placeholder for ${site.name}`}
              width={800}
              height={1000}
              unoptimized
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-tight tracking-tighter">
            Hi, I am {site.firstName}.
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted">
            {about.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <a
            href={`mailto:${site.email}`}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-bold text-white shadow-glow transition-colors hover:bg-accent-deep"
          >
            <Mail size={18} />
            Email {site.firstName}
          </a>
        </div>
      </section>

      <section className="border-t border-line/70">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h2 className="text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-none tracking-tighter">
            Skills
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.skillGroups.map((group) => (
              <div key={group.title} className="rounded-3xl border border-line bg-panel p-7 shadow-card">
                <h3 className="text-xl font-extrabold tracking-tight text-accent-soft">{group.title}</h3>
                <ul className="mt-5 space-y-2 text-white/85">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line/70">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h2 className="text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-none tracking-tighter">
            Education
          </h2>
          <ol className="mt-12 border-l border-line">
            {about.timeline.map((t) => (
              <li key={t.when} className="relative pb-10 pl-8 last:pb-0">
                <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-accent shadow-glow" aria-hidden="true" />
                <p className="text-xl font-extrabold tracking-tight">{t.when}</p>
                <p className="mt-1 max-w-xl text-muted">{t.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
