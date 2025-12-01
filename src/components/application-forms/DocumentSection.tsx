import React from "react";
import DocumentUploadProgress from "./DocumentUploadProgress";
import DocumentUploadBox from "./DocumentUploadBox";

type Props = {
    type: "academic" | "aadhar" | "transfer" | "migration";
    state: {
        file: File | null;
        progress: number;
        uploaded: boolean;
    };
    onFileChange: (file: File) => void;
    onDelete: () => void;
    label: string;
};

const DocumentSection = ({ type, state, onFileChange, onDelete, label }: Props) => {
    const { file, progress, uploaded } = state;

    return file ? (
        <DocumentUploadProgress
            file={file}
            progress={progress}
            uploaded={uploaded}
            onFileChange={onFileChange}
            onDelete={onDelete}
            label={label}
        />
    ) : (
        <DocumentUploadBox
            file={file}
            onFileChange={onFileChange}
            label={label}
        />
    );
};

export default DocumentSection;
