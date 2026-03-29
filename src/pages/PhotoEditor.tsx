import { useState, useRef, useEffect } from 'react';
import ImageUploader from '../components/ImageUploader';
import { Download, Loader2, PenTool, RefreshCw } from 'lucide-react';

export default function PhotoEditor() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  
  // Filters
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [blur, setBlur] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [invert, setInvert] = useState(0);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          imageRef.current = img;
          applyFilters();
        };
      };
    } else {
      setProcessedUrl(null);
      imageRef.current = null;
    }
  }, [files]);

  useEffect(() => {
    applyFilters();
  }, [brightness, contrast, grayscale, blur, sepia, invert, hue, saturation]);

  const applyFilters = () => {
    if (!imageRef.current || !canvasRef.current) return;
    
    const img = imageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = img.width;
    canvas.height = img.height;
    
    ctx.filter = `
      brightness(${brightness}%) 
      contrast(${contrast}%) 
      grayscale(${grayscale}%) 
      blur(${blur}px) 
      sepia(${sepia}%) 
      invert(${invert}%) 
      hue-rotate(${hue}deg) 
      saturate(${saturation}%)
    `;
    
    ctx.drawImage(img, 0, 0);
    setProcessedUrl(canvas.toDataURL('image/jpeg', 0.9));
  };

  const handleReset = () => {
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
    setBlur(0);
    setSepia(0);
    setInvert(0);
    setHue(0);
    setSaturation(100);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Photo Editor</h1>
          <p className="text-xl text-gray-600">Enliven your photos with messages, effects, designs and stickers.</p>
        </div>

        {files.length === 0 ? (
          <ImageUploader onFilesSelected={setFiles} multiple={false} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="lg:col-span-1 space-y-6 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-fit sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Filters</h2>
                <button 
                  onClick={handleReset}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>RESET</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Brightness: {brightness}%</label>
                  <input type="range" min="0" max="200" value={brightness} onChange={(e) => setBrightness(parseInt(e.target.value))} className="w-full accent-purple-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Contrast: {contrast}%</label>
                  <input type="range" min="0" max="200" value={contrast} onChange={(e) => setContrast(parseInt(e.target.value))} className="w-full accent-purple-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Grayscale: {grayscale}%</label>
                  <input type="range" min="0" max="100" value={grayscale} onChange={(e) => setGrayscale(parseInt(e.target.value))} className="w-full accent-purple-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Blur: {blur}px</label>
                  <input type="range" min="0" max="20" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full accent-purple-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Sepia: {sepia}%</label>
                  <input type="range" min="0" max="100" value={sepia} onChange={(e) => setSepia(parseInt(e.target.value))} className="w-full accent-purple-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Invert: {invert}%</label>
                  <input type="range" min="0" max="100" value={invert} onChange={(e) => setInvert(parseInt(e.target.value))} className="w-full accent-purple-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Hue: {hue}deg</label>
                  <input type="range" min="0" max="360" value={hue} onChange={(e) => setHue(parseInt(e.target.value))} className="w-full accent-purple-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Saturation: {saturation}%</label>
                  <input type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(parseInt(e.target.value))} className="w-full accent-purple-600" />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-3">
                <a
                  href={processedUrl || '#'}
                  download={files[0].name.replace(/\.[^/.]+$/, "") + "_edited.jpg"}
                  className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-purple-700 transition-all shadow-xl flex items-center justify-center space-x-3 uppercase"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Image</span>
                </a>
                <button 
                  onClick={() => setFiles([])}
                  className="w-full text-gray-500 font-bold text-xs hover:text-gray-700 transition-colors uppercase tracking-widest"
                >
                  Cancel and upload new
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center min-h-[500px] overflow-hidden">
                <canvas ref={canvasRef} className="hidden" />
                {processedUrl ? (
                  <img 
                    src={processedUrl} 
                    alt="Preview" 
                    className="max-w-full max-h-[700px] rounded-xl shadow-lg object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <Loader2 className="h-12 w-12 animate-spin mb-4" />
                    <p className="font-bold uppercase tracking-widest">Loading preview...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
