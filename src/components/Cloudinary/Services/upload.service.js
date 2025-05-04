const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadToCloudinary = async (file, folder) => {
  const signatureResponse = await fetch(`${API_BASE_URL}/upload/signature?folder=${folder}`);

  if (!signatureResponse.ok) {
    throw new Error('Error al obtener firma de Cloudinary');
  }

  const signatureData = await signatureResponse.json();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signatureData.apiKey);
  formData.append('signature', signatureData.signature);
  formData.append('timestamp', signatureData.timestamp);
  formData.append('folder', folder);

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/upload`,
    {
      method: 'POST',
      body: formData
    }
  );

  if (!uploadResponse.ok) {
    throw new Error('Error al subir archivo a Cloudinary');
  }

  return await uploadResponse.json();
};