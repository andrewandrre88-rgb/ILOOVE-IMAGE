import { 
  Minimize2, 
  Maximize2, 
  Crop, 
  RefreshCw, 
  RotateCw, 
  Layers, 
  PenTool, 
  Type, 
  FileCode,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Sun,
  Palette,
  History,
  Contrast,
  Code,
  FileImage,
  Image as ImageIcon,
  Wind,
  Circle,
  Grid,
  ZapIcon,
  Wrench
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import ToolCard from '../components/ToolCard';
import { useAuth } from '../hooks/useAuth';

const tools = [
  { 
    title: "COMPRESS IMAGE", 
    description: "Compress JPG, PNG, SVG or GIF with the best quality and compression. Reduce the filesize of your images at once.",
    path: "/compress", 
    icon: Minimize2, 
    color: "bg-blue-600" 
  },
  { 
    title: "RESIZE IMAGE", 
    description: "Define your dimensions, by pixels or percentages, and resize your JPG, PNG, SVG and GIF images.",
    path: "/resize", 
    icon: Maximize2, 
    color: "bg-blue-600" 
  },
  { 
    title: "CROP IMAGE", 
    description: "Crop JPG, PNG or GIF with ease; Choose pixels to define your rectangle or use our visual editor.",
    path: "/crop", 
    icon: Crop, 
    color: "bg-blue-600" 
  },
  { 
    title: "CONVERT TO JPG", 
    description: "Turn PNG, GIF, TIF, PSD, SVG, WEBP, HEIC or RAW format images to JPG format with ease.",
    path: "/convert-to-jpg", 
    icon: RefreshCw, 
    color: "bg-orange-600" 
  },
  { 
    title: "ROTATE IMAGE", 
    description: "Rotate your JPG, PNG or GIF images at once. Choose to rotate only landscape or portrait images!",
    path: "/rotate", 
    icon: RotateCw, 
    color: "bg-teal-600" 
  },
  { 
    title: "MEME GENERATOR", 
    description: "Create your own memes online with ease. Choose your own images or use our templates.",
    path: "/meme", 
    icon: Layers, 
    color: "bg-pink-600" 
  },
  { 
    title: "GRAYSCALE IMAGE", 
    description: "Convert your colorful images to black and white in seconds. Simple and effective.",
    path: "/grayscale", 
    icon: ImageIcon, 
    color: "bg-gray-600" 
  },
  { 
    title: "BLUR IMAGE", 
    description: "Blur sensitive parts of your image or the whole thing. Protect your privacy.",
    path: "/blur", 
    icon: ImageIcon, 
    color: "bg-blue-400" 
  },
  { 
    title: "PIXELATE IMAGE", 
    description: "Apply a pixelation effect to your images. Great for obscuring faces or creating art.",
    path: "/pixelate", 
    icon: ImageIcon, 
    color: "bg-green-600" 
  },
  { 
    title: "FLIP IMAGE", 
    description: "Mirror your images horizontally or vertically. Perfect for fixing orientation.",
    path: "/flip", 
    icon: RefreshCw, 
    color: "bg-indigo-600" 
  },
  { 
    title: "BRIGHTNESS & CONTRAST", 
    description: "Adjust the brightness and contrast of your images to make them pop.",
    path: "/brightness-contrast", 
    icon: Sun, 
    color: "bg-yellow-500" 
  },
  { 
    title: "HUE & SATURATION", 
    description: "Change the colors and intensity of your images with hue and saturation controls.",
    path: "/hue-saturation", 
    icon: Palette, 
    color: "bg-pink-500" 
  },
  { 
    title: "SEPIA FILTER", 
    description: "Give your images a vintage look with a classic sepia tone filter.",
    path: "/sepia", 
    icon: History, 
    color: "bg-amber-700" 
  },
  { 
    title: "INVERT COLORS", 
    description: "Flip the colors of your image to create a negative effect.",
    path: "/invert", 
    icon: Contrast, 
    color: "bg-gray-900" 
  },
  { 
    title: "IMAGE TO BASE64", 
    description: "Convert your images into Base64 strings for easy embedding in code.",
    path: "/image-to-base64", 
    icon: Code, 
    color: "bg-blue-800" 
  },
  { 
    title: "BASE64 TO IMAGE", 
    description: "Convert Base64 strings back into viewable and downloadable images.",
    path: "/base64-to-image", 
    icon: FileImage, 
    color: "bg-green-800" 
  },
  { 
    title: "ADD NOISE", 
    description: "Add a grain or noise effect to your images for a textured look.",
    path: "/add-noise", 
    icon: Wind, 
    color: "bg-gray-400" 
  },
  { 
    title: "VIGNETTE EFFECT", 
    description: "Darken the edges of your images to focus attention on the center.",
    path: "/vignette", 
    icon: Circle, 
    color: "bg-black" 
  },
  { 
    title: "POSTERIZE", 
    description: "Reduce the number of colors in your image for a poster-like effect.",
    path: "/posterize", 
    icon: Grid, 
    color: "bg-red-500" 
  },
  { 
    title: "SOLARIZE", 
    description: "Create a solarization effect by partially inverting the colors of your image.",
    path: "/solarize", 
    icon: ZapIcon, 
    color: "bg-orange-400" 
  },
  { 
    title: "PHOTO EDITOR", 
    description: "Enliven your photos with messages, effects, designs and stickers. Simple editing tools for your images.",
    path: "/photo-editor", 
    icon: PenTool, 
    color: "bg-purple-600" 
  },
  { 
    title: "WATERMARK", 
    description: "Stamp an image or text over your images in seconds. Choose typography, transparency and position.",
    path: "/watermark", 
    icon: Type, 
    color: "bg-indigo-600" 
  },
  { 
    title: "HTML TO IMAGE", 
    description: "Convert web pages in HTML to JPG or SVG. Copy and paste the URL of the page you want to convert.",
    path: "/html-to-image", 
    icon: FileCode, 
    color: "bg-red-600" 
  },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-3xl border border-white/20 mb-10"
          >
            <div className="bg-blue-600 p-2 rounded-xl">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-black tracking-widest uppercase">iLoveTools</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase"
          >
            Every tool you could want to <span className="text-blue-500">edit images</span> in bulk
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto font-medium"
          >
            iLoveTools is the web app that helps you modify images for free. 
            Compress, resize, crop, convert, and more!
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {user ? (
              <a href="#tools" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-lg tracking-widest transition-all shadow-2xl shadow-blue-500/20 uppercase">
                Explore Tools
              </a>
            ) : (
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-lg tracking-widest transition-all shadow-2xl shadow-blue-500/20 uppercase">
                Get Started Free
              </Link>
            )}
          </motion.div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">All the tools you need</h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} isLocked={!user} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Fast & Efficient</h3>
              <p className="text-gray-600 leading-relaxed">
                Process your images in seconds. Our high-performance servers ensure your tasks are completed instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Secure & Private</h3>
              <p className="text-gray-600 leading-relaxed">
                Your privacy is our priority. All files are automatically deleted from our servers after 2 hours.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Best Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                We use the best algorithms to ensure your images maintain the highest possible quality after editing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">Ready to optimize your images?</h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Join millions of users who trust iLoveTools for their daily image editing needs.
          </p>
          {user ? (
            <a href="#tools" className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-black text-xl tracking-widest hover:bg-gray-100 transition-all shadow-2xl uppercase inline-block">
              Explore Tools
            </a>
          ) : (
            <Link to="/login" className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-black text-xl tracking-widest hover:bg-gray-100 transition-all shadow-2xl uppercase inline-block">
              Start Now for Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
