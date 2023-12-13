'use client'

import { memo, Dispatch, SetStateAction } from 'react';
import Modal from 'react-modal';
import ExpProductReviewModelController from './product-review-model-controller';
import { IconCross } from '../../../assets/icons/cross';

interface ExpReviewModelProps {
  product: any;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  totalReviewCount: number | undefined;
  getProductReviewsAndAverageReviewCount: any;
  handleWriteAReviewClick: any;
}

const ExpProductReviewModel = (props: ExpReviewModelProps) => {
  const {
    product,
    setIsModalOpen,
    isModalOpen,
    totalReviewCount,
    handleWriteAReviewClick,
    getProductReviewsAndAverageReviewCount,
  } = props;

  const {
    reviewField,
    onSubmitReview,
    onChangeReviewFields,
    onModalClose,
    scrollToReviewTab,
  } = ExpProductReviewModelController({
    product,
    setIsModalOpen,
    getProductReviewsAndAverageReviewCount,
  });

  return (
    <>
      {(totalReviewCount as number) > 0 && (
        <div
          className="review-count-link m-r-16"
          onClick={() => scrollToReviewTab()}>
          {totalReviewCount} Reviews
        </div>
      )}

      <div
        className="write-review-link"
        onClick={() => handleWriteAReviewClick()}>
        Write a review
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          contentLabel="Example Modal"
          className="modalpopup review-modal">
          <div onClick={onModalClose} className="popup-close-link">
            <i className="icon">
              <IconCross />
            </i>
          </div>

          <div className="modal-header">
            <h3 className="modal-title text-center">Write a Review</h3>
          </div>

          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="col col-5 text-center hide-for-mobile">
                  {product.images_ej.map((images: any, index: number) => {
                    if (images.is_thumbnail) {
                      return (
                        <picture key={index?.toString()}>
                          <source srcSet={images.url_zoom}></source>
                          <img src={images.url_standard} alt=""></img>
                        </picture>
                      );
                    }
                    return null;
                  })}
                  <h6 className="m-t-16">{product?.name_eti}</h6>
                </div>

                <div className="col col-7 col-mob-12">
                  <form action="">
                    <div className="form-field">
                      <label className="form-label" htmlFor="select-rating">
                        Rating
                        <span className="required">*</span>
                      </label>
                      <select
                        className="form-select"
                        placeholder="Select Rating"
                        name="select-rating"
                        value={reviewField.rating}
                        onChange={(e) => onChangeReviewFields(e, 'rating')}>
                        <option value="Select Rating"> Select Rating </option>
                        <option value={1}> 1 Star (worst) </option>
                        <option value={2}> 2 Stars</option>
                        <option value={3}> 3 Stars (average) </option>
                        <option value={4}> 4 Stars</option>
                        <option value={5}> 5 Stars (best) </option>
                      </select>
                      {reviewField.ratingValidation === 'error-field' && (
                        <span className="form-error-message">
                          The 'Rating' field cannot be blank.
                        </span>
                      )}
                    </div>

                    <div className="form-field">
                      <label className="form-label" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        name="name"
                        value={reviewField.name}
                        onChange={(e) => onChangeReviewFields(e, 'name')}
                      />
                    </div>

                    <div className="form-field">
                      <label className="form-label" htmlFor="email">
                        Email
                        <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        name="email"
                        value={reviewField.email}
                        onChange={(e) => onChangeReviewFields(e, 'email')}
                      />
                      {reviewField.emailValidation === 'error-field' && (
                        <span className="form-error-message">
                          Please use a valid email address, such as
                          user@example.com.
                        </span>
                      )}
                    </div>

                    <div className="form-field">
                      <label className="form-label" htmlFor="comments">
                        Comments
                        <span className="required">*</span>
                      </label>

                      <textarea
                        rows={4}
                        className="form-input"
                        name="comments"
                        value={reviewField.comments}
                        onChange={(e) => onChangeReviewFields(e, 'comments')}
                      />
                      {reviewField.commentsValidation === 'error-field' && (
                        <span className="form-error-message">
                          The 'Comments' field cannot be blank.
                        </span>
                      )}
                    </div>

                    <div className="form-submit">
                      <button onClick={onSubmitReview} className="button">
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default memo(ExpProductReviewModel);
