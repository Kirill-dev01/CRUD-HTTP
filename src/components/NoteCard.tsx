import React from 'react';
import { Note } from '../App';

interface NoteCardProps {
    note: Note;
    onDelete: (id: number) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
    return (
        <div className="note-card">
            <p className="note-content">{note.content}</p>
            {/* При клике передаем id заметки наверх */}
            <button className="btn-delete" onClick={() => onDelete(note.id)}>
                ✖
            </button>
        </div>
    );
}