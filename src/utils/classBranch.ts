export type ClassBranchResult = {
    classedData: string;
    branchData: string;
};

export const parseClassAndBranch = (className: string): ClassBranchResult => {
    const regex = /(Class \d+)\s*\(([^)]+)\)/; // matches "Class 11(PCM)" or "Class 12(Commerce)"
    const match = className.match(regex);

    if (match) {
        return {
            classedData: match[1],      // e.g., "Class 11"
            branchData: match[2],     // e.g., "PCM"
        };
    }

    // Case: single class like "Class 10"
    return {
        classedData: className,
        branchData: "",
    };
};