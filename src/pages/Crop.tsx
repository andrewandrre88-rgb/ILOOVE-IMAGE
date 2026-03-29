import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import ImageUploader from '../components/ImageUploader';
import { Download, Loader2, Crop as CropIcon } from 'lucide-react';
import { saveUserHistory } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import History from '../components/History';

export default function Crop() {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [croppedImage, setCroppedImage] = useState<{ name: string; url: string } | null>(null);

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFilesSelected = (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFiles[0]);
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
    } else {
      setImageSrc(null);
      setFiles([]);
    }
  };

  const createCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setIsProcessing(true);

    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    const fileName = files[0].name.replace(/\.[^/.]+$/, "") + "_cropped.jpg";
    setCroppedImage({
      name: fileName,
      url: croppedDataUrl
    });
    
    // Save to user history if logged in
    if (user) {
      await saveUserHistory(user.uid, 'CROP', files[0].name, 'Cropped');
    }
    
    setIsProcessing(false);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Crop IMAGE</h1>
          <p className="text-xl text-gray-600">Crop JPG, PNG or GIF with ease; Choose pixels to define your rectangle.</p>
        </div>

        {!imageSrc ? (
          <ImageUploader onFilesSelected={handleFilesSelected} multiple={false} />
        ) : !croppedImage ? (
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow order-2 lg:order-1 relative h-[400px] sm:h-[500px] bg-gray-200 rounded-3xl overflow-hidden shadow-inner">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={undefined}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              
              <div className="w-full lg:w-80 order-1 lg:order-2">
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 h-fit lg:sticky lg:top-24">
                  <h3 className="text-lg font-bold mb-6 uppercase tracking-tight text-gray-900 border-b pb-4">Crop options</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Zoom</label>
                      <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <button
                      onClick={createCroppedImage}
                      disabled={isProcessing}
                      className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>CROPPING...</span>
                        </>
                      ) : (
                        <>
                          <CropIcon className="h-5 w-5" />
                          <span>CROP IMAGE</span>
                        </>
                      )}
                    </button>
                    
                    <button 
                      onClick={() => { setImageSrc(null); setFiles([]); }}
                      className="w-full text-gray-500 font-semibold hover:text-gray-700 transition-colors text-sm"
                    >
                      Cancel and choose another
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
                <h2 className="text-2xl font-bold text-gray-900">Image has been cropped!</h2>
                <button 
                  onClick={() => { setCroppedImage(null); setImageSrc(null); setFiles([]); }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Crop another image
                </button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <div className="max-w-md rounded-xl overflow-hidden shadow-md border border-gray-100">
                  <img src={croppedImage.url} alt="cropped" className="w-full h-auto" />
                </div>
                
                <div className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <CropIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="font-bold text-gray-900 truncate max-w-[300px]">{croppedImage.name}</p>
                  </div>
                  <a
                    href={croppedImage.url}
                    download={croppedImage.name}
                    className="bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <Download className="h-5 w-5" />
                  </a>
                </div>

                <div className="mt-4">
                  <button className="bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:bg-blue-800 transition-all shadow-xl flex items-center space-x-3">
                    <Download className="h-6 w-6" />
                    <span>DOWNLOAD CROPPED IMAGE</span>
                  </button>
                </div>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Why crop your images?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Cropping is a powerful way to improve the composition of your photos and focus on what truly matters. Our <span className="font-bold text-blue-600">online image cropper</span> 
                provides a simple, visual way to remove unwanted edges and highlight the subject of your image, whether it's for a profile picture, a blog post, or a social media update.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> Improve photo composition and focus</li>
                <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> Remove distracting background elements</li>
                <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> Create perfect square or rectangular crops</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Easy visual cropping</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our tool makes it easy to <span className="font-bold text-blue-600">crop JPG</span>, PNG, and GIF images with pixel-perfect precision. 
                Use our intuitive visual editor to drag and resize your crop area, or define exact dimensions to meet specific requirements for your project.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We prioritize your security. All cropping is performed directly in your browser, meaning your images are never uploaded to our servers. 
                It's fast, free, and completely private.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
