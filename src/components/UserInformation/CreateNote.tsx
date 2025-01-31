'use client';
import { createNote } from '@/store/slices/noteSlice';
import { useAppDispatch, useAppSelector } from '@/store/storeWrapper';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import Modal from '../modal';

const CreateNote = ({ onClose, employeeId }) => {
  const dispatch = useAppDispatch();
  const { crudStatus } = useAppSelector((state) => state.notes);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      employeeId: employeeId,
      title: data.title,
      note: data.note,
    };

    try {
      const resultAction = await dispatch(createNote(payload));

      if (createNote.fulfilled.match(resultAction)) {
        toast.success('Note added successfully!');
        reset(); // Reset form fields
        onClose();
      } else if (createNote.rejected.match(resultAction)) {
        const error = resultAction.payload as { message?: string };
        toast.error(error?.message || 'Failed to create note');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <Modal onClose={() => onClose()}>
      <div className="bg-white rounded-lg p-6 lg:min-w-[600px]">
        <h2 className="text-[22px] font-semibold mb-4">Create Note</h2>

        <label className="block mb-4">
          <span className="form-label">Note Title*</span>
          <input
            type="text"
            className="form-input"
            placeholder="Add Note Title"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && (
            <span className="form-error">
              {errors.title?.message as string}
            </span>
          )}
        </label>
        <label className="block mt-4">
          <span className="form-label">Note</span>
          <textarea
            rows={5}
            className="form-input"
            placeholder="Write a note (optional)"
            {...register('note')}
          ></textarea>
          {errors.note && (
            <span className="form-error">{errors.note?.message as string}</span>
          )}
        </label>

        <div className="flex justify-center items-center flex-row w-full gap-6 p-6 mt-4">
          <button
            onClick={handleSubmit(onSubmit)}
            type="button"
            className="px-4 py-3 flex items-center justify-center rounded bg-[#0F172A] text-white text-sm w-full"
            disabled={crudStatus === 'loading'}
          >
            {crudStatus === 'loading' ? (
              <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
            ) : (
              'Confirm'
            )}
          </button>
          <button
            type="button"
            onClick={() => onClose()}
            className="px-4 py-3 rounded border text-sm w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateNote;
