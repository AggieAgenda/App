// src/pages/About.jsx
import NavBar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function About() {

  const people = [
    {
      name: "Dunsin Komolafe",
      role: "Project Manager",
      image: "https://media.licdn.com/dms/image/v2/D5603AQEtCHQ1JklxXQ/profile-displayphoto-scale_400_400/B56Zkv3EsxI4Ag-/0/1757444590874?e=1767830400&v=beta&t=-2aMBGeK4D1SDxbJuAF-vNIpa56I_WjlQhdHduu_Eps ",
      linkedin: "linkedin.com/in/dunsink",
      
    },
    {
      name: "Aniekan Ekanam",
      role: "Project Co-Manager",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFiX2jfSmZ5wg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1686291366602?e=1767830400&v=beta&t=lSozkdxPvLks_Vttqi-Tgy9BdB-nOo2uurHMJN_DMKs",
      linkedin: "linkedin.com/in/aniekanekanem/"
    },
    {
      name: "Mustafa Argin",
      role: "Project Member",
      image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      linkedin: "linkedin.com/in/dunsink"
    },
    {
      name: "Patrick Semler",
      role: "Project Member",
      image:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      linkedin: "https://www.linkedin.com/in/patricksemler/"
    }
    ,

  ]
  const former = [ // former stack people
    {
      name: "",
      role: "Project Member",
      image:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      linkedin: "https://www.linkedin.com/in/patricksemler/"
    },
    {
      name: "",
      role: "Project Member",
      image:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      linkedin: "https://www.linkedin.com/in/patricksemler/"
    }
  ] 
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-white to-gray-50 text-gray-900">
      
      {/* --- Background Animation --- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-30 animate-pulse top-10 left-20"></div>
        <div className="absolute w-96 h-96 bg-amber-200 rounded-full filter blur-3xl opacity-40 animate-pulse bottom-20 right-10" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-25 animate-pulse top-1/3 right-1/3" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* --- Navbar --- */}
      <NavBar />

      {/* --- Hero Section --- */}
      <section className="flex flex-col items-center justify-center px-10 md:px-20 py-16 max-w-7xl mx-auto w-full">
        <h1 className="text-6xl font-extrabold text-red-900 drop-shadow-md mb-8 text-center">
          About Us
        </h1>
      </section>

      {/* --- Our Mission --- */}
      <section className="px-10 md:px-20 pb-16 max-w-7xl mx-auto w-full">
        <div className='flex'>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10">
            <h2 className="text-4xl font-bold text-red-900 mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              To empower Texas A&M students with a unified platform that simplifies time management, 
              helping Aggies balance academics, social life, and the rich traditions that make our 
              university unique. We believe every student deserves tools that work as hard as they do.
            </p>
          </div>
          <div className = "bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10">
            <img src = "https://www.tamu.edu/_files/images/about/tamu-campus-entrance-aerial-sunset.JPG"></img>
          </div>
      </div>
      </section>

      
      {/* --- Team Section --- */}
      <section className="px-10 md:px-20 pb-20 max-w-7xl mx-auto w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {people.map((person, index) => (
            <div 
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img 
                  src={person.image} 
                  alt={person.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-red-900/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-white">
                <h4 className="text-3xl font-bold mb-3">
                  {person.name}
                </h4>
                <p className="text-xl mb-6 text-amber-200">
                  {person.role}
                </p>
                <a 
                  href={`https://${person.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-red-900 px-6 py-3 rounded-full font-semibold hover:bg-amber-200 hover:text-red-900 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
              
              {/* Name label at bottom (visible when not hovering) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 group-hover:opacity-0 transition-opacity duration-300">
                <h4 className="text-xl font-bold text-white text-center">
                  {person.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}