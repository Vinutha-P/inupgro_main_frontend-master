export interface Skill {
  hobby: string;
  description: string;
}

export interface Education {
  _id: string;
  collegeId: string;
  degree: string;
  subject: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  _id: string;
  schoolId: string;
  designation: string;
  expertise: string;
  className: string;
  isCurrentSchool: boolean;
  startDate: string;
  endDate: string;
  description: string;
}

export interface TeacherProfile {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  countryCode: string;
  mobile: string;
  address: string;
  aboutMe: string;
  resume: {
    fileName: string;
    size: string;
    lastUpdated: string;
    previewIcon: string;
    url: string;
  };
  profilePic: string;
  skills: Skill[];
  educations: Education[];
  experiences: Experience[];
  latitude: string;
  longitude: string;
}

export interface TeacherRegisterRequest {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  countryCode: string;
  mobile: string;
  instituteType: string;
}

export interface TeacherRegisterResponse {
  success: boolean;
  message: string;
  results: {
    _id: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    email: string;
    countryCode: number;
    mobile: string;
    isEmailVerified: number;
    isProfileCompleted: boolean;
    location: {
      type: string;
      coordinates: number[];
    };
    skills: Skill[];
    instituteType: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    role: string;
    token: string;
    refreshToken: string;
    otpId: string;
    dataId: string;
  };
}

export interface EditEducationRequest {
  collegeId: string;
  degree: string;
  subject: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EditExperienceRequest {
  schoolId: string;
  designation: string;
  expertise: string;
  className: string;
  isCurrentSchool: boolean;
  startDate: string;
  endDate: string;
  description: string;
}
