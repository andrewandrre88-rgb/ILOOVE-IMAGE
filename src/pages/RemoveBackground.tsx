import { useState, useRef, useEffect } from 'react';
import ImageUploader from '../components/ImageUploader';
import { Download, Loader2, Eraser, AlertCircle, ArrowLeftRight, RefreshCcw } from 'lucide-react';
import { saveUserHistory } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import History from '../components/History';
import { removeBackground } from "@imgly/background-removal";
import { motion, AnimatePresence } from 'motion/react';

interface ComparisonSliderProps {
  original: string;
  processed: string;
}

function ComparisonSlider({ original, processed }: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-square rounded-2xl overflow-hidden cursor-col-resize select-none bg-gray-100 shadow-inner"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* Original (Background) */}
      <img 
        src={original} 
        alt="Original" 
        className="absolute inset-0 w-full h-full object-contain"
      />
      
      {/* Processed (Foreground with Clip) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          backgroundImage: `linear-gradient(45deg, #e5e7eb 25%, transparent 25%), 
                            linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), 
                            linear-gradient(45deg, transparent 75%, #e5e7eb 75%), 
                            linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          backgroundColor: '#f9fafb'
        }}
      >
        <img 
          src={processed} 
          alt="Processed" 
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>

      {/* Slider Line */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-lg pointer-events-none flex items-center justify-center"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center -ml-0.5 border-2 border-blue-600">
          <ArrowLeftRight className="h-4 w-4 text-blue-600" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest pointer-events-none">
        Result
      </div>
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest pointer-events-none">
        Original
      </div>
    </div>
  );
}

export default function RemoveBackground() {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [processedFiles, setProcessedFiles] = useState<{ name: string; url: string; originalUrl: string; originalSize: number; processedSize: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleRemoveBackground = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);
    setProcessingStatus('Initializing AI model...');
    
    const results = [];
    
    try {
      for (const file of files) {
        const originalUrl = URL.createObjectURL(file);
        
        setProcessingStatus(`Processing ${file.name}...`);
        
        // Remove background using @imgly/background-removal
        const blob = await removeBackground(file, {
          publicPath: "https://static.img.ly/background-removal/v1.7.0/",
          progress: (step, index, total) => {
            const percent = Math.round((index / total) * 100);
            setProcessingStatus(`${step.charAt(0).toUpperCase() + step.slice(1)}: ${percent}%`);
          }
        });
        
        const url = URL.createObjectURL(blob);
        
        results.push({
          name: file.name.replace(/\.[^/.]+$/, "") + "_no_bg.png",
          url: url,
          originalUrl: originalUrl,
          originalSize: file.size,
          processedSize: blob.size
        });
        
        // Save to user history if logged in
        if (user) {
          await saveUserHistory(user.uid, 'REMOVE_BG', file.name, 'Background Removed');
        }
      }
      
      setProcessedFiles(results);
    } catch (err) {
      console.error("Background removal failed", err);
      setError("Failed to remove background. This can happen with very large images or complex backgrounds. Please try a different image.");
    } finally {
      setIsProcessing(false);
      setProcessingStatus('');
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-4 bg-blue-600 rounded-3xl mb-6 shadow-xl shadow-blue-200"
          >
            <Eraser className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Remove Background</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            AI-powered background removal directly in your browser. 
            Fast, secure, and 100% automatic.
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center space-x-3 text-red-700"
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </motion.div>
        )}

        {processedFiles.length === 0 ? (
          <div className="space-y-8">
            <div className="relative">
              <ImageUploader onFilesSelected={setFiles} multiple={true} />
              {isProcessing && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center z-20">
                  <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                  <p className="text-xl font-bold text-gray-900">{processingStatus}</p>
                  <p className="text-gray-500 mt-2">This may take a few moments...</p>
                </div>
              )}
            </div>
            
            {files.length > 0 && !isProcessing && (
              <div className="flex justify-center">
                <button
                  onClick={handleRemoveBackground}
                  className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 flex items-center space-x-4 active:scale-95"
                >
                  <Eraser className="h-6 w-6" />
                  <span>REMOVE BACKGROUND</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Results Ready!</h2>
                  <p className="text-gray-500 font-medium">Slide to compare original and processed images.</p>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => { setProcessedFiles([]); setFiles([]); }}
                    className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    <span>START OVER</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {processedFiles.map((file, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col bg-gray-50 rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <ComparisonSlider original={file.originalUrl} processed={file.url} />
                    
                    <div className="p-6 flex items-center justify-between bg-white">
                      <div className="truncate mr-4">
                        <p className="font-bold text-gray-900 truncate text-sm">{file.name}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">PNG</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{formatSize(file.processedSize)}</span>
                        </div>
                      </div>
                      <a
                        href={file.url}
                        download={file.name}
                        className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 active:scale-90"
                      >
                        <Download className="h-6 w-6" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={() => {
                    processedFiles.forEach(file => {
                      const link = document.createElement('a');
                      link.href = file.url;
                      link.download = file.name;
                      link.click();
                    });
                  }}
                  className="w-full sm:w-auto bg-blue-600 text-white px-16 py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 flex items-center justify-center space-x-4 active:scale-95"
                >
                  <Download className="h-7 w-7" />
                  <span>DOWNLOAD ALL IMAGES</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Section */}
        <History />

        {/* SEO Information Section */}
        <section className="mt-32 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">AI Background Removal</h2>
              <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                Our <span className="font-bold text-blue-600">online background remover</span> uses advanced AI technology to detect the subject 
                of your photo and remove the background with surgical precision. Whether it's a portrait, a product photo, or an animal, 
                our tool handles complex edges like hair and fur with ease.
              </p>
              <ul className="space-y-4 text-gray-600 font-bold text-sm">
                <li className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-1 rounded-full"><Eraser className="h-4 w-4 text-blue-600" /></div>
                  <span>100% Automatic and free</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-1 rounded-full"><Eraser className="h-4 w-4 text-blue-600" /></div>
                  <span>High-quality PNG with transparency</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-1 rounded-full"><Eraser className="h-4 w-4 text-blue-600" /></div>
                  <span>No manual masking required</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Perfect for E-commerce</h2>
              <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                Need clean product images for Amazon, eBay, or Shopify? Our <span className="font-bold text-blue-600">background removal tool</span> 
                is the fastest way to get professional-looking results without expensive software. Process multiple images in bulk and 
                download them instantly.
              </p>
              <p className="text-gray-600 leading-relaxed font-medium">
                Your privacy is guaranteed. All processing happens directly in your browser using WebAssembly, meaning your photos 
                never leave your computer. Fast, secure, and private.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
