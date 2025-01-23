import { Field, FieldProps, Form, Formik } from 'formik';
import { forwardRef, useImperativeHandle } from 'react';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import { Button } from '@/components/Button';
import FormField from '@/components/FormField/FormField';
import Input, { TextArea } from '@/components/Input';
import { Spinner } from '@/components/Spinner';
import { useModal } from '@/hooks/use-modal';
import api from '@/modules/api/client';
import { DataTypes } from '@/types/data';

import Modal from './Modal';

import RunAction = DataTypes.RunAction;

export type SaveModalFormValues = {
  name: string;
  description: string;
};

const initialValues: SaveModalFormValues = {
  name: '',
  description: '',
};

const validation = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
});

type Props = {
  selectedCompany: number;
  employeeIds: number[];
  action?: RunAction | null;
  upgradedEmployees?: { employeeId: number; percentage: number }[];
  isChartSaveView?: boolean;
};

const SaveViewModal = forwardRef(
  (
    {
      selectedCompany,
      employeeIds,
      action,
      upgradedEmployees,
      isChartSaveView,
    }: Props,
    ref,
  ) => {
    const modal = useModal();
    useImperativeHandle(ref, () => ({
      show() {
        modal.openModal();
      },
      hide() {
        modal.closeModal();
      },
    }));

    const { mutate, isLoading } = useMutation(
      ({ name, description }: SaveModalFormValues) =>
        api('POST /saveView', {
          body: {
            name,
            description,
            companyId: selectedCompany as number,
            employeeIds: employeeIds as number[],
          },
        }),
      {
        onSuccess: () => {
          modal.closeModal();
        },
      },
    );

    const { mutate: saveView, isLoading: isSaving } = useMutation(
      ({ name, description }: SaveModalFormValues) =>
        api('POST /saveView/dCrystal', {
          body: {
            name,
            description,
            companyId: selectedCompany as number,
            employeeIds: employeeIds,
            action,
            ...(action === RunAction.UPGRADE && {
              upgradedEmployees:
                action === RunAction.UPGRADE ? upgradedEmployees : [],
            }),
          },
        }),
      {
        onSuccess: () => {
          modal.closeModal();
        },
      },
    );

    return (
      <Modal
        title="Save View"
        showDialog={modal.showDialog}
        onDismiss={modal.closeModal}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={isChartSaveView ? mutate : saveView}
        >
          <Form>
            <Field name="name">
              {({ field, meta }: FieldProps) => (
                <FormField
                  label="Name"
                  error={meta.error}
                  errorVisible={meta.touched}
                  className="mt-4"
                >
                  <Input {...field} placeholder="Company Name" />
                </FormField>
              )}
            </Field>
            <Field name="description">
              {({ field, meta }: FieldProps) => (
                <FormField
                  label="Description"
                  error={meta.error}
                  errorVisible={meta.touched}
                  className="mt-4"
                >
                  <TextArea {...field} placeholder="Description" />
                </FormField>
              )}
            </Field>
            <div className="flex justify-center mt-40">
              <Button
                type="button"
                onClick={modal.closeModal}
                className="bg-gray-200 text-979599 px-8"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="ml-2 px-8 disabled:bg-purple-300"
                disabled={isLoading || isSaving}
              >
                {isLoading ||
                  (isSaving && <Spinner className="w-5 h-5 mr-2" />)}
                <span>{isLoading || isSaving ? 'Saving...' : 'Save'}</span>
              </Button>
            </div>
          </Form>
        </Formik>
      </Modal>
    );
  },
);

SaveViewModal.displayName = 'SaveViewModal';

export default SaveViewModal;
