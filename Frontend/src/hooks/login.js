// src/hooks/useAuth.js
import { useState } from 'react';
// This is a FAKE google library, just for the example
import { GoogleLogin } from '@react-oauth/google'; 

// This function is just a helper for our hook
// It doesn't use any hooks, so it's a regular function
async function sendTokenToDjango(token) {
  // Your 'fetch' or 'axios' logic goes here
  const response = await fetch('http://127.0.0.1:8000/api/google/login/', { // call local host for now 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: token }),
  });
  
  if (!response.ok) {
    throw new Error('Authentication failed!');
  }
  return await response.json(); // e.g., { user, jwt_token }
}



// --- THIS IS YOUR CUSTOM HOOK ---
// It starts with "use"
export function useLogin() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // This is the function your button will call
  const loginWithGoogle = async (googleToken) => {
    setIsLoading(true);
    setError(null);
    console.log("google login flow stared")
    try {
    const userData = await sendTokenToDjango(googleToken);
    setUser(userData.user);
    } catch (err) {
    setError(err.message);
    } finally {
    setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Clear tokens from localStorage
  };

  // Expose the state and functions to your components
  return { user, error, isLoading, loginWithGoogle, logout };
}