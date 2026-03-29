import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { Copy, Check, Loader2, Code } from 'lucide-react';

export default function ImageToBase64() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<{ name: string; base64: string }[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    const results = [];
    for (const file of files) {
      const base64 = await convertToBase64(file);
      results.push({ name: file.name, base64 });
    }
    
    setProcessedFiles(results);
    setIsProcessing(false);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        resolve(event.target?.result as string);
      };
    });
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Image to Base64</h1>
          <p className="text-xl text-gray-600">Convert your images into Base64 strings for easy embedding in code.</p>
        </div>

        {processedFiles.length === 0 ? (
          <div className="space-y-8">
            <ImageUploader onFilesSelected={setFiles} />
            {files.length > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="bg-blue-800 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-blue-900 transition-all shadow-xl flex items-center space-x-3 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>CONVERTING...</span>
                    </>
                  ) : (
                    <>
                      <Code className="h-6 w-6" />
                      <span>CONVERT TO BASE64</span>
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
                <h2 className="text-2xl font-bold text-gray-900">Images converted to Base64!</h2>
                <button 
                  onClick={() => { setProcessedFiles([]); setFiles([]); }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Convert more images
                </button>
              </div>
              <div className="space-y-6">
                {processedFiles.map((file, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-900 truncate max-w-[300px]">{file.name}</p>
                      <button 
                        onClick={() => copyToClipboard(file.base64, index)}
                        className="flex items-center space-x-2 text-sm font-bold text-blue-600 hover:text-blue-700"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>COPIED!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>COPY BASE64</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 overflow-hidden">
                      <code className="text-xs text-gray-600 break-all line-clamp-4 block">
                        {file.base64}
                      </code>
                    </div>
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
