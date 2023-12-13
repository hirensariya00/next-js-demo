import {
  FieldErrorsImpl,
  UseFormRegister,
  RegisterOptions,
  FieldValues,
} from 'react-hook-form';

export type ExpRadioInputProps = {
  error: FieldErrorsImpl<{
    [x: string]: any;
  }>;
  name: string;
  label: string;
  checked?: boolean;
  value: string;
  field?: string;
  validation?: RegisterOptions;
  register: UseFormRegister<FieldValues>;
  _key: number;
  onChange?: any;
};

export const ExpRadioInput = (props: ExpRadioInputProps) => {
  const {
    checked,
    value,
    name,
    label,
    field = 'radio',
    validation,
    register,
    _key,
  } = props;

  return (
    <div key={_key}>
      <input
        className="form-radio"
        type={field}
        value={value}
        {...register(name, Object.assign({}, validation || {}))}
        id={_key.toString()}
        defaultChecked={checked}
      />

      <label htmlFor={_key.toString()} className="form-label">
        {label}
      </label>
    </div>
  );
};

export default ExpRadioInput;
