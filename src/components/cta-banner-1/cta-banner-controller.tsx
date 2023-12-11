'use client'

import {CSSProperties, useEffect} from 'react';
import {ContentService} from '../../services/content-service';
import {ExpImageParser} from '../../cms-utils/image-parser';
import {expDataSourceConstants} from '../../cms-utils';
import {ExpSetScreenView} from '../../cms-utils/set-screen-view';
// import {getContentLibraryData} from '../../../utils/get-content-library-data';
import {ContentModelDataInterface} from '../../interfaces/content-model-data.interface';
import {expColorObjectParser, model_internal_name} from '../../cms-utils';
import {
    expCommonDispatcherKeys,
    ExpComponentDataDispatcher,
} from '../../cms-utils/component-data-dispatcher';

interface ExpCTABannerControllerProps {
    id: string;
    component_content: any;
    titleColor?: string;
    subTitleTextColor?: string;
    backgroundColor?: string;
    bannerType?: string;
    tagLineTextColor?: string;
    componentFieldData: any
}

/**
 * Controller function for all the ExpCTABanner components.
 * @param props - The controller props.
 * @returns The controller result.
 */
const ExpCTABannerController = (props: ExpCTABannerControllerProps) => {
    const {
        id,
        component_content,
        titleColor,
        subTitleTextColor,
        backgroundColor,
        bannerType,
        tagLineTextColor,
        componentFieldData
    } = props;

    const modelKeyForSSR = 'cta-ssr';
    const {
        contentModel,
        dataSource,
        headingText,
        subHeadingText,
        backgroundImage,
        buttonText,
        buttonLink,
        buttonTarget,
        modelInternalName,
        tagLine,
        imageData,
    } = JSON.parse(component_content === undefined ? '{}' : component_content);
    const {FREE_FORM} = expDataSourceConstants;

    const viewTypeArr = ['desktop', 'tablet', 'mobile'];

    const handleFreeFormImageData = () => {
        viewTypeArr.forEach((view: string) => {
            if (imageData[view]?.mediaManagerUrl?.length) {
                if (
                    !imageData[view]?.mediaManagerUrl?.includes(
                        model_internal_name.image_url_prefix
                    )
                ) {
                    const image = ExpImageParser(imageData[view]?.mediaManagerUrl);
                    imageData[view]['mediaManagerUrl'] = image?.imageUrl;
                    imageData[view]['altText'] = image?.altText;
                    imageData[view]['caption'] = image?.caption;
                }
            }
        });
    };

    if (dataSource === FREE_FORM && Object.keys(imageData || {})?.length) {
        handleFreeFormImageData();
    }

    const {
        setComponentDataDispatcher,
        componentDataDispatcher,
        isComponentLoaded,
    } = ExpComponentDataDispatcher({
        id,
        modelInternalName,
        modelKeyForSSR: modelKeyForSSR,
    });

    let mappingObj: any = {};
    const {view, windowSizeChange} = ExpSetScreenView({
        backgroundImage,
        imageData,
        mappingObj,
    });

    mappingObj = {
        headingText: ContentService.parseVariableSafeValue(headingText),
        subHeadingText: ContentService.parseVariableSafeValue(subHeadingText),
        backgroundImage: ContentService.parseVariableSafeValue(
            typeof imageData === 'object'
                ? imageData[view].imageUrl.length
                    ? imageData[view].imageUrl
                    : imageData[view].mediaManagerUrl.length &&
                    imageData[view].mediaManagerUrl
                : backgroundImage
        ),
        tagLine: ContentService.parseVariableSafeValue(tagLine),
        buttonText: ContentService.parseVariableSafeValue(buttonText),
        buttonLink: ContentService.parseVariableSafeValue(buttonLink),
        buttonTarget: ContentService.parseVariableSafeValue(buttonTarget),
        backgroundImageWidth: ContentService.parseVariableSafeValue(
            typeof imageData === 'object'
                ? imageData[view].imageUrl.length ||
                imageData[view].mediaManagerUrl.length
                    ? imageData[view].width
                    : ''
                : ''
        ),
    };

    let contentLibraryMappingObj: any;
    if (
        dataSource === expDataSourceConstants.CONTENT_LIBRARY &&
        componentFieldData
    ) {
        contentLibraryMappingObj = {
            headingText: ContentService.parseVariableSafeValue(
                componentFieldData?.heading_et
            ),
            subHeadingText: ContentService.parseVariableSafeValue(
                componentFieldData?.sub_heading_et
            ),
            buttonText: ContentService.parseVariableSafeValue(
                componentFieldData?.button_com
                    ? componentFieldData?.button_com[0]?.button_text_et
                    : ''
            ),
            buttonLink: ContentService.parseVariableSafeValue(
                componentFieldData?.button_com
                    ? componentFieldData?.button_com[0]?.button_link_et
                    : ''
            ),
            buttonTarget: ContentService.parseVariableSafeValue(
                componentFieldData?.button_com
                    ? componentFieldData?.button_com[0]
                        ?.button_target_et
                    : ''
            ),
            backgroundImage:
                componentFieldData?.cta_image_emd &&
                `${
                    ExpImageParser(
                        componentFieldData?.cta_image_emd &&
                        componentFieldData?.cta_image_emd[0]
                    )?.imageUrl
                }`,
            tagLine:
                componentFieldData?.tag_line_et?.length &&
                componentFieldData?.tag_line_et,
        };
    }
    if (dataSource === expDataSourceConstants?.CONTENT_LIBRARY) {
        mappingObj = Object.assign(mappingObj, contentLibraryMappingObj);
    }

    let parsedContentModel: ContentModelDataInterface | undefined;

    if (contentModel?.trim().length)
        parsedContentModel = JSON.parse(contentModel);

    // useEffect(() => {
    //   if (dataSource === expDataSourceConstants.FREE_FORM) {
    //     setComponentDataDispatcher({
    //       type: expCommonDispatcherKeys.initializingFreeForm,
    //     });
    //   } else if (dataSource === expDataSourceConstants.CONTENT_LIBRARY) {
    //     if (isComponentLoaded) {
    //       setComponentDataDispatcher({
    //         type: expCommonDispatcherKeys.fetchingData,
    //       });
    //       if (contentModel?.trim()?.length) {
    //         (async () => {
    //           setComponentDataDispatcher({
    //             type: expCommonDispatcherKeys.dataFetched,
    //             data: await getContentLibraryData(
    //               parsedContentModel,
    //               modelInternalName,
    //               modelKeyForSSR,
    //               id
    //             ),
    //           });
    //         })();
    //       }
    //     }
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [contentModel, dataSource]);

    const titleTextStyle: CSSProperties = {
        color: expColorObjectParser(titleColor),
    };
    const descriptionTextColor: CSSProperties = {
        color: expColorObjectParser(subTitleTextColor),
    };
    const tagLineStyle: CSSProperties = {
        color: expColorObjectParser(tagLineTextColor),
    };
    const divCustomStyle: CSSProperties = {
        backgroundColor: expColorObjectParser(backgroundColor),
    };
    const divCustomStyleForImage: CSSProperties = {
        backgroundImage: `url(${mappingObj.backgroundImage})`,
        backgroundSize: mappingObj?.backgroundImageWidth,
        backgroundColor: 'lightgray',
    };

    if (mappingObj.backgroundImage && bannerType === 'heroBanner') {
        divCustomStyle['backgroundImage'] = `url(${mappingObj.backgroundImage})`;
        divCustomStyle['backgroundSize'] = `${mappingObj.backgroundImageWidth}px`;
    }

    useEffect(() => {
        window.addEventListener('resize', function () {
            windowSizeChange();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        mappingObj,
        imageData,
        view,
        backgroundImage,
        dataSource,
        contentModel,
        componentDataDispatcher,
        titleTextStyle,
        descriptionTextColor,
        divCustomStyleForImage,
        divCustomStyle,
        tagLineStyle,
    };
};

export default ExpCTABannerController;
