import { facultyDesignations, schoolStreams } from "../selectOptions/options"

export const schoolStudent = [
    { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter name" },
    { label: "Age", name: "age", type: "text", placeholder: "Enter age" },
    { label: "Stream", name: "stream", type: "select", options: schoolStreams },
    { label: "Marks Scored", name: "marks", type: "text", placeholder: "Enter marks" },
]

export const collegeStudent = [
    { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter name" },
    { label: "Age", name: "age", type: "text", placeholder: "Enter age" },
    { label: "Marks Scored", name: "mark", type: "text", placeholder: "Enter mark" },
]

export const collegeFacultyStudent = [
    { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter name" },
    { label: "Age", name: "age", type: "text", placeholder: "Enter age" },
    { label: "Exam Type", name: "examType", type: "text", placeholder: "Enter exam type" },
    { label: "Marks Scored", name: "marks", type: "text", placeholder: "Enter Percentage" },
]

export const collegeFaculty = [
    { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter name" },
    { label: "Age", name: "age", type: "text", placeholder: "Enter age" },
    { label: "Designation", name: "designation", type: "select", options: facultyDesignations },
    { label: "Department", name: "department", type: "text", placeholder: "Enter department" },
]

export const coachingFaculty = [
    { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter name" },
    { label: "Age", name: "age", type: "text", placeholder: "Enter age" },
    { label: "Designation", name: "designation", type: "text", placeholder: "Enter designation" },
    { label: "Department", name: "department", type: "text", placeholder: "Enter department" },
]
