
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact.jsx';
import Features from './pages/Features';
import About from './pages/About.jsx';
import Template from './pages/Template.jsx';
import Calendar from './pages/dashboardPages/Calendar.jsx';
import Events from './pages/dashboardPages/Event.jsx'
import Program from './pages/Program';
import Privacy from './pages/Privacy';
import Dashboard from './pages/Dashboard.jsx'
import Developers from './pages/Developers.jsx';
import SyllabusReader from './pages/dashboardPages/Syllabus.jsx'
import Overview from './pages/dashboardPages/Overview.jsx'
import Organizations from './pages/dashboardPages/Organizations.jsx'
import OrganizationView from './pages/dashboardPages/OrganizationView'
 function App() {
      return (
        <Routes >
          
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path ="/features" element = {<Features/>} />
            <Route path = "/about" element = {<About/>} />
            <Route path = "/privacy" element = {<Privacy/>} />
            <Route path = "/program" element = {<Program/>}></Route>
            <Route path = '/dashboard'element = {<Dashboard/>}>
                <Route path = 'overview' element = {<Overview/>}></Route>
                <Route path = 'syllabus' element = {<SyllabusReader/>}></Route>
                <Route path = 'calendar' element = {<Calendar/>}></Route>
                <Route path = 'events' element = {<Events/>}></Route>
                <Route path = 'organizations' element = {<Organizations/>}></Route>
                <Route path = 'organization-view' element = {<OrganizationView/>}></Route>

            </Route>
            <Route path = '/developers' element = {<Developers/>}></Route>
           
        </Routes>
      );
    }

export default App
