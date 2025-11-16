import NavBar from "../components/Navbar.jsx"
import CalendarNavBar from "../components/calendar/CalendarNavBar.jsx";
import CalendarGrid from "../components/calendar/CalendarGrid.jsx";
import { useState } from 'react';



export default function Program() {
  const [pdfFile, setPdfFile] = useState(null);
  const [responseJson, setResponseJson] = useState(null);

  const  handleUpload = async() =>{
    const res = await fetch ( "http://127.0.0.1:8000/api/syllabus" , {
        method: "GET" // change this to post later
        
    });
    console.log(pdfFile)
    const data = await res.json();
    setResponseJson(data)
  } 
  const settingPDF = (e)=>{
    setPdfFile(e.target.files[0]) // sets pdfFile to setpdffile i think
    console.log(e.target.files)
    
  }
  return (
    <>
      <NavBar />
      <div>
        {/*for now jsut a placeholder */}
        {/*Putting some basic pdfreader stuff here */}
        {/*There will be a component to see and search for events (kinda like a ) */}
        {/**/}
        {/*Page for pdf scraper will be here*/}
        <input type = "file" onChange={settingPDF}></input>
        <button onClick={handleUpload}> run</button>
        <p>{JSON.stringify(responseJson)}</p>

      </div>
    </>
  );
}

