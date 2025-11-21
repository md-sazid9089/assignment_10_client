import React, { useState } from 'react';
import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateProfilePage = () => {
  const auth = getAuth();
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let firebaseUser = auth.currentUser;
    let prevEmail = firebaseUser.email;
    try {
      if (name !== firebaseUser.displayName || photoURL !== firebaseUser.photoURL) {
        await updateProfile(firebaseUser, { displayName: name, photoURL });
      }
      if (email !== firebaseUser.email) {
        await updateEmail(firebaseUser, email);
      }
      if (newPassword) {
        await updatePassword(firebaseUser, newPassword);
      }
      await axios.put('/users/profile', {
        name,
        email,
        photoURL,
        oldEmail: prevEmail,
      });
      setUser({ ...firebaseUser, displayName: name, email, photoURL });
      toast.success('Profile updated successfully');
      navigate(-1); // Go back to previous page
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-md text-slate-100">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" className="input input-bordered w-full" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="input input-bordered w-full" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input type="text" className="input input-bordered w-full" value={photoURL} onChange={e => setPhotoURL(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password <span className="text-xs opacity-60">(optional)</span></label>
            <input type="password" className="input input-bordered w-full" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)} disabled={loading}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
