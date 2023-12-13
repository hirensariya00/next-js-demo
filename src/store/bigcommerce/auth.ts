import {ForgotPassword, SetNewPassword} from "../../interfaces/forgot-password.interface";
import SignupInterface from "../../interfaces/signup.interface";
import {AnalyticsService} from "../../services/analytics-service";
import {AuthService} from '../../services/auth-service'
import {Http} from "../../utilities";
import {BigcommerceService} from "./bigcommerce";

declare const window: any;

interface LoginRequest {
    username: string,
    password: string
}

export class BigCommerceAuth {
    static async getCustomerDetails() {
        try {
            const response = await Http.get({
                key: 'my-account',
                url: '/exp-sf-cms/api/bc/account',
                componentId: '',
                enableSSR: false
            });
            return response.data;
        } catch (e) {
            throw new Error(e)
        }
    }

    static async getCustomerOrders() {
        try {
            const response = await Http.get({
                key: 'my-account',
                url: '/exp-sf-cms/api/bc/account/orders',
                componentId: '',
                enableSSR: false
            });
            return response.data;
        } catch (e) {
            throw new Error(e)
        }
    }

    static async updateCustomerDetails(commonDetails, dynamicDetails) {
        try {
            const response = await Http.put({
                key: 'update-my-account',
                url: '/exp-sf-cms/api/bc/account',
                componentId: '',
                enableSSR: false,
                config: {
                    body: {
                        common_details: commonDetails,
                        dynamic_details: dynamicDetails
                    }
                }
            });
            if (response.data && response.data.Status === 'success') {
                return true;
            } else {
                return response.data
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    static async getCustomerAddresses() {
        try {
            const response = await Http.get({
                key: 'my-account-addresses',
                url: '/exp-sf-cms/api/bc/account/addresses',
                componentId: '',
                enableSSR: false
            });
            return response.data;
        } catch (e) {
            throw new Error(e)
        }
    }

    static async createCustomerAddress(bodyData: any) {
        try {
            const response = await Http.post({
                key: 'my-account-addresses',
                url: '/exp-sf-cms/api/bc/account/addresses',
                componentId: '',
                enableSSR: false,
                config: {
                    body: bodyData
                }
            });
            return response.data;
        } catch (e) {
            throw new Error(e)
        }
    }

    static async updateCustomerAddress({bodyData}) {
        try {
            const response = await Http.put({
                key: 'my-account-addresses',
                url: `/exp-sf-cms/api/bc/account/addresses/${bodyData?.id}`,
                componentId: '',
                enableSSR: false,
                config: {
                    body: bodyData
                }
            });
            return response.data;
        } catch (e) {
            throw new Error(e)
        }
    }

    static async deleteCustomerAddress(AddressId: number) {
        try {
            const response = await Http.delete({
                key: 'my-account-addresses',
                url: `/exp-sf-cms/api/bc/account/addresses/${AddressId}`,
                componentId: '',
                enableSSR: false,
            });
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    static async getCountries() {
        try {
            const response = await Http.get({
                key: 'my-account-addresses',
                url: '/exp-sf-cms/api/bc/countries',
                componentId: '',
                enableSSR: false
            });
            return response.data;
        } catch (e) {
            throw new Error(e)
        }
    }

    static async getStates(countryCode: any) {
        try {
            const response = await Http.get({
                key: 'my-account-addresses',
                url: `/exp-sf-cms/api/bc/countries/${countryCode}/states`,
                componentId: '',
                enableSSR: false
            });
            return response.data;
        } catch (e) {
            throw new Error(e)
        }
    }

    static async forceLogout() {
        try {
            const {userInfo} = AuthService.getUserDetails();
            if (userInfo && userInfo.email) {
                if (
                    window.Countly &&
                    window.Countly?.get_device_id &&
                    window.Countly?.get_device_id() !== userInfo.email
                ) {
                    try {
                        await AuthService.logout();
                        await AnalyticsService.logout();
                        return true;
                    } catch (e) {
                        return true;
                    }
                }
                return true;
            } else if (!userInfo || Object.keys(userInfo).length === 0) {
                if (window.Countly) {
                    try {
                        const deviceId = window.Countly.get_device_id();
                        if (
                            deviceId.match(
                                /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/i
                            )
                        ) {
                            try {
                                await AuthService.logout();
                                await AnalyticsService.logout();
                                return true;
                            } catch (e) {
                                return true;
                            }
                        } else {
                            return true;
                        }
                    } catch (e) {
                        return true;
                    }
                }
                return true;
            } else {
                return true;
            }
        } catch (err) {
            return true;
        }
    }

    static async login({username, password}: LoginRequest) {
        const response = await Http.post({
            key: 'login',
            url: `/exp-sf-cms/api/login`,
            componentId: '',
            enableSSR: false,
            config: {
                body: {
                    email: username,
                    password: password
                }
            }

        });
        if (response.data && response.data.Status === 'success') {
            await BigcommerceService.loginInBigcommerce(response.data.Data.redirectUrl);
            return true;
        } else {
            return response.data
        }
    }

    static async logout() {
        try {
            const response = await Http.get({
                key: 'logout',
                url: `/exp-sf-cms/api/logout`,
                componentId: '',
                enableSSR: false,
            })
            if (response.data && response.data.Status === 'success') {
                await BigcommerceService.logoutInBigcommerce(response.data.Data.redirectUrl);
                return true;
            } else {
                return response.data
            }
        } catch (e) {
            console.error(e);
            return true;
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

    static async forgotPassword({email}: ForgotPassword) {
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

    static async setNewPassword({emailToken, password}: SetNewPassword) {
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
