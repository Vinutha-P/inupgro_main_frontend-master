export interface Partner {
  name: string;
  link: string;
}

export interface PaginatedPartners {
  data: Partner[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface Profile {
  fullName: string;
  city: string;
  profilePicture: string;
  instituteName: string;
}

export interface SchoolLocation {
  location_value: string;
  latitude: number;
  longitude: number;
}

export interface SchoolProfile {
  _id: string;
  name: string;
  logo_link: string;
  gender_specific: string;
  boards: string[];
  year_of_establishment: string;
  school_location: SchoolLocation;
}

export interface HomepageResponse {
  total_partners: PaginatedPartners;
  total_schools: number;
  total_colleges: number;
  total_institute: number;
  total_teachers: number;
  totalPages?:any;
  student_profiles: Profile[];
  currentPage?:any;
  teacher_profiles: Profile[];
  school_profiles: SchoolProfile[];
}

export interface HomepageQueryParams {
  search?: string;
  location?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}
