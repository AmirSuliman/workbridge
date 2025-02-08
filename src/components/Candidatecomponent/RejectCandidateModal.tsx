import { useForm } from 'react-hook-form';
import Button from '../Button';

const RejectCandidateModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="w-full max-w-[600px] bg-white p-6 rounded-lg">
      <h1 className="font-semibold text-[22px]">Reject Candidate</h1>

      {/* Time-Off Request Details */}
      <div className="grid grid-cols-2 gap-8 mt-8">
        <label className="w-full">
          <span className="mb-2 text-gray-400 text-[12px]">Rate Candidate</span>
          <select
            {...register('ratingScore', {
              required: 'Rating is required.',
              validate: (value) =>
                (value >= 1 && value <= 10) ||
                'Rating must be between 1 and 10.',
            })}
            className="form-input"
          >
            <option value="" disabled>
              Select a rating
            </option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Below Average</option>
            <option value="3">3 - Average</option>
            <option value="4">4 - Fair</option>
            <option value="5">5 - Good</option>
            <option value="6">6 - Satisfactory</option>
            <option value="7">7 - Very Good</option>
            <option value="8">8 - Great</option>
            <option value="9">9 - Excellent</option>
            <option value="10">10 - Outstanding</option>
          </select>
          {errors.ratingScore?.message && (
            <p className="text-red-500 text-sm">
              {String(errors.ratingScore.message)}
            </p>
          )}
        </label>

        <label className="w-full">
          <span className="mb-2 text-gray-400 text-[12px]">Rejection Date</span>
          <input type="date" className="form-input"></input>
        </label>
        <label className="w-full flex flex-col col-span-full">
          <span className="mb-1 text-gray-400 text-[12px]">Reason</span>
          <textarea
            className="w-full p-4 rounded border border-gray-300 text-black resize-none"
            rows={5}
            // value={'No note provided'}
            // readOnly={true}
            placeholder="Write reason of rejection"
          />
        </label>
      </div>

      {/* Note */}

      {/* Action Buttons */}
      <div className="flex flex-row items-center gap-5 w-full mt-24 px-8">
        <Button
          onClick={(e) => {
            e.preventDefault();
          }}
          bg="#F53649"
          textColor="white"
          name="Reject"
          className="!text-base font-medium px-8 w-full"
        />

        <Button
          onClick={onClose}
          bg="transparent"
          textColor="black"
          name="Cancel"
          className="!text-base font-medium px-8 w-full"
        />
      </div>
    </div>
  );
};
export default RejectCandidateModal;
