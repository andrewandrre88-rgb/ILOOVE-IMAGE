import { Link, useLocation } from 'react-router-dom';
import { 
  Image as ImageIcon, 
  Menu, 
  X, 
  ChevronDown, 
  Minimize2, 
  Maximize2, 
  Crop, 
  RefreshCw, 
  RotateCw, 
  Layers,
  PenTool,
  Type,
  FileCode,
  Sun,
  Palette,
  History,
  Contrast,
  Code,
  FileImage,
  Wind,
  Circle,
  Grid,
  ZapIcon,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { logout } from '../firebase';
import { useAuth } from '../hooks/useAuth';

const allTools = [
  { title: "COMPRESS IMAGE", path: "/compress", icon: Minimize2, iconColor: "text-blue-600" },
  { title: "RESIZE IMAGE", path: "/resize", icon: Maximize2, iconColor: "text-blue-600" },
  { title: "CROP IMAGE", path: "/crop", icon: Crop, iconColor: "text-blue-600" },
  { title: "CONVERT TO JPG", path: "/convert-to-jpg", icon: RefreshCw, iconColor: "text-orange-600" },
  { title: "ROTATE IMAGE", path: "/rotate", icon: RotateCw, iconColor: "text-teal-600" },
  { title: "MEME GENERATOR", path: "/meme", icon: Layers, iconColor: "text-pink-600" },
  { title: "GRAYSCALE IMAGE", path: "/grayscale", icon: ImageIcon, iconColor: "text-gray-600" },
  { title: "BLUR IMAGE", path: "/blur", icon: ImageIcon, iconColor: "text-blue-400" },
  { title: "PIXELATE IMAGE", path: "/pixelate", icon: ImageIcon, iconColor: "text-green-600" },
  { title: "FLIP IMAGE", path: "/flip", icon: RefreshCw, iconColor: "text-indigo-600" },
  { title: "BRIGHTNESS & CONTRAST", path: "/brightness-contrast", icon: Sun, iconColor: "text-yellow-500" },
  { title: "HUE & SATURATION", path: "/hue-saturation", icon: Palette, iconColor: "text-pink-500" },
  { title: "SEPIA FILTER", path: "/sepia", icon: History, iconColor: "text-amber-700" },
  { title: "INVERT COLORS", path: "/invert", icon: Contrast, iconColor: "text-gray-900" },
  { title: "IMAGE TO BASE64", path: "/image-to-base64", icon: Code, iconColor: "text-blue-800" },
  { title: "BASE64 TO IMAGE", path: "/base64-to-image", icon: FileImage, iconColor: "text-green-800" },
  { title: "ADD NOISE", path: "/add-noise", icon: Wind, iconColor: "text-gray-400" },
  { title: "VIGNETTE EFFECT", path: "/vignette", icon: Circle, iconColor: "text-black" },
  { title: "POSTERIZE", path: "/posterize", icon: Grid, iconColor: "text-red-500" },
  { title: "SOLARIZE", path: "/solarize", icon: ZapIcon, iconColor: "text-orange-400" },
  { title: "PHOTO EDITOR", path: "/photo-editor", icon: PenTool, iconColor: "text-purple-600" },
  { title: "WATERMARK", path: "/watermark", icon: Type, iconColor: "text-indigo-600" },
  { title: "HTML TO IMAGE", path: "/html-to-image", icon: FileCode, iconColor: "text-red-600" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const { user } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsToolsOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-10">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-blue-200">
                <ImageIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase">
                iLove<span className="text-blue-600">IMG</span>
              </span>
            </Link>
            
            <nav className="hidden lg:flex items-center space-x-1">
              {['COMPRESS', 'RESIZE', 'CROP'].map((name) => {
                const path = `/${name.toLowerCase()}`;
                const isActive = location.pathname === path;
                return (
                  <Link 
                    key={name}
                    to={path} 
                    className={`px-4 py-2 rounded-xl text-[11px] font-black tracking-widest transition-all uppercase ${
                      isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {name} IMAGE
                  </Link>
                );
              })}
              
              <div className="relative group/tools">
                <button 
                  onMouseEnter={() => setIsToolsOpen(true)}
                  className={`flex items-center px-4 py-2 rounded-xl text-[11px] font-black tracking-widest transition-all uppercase ${
                    isToolsOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  ALL IMG TOOLS <ChevronDown className={`ml-1.5 h-3.5 w-3.5 transition-transform duration-300 ${isToolsOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isToolsOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      onMouseLeave={() => setIsToolsOpen(false)}
                      className="absolute left-0 top-full pt-3 w-[640px]"
                    >
                      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 grid grid-cols-3 gap-6 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>
                        {allTools.map((tool, idx) => (
                          <Link 
                            key={idx}
                            to={tool.path}
                            className="flex items-center space-x-4 p-3.5 rounded-2xl hover:bg-blue-50 transition-all group/item"
                          >
                            <div className="p-2.5 rounded-xl bg-gray-50 group-hover/item:bg-white transition-colors">
                              <tool.icon className={`h-5 w-5 ${tool.iconColor} group-hover/item:scale-110 transition-transform`} />
                            </div>
                            <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest leading-tight">{tool.title}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/blog" className="text-gray-600 hover:text-blue-600 text-[11px] font-black tracking-widest uppercase transition-colors">BLOG</Link>
            <div className="h-5 w-px bg-gray-200"></div>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 group"
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-transparent group-hover:border-blue-600 transition-all">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-50 mb-2">
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Signed in as</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{user.displayName || user.email}</p>
                      </div>
                      <Link 
                        to="/history" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full flex items-center space-x-3 p-3 rounded-2xl hover:bg-blue-50 text-gray-700 transition-colors group mb-2"
                      >
                        <div className="p-2 rounded-xl bg-blue-100 group-hover:bg-white transition-colors">
                          <History className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">My History</span>
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 p-3 rounded-2xl hover:bg-red-50 text-red-600 transition-colors group"
                      >
                        <div className="p-2 rounded-xl bg-red-100 group-hover:bg-white transition-colors">
                          <LogOut className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                to="/login"
                className="bg-blue-600 text-white px-7 py-3.5 rounded-2xl font-black text-[11px] tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 uppercase"
              >
                Sign in
              </Link>
            )}
          </div>

          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-700 hover:text-blue-600 p-2 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 lg:hidden bg-white"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center h-20 px-4 border-b border-gray-100">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2">
                  <div className="bg-blue-600 p-2 rounded-xl">
                    <ImageIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase">
                    iLove<span className="text-blue-600">IMG</span>
                  </span>
                </Link>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="p-2 rounded-xl bg-gray-50 text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-2">
                  {allTools.map((tool, idx) => (
                    <Link 
                      key={idx}
                      to={tool.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-blue-50 transition-colors group"
                    >
                      <div className={`p-3 rounded-xl bg-gray-50 group-hover:bg-white transition-colors`}>
                        <tool.icon className={`h-6 w-6 ${tool.iconColor || 'text-blue-600'}`} />
                      </div>
                      <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">{tool.title}</span>
                    </Link>
                  ))}
                  <Link 
                    to="/blog" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-blue-50 transition-colors group"
                  >
                    <div className="p-3 rounded-xl bg-gray-50 group-hover:bg-white transition-colors">
                      <ImageIcon className="h-6 w-6 text-gray-600" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">BLOG</span>
                  </Link>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
                {user ? (
                  <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                            <UserIcon className="h-5 w-5 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 truncate max-w-[150px]">{user.displayName || user.email}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Signed in</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="p-3 rounded-xl bg-red-50 text-red-600"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full py-4 rounded-2xl font-black text-white bg-blue-600 shadow-lg shadow-blue-100 uppercase tracking-widest text-center block"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
