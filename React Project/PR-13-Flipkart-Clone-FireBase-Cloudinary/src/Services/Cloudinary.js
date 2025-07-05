import axios from 'axios';

export const UploadImage = async (ImageData) => {
  const UploadImg = new FormData();
  UploadImg.append("file", ImageData);
  UploadImg.append("cloud_name", "drpthw9zm"); 
  UploadImg.append("upload_preset", "FlipCart-image"); 
  
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/drpthw9zm/image/upload",
      UploadImg
    );
    return response.data.secure_url; 
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};