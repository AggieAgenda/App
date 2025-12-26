export default function OrganizationView(){
    const orgData = [
        {orgID: "", Name: "lsdkfj"},
        {orgID: "Aggie Agenda"}

    ]
    return (
        <div>

            <h1> This is only for organizatoins</h1>
            <h1>Hello</h1>
            <button>Add Event</button>
            {orgData.map((org)=>(
                
                    <h1 key = {org.orgID}>{org.orgID}</h1>
                
            ))}
            {ComingSoon()}
        </div>
        
    )
}
function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-maroon-500 mb-4">
            Coming Soon
          </h1>
          <div className="w-24 h-1 bg-maroon-500 mx-auto mb-6"></div>
        </div>
        
        <p className="text-xl text-gray-300 mb-8">
          We're working hard to bring you something amazing. This feature will be available soon!
        </p>
        
        <div className="bg-[#1e1e1e] rounded-2xl p-8 border border-gray-700">
          <div className="flex items-center justify-center mb-4">
            <svg 
              className="w-16 h-16 text-maroon-500" 
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
          <p className="text-gray-400">
            Check back later to explore this exciting new feature!
          </p>
        </div>
        
        <p className="text-sm text-gray-500 mt-8">
          Have suggestions? We'd love to hear from you!
        </p>
      </div>
    </div>
  );
}