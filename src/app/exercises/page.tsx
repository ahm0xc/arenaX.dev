import Hero from "./_components/hero";
import ExercisesExplorer from "./_components/exercises-explorer";

export default function Exercises() {
  return (
    <div className="">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(100%_50%_at_50%_0%,rgba(163,0,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]" />
      <div>
        <Hero />
        <section className="max-w-4xl mx-auto">
          <ExercisesExplorer />
        </section>
      </div>
    </div>
  );
}
