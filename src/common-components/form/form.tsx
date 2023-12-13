'use client'
import {
  FieldErrorsImpl,
  UseFormRegister,
  FieldValues,
  RegisterOptions,
  UseFormGetValues,
} from 'react-hook-form';
import { ExpTextInput } from './text-input';
import { ExpRadioGroup } from './radio-input';
import { ExpEmailInput } from './email-input';
import { ExpCheckBoxInput } from './checkbox-input';
import { ExpDropDownInput } from './dropdown-input';
import { ExpPasswordInput } from './password-input';
import { ExpTextAreaInput } from './textarea-input';

export type fieldData = {
  field: string;
  requisite: {
    name: string;
    labelValue: string;
    placeholder?: string | undefined;
    value?: string;
    className?: string | undefined;
    onFieldChange?: any;
    options?: Array<{
      label: string;
      value: string;
      isSelected?: boolean;
      checked?: boolean;
    }>;

    validation?: RegisterOptions;
  };
};

export type FormProp = {
  [x: string]: any;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrorsImpl<{
    [x: string]: any;
  }>;
  fields: fieldData[];
  geValue?: UseFormGetValues<FieldValues>;
};

export const Form = (props: FormProp) => {
  const { fields, errors, getValue, register } = props;

  const getField = ({ field, requisite }: fieldData, key: number) => {
    if (field === 'multiline') {
      field = 'textarea';
    }

    switch (field) {
      case 'text':
        return (
          <ExpTextInput
            name={requisite.name}
            onFieldChange={requisite?.onFieldChange}
            placeholder={requisite.placeholder}
            labelValue={requisite.labelValue}
            className={requisite?.className}
            error={errors}
            validation={requisite.validation}
            register={register}
            _key={key}
          />
        );
      case 'password':
        return (
          <ExpPasswordInput
            name={requisite.name}
            placeholder={requisite.placeholder}
            labelValue={requisite.labelValue}
            className={requisite?.className}
            error={errors}
            validation={requisite.validation}
            register={register}
            _key={key}
            type={field}
          />
        );
      case 're-password':
        return (
          <ExpPasswordInput
            name={requisite.name}
            placeholder={requisite.placeholder}
            labelValue={requisite.labelValue}
            className={requisite?.className}
            error={errors}
            validation={requisite.validation}
            register={register}
            _key={key}
            type={field}
            getValue={getValue}
          />
        );
      case 'checkbox':
        return (
          <ExpCheckBoxInput
            name={requisite.name}
            labelValue={requisite.labelValue}
            className={requisite?.className}
            checked={false}
            error={errors}
            register={register}
            validation={requisite.validation}
            _key={key}
          />
        );
      case 'dropdown':
        return (
          <ExpDropDownInput
            name={requisite.name}
            labelValue={requisite.labelValue}
            onFieldChange={requisite?.onFieldChange}
            placeholder={requisite.placeholder}
            className={requisite?.className}
            options={requisite.options}
            error={errors}
            validation={requisite.validation}
            register={register}
            _key={key}
          />
        );
      case 'email':
        return (
          <ExpEmailInput
            name={requisite.name}
            labelValue={requisite.labelValue}
            value={requisite.value}
            onFieldChange={requisite?.onFieldChange}
            className={requisite?.className}
            error={errors}
            placeholder={requisite.placeholder}
            validation={requisite.validation}
            register={register}
            _key={key}
          />
        );
      case 'radio':
        return (
          <ExpRadioGroup
            name={requisite.name}
            labelValue={requisite.labelValue}
            className={requisite?.className}
            value={requisite.value}
            errors={errors}
            validation={requisite.validation}
            register={register}
            radio_fields={requisite.options}
          />
        );
      case 'textarea':
        return (
          <ExpTextAreaInput
            name={requisite.name}
            placeholder={requisite.placeholder}
            labelValue={requisite.labelValue}
            className={requisite?.className}
            error={errors}
            validation={requisite.validation}
            register={register}
            _key={key}
          />
        );
    }
  };

  return (
    <>
      {fields.map((_field: fieldData, _index: number) => {
        return getField(_field, _index);
      })}
    </>
  );
};

export default Form;
