import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showGame, setShowGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameTimeLeft, setGameTimeLeft] = useState(20);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const navigate = useNavigate();
  //const { login } = useAuth();
  const { loginWithEmail } = useAuth();

  const getRandomTargetPosition = () => ({
    x: Math.random() * 80 + 10,
    y: Math.random() * 70 + 10,
  });

  useEffect(() => {
    let unlockTimer;

    if (loading) {
      unlockTimer = setTimeout(() => {
        setShowGame(true);
        setGameScore(0);
        setGameTimeLeft(20);
        setTargetPos(getRandomTargetPosition());
      }, 6000);
    } else {
      setShowGame(false);
      setGameTimeLeft(20);
    }

    return () => {
      if (unlockTimer) {
        clearTimeout(unlockTimer);
      }
    };
  }, [loading]);

  useEffect(() => {
    if (!showGame || gameTimeLeft <= 0) {
      return undefined;
    }

    const timer = setInterval(() => {
      setGameTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [showGame, gameTimeLeft]);

  useEffect(() => {
    if (!showGame || gameTimeLeft <= 0) {
      return undefined;
    }

    const moveInterval = setInterval(() => {
      setTargetPos(getRandomTargetPosition());
    }, 1200);

    return () => clearInterval(moveInterval);
  }, [showGame, gameTimeLeft]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginWithEmail({ email, password });
      navigate("/dashboard/overview");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleHit = () => {
    if (!showGame || gameTimeLeft <= 0) {
      return;
    }

    setGameScore((score) => score + 1);
    setTargetPos(getRandomTargetPosition());
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#500000] rounded-2xl mb-4">
            <span className="text-white font-bold text-2xl">AA</span>
          </div>
          <h1 className="text-3xl font-bold text-[#500000]">Aggie Agenda</h1>
          <p className="text-gray-600 mt-2">Sign in to continue</p>
        </div>
        <div className="text-xs text-gray-500 text-center">
          Loading may take 50+ seconds to keep prices down and aggie agenda free
        </div>



        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Google Sign In */}
          <GoogleLoginButton className="w-full py-4" />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign in with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#500000] focus:border-transparent outline-none transition-all"
                placeholder="your.email@tamu.edu"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#500000] focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#500000] border-gray-300 rounded focus:ring-[#500000]"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#500000] hover:underline">
                Forgot password?
              </Link>
            </div>
            

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#500000] text-white font-semibold rounded-lg hover:bg-[#700000] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {loading && showGame && (
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <div className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
                <span>Mini challenge while you wait</span>
                <span>Time: {gameTimeLeft}s · Score: {gameScore}</span>
              </div>
              <div className="relative w-full h-48 bg-white border border-dashed border-gray-300 rounded-lg overflow-hidden">
                {gameTimeLeft > 0 && (
                  <button
                    type="button"
                    onClick={handleHit}
                    className="absolute w-10 h-10 rounded-full bg-[#500000] text-white text-xs shadow-lg transition transform hover:scale-110 focus:outline-none -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${targetPos.x}%`,
                      top: `${targetPos.y}%`,
                    }}
                  >
                    Tap me
                  </button>
                )}

                {gameTimeLeft <= 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-600">
                    Time is up! Score: {gameScore}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Keep tapping the maroon dot while we finish signing you in.
              </p>
            </div>
          )}

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#500000] font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-[#500000] transition-colors inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}