'use client'

import Slider from 'react-slick';
import {Fragment, memo} from 'react';
// import {IsCMSApp} from 'experro-storefront';
import ExpProductVariantController from './product-variants-controller';
import SliderBreakPoint from '../../../cms-utils/slider-breakpoint';
import ExpProductCell from '../../product-cell/product-cell';
import {IconArrowLeft} from '../../../assets/icons/left-prod';
import {IconArrowRight} from '../../../assets/icons/right-prod';

interface ExpProductVariantProps {
    product: any;
    showFullPageDetails: boolean;
}

const ExpProductVariant = (props: ExpProductVariantProps) => {
    const {product, showFullPageDetails = true} = props;
    const {productCardData, productsDataLoading} = ExpProductVariantController({
        product,
    });
    const IsCMSApp = true
    const settings = {
        dots: false,
        infinite: true,
        className: 'slick-top-arrow',
        speed: 500,
        arrows: true,
        draggable: true,
        slidesToShow: productCardData?.length < 5 ? productCardData?.length : 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: (
            <button
                type="button"
                className="slick-arrow slick-prev"
                aria-label="Left Arrow">
                <IconArrowLeft/>
            </button>
        ),
        nextArrow: (
            <button
                type="button"
                className="slick-arrow slick-next"
                aria-label="Right Arrow">
                <IconArrowRight/>
            </button>
        ),
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow:
                        productCardData?.length < 5 ? productCardData?.length : 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1279,
                settings: {
                    slidesToShow:
                        productCardData?.length < 5 ? productCardData?.length : 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow:
                        productCardData?.length < 4 ? productCardData?.length : 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow:
                        productCardData?.length < 4 ? productCardData?.length : 3,
                    slidesToScroll: 1,
                    draggable: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow:
                        productCardData?.length < 3 ? productCardData?.length : 2,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 307,
                settings: {
                    slidesToShow:
                        productCardData?.length < 3 ? productCardData?.length : 2,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    let attributes = {};

    if (!IsCMSApp) {
        const {sliderSettings, refAttributes} = SliderBreakPoint({
            itemLength: productCardData?.length,
            settings,
        });
        attributes = refAttributes;
        if (settings?.slidesToShow !== sliderSettings?.slidesToShow)
            Object.assign(settings, sliderSettings);
    }

    return (
        <>
            {productCardData && !productsDataLoading && showFullPageDetails && (
                <div {...attributes} className="product-set-outer-section">
                    <div className="section-title">
                        <h4>You may also like</h4>
                    </div>

                    <div className="section-gap product-set-section">
                        <div className="product-set-inner">
                            <div className="flex-wrap">
                                {!!productCardData?.length && (
                                    <>
                                        <Slider {...settings}>
                                            {!!productCardData?.length &&
                                                productCardData?.map((product: any, index: number) => (
                                                    <Fragment key={index.toString()}>
                                                        <ExpProductCell
                                                            productDetails={product}
                                                            showActionButtons={false}
                                                            mode={'widget'}
                                                            widgetId={'related-products'}
                                                        />
                                                    </Fragment>
                                                ))}
                                        </Slider>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(ExpProductVariant);
