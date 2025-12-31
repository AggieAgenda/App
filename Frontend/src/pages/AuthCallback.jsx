import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleCallback } = useAuth();
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);
  useEffect(() => {
  const code = searchParams.get('code'); // Google sends 'code', not 'token'
  const errorParam = searchParams.get('error');


  if (errorParam) {
    setError('Authentication failed.');
    setTimeout(() => navigate('/'), 3000);
    return;
  }
  console.log(code)
  if (code && !hasFetched.current) {
    hasFetched.current = true;
    // 1. Call your BACKEND API with the code
    const exchangeCodeForToken = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: code })
        });
        
        const data = await response.json();

        if (data.token) {
          // 2. Pass the final backend token to your AuthContext
          handleCallback(data.token); 
          navigate('/dashboard/overview');
        } else {
          throw new Error('No token returned from backend');
        }
      } catch (error) {
        setError('Backend exchange failed. \n Account made with password not Oauth');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    exchangeCodeForToken();
  } 
}, [searchParams, handleCallback, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-xl font-semibold">{error}</div>
          <p className="text-gray-600">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 text-[#500000] animate-spin mx-auto" />
        <h2 className="text-2xl font-bold text-[#500000]">Signing you in...</h2>
        <p className="text-gray-600">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
}