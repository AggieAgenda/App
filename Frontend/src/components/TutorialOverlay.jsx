export function TutorialOverlay({ open, step, steps, next, back, skip, done }) {
  if (!open) return null;
  const isLast = step === steps.length - 1;
  const current = steps[step];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs uppercase text-gray-500">Step {step + 1} of {steps.length}</p>
            <h2 className="text-xl font-semibold text-gray-900">{current.title}</h2>
          </div>
          <button onClick={skip} className="text-sm text-gray-500 hover:text-gray-800">Skip</button>
        </div>
        <p className="text-gray-700">{current.body}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={back}
            disabled={step === 0}
            className="px-3 py-2 rounded-lg border text-sm disabled:opacity-50"
          >
            Back
          </button>
          {!isLast ? (
            <button
              onClick={next}
              className="px-4 py-2 rounded-lg bg-[#500000] text-white text-sm"
            >
              Next
            </button>
          ) : (
            <button
              onClick={done}
              className="px-4 py-2 rounded-lg bg-[#500000] text-white text-sm"
            >
              Got it
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
