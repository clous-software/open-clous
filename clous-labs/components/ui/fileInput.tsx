import React, { useRef, useState } from "react";
import { ImAttachment } from "react-icons/im";

const FileInput = ({ onChange }: { onChange: React.ChangeEventHandler<HTMLInputElement> }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="hover:shadow-xl transition-all duration-200 delay-100 bg-[#FAFAFA] rounded-3xl w-[25rem] h-[32rem] flex flex-col gap-3 items-center text-center justify-center text-xs cursor-pointer border" onClick={handleClick}>
      <ImAttachment className="w-4 h-4" />
      <p className="text-base font-medium">Upload your resume</p>
      <input
        ref={inputRef}
        type="file"
        name="file"
        id="resumeInput"
        accept="application/pdf"
        multiple
        onChange={onChange}
        className="hidden"
      />

    </div>
  );
};

export default FileInput