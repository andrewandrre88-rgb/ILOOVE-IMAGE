import { useState } from 'react';
import { Download, FileImage, AlertCircle } from 'lucide-react';

export default function Base64ToImage() {
  const [base64, setBase64] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    if (!base64.trim()) {
      setError('Please enter a Base64 string.');
      return;
    }

    try {
      // Basic validation for Base64 image string
      if (!base64.startsWith('data:image/')) {
        setError('Invalid Base64 image string. It should start with "data:image/..."');
        return;
      }

      setImageUrl(base64);
      setError(null);
    } catch (err) {
      setError('Failed to convert Base64 to image. Please check the string.');
    }
  };

  const handleReset = () => {
    setBase64('');
    setImageUrl(null);
    setError(null);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Base64 to Image</h1>
          <p className="text-xl text-gray-600">Convert Base64 strings back into viewable and downloadable images.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!imageUrl ? (
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Paste Base64 String</label>
                <textarea 
                  value={base64}
                  onChange={(e) => setBase64(e.target.value)}
                  placeholder="data:image/png;base64,..."
                  className="w-full h-64 p-4 bg-gray-50 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-xs font-mono"
                />
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm font-bold">{error}</p>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={handleConvert}
                  className="bg-green-800 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-green-900 transition-all shadow-xl flex items-center space-x-3"
                >
                  <FileImage className="h-6 w-6" />
                  <span>CONVERT TO IMAGE</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Image Preview</h2>
                <button 
                  onClick={handleReset}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Convert another string
                </button>
              </div>

              <div className="flex justify-center bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <img 
                  src={imageUrl} 
                  alt="Base64 Preview" 
                  className="max-w-full max-h-[500px] rounded-lg shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex justify-center">
                <a
                  href={imageUrl}
                  download="base64_converted_image.png"
                  className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl flex items-center space-x-3"
                >
                  <Download className="h-6 w-6" />
                  <span>DOWNLOAD IMAGE</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <section className="mt-24 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">What is Base64?</h2>
              <p className="text-gray-600 leading-relaxed">
                Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format. 
                In web development, it's often used to embed small images directly into HTML or CSS files to reduce HTTP requests.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">How to use this tool?</h2>
              <p className="text-gray-600 leading-relaxed">
                Simply paste your Base64 encoded image string into the text area above. Make sure it includes the data URI prefix 
                (e.g., <code className="bg-gray-100 px-1 rounded text-red-600">data:image/png;base64,...</code>). 
                Once converted, you can preview the image and download it to your device.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
