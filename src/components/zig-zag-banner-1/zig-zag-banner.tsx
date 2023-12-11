'use client'

// import {ExpLoadingPlaceholder} from '../../common-components/loading-placeholder';
// import { ExpCustomImageRenderer } from '../../common-components/custom-image-rendrer';
import ExpLinkParser from '../../cms-utils/link-parser';
import ExpZigZagBannerController from './zig-zag-banner-controller';
import {expDataSourceConstants, expWidgetConstants} from '../../cms-utils';
import {linkParserStyle} from '../../cms-utils/link-parser-style';
import Image from "next/image";

export interface ExpZigZagBannerProps {
    id: string;
    component_content: any;
    titleSize: string;
    buttonTextColor: string;
    buttonTextHoverColor: string;
    buttonColor: string;
    buttonHoverColor: string;
    bannerReverse: string;
    titleColor: string;
    tagLineColor: string;
    backgroundColor: string;
    showBackground: string;
    componentFieldData: any
}

/**
 * Renders a Zig-zag Banner component.
 * @param props - The Zig-zag Banner component props.
 * @returns The rendered Zig-zag Banner component.
 */
const ExpZigZagBanner = (props: ExpZigZagBannerProps) => {
    const {
        id,
        titleSize,
        titleColor,
        tagLineColor,
        backgroundColor,
        component_content,
        componentFieldData
    } = props;

    const {
        componentDataDispatcher,
        contentModel,
        titleStyle,
        tagLineStyle,
        mappingObj,
        dataSource,
        imageData,
        backgroundStyle,
        getImageUrl
    } = ExpZigZagBannerController({
        id,
        backgroundColor,
        titleColor,
        tagLineColor,
        component_content,
        componentFieldData
    });

    const {
        buttonColor,
        buttonHoverColor,
        buttonTextHoverColor,
        buttonTextColor,
        bannerReverse,
        showBackground,
    } = JSON.parse(component_content === undefined ? '{}' : component_content);

    const staticWidthArrLogo: string[] = ['500'];
    const staticWidthArr: string[] = ['1232', '980'];

    return (
        <>
            <style>
                {`#${id} a.button.fill-button:hover {
          background-color: var(--button-hover-bg-color) !important;

          color: var(--button-hover-color) !important;
        }
          #${id} a.button.fill-button {
          background-color: var(--button-bg-color) !important;

          color: var(--button-color) !important;
        }`}
            </style>

            {/*{dataSource === expDataSourceConstants.CONTENT_LIBRARY && (*/}
            {/*  <ExpLoadingPlaceholder*/}
            {/*    loaderClassName="section-gap two-column-banner-section"*/}
            {/*    contentModel={contentModel}*/}
            {/*    isLoading={componentDataDispatcher?.isLoading}*/}
            {/*    componentData={componentDataDispatcher?.componentData?.id}*/}
            {/*  />*/}
            {/*)}*/}
            {(dataSource === expDataSourceConstants.FREE_FORM ||
                componentFieldData?.id) && (
                <section
                    className={`section-gap two-column-banner-section ${
                        bannerReverse === expWidgetConstants?.WIDGET_CHECK_TRUE
                            ? 'banner-reverse'
                            : ''
                    }`}>
                    <div className="container">
                        <div
                            className={`zigzag-wrapper ${
                                showBackground === expWidgetConstants?.WIDGET_CHECK_TRUE
                                    ? 'has-background'
                                    : ''
                            }`}
                            style={
                                showBackground === expWidgetConstants?.WIDGET_CHECK_TRUE
                                    ? backgroundStyle
                                    : {}
                            }>
                            <div className="flex flex-wrap">
                                <div className="col-6 col-tab-12 banner-content flex align-center">
                                    <div className="banner-content-inner">
                                        <div className="banner-content-icon">
                                            {
                                                mappingObj.logoImage && <Image
                                                    priority={true}
                                                    src={mappingObj.logoImage}
                                                    width={160}
                                                    height={100}
                                                    alt="Picture of the author"
                                                />
                                            }

                                            {/*{!!mappingObj?.logoImage?.length && (*/}
                                            {/*  <ExpCustomImageRenderer*/}
                                            {/*    dataSource={dataSource}*/}
                                            {/*    staticWidthArr={staticWidthArrLogo}*/}
                                            {/*    imageData={imageData}*/}
                                            {/*    contentLibraryImageData={mappingObj?.logoImage}*/}
                                            {/*    height="100"*/}
                                            {/*    width="160"*/}
                                            {/*    loading="lazy"*/}
                                            {/*  />*/}
                                            {/*)}*/}
                                        </div>

                                        <h2
                                            style={titleStyle}
                                            dangerouslySetInnerHTML={{
                                                __html: mappingObj?.headingText
                                                    ? mappingObj?.headingText
                                                    : 'Add Title',
                                            }}
                                            className={`m-b-24 ${titleSize}`}
                                        />

                                        <p
                                            style={tagLineStyle}
                                            dangerouslySetInnerHTML={{
                                                __html: mappingObj?.tagLine
                                                    ? mappingObj?.tagLine
                                                    : 'Add Tag Line',
                                            }}
                                            className="medium"
                                        />

                                        {(mappingObj?.primaryButtonText || true) && (
                                            <ExpLinkParser
                                                style={linkParserStyle({
                                                    buttonHoverColor: {value: buttonHoverColor},
                                                    buttonTextHoverColor: {value: buttonTextHoverColor},
                                                    buttonColor: {value: buttonColor},
                                                    buttonTextColor: {value: buttonTextColor},
                                                })}
                                                dangerouslySetInnerHTML={{
                                                    __html: mappingObj?.primaryButtonText
                                                        ? mappingObj?.primaryButtonText
                                                        : 'Add Button Text',
                                                }}
                                                className="button fill-button"
                                                to={mappingObj?.primaryButtonLink}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="col-6 col-tab-12 banner-image">
                                    <div className="has-image-fill banner-image-1 scale-img">
                                        {/*<ExpCustomImageRenderer*/}
                                        {/*  dataSource={dataSource}*/}
                                        {/*  staticWidthArr={staticWidthArr}*/}
                                        {/*  imageData={imageData}*/}
                                        {/*  contentLibraryImageData={mappingObj?.bannerImageLink}*/}
                                        {/*  height="790"*/}
                                        {/*  width="616"*/}
                                        {/*  loading="lazy"*/}
                                        {/*/>*/}
                                        <Image
                                            priority={true}
                                            src={getImageUrl(mappingObj?.bannerImageLink)}
                                            width={160}
                                            height={100}
                                            alt="Picture of the author"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default ExpZigZagBanner;
