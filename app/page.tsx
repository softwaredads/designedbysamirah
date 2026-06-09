export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <main className="flex flex-col items-center text-center">
        <h1
          className="animate-fade-up font-serif text-4xl font-light tracking-[0.08em] text-foreground sm:text-5xl md:text-6xl"
          style={{ animationDelay: "0.2s" }}
        >
          Designed by Samirah
        </h1>

        <div
          className="animate-draw-line mt-8 h-px w-24 origin-center bg-foreground/30"
          style={{ animationDelay: "0.6s" }}
        />

        <p
          className="animate-fade-up animate-soft-pulse mt-8 font-sans text-xs font-light uppercase tracking-[0.3em] text-foreground sm:text-sm"
          style={{ animationDelay: "0.9s" }}
        >
          Coming Soon
        </p>

        <p
          className="animate-fade-up mt-6 max-w-xs font-sans text-sm font-light leading-relaxed text-muted sm:max-w-sm sm:text-base"
          style={{ animationDelay: "1.2s" }}
        >
          Luxury interior design — site arriving shortly
        </p>
      </main>
    </div>
  );
}
