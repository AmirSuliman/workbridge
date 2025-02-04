'use client';
import axiosInstance from '@/lib/axios';
import { setEmergencyContact } from '@/store/slices/emergencyContactSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { HiMiniHomeModern } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import BasicInfoIcon from '../icons/basic-info-icon';
import AddEmergencyContact from './AddEmergencyContact';
import DeleteEmergencyContactModal from './DeleteEmergencyContactModal';
import FormField from './FormField';
import FormHeading from './FormHeading';

const EmergencySection = ({ employeeData }) => {
  const [addeNew, setAddNew] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editingContactId, setEditingContactId] = useState<number | null>(null);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch<AppDispatch>();
  const {
    contact: emergencyContacts,
    loading,
    error,
  } = useSelector((state: RootState) => state.emergencyContact);

  useEffect(() => {
    const getEmergencyContacts = async () => {
      try {
        const response = await axiosInstance.get(
          `/emergencyContacts/${employeeData.id}`
        );
        dispatch(setEmergencyContact(response.data.data.items));
      } catch (error) {
        console.log(error);
      }
    };
    getEmergencyContacts();
  }, [employeeData, dispatch]);

  // Handle input change for editing
  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: value,
      },
    }));
  };

  // Handle edit submission
  const handleEditSubmit = async (id) => {
    const payload = {
      employeeId: employeeData.id,
      ...formData[id],
    };
    console.log('put payload: ', payload);
    try {
      const response = await axiosInstance.put(
        `/emergencyContact/${id}`,
        payload
      );
      console.log('put res: ', response.data.data);
      const updatedContacts = emergencyContacts.map((contact) =>
        contact.id === id ? response.data.data : contact
      );
      dispatch(setEmergencyContact(updatedContacts));
      toast.success('Emergency contact edited successfully!');
      setEditingContactId(null);
    } catch (error) {
      console.log(error);
      toast.error(
        (error as any).response?.data?.message ||
          'Cannot edit emergency contact'
      );
    }
  };

  return (
    <div className="space-y-4">
      {emergencyContacts?.length > 0 ? (
        emergencyContacts.map((contact) => {
          const isEditing = editingContactId === contact.id;

          return (
            <div
              key={contact.id}
              className="p-4 rounded-md border-[1px] border-gray-border bg-white h-full"
            >
              <div className="flex justify-between gap-4 flex-wrap">
                <FormHeading
                  icon={<BasicInfoIcon classNames="w-4" />}
                  text="Emergency Contact"
                />
                {!isEditing && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setEditingContactId(contact.id);
                      setFormData((prev) => ({
                        ...prev,
                        [contact.id]: { ...contact },
                      }));
                    }}
                    name="Edit"
                    icon={<FaEdit />}
                    className="ml-auto mr-0 text-xs"
                  />
                )}
                {isEditing && (
                  <Button
                    onClick={() => handleEditSubmit(contact.id)}
                    name="Save changes"
                    className="ml-auto mr-0 text-xs"
                  />
                )}
                {!isEditing && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setDeleteModal(true);
                    }}
                    name="Delete"
                    icon={<FaTrash />}
                    className="text-xs"
                  />
                )}
              </div>
              <div className="grid sm:grid-cols-3 gap-4 my-5">
                <FormField
                  label="First Name"
                  value={
                    isEditing
                      ? formData[contact.id]?.firstName
                      : contact.firstName || ''
                  }
                  onChange={(e) => handleInputChange(e, contact.id)}
                  name="firstName"
                  readOnly={!isEditing}
                />
                <FormField
                  label="Middle Name"
                  value={
                    isEditing
                      ? formData[contact.id]?.middleName
                      : contact.middleName || ''
                  }
                  onChange={(e) => handleInputChange(e, contact.id)}
                  name="middleName"
                  readOnly={!isEditing}
                />
                <FormField
                  label="Surname"
                  value={
                    isEditing
                      ? formData[contact.id]?.lastName
                      : contact.lastName || ''
                  }
                  onChange={(e) => handleInputChange(e, contact.id)}
                  name="lastName"
                  readOnly={!isEditing}
                />
                <FormField
                  label="Phone"
                  value={
                    isEditing
                      ? formData[contact.id]?.phone
                      : contact.phone || ''
                  }
                  onChange={(e) => handleInputChange(e, contact.id)}
                  name="phone"
                  readOnly={!isEditing}
                />
                <FormField
                  label="Work Phone"
                  value={
                    isEditing
                      ? formData[contact.id]?.workPhone
                      : contact.workPhone || ''
                  }
                  onChange={(e) => handleInputChange(e, contact.id)}
                  name="workPhone"
                  readOnly={!isEditing}
                />
                <FormField
                  label="Email"
                  value={
                    isEditing
                      ? formData[contact.id]?.email
                      : contact.email || ''
                  }
                  onChange={(e) => handleInputChange(e, contact.id)}
                  name="email"
                  readOnly={!isEditing}
                />
              </div>
              <hr className="text-white" />
              <div className="my-5">
                <FormHeading
                  icon={<HiMiniHomeModern className="w-4" />}
                  text="Address"
                />
                <div className="grid sm:grid-cols-3 gap-4 mt-5">
                  <FormField
                    label="Street 1"
                    value={
                      isEditing
                        ? formData[contact.id]?.street1
                        : contact.location?.street1 || ''
                    }
                    onChange={(e) => handleInputChange(e, contact.id)}
                    name="street1"
                    readOnly={!isEditing}
                  />
                  <FormField
                    label="Street 2"
                    value={
                      isEditing
                        ? formData[contact.id]?.street2
                        : contact.location?.street2 || ''
                    }
                    onChange={(e) => handleInputChange(e, contact.id)}
                    name="street2"
                    readOnly={!isEditing}
                  />
                  <FormField
                    label="Zip"
                    value={
                      isEditing
                        ? formData[contact.id]?.zipCode
                        : contact.location?.zipCode || ''
                    }
                    onChange={(e) => handleInputChange(e, contact.id)}
                    name="zipCode"
                    readOnly={!isEditing}
                  />
                  <FormField
                    label="City"
                    value={
                      isEditing
                        ? formData[contact.id]?.city
                        : contact.location?.city || ''
                    }
                    onChange={(e) => handleInputChange(e, contact.id)}
                    name="city"
                    readOnly={!isEditing}
                  />
                  <FormField
                    label="Country"
                    value={
                      isEditing
                        ? formData[contact.id]?.country
                        : contact.location?.country || ''
                    }
                    onChange={(e) => handleInputChange(e, contact.id)}
                    name="country"
                    readOnly={!isEditing}
                  />
                  <FormField
                    label="State"
                    value={
                      isEditing
                        ? formData[contact.id]?.state
                        : contact.location?.state || ''
                    }
                    onChange={(e) => handleInputChange(e, contact.id)}
                    name="state"
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              {deleteModal && (
                <DeleteEmergencyContactModal
                  onClose={() => setDeleteModal(false)}
                  emergencyContacts={emergencyContacts}
                  id={contact.id}
                />
              )}
            </div>
          );
        })
      ) : (
        <div className="p-4 rounded-md border-[1px] border-gray-border bg-white h-full">
          No emergency contacts found!
        </div>
      )}
      {addeNew && (
        <AddEmergencyContact
          employeeData={employeeData}
          emergencyContacts={emergencyContacts}
        />
      )}
      {!addeNew && !editingContactId && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            setAddNew(true);
          }}
          name={'Add new emergency contact'}
          icon=""
          className="w-full max-w-xl mx-auto col-span-full mt-4"
        />
      )}
    </div>
  );
};

export default EmergencySection;
