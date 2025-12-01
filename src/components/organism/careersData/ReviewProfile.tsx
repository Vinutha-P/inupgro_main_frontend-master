import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { useApplyForJobMutation } from '@/features/api/jobApplicationApiSlice';
import { RootState } from '@/lib/store';

interface ReviewProfileProps {
  onSubmit?: any;
  jobId?: string;
}

export interface ReviewProfileRef {
  submitForm: () => Promise<void>;
}

const ReviewProfile = forwardRef<ReviewProfileRef, ReviewProfileProps>(({ onSubmit, jobId }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { professionalInfo } = useSelector((state: RootState) => state.jobApplication);

  const [applyForJob, { isLoading }] = useApplyForJobMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const profileData = {
    name: user?.firstName || 'NA',
    dob: user?.dateOfBirth || 'NA',
    age: user?.age || 'NA',
    mobile: user?.phoneNumber || 'NA',
    email: user?.email || 'NA',
    gender: user?.gender || 'NA',
    address: user?.address1 && user?.city && user?.state && user?.pincode
      ? `${user.address1}, ${user.city}, ${user.state} - ${user.pincode}`
      : 'NA',
    education: professionalInfo.higherEducation || 'NA',
    experience: professionalInfo.yearsOfExperience ? `${professionalInfo.yearsOfExperience} years` : 'None',
    currentSchool: professionalInfo.currentSchool || 'None',
    expertise: professionalInfo.expertise || 'NA',
    class: professionalInfo.class || 'NA',
    joining: professionalInfo.expectedJoiningDate || 'NA',
    resumeName: professionalInfo.documents.length > 0 ? professionalInfo.documents[0].url.split('/').pop() || 'NA' : 'NA',
    resumeSize: professionalInfo.documents.length > 0 ? '1.5 MB' : 'NA',
  };

  const submitForm = async () => {
    try {
      const decodeUrl = (encodedUrl: string) => decodeURIComponent(encodedUrl);

      const applicationData = {
        jobApplicationDetails: professionalInfo,
        documents: professionalInfo.documents.map((doc: any) => ({
          type: "CV",
          url: decodeUrl(doc.url),
        })),
      };

      if (!jobId) {
        throw new Error('Job ID is required.');
      }
      await applyForJob({ objectId: jobId, applicationData }).unwrap();
      onSubmit();
    } catch (err: any) {
      setApiError(err.data?.message || 'Job application failed. Please try again.');
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

  return (
    <div className=''>
      <h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">
        Review Profile
      </h2>

      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-blue-50 flex-box-center border-2 border-blue-200 relative">
          <span className="text-3xl text-blue-400">👤</span>
          <span className="absolute bottom-0 right-0 bg-white text-blue-500 rounded-full p-1 border border-blue-200 cursor-pointer text-sm">
            +
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="bg-blue-50 rounded-md px-4 py-4 mb-6 relative">
          <h3 className="font-semibold text-gray-700">Basic Info</h3>
          <button
            className="absolute top-4 right-4 text-blue-600 text-sm font-medium hover:underline"
            onClick={() => setIsEditing(true)}
          >
            ✏️ Edit
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-y-3 text-sm">
          <div><strong>Name:</strong> {profileData.name}</div>
          <div><strong>DOB:</strong> {profileData.dob}</div>
          <div><strong>Age:</strong> {profileData.age}</div>
          <div><strong>Mobile number:</strong> {profileData.mobile}</div>
          <div><strong>Email ID:</strong> {profileData.email}</div>
          <div><strong>Gender:</strong> {profileData.gender}</div>
          <div className="md:col-span-2"><strong>Address:</strong> {profileData.address}</div>
        </div>
      </div>

      <div className="relative">
        <div className="bg-blue-50 rounded-md px-4 py-4 my-6 relative">
          <h3 className="font-semibold text-gray-700">Professional Info</h3>
          <button
            className="absolute top-4 right-4 text-blue-600 text-sm font-medium hover:underline"
            onClick={() => setIsEditing(true)}
          >
            ✏️ Edit
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-y-3 text-sm">
          <div><strong>Higher education:</strong> {profileData.education}</div>
          <div><strong>Year of experience:</strong> {profileData.experience}</div>
          <div><strong>Current working school:</strong> {profileData.currentSchool}</div>
          <div><strong>Expertise:</strong> {profileData.expertise}</div>
          <div><strong>Class:</strong> {profileData.class}</div>
          <div><strong>Joining:</strong> {profileData.joining}</div>
          <div className="md:col-span-2">
            <strong>Resume:</strong>
            <div className="mt-2 flex items-center space-x-2 bg-gray-100 p-2 rounded border border-gray-300 w-max">
              <span className="text-red-500 font-bold text-xs bg-white px-2 py-1 border border-red-300 rounded">PDF</span>
              <span className="text-gray-800 text-sm">{profileData.resumeName}</span>
              <span className="text-gray-400 text-xs">({profileData.resumeSize})</span>
              <button className="ml-2 text-gray-400 hover:text-red-500 text-sm">✕</button>
            </div>
          </div>
        </div>
      </div>

      {apiError && <p className="text-red-500 mt-2 text-sm">{apiError}</p>}
      {isLoading && <p className="text-gray-500 mt-2 text-sm">Submitting...</p>}
    </div>
  );
});

ReviewProfile.displayName = 'ReviewProfile';

export default ReviewProfile;