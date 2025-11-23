import React, { useState } from 'react';
import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { default as api } from '../services/api';

const UpdateProfileModal = ({ user, onClose, onProfileUpdated }) => {
  const auth = getAuth();
  const { setUser } = useAuth();
  const [name, setName] = useState(user.displayName || '');
  const [email, setEmail] = useState(user.email || '');
  const [photoURL, setPhotoURL] = useState(user.photoURL || '');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let firebaseUser = auth.currentUser;
    let prevEmail = firebaseUser.email;
    try {
      // Update displayName or photoURL
      if (name !== firebaseUser.displayName || photoURL !== firebaseUser.photoURL) {
        await updateProfile(firebaseUser, { displayName: name, photoURL });
      }
      // Update email
      if (email !== firebaseUser.email) {
        await updateEmail(firebaseUser, email);
      }
        // Password update removed; only update name, photoURL, and email
      // Update MongoDB user document
      await api.put('/users/profile', {
        name,
        email,
        photoURL,
        oldEmail: prevEmail,
      });
      // Update context
      setUser({ ...firebaseUser, displayName: name, email, photoURL });
      if (onProfileUpdated) onProfileUpdated({ ...firebaseUser, displayName: name, email, photoURL });
      toast.success('Profile updated successfully');
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900/95 border border-slate-700/60 shadow-2xl px-8 py-8 md:px-10 md:py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 text-center mb-6">Update Profile</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">Name</label>
            <input
              type="text"
              className="w-full rounded-xl px-4 py-3 bg-slate-800 text-slate-200 placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full rounded-xl px-4 py-3 bg-slate-800/60 text-slate-200 border border-slate-700 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">Photo URL</label>
            <input
              type="text"
              className="w-full rounded-xl px-4 py-3 bg-slate-800 text-slate-200 placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              placeholder="Photo URL"
              value={photoURL}
              onChange={e => setPhotoURL(e.target.value)}
            />
          </div>
          {/* Password field and label removed */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-slate-100"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
