const cloudinary_upload_name = process.env.REACT_APP_CLOUDINARY_NAME;
const url = `https://api.cloudinary.com/v1_1/${cloudinary_upload_name}/auto/upload`;

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Vyra-designs");
  formData.append("cloud_name", cloudinary_upload_name);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("File upload failed");
  }

  const responseData = await response.json();
  return responseData;
};

export default uploadFile;
