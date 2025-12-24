    // src/main.jsx (or src/index.jsx)
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { BrowserRouter } from 'react-router-dom';
    import App from './App.jsx';
    import './index.css';
    import { GoogleOAuthProvider } from '@react-oauth/google';

     ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        
          
            <App />
          
          
        
      </React.StrictMode>,
    );