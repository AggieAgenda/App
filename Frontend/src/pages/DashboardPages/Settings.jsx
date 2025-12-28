// Have to make setup settings for dashboard
export function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
        </div>
      </div>
    </div>
  );
}

export function BecomeOrganization() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Organization</h1>
          <p className="text-gray-600 mt-2">Upgrade your account</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Become an Organization</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Upgrade to Organization Account
            </h3>
            <p className="text-blue-800 mb-4">
              Unlock advanced features like team management, analytics, and more.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center text-blue-900">
                <span className="mr-2">✓</span> Team collaboration tools
              </li>
              <li className="flex items-center text-blue-900">
                <span className="mr-2">✓</span> Advanced analytics
              </li>
              <li className="flex items-center text-blue-900">
                <span className="mr-2">✓</span> Priority support
              </li>
            </ul>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Upgrade Now
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <p>Already have an organization code? Contact support to link your account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Settings() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}