  export interface ValidationRule {
    required: boolean;
    regex?: RegExp;
    errorMessage: string;
  }

  export const paymentValidationSchema: Record<string, ValidationRule> = {
    cardNumber: {
      required: true,
      regex: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
      errorMessage: "Card number must be in the format 1234 1234 1234 1234",
    },
    expiryDate: {
      required: true,
      regex: /^(0[1-9]|1[0-2]) \/ \d{2}$/,  // MM / YY format
      errorMessage: "Expiry date must be in MM / YY format",
    },
    cvc: {
      required: true,
      regex: /^\d{3,4}$/,
      errorMessage: "CVC must be 3 or 4 digits",
    },
    cardholderName: {
      required: true,
      regex: /^[a-zA-Z\s]{3,}$/,
      errorMessage: "Cardholder name must have at least 3 letters",
    },
    country: {
      required: true,
      regex: /^(us|in|uk|au)$/,
      errorMessage: "Please select a valid country",
    },
    address: {
      required: true,
      regex: /^.{5,}$/,
      errorMessage: "Address must be at least 5 characters",
    },
    phone: {
      required: false,
      regex: /^\[\d{3}\] \d{3}-\d{4}$/, // Optional but must match format if filled
      errorMessage: "Phone must be in format [800] 555-0175",
    },
  };
