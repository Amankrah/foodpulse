export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Skeleton */}
      <section className="bg-green-50 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="h-8 w-48 bg-neutral-200 rounded mb-4 animate-pulse" />
            <div className="h-10 w-96 bg-neutral-200 rounded mb-4 animate-pulse" />
            <div className="h-6 w-full max-w-xl bg-neutral-200 rounded mb-8 animate-pulse" />
            <div className="h-12 w-full max-w-xl bg-neutral-200 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Category Nav Skeleton */}
      <div className="border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-40 bg-neutral-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-8 w-64 bg-neutral-200 rounded mb-6 animate-pulse" />
              <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
                {[1, 2, 3, 4].map((j) => (
                  <div
                    key={j}
                    className="p-5 border-b border-neutral-200 last:border-b-0"
                  >
                    <div className="h-6 w-full bg-neutral-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
