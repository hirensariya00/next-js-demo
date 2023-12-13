import {
  FieldErrorsImpl,
  UseFormRegister,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

export type ExpEmailInputProps = {
  error: FieldErrorsImpl<{
    [x: string]: any;
  }>;
  defaultValue?: string;
  name: string;
  placeholder?: string;
  labelValue: string;
  className?: string;
  field?: string;
  validation?: RegisterOptions | any;
  register: UseFormRegister<FieldValues>;
  _key: number;
  value?: string;
  onFieldChange?: any;
};

const ExpEmailInput = (props: ExpEmailInputProps) => {
  const {
    error,
    defaultValue = '',
    name,
    placeholder,
    labelValue,
    className,
    field = 'email',
    validation,
    register,
    _key,
    value,
    onFieldChange,
  } = props;

  //regExp for Email validation
  const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const defaultValidation = {
    required: {
      value: true,
      message: `${labelValue} is required`,
    },
    pattern: {
      value: new RegExp(emailRegexp),
      message: 'Enter valid mail-id',
    },
  };

  return (
    <div key={_key} className={className ? className : 'form-field'}>
      {labelValue && (
        <label htmlFor={name} className="form-label">
          {labelValue}
          {validation?.required?.value && <span className="required">*</span>}
        </label>
      )}

      <input
        className="form-input"
        type={field}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        {...register(name, Object.assign({}, validation || defaultValidation))}
        onChange={(e: any) => onFieldChange && onFieldChange(e.target.value)}
      />
      {error[name] && (
        <span className="form-error-message">{`${error[name]?.message}`}</span>
      )}
    </div>
  );
};

export default ExpEmailInput;
