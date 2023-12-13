'use client'

/* eslint-disable jsx-a11y/label-has-associated-control */
import Modal from 'react-modal';
// import {IsCMSApp} from 'experro-storefront';
import ExpProductdetail from '../product-detail/product-detail';
import ExpProductPrice from '../product-price/product-price';
import ExpWishlist from '../wishlist/wishlist';
import ExpLinkParser from '../../cms-utils/link-parser';
// import placeHolderCard from '../../../assets/images/placeholder-product-card.jpg';
import ExpProductCellController from './product-cell-controller';
import {IconHeart} from '../../assets/icons/heart-2';
import {IconCross} from '../../assets/icons/cross';
import {IconQuickview} from '../../assets/icons/quickview';
import {IconAddtobag} from '../../assets/icons/add-to-bag';
import {IconCompare} from '../../assets/icons/compare';
import {ExpProductAverageReview} from '../product-detail/product-average-review';
import {
    // handleAddToWishListClick,
    // handleWishlistPopupToggle,
    handleCreateNewWishlistButtonClick,
} from '../../cms-utils/wishlist-common-function';
import Image from "next/image";

interface ExpProductCellProps {
    productDetails: {
        images_ej: any[];
        sku_esi: string;
        reviews_rating_sum_eii: string;
        reviews_count_eii: string;
        page_slug_esi: any;
        sku_for_analytics_esli: any;
        calculated_price_efi: number;
        name_eti: string;
        brand_esi: string;
        categories_esai: any;
        provider_id_esi: any;
        provider_specific_data_ej: any;
        variant_options_ej: any[];
        brand_page_slug_esi: string;
    };
    handleProductCompare?: (productSku: string) => void;
    productCompareSkus?: any[];
    categoryTree?: any[];
    showActionButtons: boolean;
    mode: string;
    category?: string;
    widgetId?: string;
}

