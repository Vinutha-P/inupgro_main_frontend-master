import React, { useState } from "react";

interface MultiTagInputProps {
    id: string;
    label: string;
    tags: string[];
    onTagsChange: (tags: string[]) => void;
}

const MultiTagInput: React.FC<MultiTagInputProps> = ({ id, label, tags, onTagsChange }) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            const trimmed = inputValue.trim();
            const wordCount = trimmed.split(/\s+/).length;

            if (wordCount > 2) {
                setError("Each tag must be at most 2 words.");
                return;
            }

            if (tags.includes(trimmed)) {
                setError("Duplicate tags are not allowed.");
                return;
            }

            onTagsChange([...tags, trimmed]);
            setInputValue("");
            setError(null);
        }
    };

    const handleRemove = (index: number) => {
        const updated = tags.filter((_, i) => i !== index);
        onTagsChange(updated);
    };

    return (
        <>
            <input
                id={id}
                type="text"
                name={id}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

            <div className={`flex flex-wrap gap-2 ${error ? 'mt-2' :tags?.length > 0 ? 'mt-1' : ""}`}>
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-black-700 px-2 py-1 text-xs rounded-full flex items-center"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="ml-2 text-black-500 hover:text-black-700"
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
        </>
    );
};

export default MultiTagInput;
