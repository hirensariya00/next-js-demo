'use client'

// import {IsCMSApp} from 'experro-storefront';
import ExpProductListing from './product-listing';
import SliderBreakPoint from '../../cms-utils/slider-breakpoint';
import ExpProductCardController from './product-card-controller';
// import { ExpLoadingPlaceholder } from '../../common-components/loading-placeholder';
import {IconArrowLeft} from '../../assets/icons/left-prod';
import {IconArrowRight} from '../../assets/icons/right-prod';
import {expDataSourceConstants, expWidgetConstants} from '../../cms-utils';

export interface ExpProductCardProps {
    id: string;
    titleColor: string;
    component_content: string;
    showSliderView: string;
    showSliderArrows: any;
    titleTextPosition: string;
    isShowPagination: string;
    paginationPosition: string;
}

const ExpProductCard = (props: ExpProductCardProps) => {
    const IsCMSApp = true
    const {
        id,
        titleColor,
        component_content,
        showSliderView,
        titleTextPosition,
        isShowPagination,
        paginationPosition,
        showSliderArrows,
        componentFieldData
    } = props;

    let attributes = {};
    const displayAs = 'carousel';
    const {
        productsData,
        dataSource,
        mappingObj,
        componentDataDispatcher,
        productsDataLoading,
        contentModel,
        title_style,
    } = ExpProductCardController({id, titleColor, component_content,componentFieldData});

    let sliderArrowsVisibility = false;
    if (showSliderArrows === expWidgetConstants?.WIDGET_CHECK_TRUE) {
        sliderArrowsVisibility = true;
    } else if (showSliderArrows === expWidgetConstants?.WIDGET_CHECK_FALSE) {
        sliderArrowsVisibility = false;
    }

    const settings = {
        dots: true,
        infinite: true,
        className: `${paginationPosition} ${
            isShowPagination === expWidgetConstants?.WIDGET_CHECK_TRUE
                ? 'pagination-show slick-top-arrow'
                : 'slick-top-arrow'
        } `,
        speed: 500,
        arrows: sliderArrowsVisibility,
        draggable: true,
        slidesToShow:
            productsData?.Data?.items?.length < 4
                ? productsData?.Data?.items?.length
                : 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        adaptiveHeight: false,
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
                        productsData?.Data?.items?.length < 4
                            ? productsData?.Data?.items?.length
                            : 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1279,
                settings: {
                    slidesToShow:
                        productsData?.Data?.items?.length < 4
                            ? productsData?.Data?.items?.length
                            : 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow:
                        productsData?.Data?.items?.length < 3
                            ? productsData?.Data?.items?.length
                            : 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow:
                        productsData?.Data?.items?.length < 3
                            ? productsData?.Data?.items?.length
                            : 3,
                    slidesToScroll: 1,
                    draggable: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow:
                        productsData?.Data?.items?.length < 2
                            ? productsData?.Data?.items?.length
                            : 2,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 307,
                settings: {
                    slidesToShow:
                        productsData?.Data?.items?.length < 2
                            ? productsData?.Data?.items?.length
                            : 2,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    if (!IsCMSApp) {
        const {sliderSettings, refAttributes} = SliderBreakPoint({
            id: componentFieldData?.id,
            itemLength: productsData?.Data?.items?.length,
            settings,
        });
        attributes = refAttributes;
        if (settings?.slidesToShow !== sliderSettings?.slidesToShow)
            Object.assign(settings, sliderSettings);
    }

    return (
        <>
            {/*{dataSource === expDataSourceConstants?.CONTENT_LIBRARY && (*/}
            {/*  <ExpLoadingPlaceholder*/}
            {/*    loaderClassName="section-gap product-set-section"*/}
            {/*    contentModel={contentModel}*/}
            {/*    isLoading={componentDataDispatcher?.isLoading}*/}
            {/*    componentData={componentDataDispatcher?.componentData?.id}*/}
            {/*  />*/}
            {/*)}*/}

            {(dataSource === expDataSourceConstants?.FREE_FORM ||
                (dataSource === expDataSourceConstants?.CONTENT_LIBRARY &&
                    componentFieldData?.id)) && (
                <div {...attributes} className="product-set-outer-section">
                    <div className="section-title m-b-56 text-center">
                        <div className="container">
                            <h4
                                className={titleTextPosition}
                                style={title_style}
                                suppressHydrationWarning>
                                {mappingObj?.headingText?.length ||
                                dataSource === expDataSourceConstants?.CONTENT_LIBRARY
                                    ? mappingObj?.headingText
                                    : IsCMSApp
                                        ? ''
                                        : 'Add Title'}
                            </h4>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html:
                                        mappingObj?.description?.length ||
                                        dataSource === expDataSourceConstants?.CONTENT_LIBRARY
                                            ? mappingObj?.description
                                            : IsCMSApp
                                                ? ''
                                                : 'Add Tag Line',
                                }}
                            />
                        </div>
                    </div>

                    <div className="section-gap product-set-section">
                        {displayAs === 'carousel' && (
                            <div className="product-set-inner">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <ExpProductListing
                                                dataSource={dataSource}
                                                mappingObj={mappingObj}
                                                productsData={productsData}
                                                productsDataLoading={productsDataLoading}
                                                sliderView={{
                                                    settings: settings,
                                                    showSliderView:
                                                        showSliderView ===
                                                        expWidgetConstants.WIDGET_CHECK_TRUE,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ExpProductCard;
