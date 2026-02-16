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
  const [gameVisible, setGameVisible] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameTimeLeft, setGameTimeLeft] = useState(20);
  const [fruits, setFruits] = useState([]);
  const [gameStopped, setGameStopped] = useState(false);
  const navigate = useNavigate();
  //const { login } = useAuth();
  const { loginWithEmail } = useAuth();

  const spawnFruit = () => ({
    id: crypto.randomUUID(),
    x: Math.random() * 80 + 10,
    y: -10,
    speed: Math.random() * 0.5 + 0.8,
  });

  const startBubbleGame = () => {
    setGameVisible(true);
    setShowGame(true);
    setGameStopped(false);
    setGameScore(0);
    setGameTimeLeft(20);
    setFruits([spawnFruit()]);
  };

  const stopBubbleGame = () => {
    setGameStopped(true);
    setShowGame(false);
    setFruits([]);
  };

  useEffect(() => {
    let unlockTimer;

    if (loading) {
      unlockTimer = setTimeout(() => {
        startBubbleGame();
      }, 6000);
    } else {
      setShowGame(false);
    }

    return () => {
      if (unlockTimer) {
        clearTimeout(unlockTimer);
      }
    };
  }, [loading]);

  useEffect(() => {
    if (!showGame || gameTimeLeft <= 0 || gameStopped) {
      return undefined;
    }

    const timer = setInterval(() => {
      setGameTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [showGame, gameTimeLeft]);

  useEffect(() => {
    if (!showGame || gameTimeLeft <= 0 || gameStopped) {
      return undefined;
    }

    const moveInterval = setInterval(() => {
      setFruits((current) => {
        const moved = current
          .map((fruit) => ({ ...fruit, y: fruit.y + fruit.speed * 3 }))
          .filter((fruit) => fruit.y <= 110);
        return moved.length ? moved : [spawnFruit()];
      });
    }, 80);

    return () => clearInterval(moveInterval);
  }, [showGame, gameTimeLeft]);

  useEffect(() => {
    if (!showGame || gameTimeLeft <= 0) {
      return undefined;
    }

    const spawnInterval = setInterval(() => {
      setFruits((current) => [...current, spawnFruit()]);
    }, 900);

    return () => clearInterval(spawnInterval);
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

  const handleSlice = (id) => {
    if (!showGame || gameTimeLeft <= 0 || gameStopped) {
      return;
    }

    setFruits((current) => current.filter((fruit) => fruit.id !== id));
    setGameScore((score) => score + 1);
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
        <div className="text-xs text-gray-500 text-center mb-4">
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

          {/* Fruit Ninja Game Toggle */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Falling maroon bubbles mini-game</span>
                <span className="text-xs text-gray-500">(auto starts if loading ~6s)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={startBubbleGame}
                  className="text-xs px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Play now
                </button>
                <button
                  type="button"
                  onClick={stopBubbleGame}
                  className="text-xs px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Stop
                </button>
              </div>
            </div>

            {gameVisible && (
              <div className="mt-3 p-4 bg-gray-50 border border-dashed border-gray-200 rounded-xl">
                <div className="relative w-full h-48 rounded-lg bg-white overflow-hidden">
                  {showGame && gameTimeLeft > 0 ? (
                    <>
                      {fruits.map((fruit) => (
                        <button
                          key={fruit.id}
                          type="button"
                          onClick={() => handleSlice(fruit.id)}
                          className="absolute w-10 h-10 rounded-full bg-[#500000] text-white text-[10px] shadow-lg transition transform hover:scale-110 focus:outline-none -translate-x-1/2"
                          style={{
                            left: `${fruit.x}%`,
                            top: `${fruit.y}%`,
                          }}
                        >
                          Slice
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 px-6 text-center">
                      {loading
                        ? 'Starting shortly… you can also press Play now to begin immediately.'
                        : 'Press Play now to start slicing fruit.'}
                    </div>
                  )}

                  {showGame && gameTimeLeft <= 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-700 bg-white/70">
                      Time is up! Score: {gameScore}
                    </div>
                  )}
                </div>

                {showGame && (
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-700">
                    <span>Time: {Math.max(gameTimeLeft, 0)}s</span>
                    <span>Score: {gameScore}</span>
                  </div>
                )}
              </div>
            )}
          </div>

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