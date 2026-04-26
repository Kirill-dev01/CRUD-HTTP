import React, { useState } from 'react';

interface NotesFormProps {
    onAdd: (content: string) => void;
}

export default function NotesForm({ onAdd }: NotesFormProps) {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Запрет отправки пустой заметки
        if (!text.trim()) return;

        onAdd(text);
        setText(''); // Очищаем поле после отправки
    };

    return (
        <form className="notes-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="note">New Note</label>
                <textarea
                    id="note"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Введите текст заметки..."
                    rows={3}
                    required
                />
            </div>
            <button type="submit" className="btn-add">➤</button>
        </form>
    );
}