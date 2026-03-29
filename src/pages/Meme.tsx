import { useState, useRef, useEffect } from 'react';
import ImageUploader from '../components/ImageUploader';
import { Download, Loader2, Layers, Type } from 'lucide-react';

export default function Meme() {
  const [files, setFiles] = useState<File[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [topText, setTopText] = useState("TOP TEXT");
  const [bottomText, setBottomText] = useState("BOTTOM TEXT");
  const [isProcessing, setIsProcessing] = useState(false);
  const [memeUrl, setMemeUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFilesSelected = (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFiles[0]);
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setMemeUrl(null);
      };
    } else {
      setImageSrc(null);
      setFiles([]);
    }
  };

  const generateMeme = () => {
    if (!imageSrc || !canvasRef.current) return;
    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);

      const fontSize = Math.floor(canvas.width / 10);
      ctx.font = `bold ${fontSize}px Impact, sans-serif`;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = fontSize / 15;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      // Top text
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 20);
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, 20);

      // Bottom text
      ctx.textBaseline = 'bottom';
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);

      setMemeUrl(canvas.toDataURL('image/jpeg', 0.9));
      setIsProcessing(false);
    };
  };

  useEffect(() => {
    if (imageSrc) {
      generateMeme();
    }
  }, [topText, bottomText, imageSrc]);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Meme Generator</h1>
          <p className="text-xl text-gray-600">Create your own memes online. Choose from the most popular templates or upload your own.</p>
        </div>

        {!imageSrc ? (
          <ImageUploader onFilesSelected={handleFilesSelected} multiple={false} />
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow order-2 lg:order-1 bg-white p-4 rounded-3xl shadow-lg border border-gray-100 flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[400px]">
                <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-md hidden" />
                {memeUrl && (
                  <img src={memeUrl} alt="meme preview" className="max-w-full h-auto rounded-lg shadow-md" />
                )}
              </div>
              
              <div className="w-full lg:w-80 order-1 lg:order-2">
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 h-fit lg:sticky lg:top-24">
                  <h3 className="text-lg font-bold mb-6 uppercase tracking-tight text-gray-900 border-b pb-4">Meme options</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Top Text</label>
                      <div className="relative">
                        <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={topText}
                          onChange={(e) => setTopText(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
                          placeholder="TOP TEXT"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Bottom Text</label>
                      <div className="relative">
                        <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={bottomText}
                          onChange={(e) => setBottomText(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
                          placeholder="BOTTOM TEXT"
                        />
                      </div>
                    </div>

                    <a
                      href={memeUrl || '#'}
                      download={`${files[0]?.name.replace(/\.[^/.]+$/, "")}_meme.jpg`}
                      className={`w-full bg-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-600 transition-all shadow-lg flex items-center justify-center space-x-2 ${!memeUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Download className="h-5 w-5" />
                      <span>DOWNLOAD MEME</span>
                    </a>
                    
                    <button 
                      onClick={() => { setImageSrc(null); setFiles([]); setMemeUrl(null); }}
                      className="w-full text-gray-500 font-semibold hover:text-gray-700 transition-colors text-sm"
                    >
                      Choose another image
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO Information Section */}
        <section className="mt-24 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Why use our meme generator?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Memes are the language of the internet, and creating them should be fast and fun. Our <span className="font-bold text-pink-600">online meme generator</span> 
                allows you to turn any image into a viral sensation in seconds. Whether you're making a joke for your friends or a marketing campaign for your brand, 
                our tool provides the classic "Impact" font and styling that everyone recognizes.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start"><span className="text-pink-600 mr-2">✔</span> Create memes with any JPG, PNG, or GIF</li>
                <li className="flex items-start"><span className="text-pink-600 mr-2">✔</span> Instant real-time preview as you type</li>
                <li className="flex items-start"><span className="text-pink-600 mr-2">✔</span> High-resolution output for social sharing</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Free and easy meme maker</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our tool is the best way to <span className="font-bold text-pink-600">create memes online</span> without any watermarks or hidden fees. 
                Simply upload your image, add your top and bottom text, and download your creation. It's designed to be simple, fast, and mobile-friendly, 
                so you can create memes on the go.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We value your privacy. Your images are processed entirely in your browser and are never stored on our servers. 
                Start creating your next viral hit today with the most secure meme maker online.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
