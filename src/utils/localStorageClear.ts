export const localStorageKeys = {
    school: [
      "college-data",
      "college-fees",
      "college_course_fees",
      "college-classes",
      "coaching-data",
      "coaching-classes",
      "coaching-fees",
      "studentData",
      "school-fees",
      "school-academic",
      "school-classes",
      "class_branch_map"
    ],
    college: [
      "school-data",
      "school-fees",
      "coaching-data",
      "coaching-classes",
      "coaching-fees",
      "school-classes",
      "school-academic",
      "class_branch_map",
      "studentData",
      "college_course_fees",
      "college-fees",
      "college-classes",

    ],
    coaching: [
      "school-data",
      "school-fees",
      "college-data",
      "college-fees",
      "college_course_fees",
      "college-classes",
      "school-classes",
      "school-academic",
      "class_branch_map",
      "studentData",
      "coaching-fees",
      "coaching-classes",
    ],
  };

  export const clearMultipleLocalStorageItems = (type: "school" | "college" | "coaching") => {
    const keys = localStorageKeys[type];
    keys.forEach((key) => localStorage.removeItem(key));
  };
  