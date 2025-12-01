type FormattedClassResult = {
  firstClass?: string;
  lastClass?: string;
  firstBranch?: string;
  formattedClasses: { [key: string]: string[] }; // original object
  classOptions: string[];                        // array of class names
  branchOptionsMap: { [key: string]: string[] }; // class to branches map
};

export const getFormattedClassData = (
  setState?: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>
): FormattedClassResult => {
  try {
    const storedMap = localStorage.getItem("school-data");
    if (!storedMap) return { formattedClasses: {}, classOptions: [], branchOptionsMap: {} };

    const parsedData = JSON.parse(storedMap);
    if (!parsedData?.fees?.data || typeof parsedData.fees.data !== "object") {
      return { formattedClasses: {}, classOptions: [], branchOptionsMap: {} };
    }

    const feeData = parsedData.fees.data;
    const formattedClasses: { [key: string]: string[] } = {};

    Object.entries(feeData).forEach(([className, value]: [string, any]) => {
      const branches = Object.keys(value || {});
      formattedClasses[className] =
        branches.length === 1 && branches[0] === className ? [] : branches;
    });

    // Optional state update
    if (setState) setState(formattedClasses);

    const classOptions = Object.keys(formattedClasses);
    const firstClass = classOptions[0];
    const lastClass = classOptions[classOptions.length - 1];
    console.log(lastClass,'.lastClass')
    const firstBranch = firstClass ? formattedClasses[firstClass]?.[0] : undefined;

    return {
      firstClass,
      lastClass,
      firstBranch,
      formattedClasses,
      classOptions,
      branchOptionsMap: formattedClasses,
    };
  } catch (err) {
    console.error("Error in getFormattedClassData:", err);
    return {
      formattedClasses: {},
      classOptions: [],
      branchOptionsMap: {},
    };
  }
};


// utils/getClassBranchMapping.ts -coaching-data
export const getClassBranchMapping = (): {
  mapping: Record<string, string[]>;
  firstClass: string | null;
  firstBranch: string | null;
} => {
  try {
    const raw = localStorage.getItem("coaching-data");
    const coachingData = raw ? JSON.parse(raw) : {};
    const subjectFees = coachingData.subject_fees || {};

    const classBranchMap: Record<string, string[]> = {};

    Object.entries(subjectFees).forEach(([className, branches]: any) => {
      classBranchMap[className] = Object.keys(branches);
      // if (Array.isArray(branches)) {
      //   classBranchMap[className] = branches; // direct array use karo
      // } else {
      //   classBranchMap[className] = Object.keys(branches); // object ke keys use karo
      // }
    });

    const allClasses = Object.keys(classBranchMap);
    const firstClass = allClasses[0] || null;
    const firstBranch = firstClass && classBranchMap[firstClass]?.[0] || null;

    return {
      mapping: classBranchMap,
      firstClass,
      firstBranch,
    };
  } catch (err) {
    console.error("Error parsing class-branch mapping:", err);
    return {
      mapping: {},
      firstClass: null,
      firstBranch: null,
    };
  }
};

