'use client'

// import { IsCMSApp } from 'experro-storefront';
// import ExpLinkParser from '../../../utils/link-parser';
// import ExpCTABannerController from './cta-banner-controller';
// import { ExpLoadingPlaceholder } from '../../common-components/loading-placeholder';
// import { linkParserStyle } from '../../../utils/link-parser-style';
// import {
//   expDataSourceConstants,
//   expWidgetConstants,
// } from '../../../utils/constants';

export interface ExpCTABannerProps {
    titleColor: string;
    tagLineTextColor: string;
    component_content: any;
    buttonTarget: string;
    buttonColor: string;
    buttonTextColor: string;
    buttonHoverColor: string;
    buttonTextHoverColor: string;
    showHeadingText: string;
    showTagLine: string;
    contentPosition: string;
    bannerType: string;
    id: string;
}

/**
 * Renders a CTA Banner component.
 * @param props - The CTA banner component props.
 * @returns The rendered CTA banner component.
 */
const ExpCTABanner = (props: ExpCTABannerProps) => {
    const {
        // titleColor,
        // tagLineTextColor,
        // component_content,
        // buttonTarget,
        // buttonColor,
        // buttonTextColor,
        // buttonHoverColor,
        // buttonTextHoverColor,
        // showHeadingText,
        // showTagLine,
        // contentPosition,
        // bannerType,
        // id,
        componentData
    } = props;
    // const { CONTENT_LIBRARY, FREE_FORM } = expDataSourceConstants;
    // const {
    //   mappingObj,
    //   componentDataDispatcher,
    //   dataSource,
    //   contentModel,
    //   titleTextStyle,
    //   divCustomStyleForImage,
    //   tagLineStyle,
    // } = ExpCTABannerController({
    //   id,
    //   component_content,
    //   titleColor,
    //   tagLineTextColor,
    //   bannerType,
    // });

    return (
        <>
            {/*{!!(dataSource === CONTENT_LIBRARY) && (*/}
            {/*  <ExpLoadingPlaceholder*/}
            {/*    loaderClassName="liquid-image-banner-section"*/}
            {/*    contentModel={contentModel}*/}
            {/*    isLoading={componentDataDispatcher.isLoading}*/}
            {/*    componentData={componentDataDispatcher.componentData}*/}
            {/*  />*/}
            {/*)}*/}

            {componentData && (
                <>
                    <style>
                        {`#${"id"} .button.buttonStyle:hover {
              background-color: var(--button-hover-bg-color) !important;

              color: var(--button-hover-color) !important;
            }
              #${"id"} .button.buttonStyle {
              background-color: var(--button-bg-color) !important;

              color: var(--button-color) !important;
            }`}
                    </style>

                    <section className="liquid-image-banner-section section-gap">
                        <div
                            // style={divCustomStyleForImage}
                            className="liquid-image-banner"
                            suppressHydrationWarning>
                            {componentData && (
                                <div
                                    className={`container flex image-banner-inner`}>
                                    <div className="image-caption">
                                        {/*{showHeadingText ===*/}
                                        {/*    expWidgetConstants.WIDGET_CHECK_TRUE && (*/}
                                        <h3
                                            // style={titleTextStyle}
                                            suppressHydrationWarning
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    componentData.heading_et?.length
                                                        ? componentData.heading_et
                                                        : 'Please Enter Title',
                                            }}
                                        />
                                        {/*)}*/}

                                        {/*{showTagLine === expWidgetConstants.WIDGET_CHECK_TRUE && (*/}
                                        <p
                                            // style={tagLineStyle}
                                            suppressHydrationWarning
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    componentData.tag_line_et?.length
                                                        ? componentData.tag_line_et
                                                        : 'Please Enter Tag Line',
                                            }}
                                        />
                                        {/*)}*/}

                                        {componentData.button_com.length > 0 && (
                                            componentData.button_com.map((item, index) => (
                                                <button onClick={() => {
                                                    console.log('test', item?.button_target_es)
                                                }}>{item.button_text_et}</button>
                                            ))
                                        )

                                        }

                                        {/*{!!mappingObj.buttonText?.length && (*/}
                                        {/*  <ExpLinkParser*/}
                                        {/*    style={linkParserStyle({*/}
                                        {/*      buttonHoverColor,*/}
                                        {/*      buttonTextHoverColor,*/}
                                        {/*      buttonColor,*/}
                                        {/*      buttonTextColor,*/}
                                        {/*    })}*/}
                                        {/*    target={buttonTarget}*/}
                                        {/*    dangerouslySetInnerHTML={{*/}
                                        {/*      __html: mappingObj.buttonText,*/}
                                        {/*    }}*/}
                                        {/*    to={mappingObj.buttonLink}*/}
                                        {/*    className="button buttonStyle hoverStyle button_style hover_button_style"*/}
                                        {/*  />*/}
                                        {/*)}*/}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default ExpCTABanner;
