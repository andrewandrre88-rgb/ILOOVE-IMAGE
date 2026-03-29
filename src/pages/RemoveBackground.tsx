import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { Download, Loader2, Eraser, AlertCircle } from 'lucide-react';
import { saveUserHistory } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import History from '../components/History';
import { removeBackground } from "@imgly/background-removal";

export default function RemoveBackground() {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<{ name: string; url: string; originalSize: number; processedSize: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleRemoveBackground = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);
    
    const results = [];
    
    try {
      for (const file of files) {
        // Remove background using @imgly/background-removal
        const blob = await removeBackground(file, {
          progress: (step, index, total) => {
            console.log(`Processing ${file.name}: ${step} ${index}/${total}`);
          }
        });
        
        const url = URL.createObjectURL(blob);
        
        results.push({
          name: file.name.replace(/\.[^/.]+$/, "") + "_no_bg.png",
          url: url,
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
      setError("Failed to remove background. Please try again with a different image.");
    } finally {
      setIsProcessing(false);
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
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4">
            <Eraser className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Remove Background</h1>
          <p className="text-xl text-gray-600">Remove background from images automatically in seconds for free.</p>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center space-x-3 text-red-700">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {processedFiles.length === 0 ? (
          <div className="space-y-8">
            <ImageUploader onFilesSelected={setFiles} multiple={true} />
            
            {files.length > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={handleRemoveBackground}
                  disabled={isProcessing}
                  className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl flex items-center space-x-3 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>REMOVING BACKGROUND...</span>
                    </>
                  ) : (
                    <>
                      <Eraser className="h-6 w-6" />
                      <span>REMOVE BACKGROUND</span>
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
                <h2 className="text-2xl font-bold text-gray-900">Background removed!</h2>
                <button 
                  onClick={() => { setProcessedFiles([]); setFiles([]); }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Process more images
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {processedFiles.map((file, index) => (
                  <div key={index} className="flex flex-col bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="aspect-square relative bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] bg-gray-200">
                      <img src={file.url} alt={file.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div className="truncate mr-4">
                        <p className="font-bold text-gray-900 truncate text-sm">{file.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{formatSize(file.processedSize)}</p>
                      </div>
                      <a
                        href={file.url}
                        download={file.name}
                        className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => {
                    processedFiles.forEach(file => {
                      const link = document.createElement('a');
                      link.href = file.url;
                      link.download = file.name;
                      link.click();
                    });
                  }}
                  className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl flex items-center space-x-3"
                >
                  <Download className="h-6 w-6" />
                  <span>DOWNLOAD ALL</span>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">AI Background Removal</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our <span className="font-bold text-blue-600">online background remover</span> uses advanced AI technology to detect the subject 
                of your photo and remove the background with surgical precision. Whether it's a portrait, a product photo, or an animal, 
                our tool handles complex edges like hair and fur with ease.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> 100% Automatic and free</li>
                <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> High-quality PNG output with transparency</li>
                <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> No manual masking required</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Perfect for E-commerce</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Need clean product images for Amazon, eBay, or Shopify? Our <span className="font-bold text-blue-600">background removal tool</span> 
                is the fastest way to get professional-looking results without expensive software. Process multiple images in bulk and 
                download them instantly.
              </p>
              <p className="text-gray-600 leading-relaxed">
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
