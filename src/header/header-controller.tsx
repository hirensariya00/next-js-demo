'use client'
import {useEffect, useState, useRef} from 'react';
// import {
//     AnalyticsService,
//     AuthService,
//     EcommerceService,
//     toast,
//     useNavigate,
// } from 'experro-storefront';
import {AnalyticsService} from '../services/analytics-service';
import {AuthService} from '../services/auth-service';
import {EcommerceService} from '../services/ecommerce-service';

// import { getCurrencyDataFromLocalStorage } from '../../utils';

interface SearchState {
    result: any;
    showPreview: boolean;
}

interface SelectedCurrencyState {
    id: number;
    is_default: boolean;
    last_updated: string;
    country_iso2: null;
    default_for_country_codes: any[];
    currency_code: string;
    currency_exchange_rate: string;
    name: string;
    token: string;
    auto_update: boolean;
    token_location: string;
    decimal_token: string;
    thousands_token: string;
    decimal_places: number;
    enabled: boolean;
    is_transactional: boolean;
    use_default_name: boolean;
}

const HeaderController = () => {
    const userDetails = AuthService.getUserDetails();
    // const navigate = useNavigate();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const basketRef = useRef<HTMLDivElement>(null);

    const [search, setSearch] = useState<SearchState>({
        result: '',
        showPreview: false,
    });
    // const urlParams = new URLSearchParams(window.location.search);
    const [searchText, setSearchText] = useState<string>(
        ''
    );

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currencyData, setCurrncyData] = useState<any>([]);
    const [cartQuantity, setCartQuantity] = useState<number>(0);
    const [selectedCurrency, setSelectedCurrency] =
        useState<SelectedCurrencyState>();
    const [isOpenCartPreview, setIsOpenCartPreview] = useState<boolean>(false);
    const [userLoggedInStatus, setUserLoggedInStatus] = useState<boolean>(false);

    //below block of code is used to make the header stickey.
    // let prevScrollpos = window.scrollY;
    // window.onscroll = function () {
    //     const scrlOffset = 300;
    //     if (prevScrollpos > scrlOffset) {
    //         if (prevScrollpos > window.scrollY) {
    //             document.body.classList.add('sticky-header');
    //         } else {
    //             document.body.classList.remove('sticky-header');
    //         }
    //     } else {
    //         document.body.classList.remove('sticky-header');
    //     }
    //     prevScrollpos = window.scrollY;
    // };
    // end of stickey header script.

    const initiateJqueryEvents = () => {
        document.addEventListener('CART_REFRESH', function () {
            getCart();
        });

        document.addEventListener('BUT_IT_NOW', function () {
            getCart();
        });

        document.addEventListener('CURRENCY_UPDATE', function () {
            getCurrencyData();
        });

        document
            .querySelector('body')
            ?.addEventListener('click', (event: Event) => {
                const targetElement = event.target as Element;
                if (targetElement.closest('#search-icon') !== null) {
                    return;
                }
                const targetElement1 = event.target as Element;
                if (
                    targetElement1 &&
                    targetElement1.closest('.header-search-section') === null
                ) {
                    document.body.classList.remove('search-open');
                }
            });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const triggerProductSearchEvent = (searchResponse: any) => {
        AnalyticsService.trackProductSearched({
            searchTerm: searchText,
            noOfResults: searchResponse.Data.total_count,
            sku: searchResponse?.Data?.items?.map((elem: any) => elem.sku_esi),
            sku_for_analytics: searchResponse?.Data?.items?.map(
                (elem: any) => elem.sku_for_analytics_esli
            ),
        });
    };

    const getSearchedProducts = async () => {
        try {
            const fieldsToQuery =
                'images_ej,price_efi,retail_price_ef,custom_url,page_slug_esi,brand_esi,brand_page_slug_esi,calculated_price_efi,sale_price_efi,sku_for_analytics_esli';
            const searchObj = {
                body: {
                    search_terms: searchText?.trim(),
                },
                skip: 0,
                limit: 10,
                fieldsToQuery,
                sortBy: 'relevance',
            };
            const searchPromise = [];
            const searchApiPromise = EcommerceService.search({
                searchObj,
            });
            searchPromise.push(searchApiPromise);
            const searchCountApiProimise = EcommerceService.getSearchCount({
                searchObj,
                key: 'header-search-count',
                componentId: 'exp-header-search-count',
            });
            searchPromise.push(searchCountApiProimise);
            const [searchResponse, searchCountResponse] = await Promise.all(
                searchPromise
            );

            if (searchResponse?.Status === 'success') {
                searchResponse.Data.total_count =
                    searchCountResponse?.Data?.total_count;
            }

            if (searchResponse?.Status === 'success') {
                setSearch({
                    showPreview: true,
                    result: searchResponse?.Data,
                });
                triggerProductSearchEvent(searchResponse);
            }
            setIsLoading(false);
        } catch (err) {
            // toast.error('Something went wrong. Please try again');
            setIsLoading(false);
            console.error(err);
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (search?.result?.total_count > 1) {
            // navigate(`/search?q=${searchText}`);
        } else if (search?.result?.total_count === 1) {
            // navigate(
            //     `${search?.result?.items[0]?.page_slug_esi}?m=search&st=${searchText}&aq=true`
            // );
        }
    };

    const openCartSlider = () => {
        // eslint-disable-next-line no-restricted-globals
        if (screen.width < 757) {
            // navigate('/cart');
            return;
        } else {
            setIsOpenCartPreview(!isOpenCartPreview);
        }
    };

    const getCartQuantity = (cartObj: any) => {
        let quantity = 0;
        if (cartObj) {
            cartObj?.line_items?.physical_items.forEach((elem: any) => {
                quantity += elem.quantity;
            });
        }
        setCartQuantity(quantity);
    };

    const addClassToOpenSerch = () => {
        document.body.classList.add('search-open');
        searchInputRef.current && searchInputRef.current.focus();
    };

    const removeClassToOpenSerch = () => {
        document.body.classList.remove('search-open');
        setSearchText('');
    };

    const addClassToOpenMobileMenu = () => {
        document.body.classList.add('mobile-menu-open');
    };

    const removeClassToCloseMobileMenu = () => {
        document.body.classList.remove('mobile-menu-open');
    };

    const handleMyAccountButtonClick = () => {
        const userDetails = AuthService.getUserDetails();
        if (userDetails?.userInfo?.id) {
            // navigate('/my-account/');
        } else {
            // navigate('/login/');
        }
    };

    const getDefaultCurrencyFromLocalStorage = () => {
        if (process.env.REACT_APP_MULTI_CURRENCY_ENABLE === 'true') {
            // const defaultCurrency = getCurrencyDataFromLocalStorage();
            // if (defaultCurrency) {
            //   setSelectedCurrency(JSON.parse(defaultCurrency));
            // }
        }
    };

    const handleCurrencyChange = (currencyObj: any) => {
        if (currencyObj) {
            localStorage.setItem('_c_d', JSON.stringify(currencyObj));
            setSelectedCurrency(currencyObj);
            document.dispatchEvent(new Event('CURRENCY_UPDATE'));
        }
    };

    const getCart = () => {
        const userDetails = AuthService.getUserDetails();
        getCartQuantity(userDetails?.userCartObj);
    };

    const getCurrencyData = () => {
        const userDetails = AuthService.getUserDetails();
        if (userDetails && userDetails?.currencyObj) {
            setCurrncyData(userDetails?.currencyObj);
            getDefaultCurrencyFromLocalStorage();
        }
    };

    useEffect(() => {
        // const debounceTime = setTimeout(() => {
        //     if (searchText && searchText.length > 2) {
        //         setIsLoading(true);
        //         // getSearchedProducts();
        //     }
        // }, 700);
        // if (searchText?.length < 3) {
        //     setSearch({...search, result: [], showPreview: false});
        // }
        //
        // return () => clearTimeout(debounceTime);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);

    const checkUserLoggedInStatus = () => {
        const userDetails = AuthService.getUserDetails();
        if (userDetails?.userInfo?.id) {
            setUserLoggedInStatus(true);
        } else {
            setUserLoggedInStatus(false);
        }
    };

    const handleLogout = async () => {
        try {
            const logoutResponse = await AuthService.logout();
            if (logoutResponse?.Status !== 'failure') {
                AuthService.setUserDetails({});
                AnalyticsService.logout();
                checkUserLoggedInStatus();
                document.dispatchEvent(new Event('CART_REFRESH'));
                // navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // setIsLoading(false);
        // setSearch({
        //     result: '',
        //     showPreview: false,
        // });
        // setSearchText(`${urlParams.get('q') ? urlParams.get('q') : ''}`);
        // setSearchText(``);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [window.location.href]);
    }, []);

    useEffect(() => {
        // document.addEventListener('LOGIN_SUCCESSFUL', () => {
        //     checkUserLoggedInStatus();
        // });
        initiateJqueryEvents();
        // checkUserLoggedInStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        userDetails,
        selectedCurrency,
        isLoading,
        cartQuantity,
        searchText: searchText,
        showSearchPreview: search?.showPreview,
        searchResult: search?.result,
        handleSubmit,
        handleSearchChange,
        handleMyAccountButtonClick,
        addClassToOpenSerch,
        removeClassToOpenSerch,
        addClassToOpenMobileMenu,
        removeClassToCloseMobileMenu,
        openCartSlider,
        handleCurrencyChange,
        currencyData,
        isOpenCartPreview,
        setIsOpenCartPreview,
        userLoggedInStatus,
        handleLogout,
        searchInputRef,
        basketRef,
    };
};

export {HeaderController};
