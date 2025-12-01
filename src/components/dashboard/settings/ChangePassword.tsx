'use client';
import { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Add password update logic here
    alert("Password updated successfully!");
  };

  const inputStyle =
    'flex items-center border border-[#CBD5E0] rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400';

  return (
    <div className="py-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 w-full space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Old Password</label>
            <div className={inputStyle}>
              <FaLock className="text-gray-500 mr-2" />
              <input
                type={showOld ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="flex-1 outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="text-gray-500"
              >
                {showOld ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <div className={inputStyle}>
              <FaLock className="text-gray-500 mr-2" />
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="flex-1 outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="text-gray-500"
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <div className={inputStyle}>
              <FaLock className="text-gray-500 mr-2" />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-gray-500"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-[#1A3161] hover:bg-[#14264e] text-white font-semibold px-6 py-2 rounded-md"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
