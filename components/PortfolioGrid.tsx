"use client";

import { useState } from "react";
import FilterBar from "@/components/FilterBar";
import ProjectCard from "@/components/ProjectCard";
import { projectCategories, projects } from "@/lib/content";

export default function PortfolioGrid() {
  const [active, setActive] = useState("All");
  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => (p.categories as readonly string[]).includes(active));

  return (
    <div>
      <FilterBar
        label="Filter projects"
        options={projectCategories}
        active={active}
        onChange={setActive}
      />
      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing {visible.length} of {projects.length} projects
      </p>
      <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
