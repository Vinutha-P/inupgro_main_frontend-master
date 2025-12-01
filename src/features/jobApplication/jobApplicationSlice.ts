import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ProfessionalFormData,
  JobApplicationState,
} from "@/types/jobApplication.types";

const initialState: JobApplicationState = {
  professionalInfo: {
    currentSchool: "",
    yearsOfExperience: 0,
    higherEducation: "",
    expertise: "",
    class: "",
    expectedJoiningDate: "",
    documents: [],
  },
};

const jobApplicationSlice = createSlice({
  name: "jobApplication",
  initialState,
  reducers: {
    setProfessionalInfo: (
      state,
      action: PayloadAction<ProfessionalFormData>
    ) => {
      state.professionalInfo = action.payload;
    },
    resetJobApplication: () => initialState,
  },
});

export const { setProfessionalInfo, resetJobApplication } =
  jobApplicationSlice.actions;
export default jobApplicationSlice.reducer;
