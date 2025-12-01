export const regex = {
    alphabetFormat: /^[A-Za-z\s]+$/,  // Alphabets and spaces only
    alphaSpecialCharPattern : /^[A-Za-z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
    emailFormat: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format
    phoneNumber:  /^\d{10}$/,               // Indian mobile number (starts from 6-9)
    pinCode: /^\d{6}$/,    
    number: /^[0-9]+(\.[0-9]+)?$/,                  // number 
};

// Validate if string contains only alphabets (and spaces)
export const isValidAlphaSpecial = (input: string): boolean => {
    return regex.alphaSpecialCharPattern.test(input.trim());
};

// Validate if string contains only alphabets (and spaces)
export const isValidNumber = (input: string): boolean => {
    return regex.number.test(input.trim());
};

// Validate if string contains only alphabets (and spaces)
export const isValidAlphabet = (input: string): boolean => {
    return regex.alphabetFormat.test(input.trim());
};

//  Validate email format
export const isValidEmail = (email: string): boolean => {
    return regex.emailFormat.test(email.trim());
};

// Validate Indian mobile number

export const isValidPhoneNumber = (phone: string): boolean => {
    return regex.phoneNumber.test(phone.trim());
};

// Validate Indian pin code

export const isValidPinCode = (pinCode: string): boolean => {
    return regex.pinCode.test(pinCode.trim());
};