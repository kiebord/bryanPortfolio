import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Personal moments, workspace, design, campus and event scenes from Bryan Andrade.",
};

export default function GalleryPage() {
  return (
    <>
      <PageIntro
        title="Gallery"
        intro="Personal moments from daily life, the desk, campus and events. Select an image to view it larger."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <GalleryGrid />
      </section>
    </>
  );
}
