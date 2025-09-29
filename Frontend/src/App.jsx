
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact.jsx';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import Syllabus from './pages/Syllabus.jsx';

 function App() {
      return (
        <Routes >
          
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path ="/features" element = {<Features/>} />
            <Route path ="/pricing" element = {<Pricing/>} />
            <Route path ="/syllabus" element = {<Syllabus/>} />




            
            {/* Add more routes as needed */}
           
        </Routes>
      );
    }

export default App
