export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-zinc-950">
      <main className="w-full max-w-2xl space-y-8 text-center">
        <div className="space-y-3">
          <p className="text-sm font-medium tracking-wide text-emerald-600 uppercase">
            HanaLoop
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Carbon Emissions Dashboard
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Next.js · TypeScript · Tailwind CSS · Zustand 스택으로 구성된 탄소
            배출량 대시보드 프로젝트입니다.
          </p>
        </div>
      </main>
    </div>
  );
}
