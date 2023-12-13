import {
  FieldErrorsImpl,
  UseFormRegister,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

export type ExpTextInputProps = {
  error: FieldErrorsImpl<{
    [x: string]: any;
  }>;
  defaultValue?: string;
  name: string;
  placeholder?: string;
  labelValue: string;
  className?: string;
  onFieldChange?: any;
  field?: string;
  validation?: RegisterOptions | any;
  register: UseFormRegister<FieldValues>;
  _key: number;
};

const ExpTextInput = (props: ExpTextInputProps) => {
  const {
    error,
    defaultValue = '',
    name,
    placeholder,
    labelValue,
    className,
    onFieldChange,
    field = 'text',
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

      <input
        className="form-input"
        type={field}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...register(name, Object.assign({}, validation || {}))}
        onChange={(e) => onFieldChange && onFieldChange(name, e.target.value)}
      />

      {error[name] && (
        <span className="form-error-message">{`${error[name]?.message}`}</span>
      )}
    </div>
  );
};

export default ExpTextInput;
