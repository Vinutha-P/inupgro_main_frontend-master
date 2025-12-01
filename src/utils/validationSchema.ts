import { validateField } from "./formValidation";
import { Validators } from "./helper";

export const validationSchema = {
  schoolName: (value: string) => validateField("schoolName", value, "School Name"),
  registration: (value: string) => validateField("registration", value, "Registration No."),
  email: (value: string) => validateField("email", value, "Email Address"),
  phone: (value: string) => validateField("phone", value, "Phone Number"),
  plot: (value: string) => validateField("plot", value, "Plot No."),
  address1: (value: string) => validateField("address1", value, "Address 1"),
  landmark: (value: string) => validateField("landmark", value, "Landmark"),
  city: (value: string) => validateField("city", value, "City"),
  state: (value: string) => validateField("state", value, "State"),
  pincode: (value: string) => validateField("pincode", value, "Pincode"),
  ownership: (value: string) => validateField("ownership", value, "Ownership"),
  board: (value: string) => validateField("board", value, "Board"),
  year: (value: string) => validateField("year", value, "Year of Establishment"),
  coedStatus: (value: string) => validateField("coedStatus", value, "Co-ed Status"),
  campusArea: (value: string) => validateField("campusArea", value, "Campus Area"),
  campusType: (value: string) => validateField("campusType", value, "Campus Type"),
};

export const principalValidationSchema: { [key: string]: ((value: string) => string)[] } = {
  fullName: [
    (value) => Validators.required(value, "Full Name"),
    (value) => Validators.maxLength(value, 50, "Full Name"),
    (value) => Validators.isValidAlphaSpecial(value, "Full Name"),
  ],
  age: [
    (value) => Validators.required(value, "Age"),
    (value) => Validators.onlyNumber(value, "Age"),
  ],
  experience: [
    (value) => Validators.required(value, "Experience"),
    (value) => Validators.onlyNumber(value, "Experience"),
  ],
  education: [
    (value) => Validators.required(value, "Higher Education"),
  ],
  describePersonality: [
    (value) => Validators.required(value, "Describe Personality"),
    (value) => Validators.maxLength(value, 200, "Describe Personality"),
  ],
  fullAddress: [
    (value) => Validators.required(value, "Full Address"),
    (value) => Validators.maxLength(value, 150, "Full Address"),
  ],
  state: [
    (value) => Validators.maxLength(value, 50, "State"),
    (value) => Validators.isValidAlphaSpecial(value, "State"),
  ],
  country: [
    (value) => Validators.maxLength(value, 50, "Country"),
    (value) => Validators.isValidAlphaSpecial(value, "Country"),
  ],
  pincode: [
    (value) => Validators.exactLength(value, 6, "Pincode"),
    (value) => Validators.onlyNumber(value, "Pincode"),
  ],
};

export const addStudentValidationSchema: { [key: string]: ((value: string) => string)[] } = {
  fullName: [
    (value) => Validators.maxLength(value, 50, "Full Name"),
    (value) => Validators.isValidAlphaSpecial(value, "Full Name"),
  ],
  age: [
    (value) => Validators.onlyNumber(value, "Age"),
    (value) => Validators.ageRange(value, "Age"),
  ],
  marks: [
    (value) => Validators.onlyNumber(value, "Marks"),
    (value) => Validators.marksRange(value, "Marks"),
  ],
};
