// JobView.tsx

import { ContentItem, Job } from "@/types/types";
import React, { useCallback } from "react";

// Determine the rendering mode
type ModeType = "edit" | "published";

interface JobViewProps {
    // The job data to display
    job: Job;

    // Whether we are in editing mode (Job Editor) or published mode
    mode: ModeType;

    // Called when text fields (role, description, etc.) are edited
    onFieldChange?: (field: keyof Job, newValue: string) => void;

    // Called when array items (e.g. responsibilities) are edited
    onItemChange?: (section: keyof Job, index: number, newValue: string) => void;

    // Called when user requests to add a new item in a section (e.g. "responsibilities")
    onAddItem?: (section: keyof Job) => void;

    // Called when user requests to remove an item by index (from "benefits", "requirements", etc.)
    onRemoveItem?: (section: keyof Job, index: number) => void;
}

/**
 * A unified job view that can display a job in either "edit" or "published" mode:
 *  - When mode = "edit", fields become contentEditable (the parent receives onFieldChange & onItemChange callbacks)
 *  - When mode = "published", fields are read-only plain text
 * 
 * This is only the visual structure. 
 * You can place your logic for saving, toggling, publishing, or advanced AI calls in the parent.
 */
const JobView: React.FC<JobViewProps> = ({
    job,
    mode,
    onFieldChange,
    onItemChange,
    onAddItem,
    onRemoveItem,
}) => {
    // Helper to determine if we are in edit mode
    const isEdit = mode === "edit";

    // For a simple text field like "role" or "description"
    const handleFieldBlur = useCallback(
        (field: keyof Job, e: React.FocusEvent<HTMLDivElement>) => {
            const newValue = e.currentTarget.innerText.trim();
            onFieldChange?.(field, newValue);
        },
        [onFieldChange]
    );

    // For arrays like responsibilities, requirements, etc.
    const handleItemBlur = useCallback(
        (
            section: keyof Job,
            index: number,
            e: React.FocusEvent<HTMLDivElement>
        ) => {
            const newValue = e.currentTarget.innerText.trim();
            onItemChange?.(section, index, newValue);
        },
        [onItemChange]
    );

    /**
     * Renders a list of items (like responsibilities) in two modes:
     *  - Edit mode: each line is contentEditable, with a remove button
     *  - Published mode: read-only bullet list
     */
    const renderItemList = (sectionKey: keyof Job, title: string) => {
        const items = job[sectionKey] as ContentItem[] | undefined;
        if (!items || items.length === 0) return null;

        return (
            <div className="flex flex-col gap-2 my-4">
                <h3 className="font-semibold text-xl mb-1">{title}</h3>
                {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 group">
                        {/* bullet or dash */}
                        <div className="w-1 h-1 rounded-full bg-black mt-3" />

                        {isEdit ? (
                            <div
                                className="flex-1"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleItemBlur(sectionKey, index, e)}
                            >
                                {item.name}
                            </div>
                        ) : (
                            <span className="flex-1">{item.name}</span>
                        )}

                        {isEdit && onRemoveItem && (
                            <button
                                className="opacity-0 group-hover:opacity-100 transition ml-2 text-sm bg-transparent hover:text-red-500"
                                onClick={() => onRemoveItem(sectionKey, index)}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}

                {isEdit && onAddItem && (
                    <button
                        className="text-primary text-base mt-2"
                        onClick={() => onAddItem(sectionKey)}
                    >
                        + Add new
                    </button>
                )}
            </div>
        );
    };

    // Renders a tag-like array (like Tools, Skills, or Languages)
    const renderTags = (sectionKey: keyof Job, label: string) => {
        const items = job[sectionKey] as ContentItem[] | undefined;
        if (!items || items.length === 0) return null;

        return (
            <div className="flex flex-col gap-2 my-3">
                <h4 className="text-lg font-medium">{label}</h4>
                <div className="flex flex-wrap gap-2">
                    {items.map((item, index) => (
                        <div key={index} className="group relative">
                            {isEdit ? (
                                <div className="inline-block bg-gray-200 px-2 py-1 rounded-full">
                                    <div
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleItemBlur(sectionKey, index, e)}
                                    >
                                        {item.name}
                                    </div>
                                </div>
                            ) : (
                                <div className="inline-block bg-gray-100 px-2 py-1 rounded-full">
                                    {item.name}
                                </div>
                            )}

                            {isEdit && onRemoveItem && (
                                <button
                                    onClick={() => onRemoveItem(sectionKey, index)}
                                    className="opacity-0 group-hover:opacity-100 absolute -top-2 -right-2 bg-white rounded-full w-5 h-5 text-sm font-bold text-gray-600 flex items-center justify-center shadow"
                                >
                                    x
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                {isEdit && onAddItem && (
                    <button
                        className="text-primary text-base mt-1"
                        onClick={() => onAddItem(sectionKey)}
                    >
                        + Add {label.toLowerCase()}
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Job Role or Title */}
            <div>
                {isEdit ? (
                    <div
                        className="text-4xl font-bold focus:outline-none"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleFieldBlur("role", e)}
                    >
                        {job.role}
                    </div>
                ) : (
                    <h1 className="text-4xl font-bold">{job.role}</h1>
                )}
            </div>

            {/* Job Description */}
            <div>
                {isEdit ? (
                    <div
                        className="text-lg focus:outline-none"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleFieldBlur("description", e)}
                    >
                        {job.description}
                    </div>
                ) : (
                    <p className="text-lg">{job.description}</p>
                )}
            </div>

            {/* Some small details: contract_type, location, salary range, business */}
            <div className="flex flex-col gap-2">
                {/* Contract type */}
                <div className="flex items-center gap-2">
                    <span className="font-medium">Contract:</span>
                    {isEdit ? (
                        <div
                            className="focus:outline-none border-b border-dotted border-gray-400"
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => handleFieldBlur("contract_type", e)}
                        >
                            {job.contract_type || ""}
                        </div>
                    ) : (
                        <span>{job.contract_type || ""}</span>
                    )}
                </div>

                {/* Location */}
                <div className="flex items-center gap-2">
                    <span className="font-medium">Location:</span>
                    {isEdit ? (
                        <div
                            className="focus:outline-none border-b border-dotted border-gray-400"
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => handleFieldBlur("location", e)}
                        >
                            {job.location || ""}
                        </div>
                    ) : (
                        <span>{job.location || ""}</span>
                    )}
                </div>

                {/* Salary */}
                <div className="flex items-center gap-2">
                    <span className="font-medium">Compensation:</span>
                    {isEdit ? (
                        <>
                            <div
                                className="focus:outline-none border-b border-dotted border-gray-400"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleFieldBlur("minimum_salary", e)}
                                style={{ minWidth: 30 }}
                            >
                                {job.minimum_salary || ""}
                            </div>
                            <span>-</span>
                            <div
                                className="focus:outline-none border-b border-dotted border-gray-400"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleFieldBlur("maximum_salary", e)}
                                style={{ minWidth: 30 }}
                            >
                                {job.maximum_salary || ""}
                            </div>
                            <span>
                                ({job.currency || ""})
                            </span>
                        </>
                    ) : job.maximum_salary ? (
                        <span>
                            {job.minimum_salary} - {job.maximum_salary} ({job.currency})
                        </span>
                    ) : null}
                </div>

                {/* Business / Team */}
                {job.business && (
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Team:</span>
                        {isEdit ? (
                            <div
                                className="focus:outline-none border-b border-dotted border-gray-400"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleFieldBlur("business", e)}
                            >
                                {job.business}
                            </div>
                        ) : (
                            <span>{job.business}</span>
                        )}
                    </div>
                )}
            </div>

            {/* Link / URL to external page */}
            {job.link_url && (
                <div className="flex items-center gap-2">
                    <span className="font-medium">External Link:</span>
                    {isEdit ? (
                        <div
                            className="focus:outline-none border-b border-dotted border-gray-400"
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => handleFieldBlur("link_url", e)}
                        >
                            {job.link_url}
                        </div>
                    ) : (
                        <a
                            href={job.link_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            {job.link_url}
                        </a>
                    )}
                </div>
            )}

            {/* Responsibilities */}
            {renderItemList("responsibilities", "Responsibilities")}

            {/* Requirements */}
            {renderItemList("requirements", "Qualifications")}

            {/* Benefits */}
            {renderItemList("benefits", "Benefits & Conditions")}

            {/* Tag-like arrays: Skills, Tools, Languages */}
            {renderTags("skills", "Skills")}
            {renderTags("tools", "Tools")}
            {renderTags("languages", "Languages")}

            {/* Example for custom sections if you have them */}
            {job.sections && job.sections.length > 0 && (
                <div className="mt-6">
                    {job.sections.map((section, sectionIdx) => (
                        <div key={section.id || sectionIdx} className="my-6">
                            <h3 className="text-xl font-semibold mb-2">
                                {section.name ?? `Section ${sectionIdx + 1}`}
                            </h3>
                            {section.item?.map((itm, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className="flex items-start gap-2 group"
                                >
                                    <div className="w-1 h-1 rounded-full bg-black mt-3" />
                                    {isEdit ? (
                                        <div
                                            className="flex-1"
                                            contentEditable
                                            suppressContentEditableWarning
                                            onBlur={(e) =>
                                                onItemChange?.(
                                                    "sections",
                                                    itemIndex,
                                                    e.currentTarget.innerText.trim()
                                                )
                                            }
                                        >
                                            {itm.name}
                                        </div>
                                    ) : (
                                        <div className="flex-1">{itm.name}</div>
                                    )}
                                    {isEdit && onRemoveItem && (
                                        <button
                                            className="opacity-0 group-hover:opacity-100 text-sm mx-2 hover:text-red-500"
                                            onClick={() => onRemoveItem("sections", itemIndex)}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                            {isEdit && onAddItem && (
                                <button
                                    className="text-primary text-base mt-2"
                                    onClick={() => onAddItem("sections")}
                                >
                                    + Add new
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobView;
