'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { updateUserProfile } from '@/features/auth/authSlice';
import { useEditStudentProfileMutation } from '@/features/api/studentsApiSlice';
import { useUpdateTeacherProfileMutation } from '@/features/api/teacherApiSlice';
import { useUpdateInstituteProfileMutation } from '@/features/api/academicInstitutes';

const ProfileCard: React.FC = () => {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.auth.role);
  const user = useSelector((state: RootState) => state.auth.user);

  // Mutations for updating profiles
  const [editStudentProfile] = useEditStudentProfileMutation();
  const [updateTeacherProfile] = useUpdateTeacherProfileMutation();
  const [updateInstituteProfile] = useUpdateInstituteProfileMutation();

  // State for the image and UI
  const [image, setImage] = useState<string | null>(user?.profilePic || null);
  const [isProfileUploaded, setIsProfileUploaded] = useState(!!user?.profilePic);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  // Update image state if user.profilePic changes (e.g., after fetching profile)
  useEffect(() => {
    if (user?.profilePic) {
      setImage(user.profilePic);
      setIsProfileUploaded(true);
    } else {
      setImage(null);
      setIsProfileUploaded(false);
    }
  }, [user?.profilePic]);

  // Function to upload image to S3
  const uploadToS3 = async (file: File, role: string): Promise<string> => {
    try {
      // Validate file type and size
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Only PNG, JPG, and JPEG files are allowed.');
      }
      if (file.size > 100 * 1024) {
        throw new Error('File size must be less than 100 KB.');
      }

      const bucketName = 'Inupgro-prod';
      const fileName = encodeURIComponent(file.name);
      const key = `${bucketName}/documents/${role.toLowerCase()}s/${Date.now()}_${fileName}`;
      const res = await fetch(
        `${baseURL}/v1/s3?bucketName=${bucketName}&key=${key}`
      );

      if (!res.ok) throw new Error('Failed to get pre-signed URL');
      const presignedUrl = await res.text();

      if (!presignedUrl.startsWith('https://')) {
        throw new Error('Invalid pre-signed URL');
      }

      const uploadRes = await fetch(presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadRes.ok) throw new Error('Failed to upload file to S3');

      return presignedUrl.split('?')[0]; // Return the clean S3 URL
    } catch (error: any) {
      setError(error.message || 'Failed to upload image to S3');
      throw error;
    }
  };

  // Function to update the profile with the new S3 URL
  const updateProfileWithImage = async (s3Url: string) => {
    try {
      setLoading(true);
      setError(null);

      const updatedProfile = { ...user, profilePic: s3Url };

      if (role === 'Student') {
        await editStudentProfile(updatedProfile).unwrap();
      } else if (role === 'Teacher') {
        await updateTeacherProfile(updatedProfile).unwrap();
      } else if (role === 'Institution') {
        await updateInstituteProfile(updatedProfile).unwrap();
      } else {
        throw new Error('Invalid role');
      }

      // Update Redux state with the new profile
      dispatch(updateUserProfile(updatedProfile));
      setIsProfileUploaded(true);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection and upload
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setError(null);

      // Read file for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      if (!role) {
        throw new Error('User role not found. Please log in.');
      }

      // Upload to S3
      const s3Url = await uploadToS3(file, role);

      // Update profile with S3 URL
      await updateProfileWithImage(s3Url);
    } catch (err: any) {
      setImage(user?.profilePic || null); // Revert to original image on failure
      setIsProfileUploaded(!!user?.profilePic);
    } finally {
      setLoading(false);
    }
  };

  const handlePlusClick = () => {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput?.click();
  };

  const handleRemovePhoto = async () => {
    try {
      setLoading(true);
      setError(null);

      const updatedProfile = { ...user, profilePic: null };

      if (role === 'Student') {
        await editStudentProfile(updatedProfile).unwrap();
      } else if (role === 'Teacher') {
        await updateTeacherProfile(updatedProfile).unwrap();
      } else if (role === 'Institution') {
        await updateInstituteProfile(updatedProfile).unwrap();
      } else {
        throw new Error('Invalid role');
      }

      dispatch(updateUserProfile(updatedProfile));
      setImage(null);
      setIsProfileUploaded(false);
    } catch (err: any) {
      setError(err.message || 'Failed to remove profile picture');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePhoto = () => {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center relative cursor-pointer">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
              onError={() => setImage('/user-image.png')} // Fallback on image load error
            />
          ) : (
            <Image
              src="/user-image.png"
              alt="Default Profile"
              width={96}
              height={96}
              className="w-full h-full rounded-full object-cover"
            />
          )}
          <div
            className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 cursor-pointer"
            onClick={handlePlusClick}
          >
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-4">Profile photo</h2>
        <p className="text-sm text-gray-500 text-center px-4 mt-1">
          A picture helps people recognize you and lets you know when you're signed in to your account
        </p>
      </div>

      <input
        type="file"
        id="file-input"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}

      {/* Buttons */}
      {isProfileUploaded ? (
        <div className="mt-6 flex flex-col items-center">
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleRemovePhoto}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md disabled:bg-red-400"
              disabled={loading}
            >
              Remove
            </button>
            <button
              onClick={handleChangePhoto}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md disabled:bg-blue-400"
              disabled={loading}
            >
              Change photo
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={handlePlusClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md disabled:bg-blue-400"
            disabled={loading}
          >
            Upload profile
          </button>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-2 text-center">png, jpg, jpeg (100 KB)</p>
    </div>
  );
};

export default ProfileCard;