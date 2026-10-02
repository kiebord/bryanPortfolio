import Image from "next/image";
import type { Project } from "@/lib/content";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel shadow-card transition-colors hover:border-accent/70">
      <div className="overflow-hidden border-b border-line">
        <Image
          src={project.image}
          alt={`${project.title} mockup`}
          width={1200}
          height={800}
          unoptimized
          className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-extrabold tracking-tight">{project.title}</h3>
          <span className="pt-1.5 text-sm text-muted">{project.year}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.categories.map((c) => (
            <span
              key={c}
              className="rounded-full border border-accent/50 px-3 py-1 text-xs font-semibold text-accent-soft"
            >
              {c}
            </span>
          ))}
        </div>
        <p className="mt-4 flex-1 leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/80">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
