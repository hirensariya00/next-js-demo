interface ButtonProps {
  children: string;
  isLoading: boolean;
  type: 'button' | 'submit' | 'reset' | undefined;
  className: string;
  token: any;
}

/**
 * A custom button component that can display loading state.
 * @param children - The text content of the button.
 * @param isLoading - A flag indicating whether the button is in a loading state.
 * @param type - The type attribute of the button.
 * @param className - The CSS class for the button.
 * @param token - The token for enabling/disabling the button.
 * @returns Rendered ExpButton component.
 */
const ExpButton = (props: ButtonProps) => {
  const { children, isLoading, type, className, token } = props;

  return (
    <button
      type={type}
      className={`${className} ${isLoading && 'm-x-auto'}`}
      disabled={isLoading || !token}>
      {isLoading ? (
        <>
          {children}
          <div className="spinner-loader-wrapper">
            <div className="spinner-loader"></div>
          </div>
        </>
      ) : (
        <div>{children}</div>
      )}
    </button>
  );
};

export default ExpButton;
