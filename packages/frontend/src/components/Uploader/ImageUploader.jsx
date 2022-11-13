import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { Web3Storage } from "web3.storage";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import "./imageuploader.css";
import { toast } from "react-toastify";

export default function ImageUploader({ setImageUrls, imageUrls }) {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const maxNumber = 69;
  const acceptType = ["jpg", "gif", "png", "jpeg"];

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const makeStorageClient = () => {
    return new Web3Storage({ token: import.meta.env.VITE_W3STORAGE_TOKEN });
  };

  async function uploadSingleImage(client, file) {
    return client.put([file], { maxRetries: 3, wrapWithDirectory: false });
  }

  async function uploadImages() {
    setIsUploading(true);
    setIsUploaded(false);
    const id = toast.loading("Uploading images...");
    try {
      const client = makeStorageClient();
      const promises = images.map((image) =>
        uploadSingleImage(client, image.file)
      );
      const cids = await Promise.all(promises);
      setImageUrls(cids);
      setIsUploaded(true);
      toast.update(id, {
        render: "Images uploaded sucessfully",
        type: "success",
        autoClose: 5000,
        isLoading: false,
      });
    } catch (e) {
      toast.update(id, {
        render: e,
        type: "error",
        autoClose: 5000,
        isLoading: false,
      });
    }
    setIsUploading(false);
  }

  return (
    <div className="App">
      <ImageUploading
        multiple
        acceptType={acceptType}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <div
              className="cursor-pointer"
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="font-medium text-gray-600">
                    Drop images, or
                    <span className="text-blue-600 underline"> browse</span>
                  </span>
                </span>
              </label>
            </div>
            <br />
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img
                  src={image["data_url"]}
                  alt=""
                  className="object-cover h-48 w-96"
                />
                <div className="image-item__btn-wrapper">
                  <button
                    className="inline-flex items-center w-full px-5 py-1 mb-3 text-base font-semibold text-white no-underline align-middle bg-green-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-green-700 hover:border-green-700 hover:text-white focus-within:bg-green-700 focus-within:border-green-700"
                    onClick={() => onImageUpdate(index)}
                  >
                    Update
                  </button>
                  <button
                    className="inline-flex items-center w-full px-5 py-1 mt-3 text-base font-semibold text-white no-underline align-middle bg-red-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-red-700 hover:border-red-700 hover:text-white focus-within:bg-red-700 focus-within:border-red-700"
                    onClick={() => onImageRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {images.length > 0 && (
              <div className="flex items-center justify-center">
                <button
                  onClick={onImageRemoveAll}
                  className="inline-flex items-center w-full px-12 py-2 rounded-[10px] mb-3 mr-3 mt-3 text-base font-semibold text-white no-underline align-middle bg-red-600 border border-transparent border-solid  cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-red-700 hover:border-red-700 hover:text-white focus-within:bg-red-700 focus-within:border-red-700"
                >
                  Remove all Images
                  <ImCross className="ml-2" />
                </button>
                <button
                  onClick={uploadImages}
                  className="inline-flex items-center w-full px-12 py-2 rounded-[10px] mb-3 mr-1 mt-3 text-base font-semibold text-white no-underline align-middle bg-green-600 border border-transparent border-solid  cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-green-700 hover:border-green-700 hover:text-white focus-within:bg-green-700 focus-within:border-green-700"
                >
                  Upload Images
                  <BsCheckLg className="ml-2" />
                </button>
              </div>
            )}
            {isUploading && (
              <span className="text-green-600 underline">Uploading...</span>
            )}{" "}
            {isUploaded && (
              <span className="text-green-600 underline">
                Images uploaded successfully
              </span>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
