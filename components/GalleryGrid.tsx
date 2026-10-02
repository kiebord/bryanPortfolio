"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import FilterBar from "@/components/FilterBar";
import { gallery, galleryCategories } from "@/lib/content";

export default function GalleryGrid() {
  const [active, setActive] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible =
    active === "All"
      ? gallery
      : gallery.filter((g) => (g.categories as readonly string[]).includes(active));

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: number) => {
      setOpenIndex((i) => (i === null ? i : (i + dir + visible.length) % visible.length));
    },
    [visible.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, step]);

  const current = openIndex === null ? null : visible[openIndex];

  return (
    <div>
      <FilterBar
        label="Filter gallery"
        options={galleryCategories}
        active={active}
        onChange={(v) => {
          setActive(v);
          setOpenIndex(null);
        }}
      />
      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing {visible.length} of {gallery.length} images
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open ${item.title}`}
            className="group relative overflow-hidden rounded-3xl border border-line bg-panel text-left shadow-card transition-colors hover:border-accent/70"
          >
            <Image
              src={item.image}
              alt={item.caption}
              width={1200}
              height={900}
              unoptimized
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 to-transparent p-5 pt-12">
              <span className="block text-lg font-extrabold tracking-tight">{item.title}</span>
              <span className="block text-sm text-muted">{item.categories.join(", ")}</span>
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md"
          onClick={close}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={current.image}
              alt={current.caption}
              width={1200}
              height={900}
              unoptimized
              className="max-h-[75vh] w-full rounded-3xl border border-line object-contain"
            />
            <div className="mt-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xl font-extrabold tracking-tight">{current.title}</p>
                <p className="text-sm text-muted">{current.caption}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-accent"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-accent"
                >
                  <ChevronRight size={20} />
                </button>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="grid h-11 w-11 place-items-center rounded-full bg-accent transition-colors hover:bg-accent-deep"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
