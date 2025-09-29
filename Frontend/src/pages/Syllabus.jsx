// src/pages/contact.jsx
async function callAPI(){
    console.log("call syllabus API")
}
    

export default function Contact() {
  return (
    <div className="w-screen h-screen bg-[#121212] text-white flex flex-col">
      {/* Navbar */}
      <nav className="w-full max-w-6xl mx-auto flex items-center justify-between p-6">
        <a href="/">
          <h1 className="text-2xl font-bold text-maroon-600">Aggie Agenda</h1>
        </a>
        <div className="space-x-6">
          <a href="/features" className="hover:text-maroon-400 transition">Features</a>
          <a href="/pricing" className="hover:text-maroon-400 transition">Pricing</a>
          <a href="/contact" className="hover:text-maroon-400 transition">Contact</a>
          <button className="ml-4 px-5 py-2 bg-maroon-600 hover:bg-maroon-700 rounded-lg transition">
            Coming Soon
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-lg bg-[#1E1E1E] rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-center text-white mb-6">Upload Your Syllabus</h2>
          <p className="text-gray-400 text-center mb-8">
            Upload your syllabus below to get started with Aggie Agenda.
          </p>
          
          {/* File Upload */}
          <div className="flex flex-col items-center space-y-6">
            <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-6 cursor-pointer hover:border-maroon-500 transition">
              <input type="file" className="hidden" />
              <span className="text-gray-300">Click to upload or drag & drop</span>
              <span className="text-sm text-gray-500 mt-2">PDF, DOCX, or TXT</span>
            </label>

            <button onClick = {callAPI} className="w-full py-2 px-4 bg-maroon-600 hover:bg-maroon-700 rounded-lg transition">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
