
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const CATEGORY_OPTIONS = [
  "Painting",
  "Sculpture",
  "Digital Art",
  "Photography",
  "Drawing",
  "Mixed Media",
  "Illustration",
  "Other",
];

const AddArtwork = () => {
  const { user, loading, getIdToken } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    category: CATEGORY_OPTIONS[0],
    medium: "",
    description: "",
    dimensions: "",
    price: "",
    visibility: "Public",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if not authenticated
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="text-lg text-slate-400">Checking authentication...</span>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <span className="text-lg text-slate-400 mb-4">You must be logged in to add artwork.</span>
        <button
          className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-semibold shadow-lg"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const idToken = await getIdToken();
      if (!idToken) throw new Error("Authentication failed. Please log in again.");
      const payload = {
        ...formData,
        price: formData.price ? Number(formData.price) : null,
        userName: user.displayName || user.email.split("@")[0],
        userEmail: user.email,
      };
      // Use central axios instance for API calls
      const { default: api } = await import('../services/api');
      const response = await api.post('/artworks', payload, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (response && response.data) {
        setSuccess("Artwork uploaded successfully!");
        setFormData({
          imageUrl: "",
          title: "",
          category: CATEGORY_OPTIONS[0],
          medium: "",
          description: "",
          dimensions: "",
          price: "",
          visibility: "Public",
        });
        toast.success("Artwork uploaded successfully!");
        setTimeout(() => {
          navigate("/explore");
        }, 1200);
      } else {
        setError(data?.message || "Failed to upload artwork.");
        toast.error(data?.message || "Failed to upload artwork.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050818] flex items-center justify-center py-16 px-2">
      <div className="max-w-3xl w-full mx-auto rounded-3xl bg-[#070b1b]/90 border border-white/10 backdrop-blur-md shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-8 text-slate-50">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">Add New Artwork</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image URL */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400" htmlFor="imageUrl">Image URL *</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              required
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full mt-1 rounded-2xl bg-[#050818]/80 border border-white/10 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40"
              placeholder="https://your-image-url.com/art.jpg"
            />
          </div>
          {/* Title */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400" htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 rounded-2xl bg-[#050818]/80 border border-white/10 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40"
              placeholder="Artwork Title"
            />
          </div>
          {/* Category + Medium */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400" htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full mt-1 rounded-2xl bg-[#050818]/80 border border-white/10 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400" htmlFor="medium">Medium *</label>
              <input
                type="text"
                id="medium"
                name="medium"
                required
                value={formData.medium}
                onChange={handleChange}
                className="w-full mt-1 rounded-2xl bg-[#050818]/80 border border-white/10 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40"
                placeholder="e.g. Oil on Canvas, Digital, etc."
              />
            </div>
          </div>
          {/* Description */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400" htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 rounded-2xl bg-[#050818]/80 border border-white/10 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40"
              placeholder="Describe your artwork..."
            />
          </div>
          {/* Dimensions + Price + Visibility */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400" htmlFor="dimensions">Dimensions</label>
              <input
                type="text"
                id="dimensions"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                className="w-full mt-1 rounded-2xl bg-[#050818]/80 border border-white/10 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40"
                placeholder="e.g. 24x36 inches"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400" htmlFor="price">Price (USD)</label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full mt-1 rounded-2xl bg-[#050818]/80 border border-white/10 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40"
                placeholder="e.g. 150"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400" htmlFor="visibility">Visibility</label>
              <select
                id="visibility"
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="w-full mt-1 rounded-2xl bg-[#050818]/80 border border-white/10 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>
          {/* User Info */}
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400" htmlFor="userName">Your Name</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={user.displayName || user.email.split("@")[0]}
                disabled
                className="w-full mt-1 rounded-2xl bg-[#050818]/40 border border-white/10 px-4 py-3 text-sm text-slate-400 cursor-not-allowed"
              />
            </div>
            <div className="w-1/2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400" htmlFor="userEmail">Your Email</label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={user.email}
                disabled
                className="w-full mt-1 rounded-2xl bg-[#050818]/40 border border-white/10 px-4 py-3 text-sm text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
          {/* Error/Success Messages */}
          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-400/40 rounded-2xl px-3 py-2 mt-2 text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-400/40 rounded-2xl px-3 py-2 mt-2 text-center">
              {success}
            </div>
          )}
          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading..." : "Upload Artwork"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddArtwork
