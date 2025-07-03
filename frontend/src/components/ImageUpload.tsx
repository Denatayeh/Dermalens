
import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, ZoomIn } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showZoom, setShowZoom] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, JPG, or PNG)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size should be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setUploadedImage(imageUrl);
      onImageUpload(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {!uploadedImage ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive
              ? 'border-blue-500 bg-blue-50 scale-105'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 hover:scale-102'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className={`mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center transition-transform duration-300 ${dragActive ? 'scale-110' : ''}`}>
              <Upload className={`w-8 h-8 text-blue-600 transition-transform duration-300 ${dragActive ? 'animate-bounce' : ''}`} />
            </div>
            
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                📱 Upload Your Facial Image
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-gray-400">
                Supports JPEG, JPG, and PNG files up to 10MB
              </p>
            </div>
            
            <button
              type="button"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose Image
            </button>
          </div>
        </div>
      ) : (
        <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 animate-scale-in">
          <div className="relative group">
            <img
              src={uploadedImage}
              alt="Uploaded facial image"
              className="w-full h-64 object-cover rounded-lg cursor-pointer transition-transform duration-200 group-hover:scale-105"
              onClick={() => setShowZoom(true)}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg transform hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center text-green-600">
              <ImageIcon className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">✅ Image uploaded successfully</span>
            </div>
            <span className="text-xs text-gray-500">Ready for analysis</span>
          </div>
        </Card>
      )}

      {/* Zoom Modal */}
      {showZoom && uploadedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowZoom(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={uploadedImage}
              alt="Zoomed facial image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setShowZoom(false)}
              className="absolute top-4 right-4 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
