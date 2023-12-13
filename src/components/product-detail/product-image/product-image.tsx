'use client'

import {memo} from 'react';
import Modal from 'react-modal';
import Slider from 'react-slick';
import ExpProductImageController from './product-image-controller';
import placeHolderCard from '../../../assets/images/placeholder-product-card.jpg';
import {ImageLens} from '../../../cms-utils';
import {IconCross} from '../../../assets/icons/cross';
import {IconProductLeft} from '../../../assets/icons/product-left';
import {IconProductRight} from '../../../assets/icons/product-right';

interface ExpProductImageProps {
    product: {
        images_ej: any[];
    };
    isInModalElement: boolean | undefined;
}

const ExpProductImage = (props: ExpProductImageProps) => {
    const {product, isInModalElement = false} = props;
    const {
        setIsImagePreviewOpen,
        isImagePreviewOpen,
        setImageSlider,
        ImageSlider,
        setThumnnailImageSlider,
        ThumnnailImageSlider,
        deviceWidth,
        slidersetting,
        thumbslidersetting,
    } = ExpProductImageController();

    return (
        <div className="col col-5 col-tab-12 product-image-section">
            <div className="product-image-wrapper">
                {product?.images_ej && product?.images_ej?.length > 0 ? (
                    <Slider
                        {...slidersetting}
                        asNavFor={ThumnnailImageSlider}
                        ref={(slider1) => setImageSlider(slider1)}>
                        {product?.images_ej &&
                            product?.images_ej?.map(
                                (image: { url_zoom: string }, index: number) => {
                                    if (!isInModalElement && deviceWidth > 1023)
                                        return (
                                            <div
                                                key={index?.toString()}
                                                className="product-main-image-item">
                                                <ImageLens
                                                    imageUrl={`${image?.url_zoom.replace(
                                                        'https://cdn11.bigcommerce.com',
                                                        'https://product-images.experro.app'
                                                    )}&width=598`}
                                                    altText="Experro"
                                                />
                                            </div>
                                        );
                                    else
                                        return (
                                            <div
                                                key={index?.toString()}
                                                className="product-main-image-item"
                                                onClick={() =>
                                                    deviceWidth < 767 && setIsImagePreviewOpen(true)
                                                }>
                                                <picture>
                                                    <source
                                                        media="(min-width:1280px)"
                                                        srcSet={`${image?.url_zoom.replace(
                                                            'https://cdn11.bigcommerce.com',
                                                            'https://product-images.experro.app'
                                                        )}&width=598`}
                                                    />
                                                    <img
                                                        src={`${image?.url_zoom.replace(
                                                            'https://cdn11.bigcommerce.com',
                                                            'https://product-images.experro.app'
                                                        )}&width=598`}
                                                        alt=""
                                                    />
                                                </picture>
                                            </div>
                                        );
                                }
                            )}
                    </Slider>
                ) : (
                    <img src={placeHolderCard} alt={'comming soon'}/>
                )}

                {product?.images_ej && product?.images_ej?.length > 0 && (
                    <div className="product-thumnnail-list m-t-24">
                        <Slider
                            {...thumbslidersetting}
                            asNavFor={ImageSlider}
                            ref={(slider2) => setThumnnailImageSlider(slider2)}
                            swipeToSlide={true}
                            focusOnSelect={true}>
                            {product?.images_ej &&
                                product?.images_ej?.map(
                                    (image: { url_zoom: string }, index: number) => (
                                        <div
                                            key={index?.toString()}
                                            className="product-main-image-item">
                                            <picture>
                                                <source
                                                    media="(min-width:1280px)"
                                                    srcSet={`${image?.url_zoom.replace(
                                                        'https://cdn11.bigcommerce.com',
                                                        'https://product-images.experro.app'
                                                    )}&width=590`}
                                                />
                                                <img
                                                    src={`${image?.url_zoom.replace(
                                                        'https://cdn11.bigcommerce.com',
                                                        'https://product-images.experro.app'
                                                    )}&width=590`}
                                                    alt=""
                                                />
                                            </picture>
                                        </div>
                                    )
                                )}
                        </Slider>
                    </div>
                )}
            </div>

            <div className="modal">
                {isImagePreviewOpen && (
                    <Modal
                        isOpen={isImagePreviewOpen}
                        className="mobile-view-image-popup">
                        <div className="popup-close-link">
                            <i onClick={() => setIsImagePreviewOpen(false)} className="icon">
                                <IconCross/>
                            </i>
                        </div>
                        <div className="modal-content">
                            <Slider
                                arrows={true}
                                dots={false}
                                infinite={false}
                                prevArrow={
                                    <button type="button" className="slick-arrow slick-prev">
                                        <IconProductLeft/>
                                    </button>
                                }
                                nextArrow={
                                    <button type="button" className="slick-arrow slick-next">
                                        <IconProductRight/>
                                    </button>
                                }>
                                {product?.images_ej &&
                                    product?.images_ej?.map(
                                        (image: { url_zoom: string }, index: number) => (
                                            <div
                                                key={index?.toString()}
                                                className="product-main-image-item">
                                                <picture>
                                                    <source
                                                        media="(min-width:1280px)"
                                                        srcSet={`${image?.url_zoom.replace(
                                                            'https://cdn11.bigcommerce.com',
                                                            'https://product-images.experro.app'
                                                        )}&width=590`}
                                                    />
                                                    <img
                                                        src={`${image?.url_zoom.replace(
                                                            'https://cdn11.bigcommerce.com',
                                                            'https://product-images.experro.app'
                                                        )}&width=590`}
                                                        alt=""
                                                    />
                                                </picture>
                                            </div>
                                        )
                                    )}
                            </Slider>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default memo(ExpProductImage);
