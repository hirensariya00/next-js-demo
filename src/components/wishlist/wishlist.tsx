'use client'

import Modal from 'react-modal';
import ExpCreateNewWishlist from './create-new-wishlist';
import { IconCross } from '../../assets/icons/cross';

export interface ExpWishlistProps {
  isWishlistModalOpen: boolean;
  setIsWishlistModalOpen: any;
  product_id: string;
  variant_id: string;
  setShowAddToWishlistPopup: any;
}

const ExpWishlist = (props: ExpWishlistProps) => {
  const {
    isWishlistModalOpen,
    setIsWishlistModalOpen,
    product_id,
    variant_id,
    setShowAddToWishlistPopup,
  } = props;

  document.addEventListener('DOMContentLoaded', function () {
    function clickHandler(event: any) {
      if (
        !event.target.closest(
          '.ReactModal__Content.ReactModal__Content--after-open'
        )
      ) {
        setIsWishlistModalOpen(false);
      }
    }

    if (isWishlistModalOpen) {
      document.body.addEventListener('click', clickHandler);
    } else {
      document.body.removeEventListener('click', clickHandler);
    }
  });

  const productDetails: any = {};
  if (product_id) {
    productDetails['product_id'] = parseInt(product_id as string);
  }

  if (variant_id) {
    productDetails['variant_id'] = parseInt(variant_id as string);
  }

  return (
    <div className="text-center">
      {isWishlistModalOpen && (
        <Modal isOpen={isWishlistModalOpen}>
          <div
            onClick={() => setIsWishlistModalOpen(false)}
            className="popup-close-link">
            <i className="icon">
              <IconCross />
            </i>
          </div>

          <ExpCreateNewWishlist
            productDetails={productDetails}
            setIsWishlistModalOpen={setIsWishlistModalOpen}
            setShowAddToWishlistPopup={setShowAddToWishlistPopup}
          />
        </Modal>
      )}
    </div>
  );
};

export default ExpWishlist;
