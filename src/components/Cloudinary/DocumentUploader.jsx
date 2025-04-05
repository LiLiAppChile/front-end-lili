import { useState } from 'react';
import { uploadToCloudinary } from './Services/cloudinary';

export const DocumentUploader = ({ 
  fieldName, 
  label, 
  required = false, 
  onUploadComplete,
  accept = 'image/*,.pdf',
  maxSizeMB = 5,
  preview = false
}) => {
  const [uploadState, setUploadState] = useState({
    uploading: false,
    progress: 0,
    error: '',
    previewUrl: null
  });

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamaño
    if (file.size > maxSizeMB * 1024 * 1024) {
      setUploadState({
        uploading: false,
        progress: 0,
        error: `El archivo excede el tamaño máximo de ${maxSizeMB}MB`,
        previewUrl: null
      });
      return;
    }

    // Mostrar previsualización si es imagen
    if (preview && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadState(prev => ({
          ...prev,
          previewUrl: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }

    await handleFileUpload(file);
  };

  const handleFileUpload = async (file) => {
    setUploadState(prev => ({
      ...prev,
      uploading: true,
      progress: 0,
      error: ''
    }));
    
    try {
      const { url, publicId } = await uploadToCloudinary(
        file, 
        fieldName,
        (progress) => {
          setUploadState(prev => ({
            ...prev,
            progress
          }));
        }
      );
      
      onUploadComplete(url, publicId);
    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        error: error.message || 'Error al subir archivo',
        previewUrl: null
      }));
    } finally {
      setUploadState(prev => ({ 
        ...prev, 
        uploading: false 
      }));
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <input
        id={fieldName}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
        disabled={uploadState.uploading}
      />
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <label
            htmlFor={fieldName}
            className={`cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md text-sm font-medium ${
              uploadState.uploading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-50'
            }`}
          >
            Seleccionar Archivo
          </label>
          
          {uploadState.uploading && (
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadState.progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">
                {uploadState.progress}% completado
              </span>
            </div>
          )}
        </div>
        
        {uploadState.previewUrl && (
          <div className="mt-2">
            <img 
              src={uploadState.previewUrl} 
              alt="Previsualización" 
              className="max-h-40 rounded-md"
            />
          </div>
        )}
        
        {uploadState.error && (
          <span className="text-sm text-red-500">{uploadState.error}</span>
        )}
      </div>
    </div>
  );
};