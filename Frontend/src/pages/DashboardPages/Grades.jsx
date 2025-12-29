export default function GradeCalculator(){
    return (<h1>
        {ComingSoon()}
    </h1>)
}

function ComingSoon() {
  return (
    <div className="py-20 flex items-center justify-center  px-6">
      <div className="text-center max-w-xl">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#500000]/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#500000]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-[#500000] mb-4">
          Coming Soon
        </h1>

        {/* Divider */}
        <div className="w-20 h-1 bg-[#500000] mx-auto mb-6 rounded-full" />

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8">
          We’re actively building this feature to make your experience even
          better. It’ll be available shortly — stay tuned!
        </p>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-sm">
          <p className="text-gray-700">
            🚀 This feature is under development and will be released soon.
            Thanks for your patience!
          </p>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-8">
          Have feedback or ideas? We’d love to hear from you.
        </p>
      </div>
    </div>
  );
}