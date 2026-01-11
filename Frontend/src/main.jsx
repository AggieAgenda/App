    // src/main.jsx (or src/index.jsx)
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { BrowserRouter } from 'react-router-dom';
    import App from './App.jsx';
    import './index.css';
    import { GoogleOAuthProvider } from '@react-oauth/google';
    import ReactGA from "react-ga4"

    ReactGA.initialize("G-5YYQ1WGGG7");
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });

     ReactDOM.createRoot(document.getElementById('root')).render(
      //<React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <App /> 
        </GoogleOAuthProvider>
      //</React.StrictMode>,
    );