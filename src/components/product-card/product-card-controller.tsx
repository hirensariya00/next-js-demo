'use client'

import {CSSProperties, useCallback, useEffect, useState} from 'react';
import {ContentService} from '../../services/content-service';
import {EcommerceService} from '../../services/ecommerce-service';
import generateQuery from '../../cms-utils/generate-query';
import {expDataSourceConstants} from '../../cms-utils/constants';
// import {getContentLibraryData} from '../../cms-utils/get-content-library-data';
import {ContentModelDataInterface} from '../../interfaces/content-model-data.interface';
import {expColorObjectParser} from '../../cms-utils';
import {
    ExpComponentDataDispatcher,
    expCommonDispatcherKeys,
} from '../../cms-utils/component-data-dispatcher';

interface ExpProductCardControllerProps {
    id: string;
    titleColor?: any;
    component_content?: string;
    componentFieldData: string
}

const ExpProductCardController = (props: ExpProductCardControllerProps) => {
    const {id, titleColor, component_content, componentFieldData} = props;
    let contentLibraryMappingObj: any;
    let parsedContentModel: ContentModelDataInterface | undefined;
    const modelKeyForSSR = 'ps-ssr';
    const [productsData, setProductsData] = useState<any>();
    const [productsDataLoading, setProductsDataLoading] =
        useState<boolean>(false);
    const title_style: CSSProperties = {
        color: expColorObjectParser(titleColor),
    };

    const {
        displayAs,
        dataSource,
        limit,
        contentModel,
        modelInternalName,
        imageData,
        tagLine,
        image_heading,
        buttonText,
        buttonLink,
        sourceKey,
        sourceValue,
        query,
        operator,
    } = JSON.parse(component_content === undefined ? '{}' : component_content);

    let mappingObj = {
        backgroundImage: imageData,
        headingText: ContentService.parseVariableSafeValue(image_heading),
        description: ContentService.parseVariableSafeValue(tagLine),
        buttonText: ContentService.parseVariableSafeValue(buttonText),
        buttonLink: ContentService.parseVariableSafeValue(buttonLink),
        sourceKey: sourceKey,
        sourceValue: sourceValue,
    };

    const {
        setComponentDataDispatcher,
        componentDataDispatcher,
        isComponentLoaded,
    } = ExpComponentDataDispatcher({
        id,
        modelInternalName,
        modelInternalNameSuffix: modelKeyForSSR,
    });

    if (dataSource === expDataSourceConstants?.CONTENT_LIBRARY) {
        contentLibraryMappingObj = {
            headingText: ContentService.parseVariableSafeValue(
                componentFieldData?.heading_et
            ),
            description: ContentService.parseVariableSafeValue(
                componentFieldData?.description_et
            ),
            buttonText: ContentService.parseVariableSafeValue(
                componentFieldData?.title_image_button_com
                    ? componentFieldData?.title_image_button_com[0]
                        ?.button_text_et
                    : ''
            ),
            buttonLink: ContentService.parseVariableSafeValue(
                componentFieldData?.title_image_button_com
                    ? componentFieldData?.title_image_button_com[0]
                        ?.button_link_et
                    : ''
            ),
            backgroundImage: componentFieldData?.title_image_emd
                ?.length
                ? componentFieldData?.title_image_emd[0]
                : '',
            sourceKey: componentFieldData
                ?.products_by_filter_query_et
                ? 'filter'
                : componentFieldData.product_by_sku_list_et
                    ? 'sku'
                    : '',
            sourceValue: componentFieldData
                .products_by_filter_query_et
                ? componentFieldData.products_by_filter_query_et
                : componentFieldData.product_by_sku_list_et
                    ? componentFieldData.product_by_sku_list_et
                    : '',
        };
    }

    if (dataSource === expDataSourceConstants?.CONTENT_LIBRARY) {
        mappingObj = Object.assign(mappingObj, contentLibraryMappingObj);
    }
    /**
     * slideKey will be passed in slider as key,
     * Problem : Slider was not getting  re-renderd at a time of changing props (in our case options from ui-builder)
     * solution : key for any compenent we are giving each time key gets updated and that  will make whole component to
     *            re-render and new settings will gets applied ,
     *            Date.now() we have passed and  this will be unique each time.
     *            That  will be passed in useEffect, giving dependacy for is_auto_play in our case, will set sliderKey that time.
     */

    if (contentModel?.trim().length) {
        parsedContentModel = JSON.parse(contentModel);
    }

    // Get product source wise
    const getProducts = useCallback(
        async ({
                   queryParse,
               }: {
            queryParse: string;
            freeFormSourceKey: any;
            freeFromSourceValue: any;
        }) => {
            setProductsDataLoading(true);
            let apiProdutsData;
            try {
                if (
                    dataSource === expDataSourceConstants?.CONTENT_LIBRARY &&
                    mappingObj?.sourceKey?.length &&
                    mappingObj?.sourceValue?.length
                ) {
                    apiProdutsData = await EcommerceService.search({
                        searchObj: {
                            body: {
                                filter:
                                    mappingObj?.sourceKey === 'filter'
                                        ? {fq: mappingObj?.sourceValue}
                                        : {
                                            sku_esi: mappingObj?.sourceValue?.split(','),
                                        },
                            },
                            fieldsToQuery:
                                'images_ej,price_efi,retail_price_ef,custom_url,page_slug_esi,calculated_price_efi,sale_price_efi,categories_tree_ej,variant_options_ej,variants_ej,provider_specific_data_ej,brand_esi,sku_for_analytics_esli',
                            skip: 0,
                            limit: limit ? limit : 4,
                        },
                    });
                    setProductsData(apiProdutsData);
                }
                if (dataSource === expDataSourceConstants?.FREE_FORM && queryParse) {
                    apiProdutsData = await EcommerceService.search({
                        searchObj: {
                            body: {
                                filter: {
                                    fq:
                                        queryParse.includes('AND') || queryParse.includes('OR')
                                            ? `(${queryParse})`
                                            : queryParse,
                                },
                            },
                            fieldsToQuery:
                                'images_ej,price_efi,retail_price_ef,custom_url,page_slug_esi,calculated_price_efi,sale_price_efi,categories_tree_ej,variant_options_ej,variants_ej,provider_specific_data_ej,brand_esi,sku_for_analytics_esli',
                            skip: 0,
                            limit: limit ? limit : 4,
                        },
                    });
                    setProductsData(apiProdutsData);
                }
            } catch (error: any) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
            setProductsDataLoading(false);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            dataSource,
            limit,
            componentDataDispatcher,
            modelInternalName,
            parsedContentModel?.current_version_id,
            parsedContentModel?.id,
        ]
    );

    // useEffect(() => {
    //     if (dataSource === expDataSourceConstants.FREE_FORM) {
    //         setComponentDataDispatcher({
    //             type: expCommonDispatcherKeys.initializingFreeForm,
    //         });
    //     } else if (dataSource === expDataSourceConstants.CONTENT_LIBRARY) {
    //         if (isComponentLoaded) {
    //             setComponentDataDispatcher({
    //                 type: expCommonDispatcherKeys.fetchingData,
    //             });
    //             if (contentModel?.trim()?.length) {
    //                 (async () => {
    //                     setComponentDataDispatcher({
    //                         type: expCommonDispatcherKeys.dataFetched,
    //                         data: await getContentLibraryData(
    //                             parsedContentModel,
    //                             modelInternalName,
    //                             modelKeyForSSR,
    //                             id
    //                         ),
    //                     });
    //                 })();
    //             }
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [contentModel, dataSource]);

    const str = useCallback(() => {
        const string = query
            ?.map((ele: any) => {
                return generateQuery(
                    ele['condition'],
                    ele['field'],
                    ele['value'].split(',').map((i: any) => i.trim())
                );
            })
            .join(` ${operator} `);
        return string;
    }, [operator, query]);

    useEffect(() => {
        const queryParse = str();
        getProducts({
            freeFormSourceKey: sourceKey,
            freeFromSourceValue: sourceValue,
            queryParse,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        componentDataDispatcher,
        mappingObj?.sourceKey,
        mappingObj?.sourceValue,
        limit,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        str(),
    ]);

    return {
        title_style,
        displayAs,
        productsData,
        dataSource,
        imageData,
        mappingObj,
        productsDataLoading,
        contentModel,
        componentDataDispatcher,
    };
};

export default ExpProductCardController;
