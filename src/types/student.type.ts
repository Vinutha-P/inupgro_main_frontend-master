export interface StudentFormData {
  firstName: string;
  surname: string;
  email: string;
  dob: string;
  gender: string;
  phoneNumber: string;
  parentsName: string;
  parentsSurname: string;
  parentsEmail: string;
  parentsPhoneNumber: string;
  instituteType: string;
}


export interface StudentProfileResponse {
  _id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  studentEmail: string;
  studentCountryCode: number;
  studentMobile: string;
  parentFirstName?: string;
  parentLastName?: string;
  parentEmail?: string;
  parentCountryCode?: number;
  parentMobile?: string;
  aadharCard?: string | null;
  profilePic?: string | null;
  hobbies?: string[];
  aboutMe?: string;
  address?: string;
  houseName?: string;
  landmark?: string;
  state?: string;
  pinCode?: number;
  class?: string;
  board?: string;
  medium?: string;
  preferredBoard?: string;
  preferredAdditionalSubject?: string;
  latitude?: string;
  longitude?: string;
  studentschools?: SchoolItem[];
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  instituteType?: string;
  isProfileCompleted?: boolean;
  isStudentEmailVerified?: number;
}

export interface SchoolItem {
  _id: string;
  schoolId: string;
  board: string;
  medium: string;
  fromClass: string;
  toClass: string;
  startDate: string;
  endDate: string;
  transferCertificate: string;
  migrationCertificate: string;
  marksheet: MarksheetItem[];
}

export interface MarksheetItem {
  _id: string;
  className: string;
  image: string;
}

export interface EditProfileRequest {
  firstName?: string;
  lastName?: string;
  dob?: string;
  gender?: string;
  studentEmail?: string;
  studentCountryCode?: number;
  studentMobile?: string;
  fatherName?: string;
  motherName?: string;
  fatherEmail?:any
  guardianName?: string;
  fatherCountryCode?: number;
  motherCountryCode?: number;
  guardianCountryCode?: number;
  guardianMobile?:any
  fatherMobile?: string;
  aadharCard?: string;
  profilePic?: string;
  hobbies?: string[];
  aboutMe?: string;
  address?: string;
  houseName?: string;
  landmark?: string;
  state?: string;
  pinCode?: number;
  class?: string;
  board?: string;
  medium?: string;
  preferredBoard?: string;
  preferredAdditionalSubject?: string;
  latitude?: string;
  longitude?: string;
  schools?: any;
}

export interface EditProfileResponse {
  success: boolean;
  message: string;
  results: StudentProfileResponse;
}

export interface RemoveSchoolRequest {
  id: string;
}

export interface RemoveSchoolResponse {
  success: boolean;
  message: string;
}

export interface EditSchoolRequest {
  id: string;
  data:any;
}

export interface EditSchoolResponse {
  success: boolean;
  message: string;
  results: SchoolItem;
}

export interface RemoveMarksheetRequest {
  id: string;
}

export interface RemoveMarksheetResponse {
  success: boolean;
  message: string;
}

export interface AddMarksheetRequest {
  studentSchoolId: string;
  className: string;
  image: string;
}

export interface AddMarksheetResponse {
  success: boolean;
  message: string;
  results: MarksheetItem;
}



export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  subjectName?: string;
  standard?: string;
  author?: string;
  publisher?: string;
  cover: any; // Image source
  coverPage: PageContent;
  pages: PageContent[];
  chapters: Chapter[];
  totalPages: number;
  metadata?: BookMetadata;
  pdfUrl?: string; // New field for PDF URL
}

export interface PageContent {
  id: number;
  content: string;
  title?: string;
  leftContent?: string;
  rightContent?: string;
}

export interface Chapter {
  id: string;
  title: string;
  pages: number[];
  subChapters?: SubChapter[];
  expanded?: boolean;
}

export interface SubChapter {
  id: string;
  title: string;
  pages: number[];
}

export interface BookMetadata {
  edition?: string;
  year?: string;
  isbn?: string;
  language?: string;
}

// Book Reader State
export interface BookReaderState {
  currentPage: number;
  isFullscreen: boolean;
  zoomLevel: number;
  isAnimating: boolean;
  flipDirection: "next" | "prev" | null;
  animationProgress: number;
  turnedPages: Set<number>;
  showTOC: boolean;
  searchTerm: string;
  isPdfMode?: boolean; // New field for PDF mode
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  physics: {
    resistance: number;
    momentum: number;
    damping: number;
  };
}
