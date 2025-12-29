import { useState } from "react";

const MAROON = "#500000";

export default function OrganizationView() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [socialLink, setSocialLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      title,
      desc,
      datetime: `${date} ${time}`,
      location,
      tags: tags.split(",").map((t) => t.trim()),
      socialLink,
    };

    console.log("Event Created:", eventData);// replace later properly send to back end

    setSubmitted(true);


  };

  return (
    <div className="py-10 px-6 flex justify-center">
      <div className="w-full max-w-3xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold" style={{ color: MAROON }}>
            Create an Event
          </h1>
          <p className="text-gray-600 mt-2">
            Add events for your organization. Members will see them instantly.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block font-semibold mb-1" style={{ color: MAROON }}>
                Event Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Hack Night, General Meeting, Workshop"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
                style={{ outlineColor: MAROON }}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold mb-1" style={{ color: MAROON }}>
                Description
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Describe the event..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
                style={{ outlineColor: MAROON }}
                rows={4}
                required
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1" style={{ color: MAROON }}>
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
                  style={{ outlineColor: MAROON }}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1" style={{ color: MAROON }}>
                  Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
                  style={{ outlineColor: MAROON }}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block font-semibold mb-1" style={{ color: MAROON }}>
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Zachry 101, MSC 2400, Off-campus"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
                style={{ outlineColor: MAROON }}
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block font-semibold mb-1" style={{ color: MAROON }}>
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Ex: tech, workshop, free food"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
                style={{ outlineColor: MAROON }}
              />
            </div>
            {/*social link*/}
            <div>
              <label className="block font-semibold mb-1" style={{ color: MAROON }}>
                Social Media Link (optional)
              </label>
              <input
                type="url"
                value={socialLink}
                onChange={(e) => setSocialLink(e.target.value)}
                placeholder="https://instagram.com/yourorg"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
                style={{ outlineColor: MAROON }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-bold text-lg transition"
              style={{ backgroundColor: MAROON }}
            >
              Create Event
            </button>
          </form>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mt-6 p-4 rounded-xl bg-green-100 border border-green-300 text-green-800">
            Event created successfully! (Backend integration coming soon)
          </div>
        )}
      </div>
    </div>
  );
}