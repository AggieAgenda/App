// src/pages/contact.jsx
export default function Contact() {
  return (
    <div className="w-screen h-screen bg-[#121212] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-5xl">
        <nav className=" flex items-center justify-between pb-10">
            <a href = "/">
            <h1  className="text-2xl font-bold text-maroon-600">Aggie Agenda</h1>
            </a>
            <div className="top-0 space-x-6">
              <a href="/features" className="hover:text-maroon-400 transition">Features</a>
              <a href="/pricing" className="hover:text-maroon-400 transition">Pricing</a>
              <a href="/contact" className="hover:text-maroon-400 transition">Contact</a>
              <button className="ml-4 px-5 py-2 bg-maroon-600 hover:bg-maroon-700 rounded-lg transition">
                Coming Soon
              </button>
            </div>
        </nav>
        <div classname=" text-gray-400 pb-10 items-center">
          <h2 className="text-4xl font-extrabold text-center  pb-5">Contact Us</h2>
          <a href ="https://www.instagram.com/aggieagenda"className="text-center pb-90" >
            Have questions, feedback, or ideas? We’d love to hear from you. DM us on our instagram @aggieagenda
          </a>
          

          
        </div>
        <div classname></div>
        

          
        
      </div>
    </div>
  );
}
