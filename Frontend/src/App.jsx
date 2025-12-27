
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthCallback from './pages/AuthCallback';

import Home from './pages/Home';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Template from './pages/Template.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Calendar from './pages/DashboardPages/Calendar.jsx';
import Events from './pages/DashboardPages/Event.jsx';
import Program from './pages/Program';
import Privacy from './pages/Privacy';
import Dashboard from './pages/Dashboard.jsx'
import SyllabusReader from './pages/DashboardPages/Syllabus.jsx'
import Overview from './pages/DashboardPages/Overview.jsx';
import {Settings, Profile} from './pages/DashboardPages/Settings.jsx';
import Organizations from './pages/DashboardPages/Organizations.jsx'
import OrganizationView from './pages/DashboardPages/OrganizationView.jsx';
import Grades from './pages/DashboardPages/Grades.jsx'
import {Documentation, LearnMore,Solutions} from './pages/Documentation.jsx';

 function App() {
      return (
        <Router>
          <AuthProvider>
            <Routes >
              
                <Route path="/" element={<Home />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/contact" element={<Contact />} />
                <Route path ="/documentation" element = {<Documentation/>} />
                <Route path = "/documentation/learn-more" element= {<LearnMore/>} />
                <Route path = "/documentation/solutions" element= {<Solutions/>} />
                <Route path = "/login" element = {<Login/>} />
                <Route path = "/signup" element = {<Signup/>} />

                
                <Route path = "/about" element = {<About/>} />
                <Route path = "/privacy" element = {<Privacy/>} />
                <Route path = "/program" element = {<Program/>}></Route>
                <Route path = '/dashboard'element = { /*<ProtectedRoute> */  <Dashboard/> /*</ProtectedRoute> */     }>
                    <Route path = 'overview' element = {<Overview/>}></Route>
                    <Route path = 'syllabus' element = {<SyllabusReader/>}></Route>
                    <Route path = 'calendar' element = {<Calendar/>}></Route>
                    <Route path = 'events' element = {<Events/>}></Route>
                    <Route path = 'organizations' element = {<Organizations/>}></Route>
                    <Route path = 'organization-view' element = {<OrganizationView/>}></Route>
                    <Route path = 'grades' element = {<Grades/>}></Route>
                    <Route path = 'settings' element = {<Settings/>}></Route>
                    <Route path = 'profile' element = {<Profile/>}></Route>



                </Route>
                
              
            </Routes>
            </AuthProvider>
        </Router>
      );
    }

export default App
