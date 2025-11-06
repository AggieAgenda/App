
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact.jsx';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import About from './pages/About.jsx';
import FAQ from './pages/FAQ.jsx'
import Template from './pages/Template.jsx'
import Calendar from './pages/Calendar.jsx'
import Event from './pages/Event.jsx'
 function App() {
      return (
        <Routes >
          
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path ="/features" element = {<Features/>} />
            <Route path ="/pricing" element = {<Pricing/>} />
            <Route path ="/calendar" element = {<Calendar/>} />
            <Route path = "/about" element = {<About/>}></Route>
            <Route path = "/FAQ" element = {<FAQ/>}></Route>

            
            {/* Add more routes as needed */}
            <Route path = "/events" element = {<Event/>}></Route>

           
        </Routes>
      );
    }

export default App
