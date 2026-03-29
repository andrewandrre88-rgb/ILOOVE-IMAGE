import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { Download, Loader2, RefreshCw } from 'lucide-react';

export default function Flip() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<{ name: string; url: string }[]>([]);
  const [flipType, setFlipType] = useState<'horizontal' | 'vertical'>('horizontal');

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    const results = [];
    for (const file of files) {
      const processed = await applyFlip(file, flipType);
      results.push(processed);
    }
    
    setProcessedFiles(results);
    setIsProcessing(false);
  };

  const applyFlip = (file: File, type: 'horizontal' | 'vertical'): Promise<{ name: string; url: string }> => {
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
          
          if (type === 'horizontal') {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
          } else {
            ctx.translate(0, canvas.height);
            ctx.scale(1, -1);
          }
          
          ctx.drawImage(img, 0, 0);
          
          resolve({
            name: file.name.replace(/\.[^/.]+$/, "") + `_flipped_${type}.jpg`,
            url: canvas.toDataURL('image/jpeg', 0.9)
          });
        };
      };
    });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Flip IMAGE</h1>
          <p className="text-xl text-gray-600">Mirror your images horizontally or vertically.</p>
        </div>

        {processedFiles.length === 0 ? (
          <div className="space-y-8">
            <div className="flex justify-center space-x-4 mb-8">
              <button 
                onClick={() => setFlipType('horizontal')}
                className={`px-6 py-2 rounded-xl font-bold transition-all ${flipType === 'horizontal' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              >
                HORIZONTAL FLIP
              </button>
              <button 
                onClick={() => setFlipType('vertical')}
                className={`px-6 py-2 rounded-xl font-bold transition-all ${flipType === 'vertical' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              >
                VERTICAL FLIP
              </button>
            </div>
            <ImageUploader onFilesSelected={setFiles} />
            {files.length > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl flex items-center space-x-3 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>FLIPPING...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-6 w-6" />
                      <span>FLIP IMAGES</span>
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
                <h2 className="text-2xl font-bold text-gray-900">Images flipped successfully!</h2>
                <button 
                  onClick={() => { setProcessedFiles([]); setFiles([]); }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Process more images
                </button>
              </div>
              <div className="space-y-4">
                {processedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <RefreshCw className="h-5 w-5 text-indigo-600" />
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
