import React from "react";

type Props = {
    progress: number;
};

const VideoUploadProgress = ({
    progress,
}: Props) => {

    return (
        <div className="mt-2 w-full">
            <div className="mt-2">
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                            width: `${progress}%`,
                            backgroundColor: progress > 0 ? '#22c55e' : 'transparent',
                        }}
                    />
                </div>
            </div>

        </div>
    );
};

export default VideoUploadProgress;
