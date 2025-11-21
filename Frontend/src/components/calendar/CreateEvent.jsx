
export default function CreateEvent(props){
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
                <h2 className="text-2xl font-bold mb-4 text-red-900">Add Event</h2>
                
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Event Title</label>
                        <input 
                            type="text" 
                            className="w-full border border-red-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter event title"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Time</label>
                        <input
                            type="time" 
                            step="600"
                            className="w-2/5 border border-red-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <span> to </span>
                        <input 
                            type="time" 
                            className="w-2/5 border border-red-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea 
                            className="w-full border border-red-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            rows="3"
                            placeholder="Enter event description"
                        />
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                        <button 
                            type="button"
                            onClick={props.handleClose}
                            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition-colors"
                        >
                            Save Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}