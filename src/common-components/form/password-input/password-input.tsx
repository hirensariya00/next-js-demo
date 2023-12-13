import { useState, useCallback } from 'react';
import {
  FieldErrorsImpl,
  UseFormRegister,
  RegisterOptions,
  FieldValues,
  UseFormGetValues,
} from 'react-hook-form';

export type ExpPasswordInputProps = {
  error: FieldErrorsImpl<{
    [x: string]: any;
  }>;
  defaultValue?: string;
  name: string;
  placeholder?: string;
  labelValue: string;
  className?: string;
  field?: string;
  register: UseFormRegister<FieldValues>;
  validation?: RegisterOptions | any;
  _key: number;
  type: string;
  getValue?: UseFormGetValues<FieldValues>;
};

export const ExpPasswordInput = (props: ExpPasswordInputProps) => {
  const {
    error,
    defaultValue = '',
    name,
    placeholder,
    labelValue,
    className,
    field = 'password',
    register,
    validation,
    type,
    _key,
    getValue,
  } = props;

  const [fieldPasswordShowHide, setField] = useState<boolean>(!!field);
  const passwordRegex =
    /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$!*?&]).{8,}$/;

  //function for setting value for hide/show password
  const hideShow = useCallback(() => {
    setField(!fieldPasswordShowHide);
  }, [fieldPasswordShowHide]);

  const defaultValidation = {
    required: {
      value: true,
      message: 'Password is required',
    },
    pattern: {
      value: new RegExp(passwordRegex),
      message: 'Enter Valid Password',
    },
  };

  return (
    <div key={_key} className={className ? className : 'form-field'}>
      <label htmlFor={name} className="form-label">
        {labelValue}
        {validation?.required?.value && <span className="required">*</span>}
      </label>

      {type === 're-password' && getValue ? (
        <div className="form-password">
          <input
            className="form-input"
            type={fieldPasswordShowHide ? 'password' : 'text'}
            defaultValue={defaultValue}
            placeholder={placeholder}
            {...register(
              name,
              Object.assign(
                {
                  validate: (confirmPassword: any) => {
                    const { password } = getValue();
                    return (
                      password === confirmPassword || 'Passwords should match!'
                    );
                  },
                },
                validation || defaultValidation
              )
            )}
          />
          <button type="button" onClick={hideShow}>
            <i className="icon"></i>
          </button>
        </div>
      ) : (
        <div className="form-password">
          <input
            className="form-input"
            type={fieldPasswordShowHide ? 'password' : 'text'}
            defaultValue={defaultValue}
            placeholder={placeholder}
            {...register(
              name,
              Object.assign({}, validation || defaultValidation)
            )}
          />
          <button type="button" onClick={hideShow}>
            <i className="icon"></i>
          </button>
        </div>
      )}

      {error[name] && (
        <span className="form-error-message">{`${error[name]?.message}`}</span>
      )}
    </div>
  );
};

export default ExpPasswordInput;
