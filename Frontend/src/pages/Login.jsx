import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function Login() {
  const BOARD_SIZE = 12;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showGame, setShowGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [snake, setSnake] = useState([
    { x: 4, y: 4 },
    { x: 3, y: 4 },
    { x: 2, y: 4 },
  ]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState({ x: 8, y: 4 });
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();
  //const { login } = useAuth();
  const { loginWithEmail } = useAuth();

  const getRandomCell = (occupied) => {
    let pos;

    do {
      pos = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (occupied?.some((cell) => cell.x === pos.x && cell.y === pos.y));

    return pos;
  };

  useEffect(() => {
    let unlockTimer;

    if (loading) {
      unlockTimer = setTimeout(() => {
        setShowGame(true);
        setGameScore(0);
        const startSnake = [
          { x: 4, y: 4 },
          { x: 3, y: 4 },
          { x: 2, y: 4 },
        ];
        setSnake(startSnake);
        setDirection('RIGHT');
        setFood(getRandomCell(startSnake));
        setGameOver(false);
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
    if (!showGame) {
      return undefined;
    }

    const moveInterval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const nextHead = {
          x:
            direction === 'RIGHT'
              ? head.x + 1
              : direction === 'LEFT'
              ? head.x - 1
              : head.x,
          y:
            direction === 'DOWN'
              ? head.y + 1
              : direction === 'UP'
              ? head.y - 1
              : head.y,
        };

        const hitWall =
          nextHead.x < 0 ||
          nextHead.x >= BOARD_SIZE ||
          nextHead.y < 0 ||
          nextHead.y >= BOARD_SIZE;

        const hitSelf = prevSnake.some(
          (segment) => segment.x === nextHead.x && segment.y === nextHead.y
        );

        if (hitWall || hitSelf) {
          const resetSnake = [
            { x: 4, y: 4 },
            { x: 3, y: 4 },
            { x: 2, y: 4 },
          ];
          setGameOver(true);
          setGameScore(0);
          setFood(getRandomCell(resetSnake));
          setDirection('RIGHT');
          return resetSnake;
        }

        const ateFood = nextHead.x === food.x && nextHead.y === food.y;
        const nextSnake = [nextHead, ...prevSnake];

        if (!ateFood) {
          nextSnake.pop();
        } else {
          setFood(getRandomCell(nextSnake));
          setGameScore((score) => score + 1);
          setGameOver(false);
        }

        return nextSnake;
      });
    }, 160);

    return () => clearInterval(moveInterval);
  }, [showGame, direction, food]);

  useEffect(() => {
    if (!showGame) {
      return undefined;
    }

    const handleKey = (e) => {
      const key = e.key.toLowerCase();

      setDirection((current) => {
        if ((key === 'arrowup' || key === 'w') && current !== 'DOWN') {
          return 'UP';
        }
        if ((key === 'arrowdown' || key === 's') && current !== 'UP') {
          return 'DOWN';
        }
        if ((key === 'arrowleft' || key === 'a') && current !== 'RIGHT') {
          return 'LEFT';
        }
        if ((key === 'arrowright' || key === 'd') && current !== 'LEFT') {
          return 'RIGHT';
        }
        return current;
      });
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showGame]);

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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8">
        <div className="max-w-md w-full mx-auto lg:mx-0">
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

        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Snake while you wait</p>
                <p className="text-lg font-semibold text-gray-800">Score: {gameScore}</p>
              </div>
              <span className="text-xs text-gray-500">
                {loading
                  ? showGame
                    ? 'Use arrow keys or WASD'
                    : 'Unlocks if sign-in takes a moment'
                  : 'Start signing in to play'}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center">
              {showGame ? (
                <div className="w-full max-w-md aspect-square">
                  <div className="grid grid-cols-12 gap-[2px] bg-gray-200 p-2 rounded-xl h-full">
                    {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
                      const x = index % BOARD_SIZE;
                      const y = Math.floor(index / BOARD_SIZE);
                      const isHead = snake[0]?.x === x && snake[0]?.y === y;
                      const isBody = snake.some(
                        (segment, idx) => idx !== 0 && segment.x === x && segment.y === y
                      );
                      const isFood = food.x === x && food.y === y;

                      const cellClasses = [
                        'w-full h-full rounded-md transition-colors duration-150',
                        isHead
                          ? 'bg-[#500000]'
                          : isBody
                          ? 'bg-[#a05252]'
                          : isFood
                          ? 'bg-amber-400'
                          : 'bg-white',
                      ].join(' ');

                      return <div key={index} className={cellClasses}></div>;
                    })}
                  </div>
                  {gameOver && (
                    <div className="mt-2 text-xs text-red-600 font-semibold">
                      You bumped! Restarted. Keep playing while we sign you in.
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-gray-600 text-center bg-gray-50 border border-dashed border-gray-200 rounded-xl p-6 w-full">
                  {loading
                    ? 'Launching snake... if loading runs long it will appear here.'
                    : 'Begin a login to unlock the snake mini-game.'}
                </div>
              )}
            </div>

            <p className="text-xs text-gray-500 text-center">
              Stay nearby—once sign-in finishes, we will redirect you automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}