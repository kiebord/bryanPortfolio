import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Web, mobile, design and IoT projects by Bryan Andrade.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageIntro
        title="Portfolio"
        intro="Web, mobile, design and IoT projects. Use the filters to narrow the list."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <PortfolioGrid />
      </section>
    </>
  );
}
