export function FeaturedInBar() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-8">
          Verified credentials
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {[
            { name: "KVK Registered", width: "w-28" },
            { name: "GDPR Compliant", width: "w-28" },
            { name: "NDA Available", width: "w-24" },
            { name: "EUR Invoicing", width: "w-28" },
          ].map((brand) => (
            <div
              key={brand.name}
              className={`${brand.width} h-8 flex items-center justify-center`}
            >
              <span className="text-gray-300 font-semibold text-sm tracking-wide">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
