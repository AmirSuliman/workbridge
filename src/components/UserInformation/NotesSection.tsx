'use client';
import {
  closeModals,
  deleteNote,
  fetchNotes,
  resetCrudStatus,
  setSelectedNote,
  updateNote,
  updateNoteFields,
} from '@/store/slices/noteSlice';
import { useAppDispatch, useAppSelector } from '@/store/storeWrapper';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { FiPlusCircle } from 'react-icons/fi';
import Button from '../Button';
import ScreenLoader from '../common/ScreenLoader';
import Modal from '../modal/Modal';
import CreateNote from './CreateNote';
import FormHeading from './FormHeading';
import imageLoader from '../../../imageLoader';
import { useParams } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

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

const NotesSection = ({ employeeId }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteNoteModal, setDeleteNoteModal] = useState<boolean>(false);
  const [createNoteModal, setCreateNoteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { empId } = useParams();
  const user = useSelector((state: RootState) => state.myInfo);
  const role = user?.user?.role;

  const dispatch = useAppDispatch();
  const { notes, fetchStatus, crudStatus, error, selectedNote, updatedNote } =
    useAppSelector((state) => state.notes);

  useEffect(() => {
    if (employeeId) {
      dispatch(fetchNotes({ id: employeeId }));
    }
  }, [dispatch, employeeId]);

  const handleEditClick = (note: Note) => {
    setShowModal(true);
    dispatch(setSelectedNote(note));
  };

  const handleDeleteClick = useCallback(async () => {
    if (deleteId) {
      await dispatch(deleteNote(deleteId));
      dispatch(resetCrudStatus());
      setDeleteNoteModal(false);
      toast.success('Note deleted successfully!');
    }
  }, [deleteId, dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(
      updateNoteFields({ field: name as keyof typeof updatedNote, value })
    );
  };

  const handleSaveNote = async () => {
    if (!selectedNote) return;

    const putResponse = await dispatch(
      updateNote({
        id: selectedNote.id,
        payload: {
          ...updatedNote,
          employeeId: selectedNote.employeeId,
        },
      })
    );
    console.log('put res: ', putResponse);
    dispatch(closeModals());
    toast.success('Note updated successfully!');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNote(null);
  };

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';

  if (error) {
    return <div className='text-red-500'>Error: {error}</div>;
  }

  return (
    <div className='p-1 rounded-md w-full h-full'>
      <div className='p-3 md:p-6 rounded-[10px] border-gray-border border-b border-[1px] bg-white mb-5'>
        <div className='mb-6 flex justify-between flex-wrap gap-4'>
          <FormHeading
            icon={
              <Image src='/document.svg' alt='img' width={13} height={13} />
            }
            text='Notes'
          />
          {isUserPanel && empId ? (
            ''
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setCreateNoteModal(true);
              }}
              icon={<FiPlusCircle />}
              name='Create'
              className='flex-row-reverse'
            />
          )}
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white rounded-lg'>
            <thead className='w-full'>
              <tr className='border-b text-[14px] w-full'>
                <th className='py-4 px-4 text-left font-medium text-gray-600'>
                  Note Title
                </th>
                <th className='py-4 px-4 text-left font-medium text-gray-600'>
                  Note
                </th>
                <th className='py-4 px-4 text-left font-medium text-gray-600'>
                  Date Created
                </th>
                <th className='py-4 px-4 text-left font-medium text-gray-600'></th>
              </tr>
            </thead>
            {fetchStatus === 'loading' ? (
              <tbody className='w-full'>
                <tr className='w-full'>
                  <td colSpan={4}>
                    <ScreenLoader />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className='w-full'>
                {notes.map((note) => (
                  <tr
                    key={note.id}
                    className='hover:bg-gray-50 text-[14px] w-full'
                  >
                    <td className='py-4 px-4 align-middle'>{note.title}</td>
                    <td className='py-4 px-4 align-middle'>
                      <TruncatedText text={note.note} />
                    </td>
                    <td className='py-4 px-4 align-middle'>
                      {new Date(note.createdAt).toLocaleDateString()}
                    </td>
                    <td className='py-4 px-4 align-middle'>
                      {isUserPanel && empId ? (
                        ''
                      ) : (
                        <div className='flex space-x-2'>
                          <button
                            type='button'
                            className='text-black'
                            onClick={(e) => {
                              e.preventDefault();
                              handleEditClick(note);
                            }}
                          >
                            <Image
                              src='/edit.svg'
                              alt='img'
                              width={10}
                              height={10}
                            />
                          </button>
                          <button
                            type='button'
                            className='text-black'
                            onClick={(e) => {
                              e.preventDefault();
                              setDeleteId(note.id);
                              setDeleteNoteModal(true);
                            }}
                          >
                            <Image
                              src='/delete.svg'
                              alt='img'
                              width={10}
                              height={10}
                            />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {showModal && selectedNote && (
        <Modal onClose={handleCloseModal}>
          <div className='p-8 w-full sm:w-[600px]'>
            <h2 className='text-2xl font-semibold mb-4'>Edit Note</h2>
            <div className='mb-4 mt-8'>
              <label className='block mb-2 text-gray-400 text-[14px]'>
                Title:
              </label>
              <input
                type='text'
                name='title'
                value={updatedNote.title}
                onChange={handleInputChange}
                className='w-full p-3 text-[14px] border border-gray-300 rounded focus:outline-none'
              />
            </div>
            <div className='mb-4'>
              <label className='block mb-2 text-gray-400 text-[14px]'>
                Note:
              </label>
              <textarea
                name='note'
                value={updatedNote.note}
                onChange={handleInputChange}
                className='w-full p-2 text-[14px] border border-gray-300 rounded resize-none focus:outline-none'
                rows={4}
              />
            </div>
            <div className='flex flex-row items-center gap-4 w-full px-8 mt-24'>
              <button
                type='button'
                className='bg-black w-full text-white px-4 py-3 rounded flex items-center justify-center'
                onClick={handleSaveNote}
                disabled={crudStatus === 'loading'}
              >
                {crudStatus === 'loading' ? (
                  <BiLoaderCircle className='h-5 w-5 duration-100 animate-spin' />
                ) : (
                  'Save'
                )}
              </button>
              <button
                type='button'
                className='border w-full text-black px-4 py-3 rounded'
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
      {createNoteModal && (
        <CreateNote
          employeeId={employeeId}
          onClose={() => {
            setCreateNoteModal(false);
          }}
        />
      )}

      {deleteNoteModal && (
        <Modal
          onClose={() => {
            // e.preventDefault();
            setDeleteNoteModal(false);
          }}
        >
          <section className='p-8 min-h-80 flex flex-col'>
            <h1 className='font-semibold text-xl my-4'>Delete</h1>
            <p className='text-lg text-center'>
              Are you sure you want to delete this item?
            </p>
            <p className='font-semibold text-base text-center mb-auto'>
              This action is irreversible.
            </p>
            <div className='flex items-center gap-4 justify-center mt-4 mb-0'>
              <Button
                disabled={crudStatus == 'loading'}
                onClick={handleDeleteClick}
                name={crudStatus == 'loading' ? '' : 'Confirm'}
                icon={
                  crudStatus == 'loading' && (
                    <BiLoaderCircle className='h-5 w-5 duration-100 animate-spin' />
                  )
                }
                className='disabled:cursor-not-allowed'
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteNoteModal(false);
                }}
                bg='transparent'
                textColor='black'
                name='Cancel'
              />
            </div>
          </section>
        </Modal>
      )}
    </div>
  );
};

export default NotesSection;
