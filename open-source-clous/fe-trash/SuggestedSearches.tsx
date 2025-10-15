import React, { RefObject } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";

interface SuggestedSearchesProps {
    suggestedSearches: string[];
    suggestedSearchesPosition: number;
    contentEditableRef: RefObject<HTMLElement>;
    isInitiated: boolean;
    setUserMessage: (val: string) => void;
    setHasContent: (val: boolean) => void;
    handleSendMessage: () => void;
}

const SuggestedSearches: React.FC<SuggestedSearchesProps> = ({
    suggestedSearches,
    suggestedSearchesPosition,
    contentEditableRef,
    isInitiated,
    setUserMessage,
    setHasContent,
    handleSendMessage
}) => {
    if (isInitiated || !suggestedSearches || suggestedSearches.length === 0) return null;

    // Get the current user input
    const userInput = contentEditableRef.current?.textContent || "";

    return (
        <div
            className="flex flex-col absolute left-0 bg-[#FAFAFA] shadow-gradient shadow-15xl w-full min-h-12 max-h-48 z-50 overflow-hidden px-2"
            style={{
                top: `${suggestedSearchesPosition}px`,
                transform: "none"
            }}
        >
            {suggestedSearches.map((item) => {
                const matchingPart = item.substring(0, userInput.length);
                const remainingPart = item.substring(userInput.length);

                return (
                    <div
                        key={item}
                        className={`group relative p-2 cursor-pointer text-xs font-medium text-gray-foreground overflow-hidden border-b-[0.5px]`}
                        onClick={() => {
                            if (contentEditableRef.current) {
                                contentEditableRef.current.textContent = item;
                                setUserMessage(item);
                                setHasContent(true);
                            }
                            handleSendMessage();
                        }}
                    >
                        <p className="text-xs group-hover:translate-x-1 longest-transition">
                            <span className="text-gray-foreground">{matchingPart}</span>
                            <span>{remainingPart}</span>
                        </p>
                        <IoArrowForwardOutline className="w-4 h-4 text-gray-foreground -rotate-45 absolute -top-6 -right-6 group-hover:top-2 group-hover:right-2 longest-transition" />
                    </div>
                );
            })}
        </div>
    );
};

export default SuggestedSearches;
