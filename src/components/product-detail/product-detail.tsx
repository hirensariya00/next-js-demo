'use client'

import {Dispatch, SetStateAction} from 'react';
// import { DraggableArea } from 'experro-storefront';
import ExpBreadcrumb from '../../common-components/breadcrumb/breadcrumb';
import ExpLinkParser from '../../cms-utils/link-parser';
import ExpProductPrice from '../product-price/product-price';
import ExpWishlist from '../wishlist/wishlist';
import ExpProductDetailController from './product-detail-controller';
import {ExpProductImage} from './product-image';
import {ExpProductAverageReview} from './product-average-review';
import {ExpProductReviewModel} from './product-review-model';
import {ExpProductCustomFields} from './product-custom-fields';
import {ExpProductOptions} from './product-options';
import {ExpProductModifiers} from './product-modifiers';
import {ExpProductaction} from './product-action';
import {ExpProductTabSection} from './product-tab-section';
import {ExpProductVariant} from './product-variants';

interface ExpProductDetailProps {
    product: any;
    components?: any;
    showFullPageDetails?: boolean;
    setIsProductPreviewModalOpen?: Dispatch<SetStateAction<boolean>>;
    analyticsMode?: string | undefined;
    analyticsSearchTerm?: string | null | undefined;
    analyticsCategory?: string | undefined;
    analyticsWidgetId?: string | undefined;
    isInModalElement?: boolean | undefined;
}

const ExpProductdetail = (props: ExpProductDetailProps) => {
    const {
        product,
        components,
        showFullPageDetails = true,
        setIsProductPreviewModalOpen,
        analyticsMode,
        analyticsSearchTerm,
        analyticsCategory,
        analyticsWidgetId,
        isInModalElement,
    } = props;

    const {
        productOptions,
        selectedVariant,
        setSelectedProductOption,
        selectedProductOption,
        setSelectedModifiers,
        selectedModifiers,
        isModalOpen,
        setIsModalOpen,
        productReviews,
        averageReviewsCount,
        totalReviewCount,
        setShowCreateNewWishListPopUp,
        showCreateNewWishListPopup,
        setShowAddToWishlistPopup,
        showAddToWishlistPopup,
        handleWriteAReviewClick,
        getVariantFromSelectOption,
        getProductReviewsAndAverageReviewCount,
    } = ExpProductDetailController({
        product,
        showFullPageDetails,
    });

    return (
        <>
            <div className="page-body product-page-template">
                {showFullPageDetails ? <ExpBreadcrumb pageData={product}/> : ''}
                {/* Dragable Area - 1*/}
                {/*<DraggableArea*/}
                {/*  style={{ width: 'auto' }}*/}
                {/*  cssClass={''}*/}
                {/*  id={'production-details-drop-1'}*/}
                {/*  components={components}*/}
                {/*  modelField={''}*/}
                {/*  pageData={product}*/}
                {/*/>*/}

                <div className="page-content">
                    <div className="product-view-section">
                        <div className="product-view-top-section">
                            <div className="container">
                                <div className="row justify-space gutter-md">
                                    {/* product image section */}
                                    <ExpProductImage
                                        isInModalElement={isInModalElement}
                                        product={product}
                                    />

                                    {/* product detail section */}
                                    <div className="col col-7 col-tab-12 product-detail-section">
                                        <div className="product-detail-top-section">
                                            <p className="product-brand-link m-b-5">
                                                <ExpLinkParser to={product?.brand_page_slug_esi}>
                                                    {product?.brand_eti}
                                                </ExpLinkParser>
                                            </p>

                                            <h1 className="productView-title h4 m-b-24">
                                                {product?.name_eti}
                                            </h1>

                                            <ExpProductPrice
                                                productDetails={product}
                                                selectedVariant={selectedVariant}
                                                selectedModifiers={selectedModifiers}
                                            />

                                            <div className="product-rating-section flex align-center flex-wrap">
                                                <ul className="m-b-0 rating-star-list m-r-16">
                                                    <ExpProductAverageReview
                                                        averageReviewsCount={averageReviewsCount}
                                                        starFillClassName={'icon icon-fill'}
                                                        starClassName={'icon'}
                                                    />
                                                </ul>

                                                <ExpProductReviewModel
                                                    totalReviewCount={totalReviewCount}
                                                    product={product}
                                                    setIsModalOpen={setIsModalOpen}
                                                    isModalOpen={isModalOpen}
                                                    handleWriteAReviewClick={handleWriteAReviewClick}
                                                    getProductReviewsAndAverageReviewCount={
                                                        getProductReviewsAndAverageReviewCount
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="product-options-section">
                                            <form action="" className="form-style">
                                                <ExpProductOptions
                                                    productOptions={productOptions}
                                                    setSelectedProductOption={setSelectedProductOption}
                                                    selectedProductOption={selectedProductOption}
                                                    getVariantFromSelectOption={
                                                        getVariantFromSelectOption
                                                    }
                                                />
                                                <ExpProductModifiers
                                                    product={product}
                                                    selectedModifiers={selectedModifiers}
                                                    setSelectedModifiers={setSelectedModifiers}
                                                />
                                            </form>
                                        </div>

                                        <ExpProductCustomFields product={product}/>

                                        <ExpProductaction
                                            product={product}
                                            selectedVariant={selectedVariant}
                                            selectedModifiers={selectedModifiers}
                                            setIsProductPreviewModalOpen={
                                                setIsProductPreviewModalOpen
                                            }
                                            setShowAddToWishlistPopup={setShowAddToWishlistPopup}
                                            showAddToWishlistPopup={showAddToWishlistPopup}
                                            setShowCreateNewWishListPopUp={
                                                setShowCreateNewWishListPopUp
                                            }
                                            analyticsMode={analyticsMode}
                                            analyticsSearchTerm={analyticsSearchTerm}
                                            analyticsCategory={analyticsCategory}
                                            analyticsWidgetId={analyticsWidgetId}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {showFullPageDetails && (
                            <div className="container">
                                <ExpProductTabSection
                                    product={product}
                                    productReviews={productReviews}
                                    averageReviewsCount={averageReviewsCount}
                                    totalReviewCount={totalReviewCount}
                                    handleWriteAReviewClick={handleWriteAReviewClick}
                                />

                                <div className="m-t-100">
                                    <ExpProductVariant
                                        product={product}
                                        showFullPageDetails={showFullPageDetails}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ExpWishlist
                isWishlistModalOpen={showCreateNewWishListPopup}
                setIsWishlistModalOpen={setShowCreateNewWishListPopUp}
                product_id={product?.provider_id_esi}
                variant_id={selectedVariant?.id}
                setShowAddToWishlistPopup={setShowAddToWishlistPopup}
            />
        </>
    );
};
export default ExpProductdetail;
