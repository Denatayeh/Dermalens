import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import PredictionResult from '@/components/PredictionResult';
import AcneGuide from '@/components/AcneGuide';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export interface PredictionData {
  acneType: string;
  confidence: number;
  description: string;
}

const scrollToUpload = () => {
  const uploadSection = document.getElementById('upload-section');
  if (uploadSection) {
    uploadSection.scrollIntoView({ behavior: 'smooth' });
  }
};


const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setPrediction(null);
  };

  const handleReupload = () => {
    setUploadedImage(null);
    setPrediction(null);
  };

  const handlePrediction = async () => {
  if (!uploadedImage) return;

  setIsLoading(true);

  try {
    // Fetch the image blob
    const response = await fetch(uploadedImage);
    const blob = await response.blob();

    // Prepare FormData
    const formData = new FormData();
    formData.append("file", blob, "upload.jpg");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/predict`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    setPrediction({
      acneType: data.acneType,
      confidence: data.confidence,
      description: data.description,
    });
  } catch (error) {
    console.error("Error:", error);
    alert("Prediction failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-50 to-blue-100 shadow-lg border-b border-purple-200 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-300 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-32 h-32 bg-pink-300 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-blue-300 rounded-full blur-xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
          <div className="text-center animate-fade-in">
            {/* AI Mascot and Main Title */}
            <div className="flex items-center justify-center mb-6 animate-scale-in">
              <div className="mr-4 text-6xl animate-pulse">
                👩‍⚕️
              </div>
              <div className="text-left">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 bg-clip-text text-transparent drop-shadow-sm font-rounded leading-tight">
                  DermaLens
                </h1>
                <div className="flex items-center mt-2">
                  <span className="text-2xl mr-2">🔬</span>
                  <span className="text-2xl font-semibold text-purple-600 font-rounded">
                    Your Smart Acne Classifier
                  </span>
                  <span className="text-2xl ml-2">✨</span>
                </div>
              </div>
            </div>
            
            {/* Subtitle */}
            <p className="text-xl text-gray-600 font-medium italic max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              "Upload a skin photo and let AI help you identify acne types instantly."
            </p>
            
            {/* Enhanced Description */}
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              Our advanced EfficientNetB3 model analyzes your facial image to classify different types of acne lesions 
              and provides personalized treatment recommendations with medical-grade accuracy.
            </p>
            
            {/* Start Now Button */}
            <Button 
              onClick={scrollToUpload}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: '0.9s' }}
            >
              <span className="flex items-center">
                <span className="mr-2">🚀</span>
                Start Analysis Now
                <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8" id="upload-section">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload & Prediction */}
          <div className="space-y-6">
            <Card className="p-6 bg-white shadow-lg border-0 rounded-xl">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">📸</span>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Upload Your Image
                </h2>
              </div>
              <ImageUpload onImageUpload={handleImageUpload} />
              
              {uploadedImage && (
                <div className="mt-6">
                  <button
                    onClick={handlePrediction}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        <span className="animate-pulse">🤖 Analyzing Image...</span>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center">
                        <span className="mr-2">🔍</span>
                        Predict Acne Type
                      </span>
                    )}
                  </button>
                </div>
              )}
            </Card>

            {/* Prediction Result */}
            {prediction && (
              <PredictionResult prediction={prediction} onReupload={handleReupload} />
            )}
          </div>

          {/* Right Column - Acne Guide */}
          <div>
            <AcneGuide />
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 max-w-4xl mx-auto shadow-sm">
            <div className="flex items-center justify-center mb-3">
              <span className="text-2xl mr-2">⚕️</span>
              <h3 className="text-lg font-semibold text-yellow-900">Medical Disclaimer</h3>
            </div>
            <p className="text-yellow-800 leading-relaxed">
              This tool provides preliminary guidance and educational information about acne types using artificial intelligence. 
              It <strong>does not replace professional medical advice</strong>, diagnosis, or treatment. 
              Always consult with a qualified dermatologist or healthcare provider for proper medical evaluation and personalized treatment plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
