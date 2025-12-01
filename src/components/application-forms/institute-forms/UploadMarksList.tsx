import React from "react";
import { useState } from "react";
import MarksheetUploadProgress from "../MarksheetUploadProgress";

interface ClassItem {
    id: number;
    className: string;
    required: boolean;
}

const UploadMarksList = () => {
    const initialClasses: ClassItem[] = [{ id: 1, className: "Class 1st", required: true }];
    const [markLists, setMarkLists] = useState<ClassItem[]>(initialClasses);
    const [files, setFiles] = useState<(File | null)[]>(Array(initialClasses.length).fill(null));
    const [progresses, setProgresses] = useState<number[]>(Array(initialClasses.length).fill(0));
    const [uploaded, setUploaded] = useState<boolean[]>(Array(initialClasses.length).fill(false));

    const handleFileChange = (file: File, index: number) => {
        const newFiles = [...files];
        const newProgresses = [...progresses];
        const newUploaded = [...uploaded];

        newFiles[index] = file;
        newProgresses[index] = 0;
        newUploaded[index] = false;

        setFiles(newFiles);
        setProgresses(newProgresses);
        setUploaded(newUploaded);

        handleUpload(index);
    };

    const handleUpload = (index: number) => {
        const interval = setInterval(() => {
            setProgresses((prevProgress) => {
                const newProgress = [...prevProgress];
                if (newProgress[index] < 100) {
                    newProgress[index] += 10;
                } else {
                    clearInterval(interval);
                    const newUploaded = [...uploaded];
                    newUploaded[index] = true;
                    setUploaded(newUploaded);
                }
                return newProgress;
            });
        }, 500);
    };

    const handleAdd = () => {
        const newClassNumber = markLists.length + 1;
        const suffix =
            newClassNumber === 1
                ? "st"
                : newClassNumber === 2
                    ? "nd"
                    : newClassNumber === 3
                        ? "rd"
                        : "th";
        const className = `Class ${newClassNumber}${suffix}`;
        const newId = Date.now();
        setMarkLists([...markLists, { id: newId, className, required: false }]);
        setFiles([...files, null]);
        setProgresses([...progresses, 0]);
        setUploaded([...uploaded, false]);
    };

    return (
        <div className="mt-6">
            <label htmlFor="upload-mark-lists" className="block text-[0.7rem] font-medium mb-2">
                Upload mark lists <span className="text-red-500">*</span>
            </label>
            <input id="upload-mark-lists" type="file" className="hidden" />

            <div className="border border-gray-200 rounded-lg py-2">

                <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-500 mb-2">
                    <div className="col-span-3 text-center">Classes</div>
                    <div className="col-span-5 text-center">Progress</div>
                    <div className="col-span-4 text-center">Status</div>
                </div>

                {markLists.map((item, index) => {
                    const bgColor = index % 2 === 0 ? "bg-white" : "bg-gray-50";
                    return (
                        <div key={item.id} className={`${bgColor} p-2 rounded mb-2`}>
                            <MarksheetUploadProgress
                                className={item.className}
                                required={item.required}
                                file={files[index] || null}
                                progress={progresses[index] || 0}
                                uploaded={uploaded[index] || false}
                                onFileChange={(file: File) => handleFileChange(file, index)}
                                onDelete={() => {
                                    const newFiles = [...files];
                                    newFiles[index] = null;
                                    setFiles(newFiles);
                                    setProgresses(prev => {
                                        const newProgress = [...prev];
                                        newProgress[index] = 0;
                                        return newProgress;
                                    });
                                    setUploaded(prev => {
                                        const newUploaded = [...prev];
                                        newUploaded[index] = false;
                                        return newUploaded;
                                    });
                                }}
                            />
                        </div>
                    );
                })}

                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="mt-2 text-darkBlue font-semibold text-xs flex items-center gap-1 hover:underline"
                        aria-label="Add additional class mark list"
                    >
                        + Add Additional Class Mark List
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UploadMarksList;