import { motion } from 'motion/react';
import { Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithGoogle, useAuthState, handleRedirectResult } from '../firebase';
import { useEffect, useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Get the page the user was trying to visit before being redirected to login
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    const checkRedirect = async () => {
      const user = await handleRedirectResult();
      if (user) {
        navigate(from, { replace: true });
      }
    };
    checkRedirect();
  }, [navigate, from]);

  useEffect(() => {
    const unsubscribe = useAuthState((user) => {
      if (user) {
        navigate(from, { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate, from]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl border border-gray-100 p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center space-x-2.5 group mb-8">
            <div className="bg-blue-600 p-2.5 rounded-2xl group-hover:rotate-6 transition-transform duration-300 shadow-xl shadow-blue-200">
              <ImageIcon className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-black text-gray-900 tracking-tighter uppercase">
              iLove<span className="text-blue-600">IMG</span>
            </span>
          </Link>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-4 bg-white border-2 border-gray-100 hover:border-blue-600 hover:bg-blue-50 text-gray-700 py-4 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase transition-all shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            <span>{isLoading ? 'Connecting...' : 'Continue with Google'}</span>
          </button>

          <Link 
            to="/"
            className="w-full flex items-center justify-center space-x-2 text-gray-400 hover:text-blue-600 py-2 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to Home</span>
          </Link>
        </div>
      </motion.div>

      <div className="mt-8 text-center relative z-10">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Trusted by millions of users</p>
        <div className="flex justify-center space-x-6 opacity-30 grayscale">
          <div className="h-6 w-20 bg-gray-400 rounded-lg"></div>
          <div className="h-6 w-20 bg-gray-400 rounded-lg"></div>
          <div className="h-6 w-20 bg-gray-400 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
