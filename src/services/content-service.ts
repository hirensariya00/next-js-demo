//@ts-nocheck

import {CommonUtilities, Http} from '../utilities';
import DOMPurify from 'dompurify';
import {getUIBuilderMediaHost, getAppMediaHost} from '../utilities/get-media-hostname';

interface GetPageDataRequest {
    pageSlug: string;
    versionId?: string;
    lang?: string;
}

interface GetSingleTypeContentRequest {
    versionId: string;
    modelName: string;
    componentId: string;
    ssrKey: string;
    enableSSR: boolean;
}

interface GetCollectionContentByIdRequest {
    id: string | undefined;
    versionId: string | undefined;
    modelName: string;
    componentId: string;
    ssrKey: string;
    enableSSR: boolean;
}

interface GetCollectionRecordsByInternalName {
    modelInternalName: string;
}

interface GetContentModelRecordsByFieldKeyValue {

    modelInternalName: string;
    fieldKey: string;
    fieldValue: string;
    fieldsToQuery: string;
    sortBy?: string;
    sortType?: string;
    contentDataSortBy?: string; // when we want records to be sorted by the STATIC fields like, (created_at,modified_at, any_id's
                                // e.g(content_data_model_idm or id, etc.) at that time need to provide same field in
                                // [sortBy and contentDataSortBy] to get the result in sorted manner, else for dynamic fields like,
                                // (page_title_esi, publish_date_esi, etc.) just need to provide [sortBy and sortType])
    limit?: string;
    skip?: string;
    relationField?: string;
    relationFieldDataToQuery?: string;
    filter?: any;
    enableSSR?: any;
    fieldType?: 'parent' | 'child'
}

export class ContentService {
    private static __pageData__: any;

    static async getPageDataBySlug({
                                       pageSlug,
                                       versionId,
                                       lang,
                                   }: GetPageDataRequest) {
        // if (!pageSlug.endsWith('/')) {
        //   pageSlug = pageSlug + '/';
        //   window.location.href=window.location.href+'/';
        // }
        if (!pageSlug.endsWith('/')) {
            pageSlug = pageSlug + '/';
            window.location.pathname = pageSlug;
        }
        const urlParams = new URLSearchParams(window.location.search);
        const appendQuery = urlParams.get('aq');

        let url = `/apis/content/v1/collection/find-by-slug?page_slug=${pageSlug}`;
        if (versionId) {
            url += `&version_id=${versionId}`;
        }
        if (appendQuery === 'true') {
            url += `&isAuto=true&searchTerm=${urlParams.get('st')}`
        }
        const response = await Http.get({
            key: 'page',
            url: url,
            componentId: '',
            enableSSR: true,
            language: lang,
        });
        if (response.data.Status === 'success') {
            return response.data.Data;
        } else {
            throw new Error('ObjectNotFound');
        }
    }

    static async getCollectionRecordsByCollectionInternalName({
                                                                  modelInternalName,
                                                              }: GetCollectionRecordsByInternalName) {
        const url = `/apis/content/v1/contents/content-data/${modelInternalName}?fieldsToQuery=id,title,current_version_id,published_version_id`;
        const response = await Http.get({
            key: 'collection-record',
            url: url,
            componentId: '',
            enableSSR: false,
        });
        if (response.data.Status === 'success') {
            return response.data.Data;
        } else {
            throw new Error('ObjectNotFound');
        }
    }

    static async getCollectionTypeContentById({
                                                  id,
                                                  versionId,
                                                  modelName,
                                                  componentId,
                                                  ssrKey,
                                                  enableSSR,
                                              }: GetCollectionContentByIdRequest) {
        const url = `/apis/content/v1/collection/${modelName}/${id}?`;
        const response = await Http.get({
            key: ssrKey,
            url: url,
            componentId,
            enableSSR,
        });
        if (response.data.Status === 'success') {
            return response.data.Data;
        } else {
            throw new Error('ObjectNotFound');
        }
    }

    static async getSingleTypeContent({
                                          versionId,
                                          modelName,
                                          componentId,
                                          ssrKey,
                                          enableSSR,
                                      }: GetSingleTypeContentRequest) {
        let url = `/apis/content/v1/single/${modelName}/detail?`;
        if (versionId) {
            url += `version_id=${versionId}`;
        }
        const response = await Http.get({
            key: ssrKey,
            url: url,
            componentId,
            enableSSR,
        });
        if (response.data.Status === 'success') {
            return response.data.Data;
        } else {
            throw new Error('ObjectNotFound');
        }
    }

