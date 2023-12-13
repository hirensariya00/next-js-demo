import {Http} from "../utilities";
import SignupInterface from "../interfaces/signup.interface";
import { ForgotPassword, SetNewPassword } from "../interfaces/forgot-password.interface";
import { BigCommerceAuth, ShopifyAuth } from "../store";

const getStore: any = () => {
  const store = (process.env.REACT_APP_STORE)?.toLowerCase()
  if (store === 'shopify') {
    return ShopifyAuth
  } else {
    return BigCommerceAuth
  }
}


declare const window: any;

interface LoginRequest {
  username: string,
  password: string
}

export class AuthService {
  private static __userDetails__: any;

  static async checkSessionInfo() {
    const response = await Http.get({
      key: 'login-check',
      url: `/exp-sf-cms/api/ping`,
      componentId: '',
      enableSSR: false,
    });
    return response.data;
  }

  static isUserLoggedIn() {
    return (
      AuthService.__userDetails__ &&
      AuthService.__userDetails__.userInfo &&
      Object.keys(AuthService.__userDetails__.userInfo).length > 0
    );
  }

  static getUserDetails() {
    return AuthService.__userDetails__;
  }

  static setUserDetails(userDetails, isRefresh?) {
    AuthService.__userDetails__ = userDetails;


    if (!isRefresh) {
      // The below block of logic is writen to set the selected currency data in localstorage if the selected currency is changed from theme side
      const currenyDataFromLocalStorage = localStorage.getItem('_c_d');
      if(currenyDataFromLocalStorage && userDetails?.defaultCurrency){
        const parsedCurrencyData = JSON.parse(currenyDataFromLocalStorage);
        if(parsedCurrencyData.id !== userDetails?.defaultCurrency?.id){
          localStorage.setItem('_c_d', JSON.stringify(userDetails.defaultCurrency));
        }
      }
      if (window._exp_bc_) {
        window._exp_bc_.postMessage({
          "event": "USER_UPDATED",
          "data": userDetails
        });
      }
    }
  }

  static async getCustomerDetails() {
    try {
      return await getStore()?.getCustomerDetails();
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async getCustomerOrders() {
    try {
      return await getStore()?.getCustomerOrders();
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async updateCustomerDetails(commonDetails, dynamicDetails = '') {
    try {
      return await getStore()?.updateCustomerDetails(
        commonDetails,
        dynamicDetails
      );
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  static async getCustomerAddresses() {
    try {
      return await getStore()?.getCustomerAddresses();
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  static async getCountries() {
    try {
      return await getStore()?.getCountries();
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  static async getStates(countryCode: any) {
    try {
      return await getStore()?.getStates(countryCode);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  static async createCustomerAddress(bodyData: any) {
    try {
      return await getStore()?.createCustomerAddress(bodyData);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  static async updateCustomerAddress(bodyData, addressId = '') {
    try {
      return await getStore()?.updateCustomerAddress({ bodyData, addressId });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async deleteCustomerAddress(AddressId: number) {
    try {
      return await getStore()?.deleteCustomerAddress(AddressId);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async login({ username, password }: LoginRequest) {
    try {
      return await getStore()?.login({ username, password });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async forceLogout() {
    try {
      return await getStore()?.forceLogout();
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async logout() {
    try {
      return await getStore()?.logout();
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async signup({
    firstName,
    lastName,
    email,
    password,
    phone,
    company,
    customFields,
    gctoken,
  }: SignupInterface) {
    try {
      return await getStore()?.signup({
        firstName,
        lastName,
        email,
        password,
        phone,
        company,
        customFields,
        gctoken,
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async forgotPassword({ email }: ForgotPassword) {
    try {
      return await getStore()?.forgotPassword({ email });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async setNewPassword({ emailToken, password }: SetNewPassword) {
    try {
      return await getStore()?.setNewPassword({ emailToken, password });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async activateCustomerAccount({ emailToken, password }: SetNewPassword) {
    try {
      return await getStore()?.activateCustomerAccount({ emailToken, password });
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
