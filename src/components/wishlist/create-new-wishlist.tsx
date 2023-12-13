'use client'

import { useMemo, useState } from 'react';
import { EcommerceService } from '../../services/ecommerce-service';

export interface ExpCreateNewWishlistProps {
  setIsWishlistModalOpen: any;
  productDetails: any;
  setShowAddToWishlistPopup: any;
}

const ExpCreateNewWishlist = (props: ExpCreateNewWishlistProps) => {
  const { setIsWishlistModalOpen, productDetails, setShowAddToWishlistPopup } =
    props;

  const [wishListName, setWishlistName] = useState<string>('');
  const [shareWishlist, setShareWishlist] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const handleInputOnChange = (event: any) => {
    if (!event?.target?.value) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
    setWishlistName(event?.target?.value);
  };

  const handleOnBlur = (event: any) => {
    if (!event?.target?.value) {
      setShowErrorMessage(true);
    }
  };

  const isButtonValid = useMemo(() => Boolean(wishListName), [wishListName]);

  const handleCreateNewWishlistButtonClick = async (event: any) => {
    event.preventDefault();
    const searchObj = {
      name: wishListName,
      is_public: shareWishlist,
      items: [productDetails],
    };

    try {
      const response = await EcommerceService.createWishlist({
        body: searchObj,
      });
      if (response.Status === 'failure') {
        // return toast.error(response.Error.message);
      }
      // toast.success('Wishlist Created');
      setIsWishlistModalOpen(false);
      setShowAddToWishlistPopup(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <>
      <div className="modal-header">
        <h3 className="modal-title text-center">New WishList</h3>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <div className="flex justify-center">
            <div className="col-6 col-md-12">
              <p className="text-center">
                Fill in the form below to create a new Wish List. Click the
                "Create Wish List" button when you're done.
              </p>

              <form action="">
                <div className="form-field">
                  <label htmlFor="createNewWishListName" className="form-label">
                    Wish List Name:
                    <span className="required">*</span>
                  </label>

                  <input
                    className={`form-input ${
                      showErrorMessage ? 'isInvalid' : ''
                    }`}
                    value={wishListName}
                    onChange={handleInputOnChange}
                    type="text"
                    id="createsNewWishListName"
                    onBlur={handleOnBlur}
                  />

                  {showErrorMessage && (
                    <span className="form-error-message">
                      You must enter a wishlist name.
                    </span>
                  )}
                </div>

                <div className="form-field flex align-center">
                  <input
                    checked={shareWishlist}
                    onChange={(e) => setShareWishlist(e?.target?.checked)}
                    type="checkbox"
                    id="isShareWishlist"
                    className="form-checkbox"
                  />
                  <label htmlFor="isShareWishlist" className="form-label m-b-0">
                    Share Wish List?
                  </label>
                </div>

                <div className="form-submit">
                  <button
                    className="button"
                    onClick={handleCreateNewWishlistButtonClick}
                    disabled={!isButtonValid}>
                    CREATE WISH LIST
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpCreateNewWishlist;
