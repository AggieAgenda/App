import CalendarCell from './CalendarCell.jsx'

export default function CalendarGrid(props){
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const firstDayOfMonth = new Date(props.year, props.month, 1).getDay();
    const daysInMonth = new Date(props.year, props.month + 1, 0).getDate();
    const previousMonthDays = new Date(props.year, props.month, 0).getDate();
    
    const getDays = () => {
        const days = [];
        
        // Add cells for days from previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const day = previousMonthDays - firstDayOfMonth + i + 1;
            days.push(
                <div key={`prev-${i}`} className="text-gray-400">
                    <CalendarCell day={day} isOutsideMonth={true} />
                </div>
            );
        }
        
        // Add the actual days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(
                <div key={`day-${day}`}>
                    <CalendarCell day={day} isOutsideMonth={false} />
                </div>
            );
        }
        
        // Add cells for days from next month to complete the grid
        const totalCells = days.length;
        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        
        for (let i = 1; i <= remainingCells; i++){
            days.push(
                <div key={`next-${i}`} className="text-gray-400">
                    <CalendarCell day={i} isOutsideMonth={true} />
                </div>
            );
        }
        return days;
    };
    return(
        <>
            <div className="grid grid-flow-row grid-cols-7 text-center font-black text-xl">
                {dayNames.map((day,i) => (<div key={i}>{day}</div>))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-start">
                {getDays()}
            </div>
        </>
    );
}