import {
  FieldErrorsImpl,
  UseFormRegister,
  RegisterOptions,
  FieldValues,
} from 'react-hook-form';
import { ExpRadioInput } from './index';

export type ExpRadioGroupProps = {
  [x: string]: any;
  name: string;
  labelValue: string;
  validation?: RegisterOptions | any;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrorsImpl<{
    [x: string]: any;
  }>;
  radio_fields?: any;
  onCheckBox?: any;
};

const ExpRadioGroup = (props: ExpRadioGroupProps) => {
  const { name, labelValue, radio_fields, errors, validation, register } =
    props;

  return (
    <div className="col col-6 col-sm-12 form-field">
      <label htmlFor={name} className="form-label">
        {labelValue}
        {validation?.required?.value && <span className="required">*</span>}
      </label>

      {radio_fields.map((_field: any, _index: number) => {
        return (
          <ExpRadioInput
            name={name}
            value={_field.value}
            label={_field.label}
            error={errors}
            validation={validation}
            register={register}
            _key={_index}
            checked={_field.isSelected}
          />
        );
      })}

      {errors[name] && (
        <span className="form-error-message">{`${errors[name]?.message}`}</span>
      )}
    </div>
  );
};

export default ExpRadioGroup;
