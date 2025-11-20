import React from "react";
import { useParams } from "react-router-dom";

// Static artist data for demo
const artistData = {
  "Zainul Abedin": {
    name: "Zainul Abedin",
    bio: "Pioneer of Bangladeshi modern art, known for his Bengal Famine sketches and founding the Faculty of Fine Arts at Dhaka University.",
    avatar: "https://ui-avatars.com/api/?name=Zainul+Abedin&background=6366f1&color=fff",
    artworks: 40,
    likes: 2200
  },
  "Quamrul Hassan": {
    name: "Quamrul Hassan",
    bio: "Renowned for folk motifs and political art, Quamrul Hassan is a celebrated painter and cartoonist of Bangladesh.",
    avatar: "https://ui-avatars.com/api/?name=Quamrul+Hassan&background=8b5cf6&color=fff",
    artworks: 35,
    likes: 1980
  },
  "Shilpacharya Kamrul": {
    name: "Shilpacharya Kamrul",
    bio: "A master artist and teacher, Shilpacharya Kamrul contributed greatly to the development of fine arts in Bangladesh.",
    avatar: "https://ui-avatars.com/api/?name=Shilpacharya+Kamrul&background=ec4899&color=fff",
    artworks: 28,
    likes: 1560
  },
  "Safiuddin Ahmed": {
    name: "Safiuddin Ahmed",
    bio: "Famous for his printmaking and watercolors, Safiuddin Ahmed is a respected figure in Bangladeshi art.",
    avatar: "https://ui-avatars.com/api/?name=Safiuddin+Ahmed&background=10b981&color=fff",
    artworks: 30,
    likes: 1890
  }
};

const ArtistProfile = () => {
  const { name } = useParams();
  const artist = artistData[name];

  if (!artist) {
    return <div className="max-w-xl mx-auto my-12 p-8 bg-base-100 rounded-xl shadow text-center">Artist not found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-base-100 rounded-xl shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <img src={artist.avatar} alt={artist.name} className="w-24 h-24 rounded-full border-2 border-primary object-cover" />
        <h2 className="text-2xl font-bold text-primary mb-2">{artist.name}</h2>
        <p className="text-base-content/80 mb-4">{artist.bio}</p>
        <div className="flex gap-6 text-sm">
          <span><strong>Artworks:</strong> {artist.artworks}</span>
          <span><strong>Likes:</strong> {artist.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
