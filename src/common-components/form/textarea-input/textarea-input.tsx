import {
  FieldErrorsImpl,
  UseFormRegister,
  RegisterOptions,
  FieldValues,
} from 'react-hook-form';

export type ExpTextAreaInputProps = {
  error: FieldErrorsImpl<{
    [x: string]: any;
  }>;
  defaultValue?: string;
  name: string;
  placeholder?: string;
  className?: string;
  labelValue: string;
  field?: string;
  validation?: RegisterOptions | any;
  register: UseFormRegister<FieldValues>;
  _key: number;
};

const ExpTextAreaInput = (props: ExpTextAreaInputProps) => {
  const {
    error,
    defaultValue = '',
    name,
    placeholder,
    className,
    labelValue,
    validation,
    register,
    _key,
  } = props;

  return (
    <div key={_key} className={className ? className : 'form-field'}>
      <label htmlFor={name} className="form-label">
        {labelValue}
        {validation?.required?.value && <span className="required">*</span>}
      </label>

      <textarea
        id="text-area"
        className="form-textarea"
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, Object.assign({}, validation || {}))}
      />

      {error[name] && (
        <span className="form-error-message">{`${error.name?.message}`}</span>
      )}
    </div>
  );
};

export default ExpTextAreaInput;
