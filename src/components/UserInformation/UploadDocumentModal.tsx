import Button from '../Button';
import Modal from '../modal/Modal';
import UploadDocument from './UploadDocument';

const UploadDocumentModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <section className="w-full p-8">
        <UploadDocument />
        <div className="flex items-center gap-4 justify-center mt-4">
          <Button name="Save" />
          <Button bg="transparent" textColor="black" name="Cancel" />
        </div>
      </section>
    </Modal>
  );
};
export default UploadDocumentModal;
