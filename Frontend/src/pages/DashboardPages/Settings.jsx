// Have to make setup settings for dashboard
import { Link,useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
export function Profile() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
          onClick={() => {navigate(-1)}}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back
        </button>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your profile information</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Basic Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                placeholder="Tell us about yourself"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save Profile
            </button>

            
          </div>
          <div className="pt-2">
          <Link to = '/dashboard/become-organization' className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Become an Organization
            </Link>
            </div>

        </div>
        
      </div>
    </div>
  );
}


export function Settings() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
          onClick={() => {navigate(-1)}}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back
        </button>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Configure your account preferences</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Setup Settings</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Notifications</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700">Email notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700">Push notifications</span>
                </label>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Privacy</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700">Make profile public</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700">Allow search engines to index</span>
                </label>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Account</h3>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Delete Account
              </button>
              
            </div>
           <div className="pt-2">
          <Link to = '/dashboard/become-organization' className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Become an Organization
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import { useMemo, useState } from "react";

const MAROON = "#500000";

function isValidInstagram(v) {
  if (!v) return true;
  const s = v.trim();
  // allow "@handle", "handle", or full URL
  if (s.startsWith("http")) return /instagram\.com\/[A-Za-z0-9._]+/i.test(s);
  const handle = s.startsWith("@") ? s.slice(1) : s;
  return /^[A-Za-z0-9._]{1,30}$/.test(handle);
}

function normalizeInstagram(v) {
  const s = (v || "").trim();
  if (!s) return "";
  if (s.startsWith("http")) return s;
  const handle = s.startsWith("@") ? s.slice(1) : s;
  return `@${handle}`;
}

export function BecomeOrganization() {
  const [orgName, setOrgName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const instaOk = useMemo(() => isValidInstagram(instagram), [instagram]);
  const canSubmit = orgName.trim().length >= 2 && instaOk;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      // TODO: replace with your backend endpoint later
      // await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orgs/apply/`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   credentials: "include",
      //   body: JSON.stringify({
      //     name: orgName.trim(),
      //     instagram: normalizeInstagram(instagram),
      //     contact_email: contactEmail.trim() || null,
      //     note: note.trim() || null,
      //   }),
      // });

      // optimistic UI for now
      await new Promise((r) => setTimeout(r, 450));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }
  const navigate = useNavigate();
  return (

    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
         <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back
        </button>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Organization</h1>
          <p className="text-gray-600 mt-2">Claim your org profile and start posting events.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: form card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Become an Organization</h2>
                <p className="text-gray-600 mt-1">
                  Tell us who you are — we’ll verify and send your organization code.
                </p>
              </div>
              <div
                className="hidden sm:flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
                style={{ backgroundColor: `${MAROON}12`, color: MAROON }}
              >
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: MAROON }} />
                Beta onboarding
              </div>
            </div>

            {submitted ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                <h3 className="text-lg font-semibold text-green-900">Request received!</h3>
                <p className="text-green-800 mt-1">
                  We’ll review your org details and send your <span className="font-semibold">organization code</span>{" "}
                  soon. Once you have it, you’ll be able to link your account and start posting events.
                </p>

                <div className="mt-4 rounded-lg bg-white border border-green-200 p-4">
                  <div className="text-sm text-gray-700">
                    <div className="font-medium text-gray-900 mb-1">Submitted info</div>
                    <div><span className="text-gray-500">Organization:</span> {orgName.trim()}</div>
                    <div><span className="text-gray-500">Instagram:</span> {normalizeInstagram(instagram)}</div>
                    {contactEmail.trim() ? (
                      <div><span className="text-gray-500">Contact email:</span> {contactEmail.trim()}</div>
                    ) : null}
                  </div>
                </div>

                <button
                  className="mt-5 px-4 py-2 rounded-md text-white hover:opacity-95"
                  style={{ backgroundColor: MAROON }}
                  onClick={() => setSubmitted(false)}
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g., TAMU Robotics Club"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    style={{ outlineColor: MAROON }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This is what students will see on your events.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instagram <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@tamuclub or https://instagram.com/tamuclub"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      instaOk ? "border-gray-300" : "border-red-300"
                    }`}
                    style={{ outlineColor: MAROON }}
                  />
                  {!instaOk ? (
                    <p className="text-xs text-red-600 mt-1">
                      Please enter a valid Instagram handle (letters/numbers/._) or an Instagram URL.
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      Helps students confirm it’s the real org.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact email <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="club@tamu.edu"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                      style={{ outlineColor: MAROON }}
                    />
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="text-sm font-medium text-gray-900">Organization code</div>
                    <div className="text-sm text-gray-600 mt-1">
                      You’ll get a code after verification. You can enter it later to link your account.
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Anything else? <span className="text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    placeholder="e.g., We're an official student org. We'd like to post weekly meetings + special events."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    style={{ outlineColor: MAROON }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    type="submit"
                    disabled={!canSubmit || submitting}
                    onClick={console.log("Add API call here")}
                    className={`px-6 py-2 rounded-md text-white ${
                      !canSubmit || submitting ? "opacity-60 cursor-not-allowed" : "hover:opacity-95"
                    }`}
                    style={{ backgroundColor: MAROON }}
                  >
                    {submitting ? "Submitting..." : "Request organization access"}
                  </button>

                  <div className="text-sm text-gray-600">
                    Already have a code?{" "}
                    <span className="font-medium" style={{ color: MAROON }}>
                      You’ll be able to enter it on the next screen
                    </span>{" "}
                    (we can add that page next).
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right: info card */}
          <div className="bg-white rounded-xl shadow p-6 h-fit">
            <h3 className="text-lg font-semibold text-gray-900">How it works</h3>
            <ol className="mt-3 space-y-3 text-sm text-gray-700">
              <li className="flex gap-3">
                <div className="mt-0.5 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs"
                     style={{ backgroundColor: MAROON }}>
                  1
                </div>
                <div>
                  <div className="font-medium text-gray-900">Submit your org info</div>
                  <div className="text-gray-600">Name + socials so we can verify.</div>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="mt-0.5 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs"
                     style={{ backgroundColor: MAROON }}>
                  2
                </div>
                <div>
                  <div className="font-medium text-gray-900">We send your org code</div>
                  <div className="text-gray-600">Used to link your user to the organization.</div>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="mt-0.5 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs"
                     style={{ backgroundColor: MAROON }}>
                  3
                </div>
                <div>
                  <div className="font-medium text-gray-900">Post events to the campus calendar</div>
                  <div className="text-gray-600">Your events show under your org profile.</div>
                </div>
              </li>
            </ol>

            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="text-sm font-medium text-gray-900">What you’ll unlock</div>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-200">✓</span>
                  Event posting + edits
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-200">✓</span>
                  Org profile page
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-200">✓</span>
                  Basic analytics 
                </li>
              </ul>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
