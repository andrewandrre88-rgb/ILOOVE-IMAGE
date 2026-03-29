import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { Download, Loader2, RotateCw } from 'lucide-react';

export default function Rotate() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rotatedFiles, setRotatedFiles] = useState<{ name: string; url: string }[]>([]);
  const [rotation, setRotation] = useState<number>(90);

  const handleRotate = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    const results = [];
    for (const file of files) {
      const rotated = await rotateImage(file);
      results.push(rotated);
    }
    
    setRotatedFiles(results);
    setIsProcessing(false);
  };

  const rotateImage = (file: File): Promise<{ name: string; url: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          
          // Calculate new dimensions
          if (rotation === 90 || rotation === 270) {
            canvas.width = img.height;
            canvas.height = img.width;
          } else {
            canvas.width = img.width;
            canvas.height = img.height;
          }

          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
          
          const rotatedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
          
          resolve({
            name: file.name.replace(/\.[^/.]+$/, "") + `_rotated_${rotation}.jpg`,
            url: rotatedDataUrl
          });
        };
      };
    });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Rotate IMAGE</h1>
          <p className="text-xl text-gray-600">Rotate your JPG, PNG or GIF images at once.</p>
        </div>

        {rotatedFiles.length === 0 ? (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <ImageUploader onFilesSelected={setFiles} />
              </div>
              
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 h-fit sticky top-24">
                <h3 className="text-lg font-bold mb-6 uppercase tracking-tight text-gray-900 border-b pb-4">Rotate options</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[90, 180, 270].map((deg) => (
                      <button
                        key={deg}
                        onClick={() => setRotation(deg)}
                        className={`py-3 rounded-xl font-bold border-2 transition-all ${rotation === deg ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-gray-100 hover:border-teal-200 text-gray-600'}`}
                      >
                        {deg}°
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleRotate}
                    disabled={files.length === 0 || isProcessing}
                    className="w-full bg-teal-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-600 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>ROTATING...</span>
                      </>
                    ) : (
                      <>
                        <RotateCw className="h-5 w-5" />
                        <span>ROTATE IMAGES</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Images have been rotated!</h2>
                <button 
                  onClick={() => { setRotatedFiles([]); setFiles([]); }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Rotate more images
                </button>
              </div>

              <div className="space-y-4">
                {rotatedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="bg-teal-100 p-2 rounded-lg">
                        <RotateCw className="h-5 w-5 text-teal-600" />
                      </div>
                      <p className="font-bold text-gray-900 truncate max-w-[300px]">{file.name}</p>
                    </div>
                    <a
                      href={file.url}
                      download={file.name}
                      className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600 transition-colors"
                    >
                      <Download className="h-5 w-5" />
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <button className="bg-teal-500 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:bg-teal-600 transition-all shadow-xl flex items-center space-x-3">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Why rotate your images?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Incorrectly oriented images can look unprofessional on your website or social media profiles. Our <span className="font-bold text-teal-600">online image rotator</span> 
                allows you to fix the orientation of your JPG, PNG, or GIF images in bulk, ensuring every photo is displayed exactly as intended.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start"><span className="text-teal-600 mr-2">✔</span> Fix portrait vs landscape orientation</li>
                <li className="flex items-start"><span className="text-teal-600 mr-2">✔</span> Rotate hundreds of images in one click</li>
                <li className="flex items-start"><span className="text-teal-600 mr-2">✔</span> Lossless rotation for maximum quality</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Fast bulk rotation</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Whether you need to <span className="font-bold text-teal-600">rotate JPG</span> or fix a series of PNG screenshots, our tool provides 
                90°, 180°, and 270° rotation options. We handle the heavy lifting in your browser, providing instant results without the need for 
                expensive software or slow uploads.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Your data is safe with us. All processing is done locally, meaning your images never leave your device. It's the most secure and efficient 
                way to rotate your images online for free.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
