import { useState } from "react";

const PropertyGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="property-gallery">
      <img src={selectedImage} alt="Property" className="main-gallery-img" />

      <div className="gallery-thumbnails">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Property thumbnail"
            className={selectedImage === img ? "active-thumb" : ""}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;