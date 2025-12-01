import { ACADEMIC_SESSION_OPTIONS, CAMPUS_TYPE_OPTIONS, COLLEGE_FORMAT_OPTIONS, DEFAULT_OTPIONS, LANGUAGE_OPTIONS, OWNERSHIP_OPTIONS, universityTypes } from "@/utils/selectOptions/options";

export const classesOptions = [
    
    "Nursery",
    "LKG",
    "UKG",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
];

export const basicFields = [
    {
        id: "registration_number",
        label: "Registration No.",
        placeholder: "Enter registration no.",
    },
    {
        id: "collegeWebsite",
        label: "College Website",
        placeholder: "Enter college website",
    },
    {
        id: "email",
        label: "Email Address",
        placeholder: "Enter email address",
    },
    {
        id: "phone",
        label: "Phone Number",
        placeholder: "Enter phone number",
    },
    { id: "plot", label: "Plot No.", placeholder: "Enter plot no." },
    { id: "address", label: "Address 1", placeholder: "Enter address 1" },
    { id: "landmark", label: "Landmark", placeholder: "Enter landmark" },
    { id: "city", label: "City", placeholder: "Enter city" },
    { id: "state", label: "State", placeholder: "Enter state" },
    { id: "pincode", label: "Pincode", placeholder: "Enter pincode" },
];

export const selectFields = [
    {
        id: "ownership",
        label: "Ownership", type: "select",
        options: OWNERSHIP_OPTIONS,
    },
    {
        id: "university",
        label: "University", type: "select",
        options: universityTypes,
    },
    {
        id: "year_of_establishment",
        label: "Year of Establishment", type: "year",
    },
    {
        id: "co_ed_status",
        label: "Co-ed Status", type: "select",
        options: ["Select Status", "Co-ed", "Boys", "Girls"],
    },
    {
        id: "campus_area",
        label: "Campus Area", type: "input",
    },
    {
        id: "campus_type",
        label: "Campus Type", type: "select",
        options: CAMPUS_TYPE_OPTIONS
    },
];

export const academicStatistics = [
    {
        id: "language",
        label: "Language of Instruction",
        type:"select",
        option:LANGUAGE_OPTIONS
    },
    {
        id: "offered",
        label: "Classes Offered",
        type:"text",
        // option:[]
    },
    {
        id: "session",
        label: "Academic Sessions",
        option:ACADEMIC_SESSION_OPTIONS,
        type:"select"
    },
    {
        id: "totalStudent",
        label: "Total Student",
        type:"text"
    },{
        id: "totalFaculty",
        label: "Total Faculty",
        type:"text"
    },
    {
        id: "collegeFormat",
        label: "College Format",
        option:COLLEGE_FORMAT_OPTIONS,
        type:"select"
    },

]

// export const classesOptions = [
//     "Pre-Nursery",
//     "Nursery",
//     "KG",
//     // "LKG",
//     // "UKG",
//     "I",
//     "II",
//     "III",
//     "IV",
//     "V",
//     "VI",
//     "VII",
//     "VIII",
//     "IX",
//     "X",
//     "XI",
//     "XII",
// ];

export const documentOptions = [
    "Adhar Card",
    "Birth Certificate",
    "Passport Size Photo",
    "Transfer Certificate (TC)",
    "Migration Certificate",
    "Domicile Certificate",
    "Caste Certificate",
    "Address Proof",
];

export const formPaymentOptions = ["Online", "Offline"];

export const competitiveExamMap: { [key: string]: string[] | null } = {
    NEET: ["Pre-Foundation", "Foundation"],
    IIT: ["Pre-Foundation", "Foundation"],
};

export const collegeCoachingMap: { [key: string]: string[] | null } = {
    XI: ["PCM", "PCB", "Commerce", "Arts"],
    XII: ["PCM", "PCB", "Commerce", "Arts"],
};

export const k12Map: { [key: string]: string[] | null } = {
    Nursery: [],
    LKG: [],
    UKG: [],
    I: [],
    II: [],
    III: [],
    IV: [],
    V: [],
    VI: [],
    VII: [],
    VIII: [],
    IX: [],
    X: [],
    XI: ["PCM", "PCB", "Commerce", "Arts"],
    XII: ["PCM", "PCB", "Commerce", "Arts"],
};