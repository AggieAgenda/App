
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact.jsx';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import About from './pages/About.jsx';
import Template from './pages/Template.jsx'
import Privacy from './pages/Privacy';

 function App() {
      return (
        <Routes >
          
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path ="/features" element = {<Features/>} />
            <Route path ="/pricing" element = {<Pricing/>} />
            <Route path = "/about" element = {<About/>} />
            <Route path = "/privacy" element = {<Privacy/>} />
            
           
        </Routes>
      );
    }

export default App
