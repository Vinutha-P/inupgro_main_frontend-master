import { isValidAlphabet, isValidAlphaSpecial, isValidEmail, isValidPhoneNumber, isValidPinCode } from "./regexValidations";

// Reusable error messages
export const errorMessages = {
    required: (label: string) => `${label} is required`,
    invalidString: (label: string) => `${label} must only contain alphabets`,
    invalidAlphaCharString: (label: string) => `${label} must be valid`,
    invalidEmail: (label: string) => `${label} must be a valid email address`,
    invalidPhone: (label: string) => `${label} must be 10 digits`,
    invalidPinCode: (label: string) => `${label} must be a 6-digit number.`,
};

// Mapping of fields to their validation rules with an explicit type
export const validationRules: Record<string, string> = {
    schoolName: "alphaSpecialChar", // Only alphabets
    email: "email", // Email format
    phone: "phone", // Phone number format
    city: "string", // Only alphabets
    state: "string", // Only alphabets
    pincode: "pincode", // Pincode format
};

// Function to validate field value based on its type
export const validateByType = (value: string, type: string, label: string): string => {
    switch (type) {
        case "string":
            return isValidAlphabet(value) ? '' : errorMessages.invalidString(label);
        case "alphaSpecialChar":
            return isValidAlphaSpecial(value) ? '' : errorMessages.invalidAlphaCharString(label);
        case "email":
            return isValidEmail(value) ? '' : errorMessages.invalidEmail(label);
        case "phone":
            return isValidPhoneNumber(value) ? '' : errorMessages.invalidPhone(label);
        case "pincode":
            return isValidPinCode(value) ? '' : errorMessages.invalidPinCode(label);
        default:
            return ''; // No validation for unknown types
    }
};

// Reusable validateField function
export const validateField = (name: string, value: any, label: string): string => {
    const strValue = typeof value === "string" ? value : value?.toString?.() || "";
    // Check if the field is required

    if (name === "website" && !value) {
        return "";  // Ignore validation for empty website
    }

    if (strValue.trim() === "") {
        return errorMessages.required(label);
    }

    // Regex validation for specific fields (Total Faculty and Total Student)
  if (name === "totalFaculty" || name === "totalStudent") {
    const regex = /^[0-9]+$/; // Regex to allow only numbers
    if (!regex.test(strValue.trim())) {
      return `${label} must be a valid number`;  // Error message if input is not a number
    }
  }

    // Fetch the validation rule for the field
    const validationType = validationRules[name];

    // If no specific validation rule exists for this field, return empty string (valid)
    if (validationType) {
        return validateByType(value, validationType, label);
    }

    // Validate the field based on its type
    return "";
};
