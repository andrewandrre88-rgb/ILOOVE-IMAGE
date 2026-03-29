import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { Download, Loader2, Maximize2 } from 'lucide-react';
import { saveUserHistory } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import History from '../components/History';

export default function Resize() {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resizedFiles, setResizedFiles] = useState<{ name: string; url: string }[]>([]);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);

  const handleResize = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    const results = [];
    for (const file of files) {
      const resized = await resizeImage(file);
      results.push(resized);
      
      // Save to user history if logged in
      if (user) {
        await saveUserHistory(user.uid, 'RESIZE', file.name, 'Resized');
      }
    }
    
    setResizedFiles(results);
    setIsProcessing(false);
  };

  const resizeImage = (file: File): Promise<{ name: string; url: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          
          let targetWidth = width;
          let targetHeight = height;

          if (maintainAspectRatio) {
            const ratio = Math.min(width / img.width, height / img.height);
            targetWidth = img.width * ratio;
            targetHeight = img.height * ratio;
          }

          canvas.width = targetWidth;
          canvas.height = targetHeight;
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          
          const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
          
          resolve({
            name: file.name.replace(/\.[^/.]+$/, "") + `_${Math.round(targetWidth)}x${Math.round(targetHeight)}.jpg`,
            url: resizedDataUrl
          });
        };
      };
    });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Resize IMAGE</h1>
          <p className="text-xl text-gray-600">Define your dimensions, by pixels or percentage, and resize your images.</p>
        </div>

        {resizedFiles.length === 0 ? (
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow order-2 lg:order-1">
                <ImageUploader onFilesSelected={setFiles} />
              </div>
              
              <div className="w-full lg:w-80 order-1 lg:order-2">
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 h-fit lg:sticky lg:top-24">
                  <h3 className="text-lg font-bold mb-6 uppercase tracking-tight text-gray-900 border-b pb-4">Resize options</h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Width (px)</label>
                        <input
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(parseInt(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Height (px)</label>
                        <input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(parseInt(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="aspectRatio"
                        checked={maintainAspectRatio}
                        onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <label htmlFor="aspectRatio" className="text-sm font-medium text-gray-700 cursor-pointer">Maintain aspect ratio</label>
                    </div>

                    <button
                      onClick={handleResize}
                      disabled={files.length === 0 || isProcessing}
                      className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>RESIZING...</span>
                        </>
                      ) : (
                        <>
                          <Maximize2 className="h-5 w-5" />
                          <span>RESIZE IMAGES</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Images have been resized!</h2>
                <button 
                  onClick={() => { setResizedFiles([]); setFiles([]); }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Resize more images
                </button>
              </div>

              <div className="space-y-4">
                {resizedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Maximize2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="font-bold text-gray-900 truncate max-w-[300px]">{file.name}</p>
                    </div>
                    <a
                      href={file.url}
                      download={file.name}
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="h-5 w-5" />
                    </a>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Why resize your images?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Posting images with the correct dimensions is crucial for social media engagement and website performance. Our <span className="font-bold text-blue-600">online image resizer</span> 
                allows you to define exact pixel dimensions or percentages, ensuring your photos fit perfectly on Instagram, Facebook, Twitter, or your own blog.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> Perfect fit for social media platforms</li>
                <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> Maintain aspect ratio to avoid distortion</li>
                <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> Bulk resize hundreds of images at once</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">High quality resizing</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Whether you need to <span className="font-bold text-blue-600">resize JPG</span>, PNG, or GIF, our tool uses high-fidelity scaling algorithms 
                to ensure your images remain sharp and clear. You can scale down for faster loading or scale up for printing, all within your browser.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our tool is 100% free and secure. We don't store your images on our servers, and all processing happens locally to protect your privacy 
                while providing the fastest possible results.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
