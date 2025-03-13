import { MdOutlineFileUpload } from 'react-icons/md';
import { Label } from './Helpers';

const ProfilePicture = ({ previewUrl, handleFileChange, errors }) => {
  return (
    <div>
      <Label text="Profile Picture" />
      {!previewUrl ? ( // Render upload input if no preview is available
        <article className="w-fit p-10 rounded-md border-2 border-dashed hover:bg-slate-200 cursor-pointer">
          <label
            htmlFor="profilePicture"
            className="flex items-center justify-center gap-x-2 cursor-pointer"
          >
            <span>Upload a profile picture</span>
            <MdOutlineFileUpload />
          </label>
          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            className="hidden"
            name="profilePictureUrl"
            onChange={handleFileChange}
          />
        </article>
      ) : (
        <div className="mt-4">
          <img
            width={300}
            height={150}
            src={previewUrl}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full border"
          />
        </div>
      )}
      {errors.profilePictureUrl && (
        <span className="text-red-500">{errors.profilePictureUrl.message}</span>
      )}
      <p className="text-sm py-8 text-[#abaeb4]">
        Make sure profile image is a valid image format
      </p>
    </div>
  );
};
export default ProfilePicture;