const ExpProductCell = (props: ExpProductCellProps) => {
    const IsCMSApp = true
    const {
        productDetails,
        handleProductCompare,
        productCompareSkus,
        categoryTree,
        showActionButtons = true,
        mode,
        category,
        widgetId,
    } = props;

    const {
        averageReviewsCount,
        createNewWishlist,
        images,
        isModalOpen,
        isWishlistLoading,
        isCartLoading,
        isQuickViewLoading,
        navigate,
        productData,
        productNavigationUrl,
        queryParams,
        selectedSku,
        showAddToWishlistPopup,
        wishlists,
        colorVarients,
        colorOption,
        selectedVarient,
        getVarient,
        setIsModalOpen,
        setShowAddToWishlistPopup,
        setCreateNewWishlist,
        setWishlists,
        setIsWishListLoading,
        handleModalOpen,
        handleCloseModal,
        handleAddToCartButtonClick,
        handleViewDetailsClick,
        getImageUrl
    } = ExpProductCellController({
        category,
        categoryTree,
        mode,
        productCompareSkus,
        productDetails,
        widgetId,
    });

    return (
        <div className="product-card">
            <div className="card-inner">
                <div className="card-figure">
                    <div className="card-image-slider">
                        <div className="card-image-item">
                            <ExpLinkParser
                                to={productNavigationUrl}
                                className="overlay-link"
                                ariaLabel={productDetails?.name_eti}></ExpLinkParser>
                            <ExpLinkParser
                                to={productNavigationUrl}
                                ariaLabel={productDetails?.name_eti}>
                                <div style={{minHeight: '346px'}}>
                                    <Image
                                        // priority={true}
                                        src={images?.length
                                            ? `${images[0]?.url_zoom?.replace(
                                                'https://cdn11.bigcommerce.com',
                                                'https://product-images.experro.app'
                                            )}&width=360`
                                            : ''}
                                        width={346}
                                        height={346}
                                        alt="Picture of the author"
                                    />
                                </div>
                            </ExpLinkParser>
                        </div>
                    </div>
                    <div className="product-action-hover">
                        {!!handleProductCompare && (
                            <div className="card-compare-button has-tooltip">
                                <i
                                    onClick={() => handleProductCompare(productDetails.sku_esi)}
                                    className={`icon product-action compare-product ${
                                        selectedSku ? 'is-selected' : ''
                                    }`}>
                                    <IconCompare/>
                                </i>
                                <span className="tooltip tooltip-top">Compare</span>
                            </div>
                        )}
                        <div className="card-quick-view-button has-tooltip">
                            <i className="icon" onClick={handleModalOpen}>
                                <IconQuickview/>
                            </i>
                            <span className="tooltip tooltip-top">Quickview</span>
                        </div>
                        {!productDetails?.provider_specific_data_ej?.modifiers?.length &&
                        !productDetails?.variant_options_ej?.length ? (
                            <div className="card-addcart-button  has-tooltip">
                                <i
                                    className="icon"
                                    onClick={() =>
                                        !isCartLoading && handleAddToCartButtonClick()
                                    }>
                                    <IconAddtobag/>
                                </i>
                                <span className="tooltip tooltip-top">Add to Cart</span>
                            </div>
                        ) : (
                            <div className="card-addcart-button  has-tooltip">
                                <i className="icon" onClick={handleViewDetailsClick}>
                                    <IconAddtobag/>
                                </i>
                                <span className="tooltip tooltip-top">Add to Cart</span>
                            </div>
                        )}
                    </div>
                    {showActionButtons && (
                        <div className="product-actions">
                            <div className="has-tooltip">
                                <i
                                    onClick={() =>
                                        handleWishlistPopupToggle(
                                            setIsWishListLoading,
                                            setShowAddToWishlistPopup,
                                            showAddToWishlistPopup,
                                            setWishlists,
                                            navigate
                                        )
                                    }
                                    className="icon product-action like-product">
                                    <IconHeart/>
                                </i>
                            </div>

                            {showAddToWishlistPopup && (
                                <div className="wishlist-dropdown">
                                    {!isWishlistLoading ? (
                                        <ul className="list-style-none m-b-0">
                                            {wishlists?.map((elem: any) => (
                                                //  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                                                <li
                                                    // onClick={handleAddToWishListClick.bind(
                                                    //     this,
                                                    //     elem,
                                                    //     productDetails?.provider_id_esi,
                                                    //     setShowAddToWishlistPopup,
                                                    //     ''
                                                    // )}
                                                    key={elem.id}>
                                                    <div className="button button-small">{elem.name}</div>
                                                </li>
                                            ))}
                                            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                                            <li
                                                onClick={handleCreateNewWishlistButtonClick.bind(
                                                    this,
                                                    setCreateNewWishlist,
                                                    setShowAddToWishlistPopup
                                                )}>
                                                <div className="button button-small">
                                                    Create New Wish List
                                                </div>
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
                    )}
                </div>
                <div className="card-brand-rating flex flex-wrap align-center justify-space">
                    {productDetails?.brand_esi && productDetails?.brand_page_slug_esi && (
                        <ExpLinkParser to={productDetails?.brand_page_slug_esi}>
                            <p className="card-brandname">{productDetails?.brand_esi}</p>
                        </ExpLinkParser>
                    )}
                    <ul className="m-b-0 rating-star-list m-r-16">
                        <ExpProductAverageReview
                            averageReviewsCount={averageReviewsCount}
                            starFillClassName={'icon icon-fill'}
                            starClassName={'icon'}
                        />
                    </ul>
                </div>
                {IsCMSApp ? (
                    <h4 className="card-title">
                        <ExpLinkParser
                            to={productNavigationUrl}
                            dangerouslySetInnerHTML={{__html: productDetails?.name_eti}}
                        />
                    </h4>
                ) : (
                    <h4 className="card-title">{productDetails?.name_eti}</h4>
                )}
                <ExpProductPrice
                    productDetails={productDetails}
                    selectedVariant={selectedVarient}
                />
            </div>

            <div className="swatch-list flex justify-start align-center">
                {!!colorVarients?.length &&
                    colorVarients.map((object: any) =>
                        object?.option_values.map((option: any, index: number) => {
                            return (
                                <>
                                    {option?.value_data?.colors?.length && (
                                        <div
                                            className="form-radio-item m-b-15 swatch-item"
                                            onClick={() => getVarient(option)}>
                                            <input
                                                type="radio"
                                                className={`swatch-radio ${
                                                    (index === 0 && !colorOption) ||
                                                    colorOption === option?.value_data?.colors?.[0]
                                                        ? 'is-selected'
                                                        : ''
                                                }`}
                                                aria-label="swathc-radio"
                                            />
                                            <label className="swatch-label">
                        <span
                            style={{
                                backgroundColor: option?.value_data?.colors?.[0],
                            }}></span>
                                            </label>
                                        </div>
                                    )}
                                </>
                            );
                        })
                    )}
            </div>

            <div className="modal">
                {isModalOpen && (
                    <Modal isOpen={isModalOpen} className="modal-quickview">
                        <div onClick={handleCloseModal} className="popup-close-link">
                            <i className="icon">
                                <IconCross/>
                            </i>
                        </div>
                        <div className="modal-content">
                            {!isQuickViewLoading && productData ? (
                                <ExpProductdetail
                                    isInModalElement={true}
                                    product={productData?.Data?.items[0]}
                                    showFullPageDetails={false}
                                    analyticsMode={mode}
                                    setIsProductPreviewModalOpen={setIsModalOpen}
                                    analyticsSearchTerm={queryParams.get('q')}
                                    analyticsCategory={category}
                                    analyticsWidgetId={widgetId}
                                />
                            ) : (
                                <div className="loading-section">
                                    <div className="loader-wrapper">
                                        <div className="loader-icon flex"/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Modal>
                )}
            </div>
            <ExpWishlist
                setIsWishlistModalOpen={setCreateNewWishlist}
                isWishlistModalOpen={createNewWishlist}
                product_id={productDetails?.provider_id_esi}
                variant_id={''}
                setShowAddToWishlistPopup={setShowAddToWishlistPopup}
            />
        </div>
    );
};

export default ExpProductCell;
