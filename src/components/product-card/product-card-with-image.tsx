'use client'

// import {IsCMSApp} from 'experro-storefront';
import ExpProductListing from './product-listing';
import ExpProductCardController from './product-card-controller';
// import {ExpLoadingPlaceholder} from '../../common-components/loading-placeholder';
import {expDataSourceConstants} from '../../cms-utils';

// import {ExpCustomImageRenderer} from '../../common-components/custom-image-rendrer';

export interface ExpProductCardWithImageProps {
    id: string;
    titleColor: string;
    component_content: string;
    bannerType: string;
    componentFieldData: any
}

const ExpProductCardWithImage = (props: ExpProductCardWithImageProps) => {
    const IsCMSApp = true
    const {id, titleColor, component_content, bannerType, componentFieldData} = props;

    const staticWidthArr: string[] = ['1232', '980', '1144', '600'];
    const {
        productsData,
        dataSource,
        mappingObj,
        componentDataDispatcher,
        productsDataLoading,
        contentModel,
        title_style,
        imageData,
    } = ExpProductCardController({id, titleColor, component_content,componentFieldData});

    return (
        <>
            {/*{dataSource === expDataSourceConstants?.CONTENT_LIBRARY && (*/}
            {/*    <ExpLoadingPlaceholder*/}
            {/*        loaderClassName="section-gap product-set-section"*/}
            {/*        contentModel={contentModel}*/}
            {/*        isLoading={componentDataDispatcher?.isLoading}*/}
            {/*        componentData={componentDataDispatcher?.componentData?.id}*/}
            {/*    />*/}
            {/*)}*/}
            {(dataSource === expDataSourceConstants?.FREE_FORM ||
                (dataSource === expDataSourceConstants?.CONTENT_LIBRARY &&
                    componentFieldData?.id)) && (
                <div
                    className={`product-with-image-section  ${
                        bannerType === 'banner-1'
                            ? 'two-product-image'
                            : 'one-product-image'
                    } section-gap`}>
                    <div className="container">
                        <div className="row">
                            {bannerType === 'banner-1' && (
                                <div className="col col-6 col-tab-12">
                                    <div className="image-content position-relative">
                                        <div className="product-image-main has-image-fill">
                                            {(imageData || mappingObj?.backgroundImage) && (
                                                <></>
                                                // <ExpCustomImageRenderer
                                                //     dataSource={dataSource}
                                                //     staticWidthArr={staticWidthArr}
                                                //     imageData={imageData}
                                                //     contentLibraryImageData={mappingObj?.backgroundImage}
                                                //     height={'468'}
                                                //     width={'724'}
                                                // />
                                            )}
                                        </div>

                                        <div className="image-caption">
                                            <h4
                                                dangerouslySetInnerHTML={{
                                                    __html: mappingObj?.headingText
                                                        ? mappingObj?.headingText
                                                        : IsCMSApp
                                                            ? ''
                                                            : 'Add Title',
                                                }}
                                                style={title_style}
                                            />
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: mappingObj?.description
                                                        ? mappingObj?.description
                                                        : IsCMSApp
                                                            ? ''
                                                            : 'Add Description line',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div
                                className={`col ${
                                    bannerType === 'banner-1'
                                        ? 'col-6 col-tab-12'
                                        : 'col-3 col-tab-12'
                                }`}>
                                <div className="row">
                                    <ExpProductListing
                                        dataSource={dataSource}
                                        mappingObj={mappingObj}
                                        productsData={productsData}
                                        productsDataLoading={productsDataLoading}
                                    />
                                </div>
                            </div>

                            {bannerType === 'banner-2' && (
                                <div className="col col-9 col-tab-12">
                                    <div className="image-content position-relative">
                                        <div className="product-image-main has-image-fill">
                                            {(mappingObj?.backgroundImage || imageData) && (
                                                <></>
                                                // <ExpCustomImageRenderer
                                                //     dataSource={dataSource}
                                                //     staticWidthArr={staticWidthArr}
                                                //     imageData={imageData}
                                                //     contentLibraryImageData={mappingObj?.backgroundImage}
                                                //     height={'468'}
                                                //     width={'724'}
                                                // />
                                            )}
                                        </div>
                                        <div className="image-caption">
                                            <h4
                                                dangerouslySetInnerHTML={{
                                                    __html: mappingObj?.headingText
                                                        ? mappingObj?.headingText
                                                        : 'Add Title',
                                                }}
                                                style={title_style}
                                            />
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: mappingObj?.description
                                                        ? mappingObj?.description
                                                        : 'Add Description line',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExpProductCardWithImage;
