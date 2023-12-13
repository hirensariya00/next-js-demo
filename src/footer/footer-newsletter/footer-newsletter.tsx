'use client'

import Button from '../../common-components/button/button';
import Form from '../../common-components/form/form';
import ExpFooterNewsletterController from './footer-newsletter-controller';
const FooterNewsletter = () => {
  const {
    register,
    handleSubmit,
    errors,
    fieldData,
    isLoading,
    signUpHandler,
  } = ExpFooterNewsletterController();

  return (
    <div className="footer-newsletter-section m-b-24">
      <div className="newsletter-form">
        <h6>Sign up now and get 15% off</h6>

        <form
          target="_self"
          className="flex flex-wrap"
          onSubmit={handleSubmit((data: any) => signUpHandler(data))}>
          <Form register={register} errors={errors} fields={fieldData} />
          <span className="helper_text"></span>
          <Button
            type="submit"
            className="button"
            aria-label="Submit Button"
            isLoading={isLoading}
            token={'login'}>
            Sign Up
          </Button>
        </form>

        <p className="m-0">
          We respect your Privacy and Never Share your Information.
        </p>
      </div>
    </div>
  );
};

export default FooterNewsletter;
