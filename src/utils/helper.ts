import { regex } from "./regexValidations";

// Helper function to format time
export const formatTimeTo12Hour = (time24: string) => {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert 0 => 12
  return `${hour.toString().padStart(2, "0")}:${minute}${ampm}`;
};

// validations.ts

type RequiredValidatorFunction = (value: string, fieldName: string) => string;
type LengthValidatorFunction = (
  value: string,
  length: number,
  fieldName: string
) => string;
type OnlyNumberValidatorFunction = (value: string, fieldName: string) => string;
type OnlyLengthValidatorFunction = (value: string, length: string) => string;
type alphabatValidatorFunction = (value: string, fieldName: string) => string;
type ageValidatorFunction = (value: string, fieldName: string) => string;
type marksValidatorFunction = (value: string, fieldName: string) => string;

export const Validators: {
  required: RequiredValidatorFunction;
  minLength: LengthValidatorFunction;
  maxLength: LengthValidatorFunction;
  onlyNumber: OnlyNumberValidatorFunction;
  exactLength: LengthValidatorFunction;
  isValidAlphaSpecial: alphabatValidatorFunction;
  ageRange: ageValidatorFunction;
  marksRange: marksValidatorFunction;
} = {
  required: (value, fieldName) => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    return "";
  },

  minLength: (value, minLength, fieldName) => {
    if (value.length < minLength) {
      return `${fieldName} should be at least ${minLength} characters long.`;
    }
    return "";
  },

  maxLength: (value, maxLength, fieldName) => {
    if (value.length > maxLength) {
      return `${fieldName} should be at most ${maxLength} characters long.`;
    }
    return "";
  },

  onlyNumber: (value, fieldName) => {
    if (value && !/^\d+$/.test(value)) {
      return `${fieldName} must contain only numbers.`;
    }
    return "";
  },

  exactLength: (value, length, fieldName) => {
    if (value && value.length !== length) {
      return `${fieldName} must be exactly ${length} characters long.`;
    }
    return "";
  },

  isValidAlphaSpecial: (value, fieldName) => {
    if (value && !regex.alphaSpecialCharPattern.test(value.trim())) {
      return `${fieldName} must contain only alphabets.`;
    }
    return "";
  },

  ageRange: (value, fieldName) => {
    const num = parseInt(value, 10);
    if (value && (isNaN(num) || num < 1 || num > 100)) {
      return `${fieldName} must be between 1 and 100.`;
    }
    return "";
  },

  marksRange: (value, fieldName) => {
    const num = parseFloat(value);
    if (value && (isNaN(num) || num < 0 || num > 100)) {
      return `${fieldName} must be a number between 0 and 100.`;
    }
    return "";
  },
};

export const formatCategory = (str: string) => {
  // Special case for today_top_news
  if (str?.toLowerCase() === "today_top_news") {
    return "Today’s Top News";
  }

  // Generic formatting for other cases
  return str
    .split("_")
    .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
    .join(" ");
};

// 1. Utility to check if URL is video
export const isVideoUrl = (url: string) => {
  const videoExtensions = [".mp4", ".webm", ".ogg", ".avi", ".mov"];
  return videoExtensions.some((ext) => url?.toLowerCase()?.includes(ext));
};

export const extractFirstImageSrc = (htmlString: string): string | null => {
  if (!htmlString) return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const imgTag = doc.querySelector("img");

  return imgTag?.getAttribute("src") || null;
};

export function getFirstPathSegment(pathname = "") {
  if (typeof pathname !== "string") {
    throw new Error("pathname must be a string");
  }

  return pathname.split("/").filter(Boolean)[0] || "";
}
export const getRelativeTime = (postedAt: string | Date): string => {
  const now = new Date();
  const postedDate = new Date(postedAt);
  const diffInSeconds = Math.floor(
    (now.getTime() - postedDate.getTime()) / 1000
  );

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

export function getAcademicYear() {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  return `${currentYear}-${nextYear}`;
}

export function getCurrentYear() {
  const currentYear = new Date().getFullYear();
  return currentYear;
}


export function convertTo24HourFormat(time12h: string): string {
  if (!time12h) return "";

  const [time, modifier] = time12h.split(/(AM|PM)/i);
  let [hours, minutes] = time.split(":");

  if (modifier?.toUpperCase() === "PM" && hours !== "12") {
    hours = (parseInt(hours) + 12).toString();
  } else if (modifier?.toUpperCase() === "AM" && hours === "12") {
    hours = "00";
  }

  return `${hours.padStart(2, "0")}:${minutes}`;
}

export const formatInputValue = (val: any): string =>
  typeof val === "string" ? val : val != null ? String(val) : "";

export const formatYear = (dateInput: string | Date): string => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear()
  return `${year}`;
};

export function truncateText(str: string, maxLength = 10) {
  if (typeof str !== "string") return "";
  return str?.length > maxLength ? str?.substring(0, maxLength) + "..." : str;

}

export const formatLocation = (
  landmark?: string | null,
  city?: string | null,
  location_value?: string | null
): string => {
  if (landmark?.trim() && city?.trim()) {
    return `${landmark}, ${city}`;
  }
  else {
    if (location_value?.trim()) {
      return location_value.length > 25
        ? location_value.slice(0, 25) + "..."
        : location_value;
    }
  }

  return "-";
};

// utils/calculateRatio.js

export const calculateRatio = (totalCapacity: any, totalFaculty: any) => {
  if (!totalCapacity || !totalFaculty || totalFaculty === 0) return null;

  let rawRatio = totalCapacity / totalFaculty;

  if (rawRatio < 1 && rawRatio > 0) {
    rawRatio = Math.round(rawRatio * 10);
    return `${rawRatio}:1`;
  }

  return `${Math.round(rawRatio)}:1`;
};

export const formatDateWithTime = (isoDate: any) => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  return date.toLocaleString('en-GB', options).replace(',', '');
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const normalizeClassName = (name: string): string => {
  return name.trim().toLowerCase().replace(/[^a-z0-9]/gi, "-");
};

export const formatDate = (isoDate: string) => {         // 09/06/2025
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB");
};

export function formatDateToCustomString(dateString: string): string { // jul 30, 2:21 PM
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',     // Jul
    day: 'numeric',     // 30
    hour: 'numeric',    // 2
    minute: '2-digit',  // 21
    hour12: true        // PM
  };

  return date.toLocaleString('en-US', options);
}
