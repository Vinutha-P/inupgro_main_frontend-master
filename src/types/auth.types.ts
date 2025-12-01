export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address1: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
}

export interface AuthResponse {
  user: {
    email: string;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    userId: number;
    phoneNumber: string;
    updatedAt: string;
    createdAt: string;
  };
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
}

export interface AuthState {
  user: AuthResponse["user"] | null;
  tokens: AuthResponse["tokens"] | null;
}

export interface StudentRegisterRequest {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  studentEmail: string;
  studentCountryCode: string;
  studentMobile: string;
  parentFirstName: string;
  parentLastName: string;
  parentCountryCode: string;
  parentMobile: string;
  parentEmail: string;
  instituteType: string;
}

export interface StudentRegisterResponse {
  success: boolean;
  message: string;
  results?:any
}

export interface VerifyEmailRequest {
  otp: string;
  otpId: string;
  dataId: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  results:any
}

export interface ResendOtpRequest {
  email: string;
  dataId: string;
}

export interface ResendOtpResponse {
  results:any;
  message: string;
  success:boolean
}

export interface LoginRequest {
  email?: string;
  password?: string;
  latitude?: any;
  longitude?: any;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  results:any
}

export interface TransformedLoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    instituteType: string;
  };
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
  results: any;
  success: boolean;
  message: string;
}

export interface InstituteRegisterRequest {
  name: string;
  registrationNumber: string;
  website: string;
  email: string;
  countryCode: string;
  mobile: string;
  campusArea: string;
  latitude: string;
  longitude: string;
  address: string;
  instituteType: string;
}
export interface LogoutRequest {
  refreshToken: string;
}

export interface LogoutResponse {
  success: boolean;
  message?: string;
}