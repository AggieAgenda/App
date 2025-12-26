
export default function OrganizationView(){
    const orgData = [
        {orgID: "", Name: "lsdkfj"},
        {orgID: "Aggie Agenda"}

    ]
    return (
        <div>
            {/*
                <h1> This is only for organizatoins</h1>
                <h1>Hello</h1>
                <button>Add Event</button>
                {orgData.map((org)=>(
                    
                        <h1 key = {org.orgID}>{org.orgID}</h1>
                    
                ))} */}
            {ComingSoon()}
            
        </div>
        
    )
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
import { useState } from "react";

function Donate() {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("lemonsqueezy"); // or "stripe"

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleDonate = () => {
    const donationAmount = amount === "custom" ? customAmount : amount;
    
    if (!donationAmount || donationAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // TODO: Integrate with LemonSqueezy or Stripe
    console.log(`Donating $${donationAmount} via ${paymentMethod}`);
    
    if (paymentMethod === "lemonsqueezy") {
      // LemonSqueezy checkout
      // window.location.href = `https://lemonsqueezy.com/checkout/...?amount=${donationAmount}`;
      alert(`LemonSqueezy integration coming soon! Amount: $${donationAmount}`);
    } else {
      // Stripe checkout
      // Stripe.redirectToCheckout({ ... });
      alert(`Stripe integration coming soon! Amount: $${donationAmount}`);
    }
  };

  return (
    <div className="min-h-screen text-white pt-28 px-6 pb-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-maroon-500 mb-4">
            Support Aggie Agenda
          </h1>
          <p className="text-xl text-gray-300">
            Help us keep this platform free and accessible for all Aggies
          </p>
        </div>

        {/* Donation Card */}
        <div className="bg-[#1e1e1e] rounded-2xl p-8 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold mb-6">Choose Your Contribution</h2>
          
          {/* Preset amounts */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-6">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                className={`p-4 rounded-lg border-2 transition ${
                  amount === preset
                    ? "border-maroon-500 bg-maroon-600/20"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              >
                <span className="text-2xl font-bold">${preset}</span>
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="mb-6">
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="amount"
                checked={amount === "custom"}
                onChange={() => setAmount("custom")}
                className="mr-2"
              />
              <span className="text-gray-400">Custom amount</span>
            </label>
            {amount === "custom" && (
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  $
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-[#2a2a2a] rounded-lg border border-gray-600 text-white text-lg focus:outline-none focus:ring-2 focus:ring-maroon-600"
                  min="1"
                  step="0.01"
                />
              </div>
            )}
          </div>

          {/* Payment method (for future use) */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Payment Method</label>
            <div className="flex gap-4">
              <button
                onClick={() => setPaymentMethod("lemonsqueezy")}
                className={`flex-1 p-4 rounded-lg border-2 transition ${
                  paymentMethod === "lemonsqueezy"
                    ? "border-maroon-500 bg-maroon-600/20"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              >
                <div className="font-semibold">LemonSqueezy</div>
                <div className="text-sm text-gray-400">Simple checkout</div>
              </button>
              <button
                onClick={() => setPaymentMethod("stripe")}
                className={`flex-1 p-4 rounded-lg border-2 transition ${
                  paymentMethod === "stripe"
                    ? "border-maroon-500 bg-maroon-600/20"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              >
                <div className="font-semibold">Stripe</div>
                <div className="text-sm text-gray-400">Coming soon</div>
              </button>
            </div>
          </div>

          {/* Donate button */}
          <button
            onClick={handleDonate}
            disabled={!amount || (amount === "custom" && !customAmount)}
            className="w-full py-4 bg-maroon-600 hover:bg-maroon-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-xl font-bold transition"
          >
            Donate {amount && (amount === "custom" ? `$${customAmount || "0"}` : `$${amount}`)}
          </button>
        </div>

        {/* Why donate section */}
        <div className="bg-[#1e1e1e] rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-maroon-500 mb-4">
            Why Support Us?
          </h3>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-maroon-500 text-xl">✓</span>
              <div>
                <strong>Keep it free:</strong> Your support helps us keep Aggie Agenda free for all students and organizations.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-maroon-500 text-xl">✓</span>
              <div>
                <strong>Better features:</strong> Donations help us develop new features and improve the platform.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-maroon-500 text-xl">✓</span>
              <div>
                <strong>Community-driven:</strong> We're built by Aggies, for Aggies. Your contribution keeps it that way.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-maroon-500 text-xl">✓</span>
              <div>
                <strong>No pressure:</strong> Pay what you want. Every contribution helps, no matter the size.
              </div>
            </div>
          </div>
        </div>

        {/* Thank you message */}
        <div className="text-center mt-8 text-gray-400">
          <p>Thank you for considering supporting Aggie Agenda!</p>
          <p className="mt-2">Gig 'em! 👍</p>
        </div>
      </div>
    </div>
  );
}