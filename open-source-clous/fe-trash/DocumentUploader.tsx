import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useDocumentHandler, FileItem } from '@/hooks/useFileHandler';
import { IoClose } from 'react-icons/io5';
import { FaGoogle } from 'react-icons/fa';
import { LuUpload } from 'react-icons/lu';

interface DocumentUploaderProps {
    onFilesSelected: (files: FileItem[]) => void;
    onClose?: () => void;
    maxFiles?: number;
    accept?: string | Record<string, string[]>;
    multiple?: boolean;
    parseContent?: boolean;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
    onFilesSelected,
    onClose,
    maxFiles = 5,
    accept = '.pdf,.doc,.docx,.txt,.csv,.xlsx',
    multiple = true,
    parseContent = true,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        files,
        isUploading,
        error,
        handleChange,
        handleGoogleDrivePicker,
        removeFile
    } = useDocumentHandler({
        maxFiles,
        accept,
        multiple,
        parseContent,
        onUpload: (uploadedFiles) => {
            const fileArray = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
            onFilesSelected(fileArray);
        }
    });

    const handleLocalUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Upload Documents</h3>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-gray-foreground hover:text-primary"
                    >
                        <IoClose className="w-5 h-5" />
                    </button>
                )}
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Local Upload Button */}
                    <Button
                        variant="secondary"
                        className="flex items-center justify-center gap-2 p-4 h-auto border-dashed"
                        onClick={handleLocalUploadClick}
                        disabled={isUploading}
                    >
                        <LuUpload className="w-5 h-5" />
                        <div className="flex flex-col items-center">
                            <span className="font-medium">Upload from Computer</span>
                            <span className="text-xs text-gray-foreground">PDF, Word, Excel, CSV, TXT</span>
                        </div>
                    </Button>

                    {/* Google Drive Button */}
                    <Button
                        variant="secondary"
                        className="flex items-center justify-center gap-2 p-4 h-auto border-dashed"
                        onClick={handleGoogleDrivePicker}
                        disabled={isUploading}
                    >
                        <FaGoogle className="w-5 h-5" />
                        <div className="flex flex-col items-center">
                            <span className="font-medium">Upload from Google Drive</span>
                            <span className="text-xs text-gray-foreground">Select files from your Drive</span>
                        </div>
                    </Button>
                </div>

                {/* Hidden file input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChange}
                    accept={typeof accept === 'string' ? accept : Object.keys(accept).join(',')}
                    multiple={multiple}
                    className="hidden"
                />

                {/* Error message */}
                {error && (
                    <div className="text-red-500 text-sm mt-2">
                        {error}
                    </div>
                )}

                {/* Loading indicator */}
                {isUploading && (
                    <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-2 text-sm text-gray-foreground">Processing files...</p>
                    </div>
                )}

                {/* File list */}
                {files.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Selected Files</h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex items-center justify-between p-2 bg-gray-50 border rounded-lg"
                                >
                                    <div className="flex items-center space-x-2 overflow-hidden">
                                        <div className="flex-shrink-0">
                                            {file.uploading ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                            ) : (
                                                <div className="w-4 h-4 bg-primary/10 rounded-sm flex items-center justify-center">
                                                    <span className="text-[8px] text-primary font-bold uppercase">{file.type}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="truncate">
                                            <p className="text-sm truncate">{file.name}</p>
                                            <p className="text-xs text-gray-foreground">
                                                {(file.size / 1024).toFixed(1)} KB • {file.type.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="text-gray-foreground hover:text-primary focus:outline-none transition duration-150 ml-2"
                                        title="Remove file"
                                        disabled={file.uploading}
                                    >
                                        <IoClose className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                    {onClose && (
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            disabled={isUploading}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        variant="default"
                        onClick={() => onFilesSelected(files)}
                        disabled={isUploading || files.length === 0}
                    >
                        {files.length > 0 ? `Use ${files.length} file${files.length > 1 ? 's' : ''}` : 'Continue'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DocumentUploader; 