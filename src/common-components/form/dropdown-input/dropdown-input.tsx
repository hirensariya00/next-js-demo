import {
  FieldErrorsImpl,
  UseFormRegister,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

export type ExpDropDownInputProps = {
  error: FieldErrorsImpl<{
    [x: string]: any;
  }>;
  name: string;
  labelValue: string;
  className?: string;
  onFieldChange?: any;
  placeholder?: string;
  options: any;
  field?: string;
  validation?: RegisterOptions | any;
  register: UseFormRegister<FieldValues>;
  _key: number;
};

const ExpDropDownInput = (props: ExpDropDownInputProps) => {
  const {
    error,
    name,
    options,
    className,
    labelValue,
    onFieldChange,
    placeholder,
    validation,
    register,
    _key,
  } = props;

  return (
    <div key={_key} className={className ? className : 'form-field'}>
      <label className="form-label">
        {labelValue}
        {validation?.required?.value && <span className="required">*</span>}
      </label>

      <select
        className="form-select"
        placeholder={placeholder}
        {...register(name, Object.assign({}, validation || {}))}
        onChange={(e) => onFieldChange && onFieldChange(e, name)}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option_value: any, index: number) => {
          return (
            <option
              id={option_value?.id}
              key={index}
              value={option_value.value}
              label={option_value.label}
              selected={option_value.isSelected}>
              {option_value.label}
            </option>
          );
        })}
      </select>

      {error[name] && (
        <span className="form-error-message">{`${error[name]?.message}`}</span>
      )}
    </div>
  );
};

export default ExpDropDownInput;
