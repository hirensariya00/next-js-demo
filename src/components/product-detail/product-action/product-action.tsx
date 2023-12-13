'use client'
import {memo, Dispatch, SetStateAction} from 'react';
// import {useNavigate} from 'experro-storefront';
import ExpProductActionController from './product-action-controller';
import {IconAlertInfo} from '../../../assets/icons/alert-info';
import {IconMinus} from '../../../assets/icons/minus-2';
import {IconPlus} from '../../../assets/icons/plus';
import {IconHeart} from '../../../assets/icons/heart';
import {ExpProductShare} from '../product-share';
import {
    // handleAddToWishListClick,
    handleCreateNewWishlistButtonClick,
    // handleWishlistPopupToggle,
} from '../../../cms-utils/wishlist-common-function';

interface ExpProductActionProps {
    product: {
        brand_esi: string;
        categories_esai: string;
        calculated_price_efi: number;
        inventory_tracking_esi: string;
        inventory_level_eii: number;
        sku_esi: string;
        sku_for_analytics_esli: any;
        name_esi: string;
        provider_id_esi: string;
    };

    selectedVariant: {
        option_values: any[];
        sku: string;
        id: string;
        inventory_level: number;
        purchasing_disabled: any;
        purchasing_disabled_message: string;
    };
    selectedModifiers: any[];
    setIsProductPreviewModalOpen?: Dispatch<SetStateAction<boolean>>;
    setShowAddToWishlistPopup: Dispatch<SetStateAction<boolean>>;
    showAddToWishlistPopup: boolean;
    setShowCreateNewWishListPopUp?: any;
    analyticsMode?: string | undefined;
    analyticsSearchTerm?: string | null | undefined;
    analyticsCategory?: string | undefined;
    analyticsWidgetId?: string | undefined;
}

const ExpProductaction = (props: ExpProductActionProps) => {
    const {
        product,
        selectedVariant,
        selectedModifiers,
        setIsProductPreviewModalOpen,
        setShowAddToWishlistPopup,
        showAddToWishlistPopup,
        setShowCreateNewWishListPopUp,
        analyticsMode,
        analyticsSearchTerm,
        analyticsCategory,
        analyticsWidgetId,
    } = props;

    const {
        purchaseDisabledMessage,
        quantityForAddToCart,
        setIsWishListLoading,
        isWishListLoading,
        addToCartLoading,
        isBuyNowLoading,
        setWishlists,
        wishlists,
        handleProductQuantityIncDec,
        checkQuantityInputValue,
        addToCart,
    } = ExpProductActionController({
        product,
        selectedVariant,
        selectedModifiers,
        setIsProductPreviewModalOpen,
        analyticsMode,
        analyticsSearchTerm,
        analyticsCategory,
        analyticsWidgetId,
    });
    // const navigate = useNavigate();

    return (
        <div className="product-detail-action-section m-b-40">
            {purchaseDisabledMessage !== '' && (
                <>
                    <div className="alertBox productAttributes-message">
                        <div className="alertBox-column alertBox-icon">
                            <i className="icon">
                                <IconAlertInfo/>
                            </i>
                        </div>
                        <p className="alertBox-column alertBox-message">
                            The selected product combination is currently unavailable.
                        </p>
                    </div>
                </>
            )}
            <div className="row">
                <div className="col product-qty-section">
                    <div className="form-increment">
                        <button
                            className="button button--icon button-decrease"
                            disabled={quantityForAddToCart < 2}
                            onClick={handleProductQuantityIncDec.bind(this, 'desc')}>
                            <i className="icon">
                                <IconMinus/>
                            </i>
                        </button>
                        <input
                            type="text"
                            value={quantityForAddToCart}
                            className="text-center form-input"
                            onBlur={checkQuantityInputValue}
                            onChange={handleProductQuantityIncDec.bind(this, 'direct')}
                        />
                        <button
                            className="button button--icon button-increase"
                            onClick={handleProductQuantityIncDec.bind(this, 'inc')}>
                            <i className="icon">
                                <IconPlus/>
                            </i>
                        </button>
                    </div>
                </div>

                <div className="col addtocart-button">
                    <button
                        className="button full-width button-transparent"
                        onClick={addToCart.bind(this, false)}
                        disabled={purchaseDisabledMessage !== ''}>
                        {addToCartLoading ? 'Adding to cart' : 'Add to cart'}
                    </button>
                </div>

                <div className="col addto-wishlist-button">
                    <button
                        // onClick={() =>
                        //     handleWishlistPopupToggle(
                        //         setIsWishListLoading,
                        //         setShowAddToWishlistPopup,
                        //         showAddToWishlistPopup,
                        //         setWishlists,
                        //         navigate
                        //     )
                        // }
                        className="button button-transparent">
                        <i className="icon">
                            <IconHeart/>
                        </i>
                    </button>

                    {showAddToWishlistPopup && (
                        <div className="wishlist-dropdown">
                            {!isWishListLoading ? (
                                <ul className="list-style-none m-b-0">
                                    {wishlists?.map((elem: any) => (
                                        //  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                                        <li
                                            // onClick={handleAddToWishListClick.bind(
                                            //     this,
                                            //     elem,
                                            //     product?.provider_id_esi,
                                            //     setShowAddToWishlistPopup,
                                            //     selectedVariant?.id
                                            // )}
                                            key={elem.id}>
                                            <div className="button">{elem.name}</div>
                                        </li>
                                    ))}
                                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                                    <li
                                        onClick={handleCreateNewWishlistButtonClick.bind(
                                            this,
                                            setShowCreateNewWishListPopUp,
                                            setShowAddToWishlistPopup
                                        )}>
                                        <span className="button">Create New Wish List</span>
                                    </li>
                                </ul>
                            ) : (
                                <div className="loading-section">
                                    <div className="loader-wrapper">
                                        <div className="loader-icon flex"/>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <ExpProductShare product={product}/>

                <div className="col col-12 buy-button m-t-16">
                    {!isBuyNowLoading ? (
                        <button
                            onClick={addToCart?.bind(this, true)}
                            className="button fill-button full-width"
                            disabled={purchaseDisabledMessage !== ''}>
                            Buy now
                        </button>
                    ) : (
                        <button className="button fill-button full-width">
                            <div className="loading-section">
                                <div className="loader-wrapper">
                                    <div className="loader-icon flex"/>
                                </div>
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(ExpProductaction);
