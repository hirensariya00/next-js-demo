//@ts-nocheck
'use client';
// import $ from 'jquery'
import {CommonUtilities} from "./common";

// declare let window: any
// const dataKey = '__experro_ssr_request_data__'
// window.__exp_dataKey__ = dataKey;
// if (!window[dataKey]) {
//     window[dataKey] = {}
// }

interface HttpRequestConfig {
    body?: any,
    headers?: any,
    credentials?: string,
    redirect?: string,
    cache?: string,
    mode?: string,
    method?: string
}

interface HttpRequest {
    key: string,
    url: string,
    config?: HttpRequestConfig,
    enableSSR?: boolean,
    componentId?: string,
    excludeCommonHeaders?: boolean,
    language?: string
}

const isRenderingOnServer = CommonUtilities.isRenderingOnServer();

function getCommonHeaders() {
    // const headers: any = {
    //   'x-tenant-id': CommonUtilities.getTenantId(),
    //   'x-workspace-id': CommonUtilities.getWorkspaceId(),
    //   'x-env-id': CommonUtilities.getEnvironmentId(),
    //   'x-release-id': CommonUtilities.getReleaseId(),
    //   'x-ecomm-provider-chid': CommonUtilities.getEcommProviderChannelId(),
    //   'x-ecomm-provider': CommonUtilities.getEcommProvider(),
    //   'x-lang': CommonUtilities.getLanguage(),
    //   'x-workspace-hash': CommonUtilities.getWorkspaceHash(),
    //   'x-env-type': CommonUtilities.getEnvironmentType()
    // };
    // for (const k in headers) {
    //   if (!headers[k] || headers[k] === 'undefined' || headers[k] === undefined) {
    //     delete headers[k];
    //   }
    // }
    // return headers;
}


export class Http {
    private static async request({
                                     key,
                                     url,
                                     config,
                                     enableSSR,
                                     componentId,
                                     excludeCommonHeaders,
                                     language
                                 }: HttpRequest) {

        key = `${componentId ? componentId : ''}_${key}`
        const defaultConfig = {
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'same-origin',
            redirect: 'follow',
            cache: 'no-cache',
            // mode: 'same-origin'
        };
        if (!config) {
            throw Error("Invalid Request")
        }
        // console.log(`Making API call for key -> ${key}, Found in cache : ${window[dataKey][key]}, Is Rendering on server -> ${isRenderingOnServer}`);
        // if (!isRenderingOnServer && window[dataKey][key]) {
        //     const response = CommonUtilities.getLocalState(key);
        //     delete window[dataKey][key]
        //     return response
        // }

        const finalConfig: any = Object.assign(defaultConfig, config);
        if (config.headers && !config.headers['content-type']) {
            finalConfig.headers['content-type'] = 'application/json';
        }
        if (enableSSR) {
            finalConfig.headers['x-ssr-request-id'] = key
        }
        if (!excludeCommonHeaders) {
            Object.assign(finalConfig.headers, {});
        }
        if (language) {
            finalConfig.headers['x-lang'] = language;
        }

        if (finalConfig.body) {
            finalConfig.body = JSON.stringify(finalConfig.body);
        }
        if (process.env.REACT_APP_BUILD_TARGET !== 'app') {
            // const currentURL = new URL(window.document.location.href).searchParams;
            // const xDomain = currentURL.get('wh');
            // if (xDomain) {
            //     finalConfig.headers['x-domain'] = xDomain;
            // }
        }
        // @ts-ignore We are using our own object here
        const response: any = await fetch(url, finalConfig)
        const responseData = await response.text()
        const responseObj = {
            data: JSON.parse(responseData),
            type: response.type,
            headers: response.headers,
            ok: response.ok,
            redirected: response.redirected,
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        }
        // console.log("Got response for key -> ", key, response.status, enableSSR, isRenderingOnServer);
        if (isRenderingOnServer && enableSSR && response.status >= 200 && response.status < 300) {
            // console.log('Performing SSR, ->', key);
            // if (!window[dataKey][key]) {
            //     $('head').append(`<script>window['${dataKey}']['${key}'] = \`${CommonUtilities.utf8_to_b64(JSON.stringify(responseObj))}\`;</script>`)
            // }
        }
        return responseObj
    }

    static async get({key, url, config, enableSSR, componentId, excludeCommonHeaders, language}: HttpRequest) {
        if (!config) {
            config = {};
        }
        config.method = 'GET'
        return await Http.request({key, url, config, enableSSR, componentId, excludeCommonHeaders, language})
    }

    static async post({key, url, config, enableSSR, componentId, excludeCommonHeaders, language}: HttpRequest) {
        if (!config) {
            config = {
                headers: {}
            }
        }
        if (!config.headers) {
            config.headers = {};
        }
        config.method = 'POST'
        return await Http.request({key, url, config, enableSSR, componentId, excludeCommonHeaders, language})
    }

    static async put({key, url, config, enableSSR, componentId, excludeCommonHeaders, language}: HttpRequest) {
        if (!config) {
            config = {
                headers: {}
            }
        }
        if (!config.headers) {
            config.headers = {};
        }
        config.method = 'PUT'
        return await Http.request({key, url, config, enableSSR, componentId, excludeCommonHeaders, language})
    }

    static async patch({key, url, config, enableSSR, componentId, excludeCommonHeaders, language}: HttpRequest) {
        if (!config) {
            config = {
                headers: {}
            }
        }
        if (!config.headers) {
            config.headers = {};
        }
        config.method = 'PATCH'
        return await Http.request({key, url, config, enableSSR, componentId, excludeCommonHeaders, language})
    }

    static async delete({key, url, config, enableSSR, componentId, excludeCommonHeaders, language}: HttpRequest) {
        if (!config) {
            config = {
                headers: {}
            }
        }
        config.method = 'DELETE'
        return await Http.request({key, url, config, enableSSR, componentId, excludeCommonHeaders, language})
    }
}
