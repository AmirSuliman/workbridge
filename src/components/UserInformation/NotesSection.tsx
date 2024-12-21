'use client';
import React, { useEffect, useState } from 'react';
import FormHeading from './FormHeading';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdStickyNote2 } from 'react-icons/md';
import axiosInstance from '@/lib/axios';
import Modal from '../modal/Modal';
import axios from 'axios';
interface Note {
  id: number;
  title: string;
  note: string;
  createdAt: string;
  employeeId: number;
}

interface TruncatedTextProps {
  text: string;
}

const TruncatedText = ({ text = '' }: TruncatedTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <p
      className={`w-[13rem] md:w-[28rem] cursor-pointer ${
        isExpanded
          ? 'whitespace-normal overflow-visible'
          : 'whitespace-nowrap overflow-hidden text-ellipsis'
      }`}
      onClick={toggleText}
    >
      {text}
    </p>
  );
};

const NotesSection = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [updatedNote, setUpdatedNote] = useState({ title: '', note: '' });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axiosInstance.get('/notes');
        setNotes(response.data.data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleEditClick = (note: Note) => {
    setSelectedNote(note);
    setUpdatedNote({ title: note.title, note: note.note });
    setShowModal(true);
  };

  const handleDeleteClick = async (id: number) => {
    try {
      

      await axiosInstance.delete(`/note/${id}`); 

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('AxiosError details:', err.response?.data, err.response?.status);
      } else {
        console.error('Error while deleting note:', err);
      }
      setError(err instanceof Error ? err.message : 'An error occurred while deleting the note');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNote = async () => {
    if (!selectedNote) {
      console.error('No selected note to save.');
      return;
    }

    try {
      const payload = {
        ...updatedNote,
        employeeId: selectedNote.employeeId,
      };

      console.log('Selected note:', selectedNote);
      console.log('Payload being sent:', payload);

      const response = await axiosInstance.put(`/note/${selectedNote.id}`, payload);
      console.log('Update response:', response.data);

      // Update the state with the updated note
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === selectedNote.id ? { ...note, ...payload } : note
        )
      );

      // Close the modal
      setShowModal(false);
      setSelectedNote(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('AxiosError details:', err.response?.data, err.response?.status);
      } else {
        console.error('Error while saving note:', err);
      }
      setError(err instanceof Error ? err.message : 'An error occurred while saving the note');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNote(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-1 rounded-md w-full h-full">
      <div className="p-3 md:p-6 rounded-[10px] border-gray-border border-b border-[1px] bg-white mb-5">
        <div className="mb-6">
          <FormHeading icon={<MdStickyNote2 className="w-4" />} text="Notes" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="border-b text-[14px]">
                <th className="py-4 px-4 text-left font-medium text-gray-600">Note Title</th>
                <th className="py-4 px-4 text-left font-medium text-gray-600">Note</th>
                <th className="py-4 px-4 text-left font-medium text-gray-600">Date Created</th>
                <th className="py-4 px-4 text-left font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr key={note.id} className="hover:bg-gray-50 text-[14px]">
                  <td className="py-4 px-4 align-middle">{note.title}</td>
                  <td className="py-4 px-4 align-middle">
                    <TruncatedText text={note.note} />
                  </td>
                  <td className="py-4 px-4 align-middle">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex space-x-2">
                      <button className="text-black" onClick={() => handleEditClick(note)}>
                        <FaEdit />
                      </button>
                      <button
                        className="text-black"
                        onClick={() => handleDeleteClick(note.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedNote && (
        <Modal onClose={handleCloseModal}>
          <div className="p-8 w-full sm:w-[600px]">
            <h2 className="text-2xl font-semibold mb-4">Edit Note</h2>
            <div className="mb-4 mt-8">
              <label className="block mb-2 text-gray-400 text-[14px]">Title:</label>
              <input
                type="text"
                name="title"
                value={updatedNote.title}
                onChange={handleInputChange}
                className="w-full p-3 text-[14px] border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-400 text-[14px]">Note:</label>
              <textarea
                name="note"
                value={updatedNote.note}
                onChange={handleInputChange}
                className="w-full p-2 text-[14px] border border-gray-300 rounded resize-none focus:outline-none"
                rows={4}
              />
            </div>
            <div className="flex flex-row items-center gap-4 w-full px-8 mt-24">
              <button
                className="bg-black w-full text-white px-4 py-3 rounded"
                onClick={handleSaveNote}
              >
                Save
              </button>
              <button
                className="border w-full text-black px-4 py-3 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NotesSection;
