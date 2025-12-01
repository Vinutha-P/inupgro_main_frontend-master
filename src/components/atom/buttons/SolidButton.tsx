import React from "react";

const SolidButton = ({
    buttonName
}:any) => {
    return (
        <button
            type="button"
            className={`h-[2.3rem] min-w-fit px-4 flex-box-center gap-[0.625rem] text-xs sm:text-base "font-normal"
               bg-darkBlue text-white border border-brandSecondary rounded-lg`}
        >
            <span>{buttonName}</span>
        </button>
    )
}

export default SolidButton;