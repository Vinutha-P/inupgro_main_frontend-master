export interface ProfessionalFormData {
  higherEducation: string;
  yearsOfExperience: number;
  currentSchool: string;
  expertise: string;
  class: string;
  expectedJoiningDate: string;
  documents: { type: string; url: string }[];
}
  
  export interface JobApplicationRequest {
    jobApplicationDetails: ProfessionalFormData;
    documents: Array<{ type: string; url: string }>;
  }
  
  export interface JobApplicationState {
    professionalInfo: ProfessionalFormData;
  }

  export interface Job {
    _id: string;
    jobTitle: string;
    postedById: string;
    postedByDetails: {
      _id: string;
      name: string;
      registration_number: string;
      logo_link: string;
      banner: string;
      contact_info: {
        email: string;
        phone: string;
        website: string;
      };
      principal: {
        name: string;
        age: number;
        experience: number;
        metadata: string;
        personality: string[];
        profile_picture: string;
      };
      location: {
        location_value: string;
        latitude: number;
        longitude: number;
      };
    };
    location: string;
    subject: string;
    medium: string;
    yearsOfExperience: number;
    experienceLevel: string;
    applicationClosedDate: string;
    numberOfVacancies: number;
    noOfApplicants: number;
    description: string;
    responsibilities: string;
    postedAt?:any
    isActive: boolean;
}