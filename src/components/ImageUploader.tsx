import { useState, useRef } from 'react';
import { Upload, X, FileImage } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
}

export default function ImageUploader({ onFilesSelected, multiple = true, accept = "image/*" }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    
    const newPreviews = newFiles.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));

    if (multiple) {
      setPreviews(prev => [...prev, ...newPreviews]);
      onFilesSelected([...previews.map(p => p.file), ...newFiles]);
    } else {
      setPreviews(newPreviews);
      onFilesSelected(newFiles);
    }
  };

  const removeFile = (index: number) => {
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index].url);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
    onFilesSelected(newPreviews.map(p => p.file));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`relative border-4 border-dashed rounded-3xl p-6 sm:p-12 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-gray-200 bg-white hover:border-blue-400 hover:bg-gray-50'}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFiles(e.target.files)}
          multiple={multiple}
          accept={accept}
          className="hidden"
        />
        
        <div className="bg-blue-600 p-4 sm:p-6 rounded-2xl shadow-lg mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
          <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
        </div>
        
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">Select images</h2>
        <p className="text-gray-500 text-base sm:text-lg text-center">or drop images here</p>
      </div>

      <AnimatePresence>
        {previews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {previews.map((preview, index) => (
              <motion.div
                key={index}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm group"
              >
                <img src={preview.url} alt="preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 px-2 py-1 text-[10px] truncate font-medium">
                  {preview.file.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
