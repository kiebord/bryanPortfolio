type Props = {
  title: string;
  intro: string;
};

export default function PageIntro({ title, intro }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-line/70">
      <div className="page-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-16 sm:pb-20 sm:pt-24 lg:px-10">
        <h1 className="rise rise-1 text-[clamp(3.5rem,13vw,10rem)] font-extrabold leading-[0.9] tracking-tighter">
          {title}
        </h1>
        <p className="rise rise-2 mt-8 max-w-xl text-lg leading-relaxed text-muted">{intro}</p>
      </div>
    </section>
  );
}
