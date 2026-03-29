import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { Download, Loader2, RefreshCw } from 'lucide-react';

export default function ConvertToJpg() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState<{ name: string; url: string }[]>([]);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    const results = [];
    for (const file of files) {
      const converted = await convertToJpg(file);
      results.push(converted);
    }
    
    setConvertedFiles(results);
    setIsProcessing(false);
  };

  const convertToJpg = (file: File): Promise<{ name: string; url: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.fillStyle = 'white'; // Background for transparent PNGs
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          
          const convertedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
          
          resolve({
            name: file.name.replace(/\.[^/.]+$/, "") + ".jpg",
            url: convertedDataUrl
          });
        };
      };
    });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Convert to JPG</h1>
          <p className="text-xl text-gray-600">Turn PNG, GIF, TIF, PSD, SVG, WEBP, HEIC or RAW format images to JPG format.</p>
        </div>

        {convertedFiles.length === 0 ? (
          <div className="space-y-8">
            <ImageUploader onFilesSelected={setFiles} />
            
            {files.length > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="bg-orange-500 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-orange-600 transition-all shadow-xl flex items-center space-x-3 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>CONVERTING...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-6 w-6" />
                      <span>CONVERT TO JPG</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Images have been converted!</h2>
                <button 
                  onClick={() => { setConvertedFiles([]); setFiles([]); }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Convert more images
                </button>
              </div>

              <div className="space-y-4">
                {convertedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <RefreshCw className="h-5 w-5 text-orange-600" />
                      </div>
                      <p className="font-bold text-gray-900 truncate max-w-[300px]">{file.name}</p>
                    </div>
                    <a
                      href={file.url}
                      download={file.name}
                      className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <Download className="h-5 w-5" />
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <button className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:bg-orange-600 transition-all shadow-xl flex items-center space-x-3">
                  <Download className="h-6 w-6" />
                  <span>DOWNLOAD ALL IMAGES</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SEO Information Section */}
        <section className="mt-24 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Why convert to JPG?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                JPG is the most widely supported image format on the web, offering a perfect balance between file size and quality. Our <span className="font-bold text-orange-600">online image converter</span> 
                allows you to transform PNG, GIF, WEBP, and other formats into JPG in seconds, making your images ready for any website or social media platform.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start"><span className="text-orange-600 mr-2">✔</span> Universal compatibility across all devices</li>
                <li className="flex items-start"><span className="text-orange-600 mr-2">✔</span> Significantly smaller file sizes than PNG</li>
                <li className="flex items-start"><span className="text-orange-600 mr-2">✔</span> Bulk conversion for efficient workflows</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Fast and secure conversion</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Whether you need to <span className="font-bold text-orange-600">convert PNG to JPG</span> or turn a heavy RAW file into a web-ready image, 
                our tool handles the process with high fidelity. We automatically add a white background to transparent areas, ensuring your images look 
                professional and consistent.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Your privacy is guaranteed. All conversion happens locally in your browser, so your images are never uploaded to our servers. 
                It's the fastest, safest way to convert your images online for free.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
