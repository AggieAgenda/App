import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleCallback } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError('Authentication failed. Please try again.');
      setTimeout(() => {
        navigate('/');
      }, 3000);
      return;
    }

    if (token) {
      handleCallback(token);
      // Redirect to dashboard after successful login
      navigate('/dashboard/overview');
    } else {
      setError('No authentication token received.');
      setTimeout(() => {
        navigate('/');
      }, 3000);
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