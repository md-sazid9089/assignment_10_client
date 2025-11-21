import React, { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * @typedef {Object} ArtistCardProps
 * @property {number} rank
 * @property {string} name
 * @property {string} initials
 * @property {string} [avatarUrl]
 * @property {number} totalArtworks
 * @property {number} totalLikes
 */

/**
 * @param {ArtistCardProps} props
 */
const ArtistCard = ({ rank, name, initials, avatarUrl, totalArtworks, totalLikes }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 }
      );
    }
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () => {
      gsap.to(el, { scale: 1.04, boxShadow: '0 8px 32px 0 rgba(80,80,160,0.18)', duration: 0.25, ease: 'power2.out' });
    };
    const onLeave = () => {
      gsap.to(el, { scale: 1, boxShadow: '0 4px 16px 0 rgba(80,80,160,0.10)', duration: 0.25, ease: 'power2.inOut' });
    };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return (
    <div ref={cardRef} className="rounded-3xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-lg flex flex-col overflow-hidden">
      <div className="relative">
        <div className="flex items-center justify-center w-full h-40 bg-gradient-to-br from-indigo-500 to-purple-500">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white/60"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-4 border-white/60 flex items-center justify-center text-3xl font-bold text-white">
              {initials}
            </div>
          )}
        </div>
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-yellow-400 text-xs font-semibold text-slate-900">
          #{rank}
        </span>
      </div>
      <div className="flex-1 px-5 pt-4 pb-2 text-center">
        <h3 className="text-lg font-semibold text-slate-50">{name}</h3>
        <div className="mt-4 flex items-center justify-center gap-8 text-sm text-slate-300">
          <div>
            <p className="font-semibold text-indigo-300">{totalArtworks}</p>
            <p>Artworks</p>
          </div>
          <div>
            <p className="font-semibold text-pink-400">{totalLikes}</p>
            <p>Likes</p>
          </div>
        </div>
      </div>
      <div className="px-5 pb-4">
        <button
          type="button"
          className="w-full px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ArtistCard;
