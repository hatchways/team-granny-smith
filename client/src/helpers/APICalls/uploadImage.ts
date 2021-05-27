interface UploadedImageInterface {
  imageUrl: string;
}

const uploadImage = async (imageData: FormData): Promise<UploadedImageInterface> => {
  return await fetch('/upload/image', {
    method: 'POST',
    body: imageData,
  })
    .then((response) => {
      return response.json();
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default uploadImage;
