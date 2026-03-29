import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { Download, Loader2, Grid } from 'lucide-react';

export default function Posterize() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<{ name: string; url: string }[]>([]);
  const [levels, setLevels] = useState(4);

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    const results = [];
    for (const file of files) {
      const processed = await applyPosterize(file, levels);
      results.push(processed);
    }
    
    setProcessedFiles(results);
    setIsProcessing(false);
  };

  const applyPosterize = (file: File, levels: number): Promise<{ name: string; url: string }> => {
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
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          const step = Math.floor(255 / (levels - 1));
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.floor(data[i] / step) * step;
            data[i+1] = Math.floor(data[i+1] / step) * step;
            data[i+2] = Math.floor(data[i+2] / step) * step;
          }
          
          ctx.putImageData(imageData, 0, 0);
          
          resolve({
            name: file.name.replace(/\.[^/.]+$/, "") + "_posterized.jpg",
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
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Posterize IMAGE</h1>
          <p className="text-xl text-gray-600">Reduce the number of colors for a artistic poster effect.</p>
        </div>

        {processedFiles.length === 0 ? (
          <div className="space-y-8">
            <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Color Levels: {levels}</label>
              <input 
                type="range" 
                min="2" 
                max="20" 
                value={levels} 
                onChange={(e) => setLevels(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>

            <ImageUploader onFilesSelected={setFiles} />
            {files.length > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="bg-red-500 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-red-600 transition-all shadow-xl flex items-center space-x-3 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>POSTERIZING...</span>
                    </>
                  ) : (
                    <>
                      <Grid className="h-6 w-6" />
                      <span>POSTERIZE IMAGES</span>
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
                <h2 className="text-2xl font-bold text-gray-900">Posterize applied successfully!</h2>
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
                      <div className="bg-red-100 p-2 rounded-lg">
                        <Grid className="h-5 w-5 text-red-600" />
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
