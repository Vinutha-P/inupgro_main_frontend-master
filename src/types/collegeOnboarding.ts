export interface ContactInfo {
    email?: string;
    phone?: string;
    website?: string;
  }
  
  export interface CollegeLocation {
    location_value?: string;
    latitude?: number;
    longitude?: number;
  }
  
  export interface CollegeData {
    name?: string;
    registration_number?: string;
    logo_link?: string;
    banner?: string;
    year_of_establishment?: string;
    ownership?: string;
    campus_type?: string;
    university?: string;
    campus_area?: string;
    co_ed_status?: string;
    totalFaculty?: number;
    totalStudent?: number;
    contact_info?: ContactInfo;
    college_location?: CollegeLocation;
  }
  