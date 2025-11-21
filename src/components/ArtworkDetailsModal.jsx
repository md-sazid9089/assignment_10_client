import React from "react";

const ArtworkDetailsModal = ({ artwork, onClose }) => {
  if (!artwork) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#070b1b] border border-white/10 shadow-2xl p-6 text-slate-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-300 hover:text-white text-xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        {/* Image */}
        <div className="mb-6 flex justify-center">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="h-64 w-full object-cover rounded-2xl shadow-lg border border-white/10"
          />
        </div>
        {/* Details */}
        <div className="space-y-3">
          <span className="inline-block rounded-full bg-purple-500/90 px-3 py-1 text-xs font-semibold text-white shadow-lg mb-2">
            {artwork.category}
          </span>
          <h2 className="text-2xl font-bold mb-1">{artwork.title}</h2>
          <p className="text-sm text-slate-400 mb-2">{artwork.description}</p>
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-semibold text-white">
              {artwork.userName?.charAt(0) || 'A'}
            </span>
            <span>{artwork.userName || 'Anonymous'}</span>
          </div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="rounded-full bg-emerald-500/10 text-emerald-300 px-3 py-1 font-semibold border border-emerald-400/40">
              {artwork.price ? `$${artwork.price}` : 'Free'}
            </span>
            <span className="flex items-center gap-1 text-pink-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {artwork.likesCount}
            </span>
          </div>
          {artwork.medium && (
            <div className="text-xs text-slate-400 mb-2">
              <span className="font-semibold">Medium:</span> {artwork.medium}
            </div>
          )}
          {artwork.dimensions && (
            <div className="text-xs text-slate-400 mb-2">
              <span className="font-semibold">Dimensions:</span> {artwork.dimensions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailsModal;
