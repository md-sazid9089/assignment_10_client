import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Jatiyo_Sangsad_Bhaban%2C_Dhaka%2C_Bangladesh.jpg",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Jatiyo_Sangsad_Bhaban%2C_Dhaka%2C_Bangladesh.jpg",
    description: "Jatiyo Sangsad Bhaban (National Parliament House), Dhaka"
  },
  {
    original: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Sundarbans_Tiger.jpg",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Sundarbans_Tiger.jpg",
    description: "Royal Bengal Tiger in Sundarbans"
  },
  {
    original: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Jamdani_Saree_Weaving.jpg",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Jamdani_Saree_Weaving.jpg",
    description: "Jamdani Saree Weaving, Narayanganj"
  },
  {
    original: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cox%27s_Bazar_Beach_Bangladesh.jpg",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cox%27s_Bazar_Beach_Bangladesh.jpg",
    description: "Cox's Bazar Beach, Chattogram"
  },
  {
    original: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Sixty_Dome_Mosque_Bagerhat_Bangladesh.jpg",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Sixty_Dome_Mosque_Bagerhat_Bangladesh.jpg",
    description: "Sixty Dome Mosque, Bagerhat"
  }
];

const ArtImageGallery = () => (
  <div className="max-w-3xl mx-auto my-8">
    <ImageGallery items={images} showPlayButton={false} showFullscreenButton={true} />
  </div>
);

export default ArtImageGallery;
