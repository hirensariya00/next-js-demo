'use client'

import {CSSProperties, useEffect} from 'react';
import {ContentService} from '../../services/content-service';
import {ContentModelDataInterface} from '../../interfaces/content-model-data.interface';
import {getContentLibraryData} from '../../cms-utils/get-content-library-data';
import {ExpHandleReactModalData} from '../../cms-utils/handle-react-model-data';
import {
    expCommonDispatcherKeys,
    ExpComponentDataDispatcher,
} from '../../cms-utils/component-data-dispatcher';
import {expColorObjectParser, expDataSourceConstants} from '../../cms-utils';

interface ExpZigZagControllerProps {
    component_content: any;
    id: string;
    titleColor: string;
    backgroundColor: string;
    tagLineColor: string;
    componentFieldData: any
}

/**
 * Controller function for all the ZigZag components.
 * @param props - The controller props.
 * @returns The controller result.
 */
const ExpZigZagController = (props: ExpZigZagControllerProps) => {
    const {component_content, id, componentFieldData} = props;

    const modelKeyForSSR = 'zig-zag-ssr';
    const {
        primaryButtonText,
        primaryButtonLink,
        headingText,
        subHeadingText,
        tagLineText,
        dataSource,
        contentModel,
        modelInternalName,
        imageData,
        headingColor,
        tagLineColor,
        backgroundColor,
    } = JSON.parse(component_content === undefined ? '{}' : component_content);
    const {
        setComponentDataDispatcher,
        componentDataDispatcher,
        isComponentLoaded,
    }: any = ExpComponentDataDispatcher({
        id,
        modelInternalName: modelInternalName,
        modelKeyForSSR: modelKeyForSSR,
    });

    let mappingObj = {
        headingText: ContentService.parseVariableValue(headingText),
        subHeadingText: ContentService.parseVariableValue(subHeadingText),
        tagLine: ContentService.parseVariableValue(tagLineText),
        primaryButtonText: ContentService.parseVariableValue(primaryButtonText),
        bannerImageLink: imageData,
        primaryButtonLink: primaryButtonLink,
        logoImage: '',
    };

    let contentLibraryMappingObj: any;
    if (
        dataSource === expDataSourceConstants?.CONTENT_LIBRARY &&
        componentDataDispatcher
    ) {
        contentLibraryMappingObj = {
            headingText: ContentService.parseVariableValue(
                componentFieldData?.heading_et
            ),
            subHeadingText: ContentService.parseVariableValue(
                componentFieldData?.sub_heading_et
            ),
            tagLine: ContentService.parseVariableValue(
                componentFieldData?.tag_line_et
            ),
            primaryButtonText: ContentService.parseVariableValue(
                componentFieldData?.primary_button_text_et
                    ? componentFieldData?.primary_button_text_et
                    : componentFieldData?.layout_button_com?.length &&
                    componentFieldData?.layout_button_com[0]
                        .button_text_et
            ),
            primaryButtonLink: componentFieldData
                ?.primary_button_link_et
                ? componentFieldData?.primary_button_link_et
                : componentFieldData?.layout_button_com?.length &&
                componentFieldData?.layout_button_com[0]
                    .button_link_et,
            logoImage: componentFieldData?.banner_title_icon_emd
                ?.length
                ? componentFieldData?.banner_title_icon_emd[0]
                : '',
            bannerImageLink: componentFieldData?.layout_image_emd
                ?.length
                ? componentFieldData?.layout_image_emd[0]
                : '',
        };
    }

    if (dataSource === expDataSourceConstants.CONTENT_LIBRARY) {
        mappingObj = Object.assign(mappingObj, contentLibraryMappingObj);
    }

    let parsedContentModel: ContentModelDataInterface | undefined;

    if (contentModel?.trim().length)
        parsedContentModel = JSON.parse(contentModel);

    // useEffect(() => {
    //   if (isComponentLoaded) {
    //     if (dataSource === expDataSourceConstants?.FREE_FORM) {
    //       setComponentDataDispatcher({
    //         type: expCommonDispatcherKeys?.initializingFreeForm,
    //       });
    //     } else {
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

    const titleStyle: CSSProperties = {
        color: expColorObjectParser({value: headingColor}),
    };
    const tagLineStyle: CSSProperties = {
        color: expColorObjectParser({value: tagLineColor}),
    };
    const backgroundStyle: CSSProperties = {
        backgroundColor: expColorObjectParser({value: backgroundColor}),
    };

    /** *******************MODAL********************** */
    const {modalData, modalIsOpen, modalToShow, setIsOpen} =
        ExpHandleReactModalData({componentDataDispatcher});

    const getImageUrl = (image: any) => {
        let imagesUrl = ''
        if (image) {
            try {
                imagesUrl = JSON.parse(image)
            } catch (e) {

            }
        }
        return imagesUrl.publicUrl
    }

    return {
        tagLineStyle,
        mappingObj,
        dataSource,
        imageData,
        contentModel,
        titleStyle,
        componentDataDispatcher,
        modalToShow,
        modalIsOpen,
        modalData,
        setIsOpen,
        backgroundStyle,
        getImageUrl
    };
};

export default ExpZigZagController;
