import React, { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import NotesForm from './components/NotesForm';
import './App.css';

// Типизация для заметки
export interface Note {
  id: number;
  content: string;
}

const API_URL = 'http://localhost:7070/notes';

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  // Функция для загрузки заметок (GET)
  const loadNotes = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Ошибка сети');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Ошибка при загрузке заметок:', error);
    }
  };

  // Загружаем заметки при первом рендере (componentDidMount)
  useEffect(() => {
    loadNotes();
  }, []);

  // Функция для добавления заметки (POST)
  const handleAddNote = async (content: string) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 0, content }),
      });
      // Обновляем список после успешного добавления
      loadNotes();
    } catch (error) {
      console.error('Ошибка при добавлении заметки:', error);
    }
  };

  // Функция для удаления заметки (DELETE)
  const handleDeleteNote = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      // Обновляем список после успешного удаления
      loadNotes();
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
    }
  };

  return (
    <div className="crud-container">
      <div className="header">
        <h2>Notes</h2>
        <button className="refresh-btn" onClick={loadNotes} title="Обновить">
          🔄
        </button>
      </div>

      <NotesList notes={notes} onDelete={handleDeleteNote} />
      <NotesForm onAdd={handleAddNote} />
    </div>
  );
}