    static async getMenuById(menuId) {
        try {
            const url = `/apis/menu-service/public/v1/menu-items-by-language/${menuId}?dataFieldsToQuery=id,internal_name,title,page_slug,current_version_id`;
            const response = await Http.get({
                key: 'menu-exp-cmp',
                url: url,
                componentId: menuId,
                enableSSR: true,
            });
            if (response && response.data) {
                return response.data;
            } else {
                throw new Error('ObjectNotFound');
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    static async getContentModelRecordsByFieldKeyValue({
                                                           modelInternalName,
                                                           fieldKey,
                                                           fieldValue,
                                                           fieldsToQuery,
                                                           sortBy,
                                                           sortType,
                                                           limit,
                                                           skip,
                                                           relationField,
                                                           relationFieldDataToQuery,
                                                           filter,
                                                           contentDataSortBy,
                                                           enableSSR = true,
                                                           fieldType = 'parent'
                                                       }: GetContentModelRecordsByFieldKeyValue) {
        try {
            let url = `/apis/content/v1/collection/find-by-field?field_name=${fieldKey}&field_value=${fieldValue}&internal_name=${modelInternalName}&fieldsDataToQuery=${fieldsToQuery}`;

            if (sortBy)
                url += `&sort_by=${sortBy}`;
            if (sortType)
                url += `&order_by=${sortType}`;
            if (limit)
                url += `&limit=${limit}`;
            if (skip)
                url += `&skip=${skip}`;
            if (relationField)
                url += `&relation_field=${relationField}`;
            if (relationFieldDataToQuery)
                url += `&relationFieldDataToQuery=${relationFieldDataToQuery}`;
            if (filter)
                url += `&filter=${filter}`;
            if (contentDataSortBy)
                url += `&content_data_sort_by=${contentDataSortBy}`;
            if (fieldType)
                url += `&field_type=${fieldType}`

            const response = await Http.get({
                key: modelInternalName,
                url: url,
                componentId: fieldKey,
                enableSSR: enableSSR,
            });
            if (response && response.data) {
                return response.data;
            } else {
                throw new Error('ObjectNotFound');
            }
        } catch (e) {
            throw new Error('ObjectNotFound');
        }
    }

    static getPageData() {
        return this.__pageData__;
    }

    static setPageData(pageData) {
        this.__pageData__ = pageData;
    }

    static parseVariableSafeValue(variableName) {
        return variableName;
        // return DOMPurify.sanitize(variableName);
    }

    static parseVariableValue(variableName) {
        try {
            const pageData = this.__pageData__;
            // console.log(pageData);
            let returnValue = variableName;
            if (
                variableName &&
                variableName.startsWith('{') &&
                variableName.endsWith('}')
            ) {
                const tmp = variableName.replace('{', '').replace('}', '');
                returnValue = this.parseVariableSafeValue(eval(tmp));
            }
            if (returnValue && returnValue.indexOf('pageData.STORE_HASH') >= 0) {
                if (CommonUtilities.getEnvironmentType() === 'PRODUCTION') {
                    returnValue = returnValue.replace(/\{pageData.STORE_HASH\}/ig, '');
                } else {
                    returnValue = returnValue.replace(/\{pageData.STORE_HASH\}/ig, `/${pageData.STORE_HASH}`);
                }
            }
            return this.parseVariableSafeValue(returnValue);
        } catch (e) {
            console.error(e);
            return variableName;
        }
    }

    static prepareImageUrl({imagePath, fileType}) {
        return `${ContentService.parseImageURL(imagePath)?.imageUrl}`
    }

    static getMediaHostName() {

        if (window.location.hostname === 'localhost') {
            if (CommonUtilities.getCacheDomain()) {
                return `https://${CommonUtilities.getCacheDomain()}`;
            } else {
                return CommonUtilities.getGoogleCdnMediaPrefix();
            }
        }

        if (process.env.REACT_APP_BUILD_TARGET !== 'app') {
            const currentURL = new URL(window.document.location.href);
            return getUIBuilderMediaHost(currentURL.searchParams.get('wh'), CommonUtilities.getGoogleCdnMediaPrefix());
        } else {
            return getAppMediaHost(window.location.hostname, CommonUtilities.getGoogleCdnMediaPrefix());
        }
    }

    static parseImageURL(image) {
        if (Array.isArray(image)) {
            image = image[0];
        }

        const isUrl = (urlString: any) => {
            try {
                return Boolean(new URL(urlString));
            } catch (e) {
                return false;
            }
        }

        if (isUrl(image)) {
            return {imageUrl: image};
        }

        try {
            const imageData = JSON.parse(image);
            const mediaHostName = ContentService.getMediaHostName();
            if (imageData && imageData.alt_text) {
                imageData.altText = imageData.alt_text;
            }
            return {
                imageUrl: `${mediaHostName}/${imageData?.absolutePath}`,
                ...imageData,
            };
        } catch (error) {
            const image_url_prefix = `${CommonUtilities.getGoogleCdnMediaPrefix()}/mm-images/public/v1/render`;

            if (image?.length) {
                return {
                    imageUrl: `${image_url_prefix}/${CommonUtilities.getWorkspaceId()}/${image}`,
                };
            } else {
                return {imageUrl: ''};
            }
        }
    }

}
