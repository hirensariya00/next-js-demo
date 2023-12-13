'use client'

import ExpUSPController from './usp-controller';
import ExpLinkParser from '../../cms-utils/link-parser';
// import {ExpLoadingPlaceholder} from '../../common-components/loading-placeholder';
// import {ExpCustomImageRenderer} from '../../common-components/custom-image-rendrer';
import {expDataSourceConstants, expWidgetConstants} from '../../cms-utils';
import Image from "next/image";


export interface ExpUSPBannerProps {
    id: string;
    component_content: any;
    showHeadingText: string;
    headingSize: string;
    headingPosition: string;
    headingColor: string;

    componentFieldData: any
}

/**
 * Renders an USP Banner component.
 * @param props - The USP Banner component props.
 * @returns Rendered USP Banner component.
 */
const ExpUSPBanner = (props: ExpUSPBannerProps) => {
    const {
        id,
        component_content,
        showHeadingText,
        headingSize,
        headingPosition,
        headingColor,
        componentFieldData
    } = props;
    const staticWidthArr: string[] = ['80'];

    const {componentDataDispatcher, contentModel, headingTextStyle, getImageUrl} =
        ExpUSPController({
            id,
            component_content,
            headingColor,
        });
    return (
        <>
            {componentFieldData?.id && (
                <div className="usp-banner section-gap scrollbar-hide">
                    {componentFieldData?.heading_et &&
                        showHeadingText === expWidgetConstants?.WIDGET_CHECK_TRUE && (
                            <h4
                                className={`${headingSize} ${headingPosition} m-b-56`}
                                style={headingTextStyle}
                                dangerouslySetInnerHTML={{
                                    __html: componentFieldData?.heading_et,
                                }}
                            />
                        )}
                    <div className="container">
                        <div className="usp-banner-inner usp-banner-bg">
                            <div className="row usp-space">
                                {componentFieldData?.usp_banner_com?.map(
                                    (item: any, index: number) => (
                                        <div
                                            key={index.toString()}
                                            className="col flex usp-item flex justify-center">
                                            <ExpLinkParser
                                                to={`${item?.usp_link_et ? item?.usp_link_et : ''}`}
                                                className="flex flex-wrap flex-direction align-center">
                                                <div className="usp-icon">
                                                    <Image
                                                        // priority={true}
                                                        src={getImageUrl(item?.usp_icon_emd)}
                                                        width={80}
                                                        height={80}
                                                        alt="Picture of the author"
                                                    />
                                                    {/*<ExpCustomImageRenderer*/}
                                                    {/*    dataSource={*/}
                                                    {/*        expDataSourceConstants?.CONTENT_LIBRARY*/}
                                                    {/*    }*/}
                                                    {/*    contentLibraryImageData={*/}
                                                    {/*        item?.usp_icon_emd ? item?.usp_icon_emd[0] : ''*/}
                                                    {/*    }*/}
                                                    {/*    height="80"*/}
                                                    {/*    width="80"*/}
                                                    {/*    staticWidthArr={staticWidthArr}*/}
                                                    {/*/>*/}
                                                </div>
                                                <div className="usp-name">
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                item?.usp_title_et && item?.usp_title_et,
                                                        }}
                                                    />
                                                </div>
                                            </ExpLinkParser>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExpUSPBanner;
