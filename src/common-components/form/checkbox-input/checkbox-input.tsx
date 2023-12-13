import {
  FieldErrorsImpl,
  UseFormRegister,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

export type ExpCheckBoxInputProps = {
  error: FieldErrorsImpl<{
    [x: string]: any;
  }>;
  name: string;
  field?: string;
  labelValue: string;
  className?: string;
  checked: boolean;
  validation?: RegisterOptions | any;
  register: UseFormRegister<FieldValues>;
  _key: number;
};

const ExpCheckBoxInput = (props: ExpCheckBoxInputProps) => {
  const {
    error,
    labelValue,
    className,
    name,
    field = 'checkbox',
    checked = false,
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

      <input
        id={name}
        className="form-checkbox"
        type={field}
        value={name}
        defaultChecked={checked}
        {...register(name, Object.assign({}, validation || {}))}
      />

      <label htmlFor={name} className="form-label">
        &nbsp;
      </label>

      {error[name] && (
        <span className="form-error-message">{`${error[name]?.message}`}</span>
      )}
    </div>
  );
};

export default ExpCheckBoxInput;
