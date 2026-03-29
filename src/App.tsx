import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Compress from './pages/Compress';
import Resize from './pages/Resize';
import ConvertToJpg from './pages/ConvertToJpg';
import Rotate from './pages/Rotate';
import Crop from './pages/Crop';
import Meme from './pages/Meme';
import Grayscale from './pages/Grayscale';
import Blur from './pages/Blur';
import Pixelate from './pages/Pixelate';
import Flip from './pages/Flip';
import BrightnessContrast from './pages/BrightnessContrast';
import HueSaturation from './pages/HueSaturation';
import Sepia from './pages/Sepia';
import Invert from './pages/Invert';
import ImageToBase64 from './pages/ImageToBase64';
import Base64ToImage from './pages/Base64ToImage';
import AddNoise from './pages/AddNoise';
import Vignette from './pages/Vignette';
import Posterize from './pages/Posterize';
import Solarize from './pages/Solarize';
import Watermark from './pages/Watermark';
import PhotoEditor from './pages/PhotoEditor';
import HtmlToImage from './pages/HtmlToImage';
import RemoveBackground from './pages/RemoveBackground';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Login from './pages/Login';
import HistoryPage from './pages/HistoryPage';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Protected Tool Routes */}
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
          <Route path="/compress" element={<ProtectedRoute><Compress /></ProtectedRoute>} />
          <Route path="/resize" element={<ProtectedRoute><Resize /></ProtectedRoute>} />
          <Route path="/convert-to-jpg" element={<ProtectedRoute><ConvertToJpg /></ProtectedRoute>} />
          <Route path="/rotate" element={<ProtectedRoute><Rotate /></ProtectedRoute>} />
          <Route path="/crop" element={<ProtectedRoute><Crop /></ProtectedRoute>} />
          <Route path="/meme" element={<ProtectedRoute><Meme /></ProtectedRoute>} />
          <Route path="/grayscale" element={<ProtectedRoute><Grayscale /></ProtectedRoute>} />
          <Route path="/blur" element={<ProtectedRoute><Blur /></ProtectedRoute>} />
          <Route path="/pixelate" element={<ProtectedRoute><Pixelate /></ProtectedRoute>} />
          <Route path="/flip" element={<ProtectedRoute><Flip /></ProtectedRoute>} />
          <Route path="/brightness-contrast" element={<ProtectedRoute><BrightnessContrast /></ProtectedRoute>} />
          <Route path="/hue-saturation" element={<ProtectedRoute><HueSaturation /></ProtectedRoute>} />
          <Route path="/sepia" element={<ProtectedRoute><Sepia /></ProtectedRoute>} />
          <Route path="/invert" element={<ProtectedRoute><Invert /></ProtectedRoute>} />
          <Route path="/image-to-base64" element={<ProtectedRoute><ImageToBase64 /></ProtectedRoute>} />
          <Route path="/base64-to-image" element={<ProtectedRoute><Base64ToImage /></ProtectedRoute>} />
          <Route path="/add-noise" element={<ProtectedRoute><AddNoise /></ProtectedRoute>} />
          <Route path="/vignette" element={<ProtectedRoute><Vignette /></ProtectedRoute>} />
          <Route path="/posterize" element={<ProtectedRoute><Posterize /></ProtectedRoute>} />
          <Route path="/solarize" element={<ProtectedRoute><Solarize /></ProtectedRoute>} />
          <Route path="/watermark" element={<ProtectedRoute><Watermark /></ProtectedRoute>} />
          <Route path="/photo-editor" element={<ProtectedRoute><PhotoEditor /></ProtectedRoute>} />
          <Route path="/html-to-image" element={<ProtectedRoute><HtmlToImage /></ProtectedRoute>} />
          <Route path="/remove-background" element={<ProtectedRoute><RemoveBackground /></ProtectedRoute>} />
          
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <ScrollToTop />
        <AppContent />
      </ErrorBoundary>
    </Router>
  );
}
