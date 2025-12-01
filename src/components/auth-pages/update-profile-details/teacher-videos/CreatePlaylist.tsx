import { IoClose } from "react-icons/io5";
import MultiSelectField from "./MultiSelectField";
import { useState } from "react";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";

interface PlaylistData {
    playlistName: string;
    selectedClass: string[];
    selectedSubject: string;
    selectedChapter: string;
}

interface CreatePlaylistProps {
    isOpen: boolean;
    onClose: () => void;
    initialSelectedClass?: string[];
    onCreate: (data: PlaylistData) => void;
}

const CreatePlaylist: React.FC<CreatePlaylistProps> = ({
    isOpen,
    onClose,
    initialSelectedClass = [],
    onCreate
}) => {
    const [playlistName, setPlaylistName] = useState("");
    const [selectedClass, setSelectedClass] = useState<string[]>([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedChapter, setSelectedChapter] = useState("");

    const handleSubmit = () => {
        if (!playlistName || selectedClass.length === 0 || !selectedSubject || !selectedChapter) {
            alert("Please fill all required fields");
            return;
        }

        onCreate({
            playlistName,
            selectedClass,
            selectedSubject,
            selectedChapter
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-10 relative">
                <button type="button" className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
                    <IoClose size={24} />
                </button>

                <h2 className="text-2xl font-semibold text-center mb-4">Create playlist</h2>
                <hr className="mb-7 border-[#EBEBEB]"  />

                <div className="mb-5">
                    <InputField
                        label="Playlist Name"
                        type="text"
                        placeholder="Enter playlist name"
                        required
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <MultiSelectField
                        label="Class"
                        options={["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"]}
                        required
                        value={selectedClass}
                        onChange={(selected: string[]) => setSelectedClass(selected)}
                    />
                </div>

                <div className="mb-5">
                    <SelectField
                        label="Subject"
                        options={["Physics", "Chemistry", "Biology"]}
                        required
                        onChange={(e) => setSelectedSubject(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <SelectField
                        label="Chapter Name"
                        options={["Chapter 1", "Chapter 2", "Chapter 3"]}
                        required
                        onChange={(e) => setSelectedChapter(e.target.value)}
                    />
                </div>

                <div className="flex justify-between gap-4 mt-10 mb-3 font-medium">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-white w-1/2 text-[15px] px-6 py-3 rounded-md text-[#5D6B98] hover:bg-gray-100 transition border border-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-[#2E90FA] w-1/2 text-[15px] px-6 py-3 rounded-md text-white hover:bg-brandBlue transition"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );

};

export default CreatePlaylist;