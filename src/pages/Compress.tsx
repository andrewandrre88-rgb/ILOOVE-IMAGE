import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { Download, Loader2, Minimize2 } from 'lucide-react';
import { saveUserHistory } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import History from '../components/History';

export default function Compress() {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressedFiles, setCompressedFiles] = useState<{ name: string; url: string; originalSize: number; compressedSize: number }[]>([]);

  const handleCompress = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    const results = [];
    
    for (const file of files) {
      const compressed = await compressImage(file);
      results.push(compressed);
      
      // Save to user history if logged in
      if (user) {
        await saveUserHistory(user.uid, 'COMPRESS', file.name, 'Compressed');
      }
    }
    
    setCompressedFiles(results);
    setIsProcessing(false);
  };

  const compressImage = (file: File): Promise<{ name: string; url: string; originalSize: number; compressedSize: number }> => {
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
          ctx.drawImage(img, 0, 0);
          
          // Compress by reducing quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
          
          // Calculate approximate size
          const head = 'data:image/jpeg;base64,'.length;
          const compressedSize = Math.round((compressedDataUrl.length - head) * 3 / 4);
          
          resolve({
            name: file.name.replace(/\.[^/.]+$/, "") + "_compressed.jpg",
            url: compressedDataUrl,
            originalSize: file.size,
            compressedSize: compressedSize
          });
        };
      };
    });
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
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Compress IMAGE</h1>
          <p className="text-xl text-gray-600">Compress JPG, PNG, SVG or GIF with the best quality and compression.</p>
        </div>

        {compressedFiles.length === 0 ? (
          <div className="space-y-8">
            <ImageUploader onFilesSelected={setFiles} />
            
            {files.length > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl flex items-center space-x-3 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>COMPRESSING...</span>
                    </>
                  ) : (
                    <>
                      <Minimize2 className="h-6 w-6" />
                      <span>COMPRESS IMAGES</span>
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
                <h2 className="text-2xl font-bold text-gray-900">Images have been compressed!</h2>
                <button 
                  onClick={() => { setCompressedFiles([]); setFiles([]); }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Compress more images
                </button>
              </div>

              <div className="space-y-4">
                {compressedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Minimize2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 truncate max-w-[200px]">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatSize(file.originalSize)} → <span className="text-green-600 font-bold">{formatSize(file.compressedSize)}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                        -{Math.round((1 - file.compressedSize / file.originalSize) * 100)}%
                      </span>
                      <a
                        href={file.url}
                        download={file.name}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl flex items-center space-x-3">
                  <Download className="h-6 w-6" />
                  <span>DOWNLOAD ALL IMAGES</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Section */}
        <History />

        {/* SEO Information Section */}
        <section className="mt-24 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Why compress your images?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Compressing images is essential for maintaining a fast and efficient website. Large image files can significantly slow down page load times, 
                negatively impacting user experience and your search engine rankings. Our <span className="font-bold text-blue-600">online image compressor</span> 
                uses advanced algorithms to reduce file size while preserving the highest possible visual quality.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> Improve website loading speed</li>
                <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> Boost SEO and Core Web Vitals</li>
                <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> Save storage space and bandwidth</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Best quality compression</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Whether you need to <span className="font-bold text-blue-600">compress JPG</span>, PNG, SVG, or GIF, our tool provides the perfect balance 
                between file size reduction and image clarity. We support bulk processing, allowing you to optimize hundreds of images in a single click, 
                completely free of charge.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Your privacy is our priority. All files are processed locally in your browser or deleted automatically from our servers after processing, 
                ensuring your data remains secure.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
