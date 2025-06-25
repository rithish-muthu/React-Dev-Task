import React, { useState } from "react";

function ImageUploader() {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file); // creates temporary URL
      setImageUrl(url);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          className="w-64 h-64 object-cover rounded-md shadow-lg"
        />
      )}
    </div>
  );
}

export default ImageUploader;
