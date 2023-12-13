import { ForgotPassword, SetNewPassword } from "../../interfaces/forgot-password.interface";
import SignupInterface from "../../interfaces/signup.interface";
import { Http } from "../../utilities";

interface LoginRequest {
    username: string;
    password: string;
}

export class ShopifyAuth {
    static async getCustomerDetails() {
        try {
            const response = await Http.get({
                key: 'my-account',
                url: '/exp-sf-cms/api/shopify/account',
                componentId: '',
                enableSSR: false,
            });
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    static async getCustomerOrders() {
        try {
            const response = await Http.get({
                key: 'my-account',
                url: '/exp-sf-cms/api/shopify/account/orders',
                componentId: '',
                enableSSR: false,
            });
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    static async updateCustomerDetails(commonDetails: any) {
        try {
            const response = await Http.put({
                key: 'update-my-account',
                url: '/exp-sf-cms/api/shopify/account',
                componentId: '',
                enableSSR: false,
                config: {
                    body: {
                        customer: commonDetails,
                    },
                },
            });
            if (response.data && response.data.Status === 'success') {
                return true;
            } else {
                return response.data;
            }
        } catch (e) {
            throw new Error(e);
        }
    }
    static async getCustomerAddresses() {
        try {
            const response = await Http.get({
                key: 'my-account',
                url: '/exp-sf-cms/api/shopify/account/addresses',
                componentId: '',
                enableSSR: false,
            });
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }
    static async createCustomerAddress(bodyData: any) {
        try {
            const response = await Http.post({
                key: 'my-account-addresses',
                url: '/exp-sf-cms/api/shopify/account/addresses',
                componentId: '',
                enableSSR: false,
                config: {
                    body: {
                        address: bodyData,
                    },
                },
            });
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }
    static async updateCustomerAddress({ bodyData, addressId }: { bodyData: any, addressId: any }) {
        try {
            const response = await Http.put({
                key: 'my-account-addresses',
                url: `/exp-sf-cms/api/shopify/account/addresses/${encodeURIComponent(addressId)}`,
                componentId: '',
                enableSSR: false,
                config: {
                    body: {
                        address: bodyData,
                    },
                },
            });
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    static async deleteCustomerAddress(AddressId: any) {
        try {
            const response = await Http.delete({
                key: 'my-account-addresses',
                url: `/exp-sf-cms/api/shopify/account/addresses/${encodeURIComponent(AddressId)}`,
                componentId: '',
                enableSSR: false,
            });
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    static async login({ username, password }: LoginRequest) {
        const response = await Http.post({
            key: 'login',
            url: `/exp-sf-cms/api/login`,
            componentId: '',
            enableSSR: false,
            config: {
                body: {
                    email: username,
                    password: password,
                },
            },
        });
        if (response.data && response.data.Status === 'success') {
            return true;
        } else {
            return response.data;
        }
    }

    static async logout() {
        const response = await Http.get({
            key: 'logout',
            url: `/exp-sf-cms/api/logout`,
            componentId: '',
            enableSSR: false,
        });
        if (response.data && response.data.Status === 'success') {
            return true;
        } else {
            return response.data;
        }
    }

    static async activateCustomerAccount({ emailToken, password }: SetNewPassword) {
        const response = await Http.post({
          key: 'forgot-password',
          url: `/exp-sf-cms/api/activate-customer`,
          componentId: '',
          enableSSR: false,
          config: {
            body: {
              emailToken,
              password,
            },
          },
        });
        if (response.data && response.data.Status === 'success') {
          return true;
        } else {
          return response.data;
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
        const bodyData = {
          email,
          password,
          firstName,
          lastName,
          phone,
          company,
          customFields,
        };
        if (gctoken) {
          // @ts-ignore
          bodyData.gctoken = gctoken;
        }
        const response = await Http.post({
          key: 'signup',
          url: `/exp-sf-cms/api/signup`,
          componentId: '',
          enableSSR: false,
          config: {
            body: bodyData,
          },
        });
        if (response.data && response.data.Status === 'success') {
          return true;
        } else {
          return response.data;
        }
      }
    
      static async forgotPassword({ email }: ForgotPassword) {
        const response = await Http.post({
          key: 'forgot-password',
          url: `/exp-sf-cms/api/forgot-password`,
          componentId: '',
          enableSSR: false,
          config: {
            body: {
              email,
            },
          },
        });
        if (response.data && response.data.Status === 'success') {
          return true;
        } else {
          return response.data;
        }
      }
    
      static async setNewPassword({ emailToken, password }: SetNewPassword) {
        const response = await Http.post({
          key: 'forgot-password',
          url: `/exp-sf-cms/api/set-new-password`,
          componentId: '',
          enableSSR: false,
          config: {
            body: {
              emailToken,
              password,
            },
          },
        });
        if (response.data && response.data.Status === 'success') {
          return true;
        } else {
          return response.data;
        }
      }
}