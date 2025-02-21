// components/SharedNotes.tsx

import React, { useState, useEffect } from 'react';
import { getSharedNotes, createSharedNote } from '@/app/api/jobs/route';
import { SharedNote } from '@/types/richTypes';
interface SharedNotesProps {
    objectType: 'job' | 'resume' | 'document';
    objectId: string;
}

const SharedNotes: React.FC<SharedNotesProps> = ({ objectType, objectId }) => {
    const [sharedNotes, setSharedNotes] = useState<SharedNote[]>([]);
    const [userNote, setUserNote] = useState('');
    const [showNoteInput, setShowNoteInput] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSharedNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [objectType, objectId]);

    const fetchSharedNotes = async () => {
        try {
            const notes = await getSharedNotes(objectType, objectId);
            setSharedNotes(notes);
        } catch (error) {
            console.error('Error fetching shared notes:', error);
        }
    };

    const handleShareNoteClick = () => {
        setShowNoteInput(true);
    };

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserNote(e.target.value);
        if (error && e.target.value.length >= 140) {
            setError('');
        }
    };

    const handleNoteSubmit = async () => {
        if (userNote.length < 140) {
            setError('Note must be at least 140 characters.');
            return;
        }

        const noteData: Partial<SharedNote> = {
            object: objectType,
            notes: userNote,
        };

        // Set the appropriate object ID
        if (objectType === 'job') {
            noteData.job = objectId;
        } else if (objectType === 'resume') {
            noteData.candidate = objectId;
        } else if (objectType === 'document') {
            noteData.pulse = objectId;
        }

        try {
            await createSharedNote(noteData);
            setUserNote('');
            setShowNoteInput(false);
            fetchSharedNotes();
        } catch (error) {
            console.error('Error creating shared note:', error);
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Shared Notes</h2>
            <div className="space-y-4">
                {sharedNotes.length > 0 ? (
                    sharedNotes.map((note) => (
                        <div key={note.id} className="p-4 bg-gray-100 rounded-lg">
                            <p className="text-gray-800">{note.notes}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                <strong>By:</strong> {note.user.first_name} {note.user.last_name}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No shared notes yet.</p>
                )}
            </div>
            {!showNoteInput && (
                <button
                    onClick={handleShareNoteClick}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Share Your Notes
                </button>
            )}
            {showNoteInput && (
                <div className="mt-6">
                    <textarea
                        value={userNote}
                        onChange={handleNoteChange}
                        placeholder="Write your note (minimum 140 characters)"
                        rows={5}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <div className="flex items-center mt-4">
                        <button
                            onClick={handleNoteSubmit}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => setShowNoteInput(false)}
                            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SharedNotes;
