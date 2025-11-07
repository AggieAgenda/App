import {useState} from 'react'
import CreateEvent from './CreateEvent';
export default function CalendarCell(props) {
    const [showPopup, setShowPopup] = useState(false);

    const handleAddEvent = () => {
        setShowPopup(true);
    };
    return (
        <>
        <div className={props.isOutsideMonth 
            ? "h-25 p-2 text-left border border-red-400 rounded-xl text-gray-400 opacity-50" 
            : "relative group h-25 p-2 text-left text-red-900 align-top border border-red-800 rounded-xl hover:bg-red-100 hover:border-transparent"
        }>
            {props.day}
            
            {!props.isOutsideMonth && (
                <div onClick={handleAddEvent} className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center group-hover:pointer-events-auto">
                    <div className="p-2 absolute inset-0 border-2 border-dashed border-red-800 rounded-xl"></div>
                    <span className="text-red-900 text-xl"> + </span>
                </div>
            )}
        </div>
        {showPopup && <CreateEvent handleClose={() => setShowPopup(false)} />}
         </>
    );
}