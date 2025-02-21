// components/VoiceTextEditor.tsx
import React, { useEffect } from 'react';
import useVoiceTextEditor from '@/hooks/useVoiceTextEditor';
import { PiWaveformBold } from "react-icons/pi";
import { formatDocumentText } from '@/utils/formattingUtils';

interface VoiceTextEditorProps {
    initialText?: string;
    title?: string;
    onSave?: (text: string) => void;
}

const VoiceTextEditor: React.FC<VoiceTextEditorProps> = ({ initialText = "", title, onSave }) => {
  const {
    currentText,
    highlightedParts,
    contentRef,
    isVoiceMode,
    toggleVoiceMode,
    handleNotesInput,
    setCurrentText,
  } = useVoiceTextEditor(initialText);

  // Use initialText to set the initial value for the editor.
  useEffect(() => {
    setCurrentText(initialText);
  }, [initialText, setCurrentText]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerText = initialText;
    }
  }, [initialText, setCurrentText, contentRef]);

  return (
    <div className="gap-2 relative w-full">
        <div className="flex items-center justify-between">
            <h3 className='text-base font-medium text-gray-foreground mb-2'>{title ?? "Untitled report"}</h3>

        {/* Voice Mode Button */}
      <div
        className={`p-2 flex justify-center items-center rounded-lg bg-gray-foreground/10 hover:bg-primary hover:text-secondary cursor-pointer ${
          isVoiceMode ? "text-primary" : ""
        }`}
        onClick={toggleVoiceMode}
      >
        <PiWaveformBold className="w-3 h-3" />
      </div>
      </div>
      {/* ContentEditable Div */}
      <div
        contentEditable="true"
        className="w-full outline-none bg-transparent text-xs p-4 border rounded-lg"
        ref={contentRef}
        onInput={handleNotesInput}
        onBlur={(e) => {
          const plainText = e.currentTarget.innerText.trim(); // Trim to remove excessive whitespace
          onSave?.(plainText);
        }}
        suppressContentEditableWarning={true}
      >
                {/* Render highlighted or current text */}
                {highlightedParts.length > 0
    ? highlightedParts.map((part) => (
        <span
          key={part.key}
          className={
            part.type === 'added'
              ? 'added-text'
              : part.type === 'removed'
              ? 'removed-text'
              : ''
          }
        >
          {part.text}
        </span>
      ))
    : currentText}
      </div>
    </div>
  );
};

export default VoiceTextEditor;
