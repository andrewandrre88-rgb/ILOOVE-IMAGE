import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
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
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans antialiased">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compress" element={<Compress />} />
            <Route path="/resize" element={<Resize />} />
            <Route path="/convert-to-jpg" element={<ConvertToJpg />} />
            <Route path="/rotate" element={<Rotate />} />
            <Route path="/crop" element={<Crop />} />
            <Route path="/meme" element={<Meme />} />
            <Route path="/grayscale" element={<Grayscale />} />
            <Route path="/blur" element={<Blur />} />
            <Route path="/pixelate" element={<Pixelate />} />
            <Route path="/flip" element={<Flip />} />
            <Route path="/brightness-contrast" element={<BrightnessContrast />} />
            <Route path="/hue-saturation" element={<HueSaturation />} />
            <Route path="/sepia" element={<Sepia />} />
            <Route path="/invert" element={<Invert />} />
            <Route path="/image-to-base64" element={<ImageToBase64 />} />
            <Route path="/base64-to-image" element={<Base64ToImage />} />
            <Route path="/add-noise" element={<AddNoise />} />
            <Route path="/vignette" element={<Vignette />} />
            <Route path="/posterize" element={<Posterize />} />
            <Route path="/solarize" element={<Solarize />} />
            <Route path="/watermark" element={<Watermark />} />
            <Route path="/photo-editor" element={<PhotoEditor />} />
            <Route path="/html-to-image" element={<HtmlToImage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
