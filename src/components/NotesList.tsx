import React from 'react';
import { Note } from '../App';
import NoteCard from './NoteCard';

interface NotesListProps {
    notes: Note[];
    onDelete: (id: number) => void;
}

export default function NotesList({ notes, onDelete }: NotesListProps) {
    return (
        <div className="notes-list">
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} onDelete={onDelete} />
            ))}
        </div>
    );
}