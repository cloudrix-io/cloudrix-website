export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header skeleton */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
          <div className="h-5 w-96 bg-gray-100 rounded animate-pulse mx-auto" />
        </div>
      </div>

      {/* Blog grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 overflow-hidden"
            >
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <div className="h-5 w-20 bg-blue-100 rounded-full animate-pulse" />
                  <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3" />
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse mb-1" />
                <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
