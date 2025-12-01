import { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { LiaTrashAltSolid } from 'react-icons/lia';

interface DeleteVideoProps {
    videoId: string;
    videoTitle: string;
    videoStatus: 'Verify pending' | 'Saved as draft' | 'Verified';
    onDelete: (id: string) => void;
    isOpen: boolean;
    onToggle: () => void;
}

export default function DeleteVideo({ videoId, videoTitle, videoStatus, onDelete, isOpen, onToggle }: DeleteVideoProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const isDeleteDisabled = videoStatus === 'Verified';

    return (
        <div className="relative inline-block text-left">
            <button type='button' onClick={onToggle} className="p-1">
                <HiDotsVertical className="text-gray-600" size={15} />
            </button>

            {isOpen && (
                <div className="absolute right-0 bottom-full mb-1 z-10 origin-bottom-right rounded-md bg-white border border-gray-300 shadow-lg">
                    <button
                        type="button"
                        onClick={() => {
                            if (!isDeleteDisabled) {
                                setModalOpen(true);
                                onToggle();
                            }
                        }}
                        disabled={isDeleteDisabled}
                        className={`block w-full px-2 py-1 text-sm text-left rounded 
                            ${isDeleteDisabled
                                ? 'text-gray-400 cursor-not-allowed bg-white'
                                : 'text-red-600 hover:bg-red-50'}`}
                    >
                        Delete
                    </button>
                </div>
            )}

            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white px-12 py-8 rounded-xl shadow-lg w-full max-w-lg text-center relative">
                        <button
                            type="button"
                            onClick={() => setModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 text-xl"
                            aria-label="Close upload modal"
                        >
                            &times;
                        </button>

                        <div className="flex justify-center mb-10">
                            <div className="w-[120px] h-[120px] rounded-full bg-red-100 flex items-center justify-center">
                                <LiaTrashAltSolid color='red' size={42} />
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Delete video <span className='text-red-500'>{videoTitle}</span>
                        </h2>
                        <p className="text-sm text-gray-700 mb-8 leading-relaxed">
                            Your video will be permanently deleted from the INUPGRO Platform.
                            Are you sure you want to delete this video?
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                type='button'
                                onClick={() => setModalOpen(false)}
                                className="w-44 px-6 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                onClick={() => {
                                    onDelete(videoId);
                                    setModalOpen(false);
                                }}
                                className="w-44 px-6 py-2 text-xs font-medium text-white bg-primary rounded-lg hover:bg-brandBlue transition-colors"
                            >
                                Delete Video
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}
