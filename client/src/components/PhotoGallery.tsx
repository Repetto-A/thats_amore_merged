import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, X } from 'lucide-react';

interface PhotoGalleryProps {
  onNavigate: (section: string) => void;
}

interface Photo {
  url: string;
  caption: string;
}


const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onNavigate }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [newPhoto, setNewPhoto] = useState<Photo>({ url: '', caption: '' });
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('showUploadForm changed:', showUploadForm);
  }, [showUploadForm]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`api/photos`);
      if (!response.ok) throw new Error('Error cargando fotitos :(');
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError('Error cargando fotitos :(');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setNewPhoto(prev => ({ ...prev, url }));
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Seleccioná alguna foto');
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('photo', selectedFile);
    formData.append('caption', newPhoto.caption || 'Untitled');
    
    console.log('Sending form data:', {
      caption: newPhoto.caption,
      file: selectedFile.name
    });

    try {
      const response = await fetch(`api/photos`, {
        method: 'POST',
        body: formData,
        headers: {
          // No establecer Content-Type, dejar que el navegador lo establezca automáticamente
          // para incluir el boundary correcto
        }
      });

      if (!response.ok) {
        throw new Error('Error uploading photo');
      }

      const uploadedPhoto = await response.json();
      console.log('Upload response:', uploadedPhoto);
      setPhotos(prev => [...prev, uploadedPhoto]);
      setNewPhoto({ url: '', caption: '' });
      setSelectedFile(null);
      setShowUploadForm(false);
    } catch (error) {
      console.error('Error subiendo la foto:', error);
      setError('Error subiendo la foto');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddPhotoClick = () => {
    setShowUploadForm(prev => !prev);
  };

  const renderUploadForm = () => {
    if (!showUploadForm) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowUploadForm(false)}></div>
        <div className="bg-white rounded-xl p-6 shadow-lg relative z-10 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Añadir un recuerdito :)</h3>
            <button
              onClick={() => setShowUploadForm(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-lg"
                required
              />
              {newPhoto.url && (
                <div className="mt-4">
                  <img
                    src={newPhoto.url}
                    alt="Preview"
                    className="w-full h-48 object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Caption
              </label>
              <input
                type="text"
                value={newPhoto.caption}
                onChange={(e) => setNewPhoto(prev => ({ ...prev, caption: e.target.value }))}
                className="w-full p-2 border rounded-lg"
                placeholder="Acá explicás lo mucho que me amás!!"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isUploading ? 'Uploading...' : 'Upload Photo'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-cursive text-pink-600 mb-8 text-center"
        >
          Fotitoss💘
        </motion.h2>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {renderUploadForm()}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={photo.url}
                alt={`Memory ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="absolute bottom-4 left-4 text-white font-medium">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center gap-4"
        >
          <button
            onClick={handleAddPhotoClick}
            className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
          >
            Añadir un recuerdito :) <Upload className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('playlist')}
            className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
          >
            Canciones que tienen vibes a vos <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PhotoGallery;