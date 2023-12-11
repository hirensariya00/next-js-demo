//@ts-nocheck

import Cookies from "js-cookie";
// declare const window:any;
export class CommonUtilities {

  static getLanguage() {
    let lang = '';
    if (Cookies.get('x-lang')) {
      lang = Cookies.get('x-lang')?.toLowerCase();
    } else {
      lang = navigator.language.toLowerCase();
    }
    if (lang === 'en') {
      lang = 'en-us';
    }
    return lang;
  }

  static getTenantId() {
    // return window['__EXP_STORE_INFO__']?.tenantId;
  }

  static getWorkspaceId() {
    // return window['__EXP_STORE_INFO__']?.workspaceId;
  }

  static getEnvironmentId() {
    // return window['__EXP_STORE_INFO__']?.environmentId;
  }

  static getEnvironmentType() {
    // return window['__EXP_STORE_INFO__']?.environmentType;
  }

  static getCacheDomain() {
    // return window['__EXP_STORE_INFO__']?.cacheDomain;
    }

  // static getReleaseId() {
  //   return Cookies.get('exp-rid');
  // }

  // static getEcommProviderChannelId() {
  //   return Cookies.get('exp-ecomm-provider-chid');
  // }

  // static getEcommProvider() {
  //   return Cookies.get('exp-ecomm-provider')
  // }

  static isRenderingOnServer() {
    // return window.location.href.indexOf('___i_s_S_S_R___') !== -1;
  }

  // static getWorkspaceHash() {
  //   return Cookies.get('exp-whash');
  // }

  static getStoreHash() {
    // return window['__EXP_STORE_INFO__']?.storeHash
  }

  static utf8_to_b64(str) {
    // return window.btoa(unescape(encodeURIComponent(str)));
  }

  static b64_to_utf8(str) {
    // return decodeURIComponent(escape(window.atob(str)));
  }

  static getGoogleCdnMediaPrefix() {
    return 'https://nuoqhlwc.myexperro.com'
  }

  static getLocalState(key){
    // const data=window[window['__exp_dataKey__']][key];
    // if (data) {
    //   return JSON.parse(CommonUtilities.b64_to_utf8(data))
    // } else {
    //   return null;
    // }
    return null
  }

  static isMobileInAppBrowser() {
    // const useragent = window.navigator.userAgent || window.navigator.vendor;
    // const BROWSER = {
    //   messenger: /\bFB[\w_]+\/(Messenger|MESSENGER)/,
    //   facebook: /\bFB[\w_]+\//,
    //   twitter: /\bTwitter/i,
    //   line: /\bLine\//i,
    //   wechat: /\bMicroMessenger\//i,
    //   puffin: /\bPuffin/i,
    //   miui: /\bMiuiBrowser\//i,
    //   instagram: /\bInstagram/i,
    // };
    // return Object.keys(BROWSER).find(key => BROWSER[key].test(useragent));
  }

  static generateUUID() {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  static isRenderingInHeadlessBrowser(){
    // if (process.env.REACT_APP_BUILD_TARGET !== 'app') {
    //   return false;
    // }
    // const isIOSPlatform = /iPhone|iPod|iPad/i;
    // const expectedBrowsers = /Edg|Safari|Chrome|CriOS|Firefox/i;
    // const agent = window.navigator?.userAgent || window.navigator?.vendor;
    // const isMobileInApp = this.isMobileInAppBrowser();
    // if(isIOSPlatform.test(agent)) {
    //   if(isMobileInApp) {
    //     return false;
    //   } else {
    //     const isExpectedBrowser = expectedBrowsers.test(agent);
    //     return (!isExpectedBrowser || /HeadlessChrome/.test(agent) || /Chrome-Lighthouse/.test(agent));
    //   }
    // } else {
    //   if(isMobileInApp) {
    //     return false;
    //   } else {
    //     return (!window.chrome && !window.safari && !(agent.indexOf('Firefox')>=0)) || /HeadlessChrome/.test(agent) || /Chrome-Lighthouse/.test(agent);
    //   }
    // }
  }
}
