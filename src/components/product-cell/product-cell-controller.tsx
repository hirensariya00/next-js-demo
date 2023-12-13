'use client'

import {useState, useCallback, useEffect} from 'react';
// import {
//     AnalyticsService,
//     AuthService,
//     EcommerceService,
//     IsCMSApp,
//     toast,
//     useNavigate,
//     useSearchParams,
// } from 'experro-storefront';
import {processPrice} from '../../cms-utils';

interface ExpProductCellControllerProps {
    productDetails: {
        images_ej: any[];
        sku_esi: string;
        reviews_rating_sum_eii: string;
        reviews_count_eii: string;
        page_slug_esi: any;
        sku_for_analytics_esli: any;
        calculated_price_efi: number;
        name_eti: string;
        brand_esi: string;
        categories_esai: any;
        provider_id_esi: any;
        variants_ej?: any;
        variant_options_ej: any;
    };
    productCompareSkus?: any[];
    categoryTree?: any[];
    mode: string;
    category?: string;
    widgetId?: string;
}

const ExpProductCellController = (props: ExpProductCellControllerProps) => {
    const IsCMSApp = true;
    const {
        productDetails,
        productCompareSkus,
        categoryTree,
        mode,
        category,
        widgetId,
    } = props;
    let navigate: any;
    let queryParams: any;
    let productNavigationUrl = `${productDetails?.page_slug_esi}`;

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [productData, setProductData] = useState<any>();
    const [showAddToWishlistPopup, setShowAddToWishlistPopup] =
        useState<boolean>(false);
    const [createNewWishlist, setCreateNewWishlist] = useState(false);
    const [wishlists, setWishlists] = useState<any>([]);
    const [isWishlistLoading, setIsWishListLoading] = useState<boolean>(false);
    const [isCartLoading, setIsCartLoading] = useState<boolean>(false);
    const [isQuickViewLoading, setIsQuickViewLoading] = useState<boolean>(false);
    const [colorOption, setColorOption] = useState<string>('');
    const [selectedVarient, setSelectedVarient] = useState<any>();
    const [productOptionId, setProductOptionId] = useState<string>('');
    const [colorVarients, setColorVarients] = useState<any>();

    const images = productDetails?.images_ej?.sort(
        (a_image: { is_thumbnail: number }, b_image: { is_thumbnail: number }) =>
            Number(b_image?.is_thumbnail) - Number(a_image?.is_thumbnail)
    );
    const selectedSku = productCompareSkus?.find(
        (_sku: string) => _sku === productDetails.sku_esi
    );
    const averageReviewsCount = Math.round(
        (parseInt(productDetails?.reviews_rating_sum_eii) || 0) /
        (parseInt(productDetails?.reviews_count_eii) || 1)
    );

    if (IsCMSApp) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        // navigate = useNavigate();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        // [queryParams] = useSearchParams();
        if (categoryTree) {
            productNavigationUrl = productNavigationUrl.includes('?')
                ? `${productNavigationUrl}&c_id=${categoryTree[0]?.id}`
                : `${productNavigationUrl}?c_id=${categoryTree[0]?.id}`;
        }
        if (mode) {
            productNavigationUrl = productNavigationUrl.includes('?')
                ? `${productNavigationUrl}&m=${mode}`
                : `${productNavigationUrl}?m=${mode}`;
        }
        // if (queryParams.has('q')) {
        //     productNavigationUrl = productNavigationUrl.includes('?')
        //         ? `${productNavigationUrl}&st=${queryParams.get('q')}`
        //         : `${productNavigationUrl}?st=${queryParams.get('q')}`;
        // }
        if (category) {
            productNavigationUrl = productNavigationUrl.includes('?')
                ? `${productNavigationUrl}&c=${category}`
                : `${productNavigationUrl}?c=${category}`;
        }
        if (widgetId) {
            productNavigationUrl = productNavigationUrl.includes('?')
                ? `${productNavigationUrl}&w=${widgetId}`
                : `${productNavigationUrl}?w=${widgetId}`;
        }
    }

    const handleViewDetailsClick = () => {
        navigate(productNavigationUrl);
    };

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleModalOpen = useCallback(async () => {
        // try {
        //     setIsQuickViewLoading(true);
        //     setIsModalOpen(true);
        //     const productResponse = await EcommerceService.search({
        //         searchObj: {
        //             skip: 0,
        //             limit: 1,
        //             fieldsToQuery:
        //                 'images_ej,price_efi,retail_price_ef,custom_url,page_slug_esi,calculated_price_efi,sale_price_efi,categories_tree_ej,variant_options_ej,variants_ej,provider_specific_data_ej,brand_esi,sku_for_analytics_esli',
        //             body: {
        //                 filter: {
        //                     sku_esi: [productDetails.sku_esi],
        //                 },
        //             },
        //         },
        //     });
        //
        //     setProductData(productResponse);
        //     setIsQuickViewLoading(false);
        //     const productAnalytics = productResponse?.Data?.items[0];
        //
        //     if (productAnalytics) {
        //         const productImage = productAnalytics?.images_ej.find(
        //             (img: any) => img?.is_thumbnail
        //         );
        //         AnalyticsService.trackProductViewed({
        //             sku: productAnalytics?.sku_esi,
        //             sku_for_analytics: productAnalytics?.sku_for_analytics_esli,
        //             image: productImage?.url_thumbnail
        //                 ? productImage?.url_thumbnail
        //                 : productAnalytics?.images_ej &&
        //                 productAnalytics?.images_ej[0]?.url_thumbnail,
        //             price: productAnalytics?.calculated_price_efi,
        //             searchTerm: queryParams.get('q'),
        //             mode: mode ? mode : 'direct',
        //             widgetId: widgetId,
        //             category: category,
        //             brand: productAnalytics?.brand_esi,
        //             name: productAnalytics?.name_esi,
        //             productCategories:
        //                 productAnalytics.categories_esai ||
        //                 productAnalytics.categories_etai,
        //         });
        //     }
        // } catch (err) {
        //     setIsQuickViewLoading(false);
        //     setIsModalOpen(false);
        //     // eslint-disable-next-line no-console
        //     console.error(err);
        //     toast.error('Something went wrong, please try again.');
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productDetails.sku_esi]);

    const addModeDataToLocalStorageForThePurchaseAnalytics = (
        mode: string,
        searchTerm: string | null,
        category: string | null,
        sku: string,
        sku_for_analytics_esli: string,
        product_categories: any,
        varientSku: string | null,
        widgetId: string | null,
        varientId: string | null
    ) => {
        let localstorageAnalyticsData = [];
        if (localStorage.getItem('a_d_')) {
            localstorageAnalyticsData = JSON.parse(
                localStorage.getItem('a_d_') as string
            );
        }
        const analyticisData = {
            mode,
            searchTerm,
            category,
            sku,
            sku_for_analytics_esli,
            product_categories,
            varientSku: varientSku,
            widgetId: widgetId,
            varientId: varientId,
        };
        localstorageAnalyticsData.push(analyticisData);
        localStorage.setItem('a_d_', JSON.stringify(localstorageAnalyticsData));
    };

    const triggerProductAddedToCartAnalyticsEvent = () => {
        const analyticsMode = mode || queryParams.get('m') || 'direct';
        const searchTerm = queryParams.get('q') || queryParams.get('st');
        const analyticsCategory = category || queryParams.get('c');
        const analyticsWidgetId = queryParams.get('w') || widgetId;

        // AnalyticsService.trackProductAddedToCart({
        //     sku: productDetails?.sku_esi,
        //     sku_for_analytics: productDetails?.sku_for_analytics_esli,
        //     variantSku: '',
        //     totalValue: productDetails.calculated_price_efi * 1,
        //     quantity: 1,
        //     price: processPrice(productDetails, '', ''),
        //     name: productDetails.name_eti,
        //     brand: productDetails.brand_esi,
        //     mode: analyticsMode,
        //     widgetId: analyticsWidgetId,
        //     searchTerm: searchTerm,
        //     category: analyticsCategory,
        //     productCategories: productDetails.categories_esai,
        // });

        addModeDataToLocalStorageForThePurchaseAnalytics(
            analyticsMode,
            searchTerm,
            analyticsCategory,
            productDetails.sku_esi,
            productDetails?.sku_for_analytics_esli,
            productDetails?.categories_esai,
            '',
            analyticsWidgetId,
            ''
        );
    };

    const handleAddToCartButtonClick = async () => {
        // const userDetails = AuthService.getUserDetails();
        // setIsCartLoading(true);
        // try {
        //     const line_items: [{ product_id: number; quantity: number }] = [
        //         {
        //             product_id: +productDetails?.provider_id_esi,
        //             quantity: 1,
        //         },
        //     ];
        //
        //     let cartDetails: any;
        //     if (userDetails?.userCartObj?.id) {
        //         cartDetails = await EcommerceService.addToCart({line_items});
        //         if (cartDetails.Status === 'failure') {
        //             toast.error(cartDetails.Error.message);
        //             setIsCartLoading(false);
        //             return;
        //         }
        //     } else {
        //         let customerId: string = '';
        //         if (userDetails?.userInfo?.ecommCustomerId) {
        //             customerId = userDetails.userInfo?.ecommCustomerId;
        //         }
        //         cartDetails = await EcommerceService.createCart({
        //             customerId: customerId,
        //             line_items: line_items,
        //         });
        //         if (cartDetails.Status === 'failure') {
        //             toast.error(cartDetails.Error.message);
        //             setIsCartLoading(false);
        //             return;
        //         }
        //     }
        //     if (cartDetails.Status !== 'failure') {
        //         triggerProductAddedToCartAnalyticsEvent();
        //     }
        //     const userTemp = {...userDetails};
        //     userTemp.userCartObj = cartDetails;
        //     AuthService.setUserDetails(userTemp);
        //     setIsCartLoading(false);
        //     document.dispatchEvent(new Event('CART_REFRESH'));
        //     document.dispatchEvent(new Event('OPEN_CART_SLIDER'));
        //     toast.success('Product added to cart');
        // } catch (err) {
        //     console.error(err);
        //     setIsCartLoading(false);
        //     toast.error('Something went wrong. Please try again');
        // }
    };

    const defaultProductExceptColor = () => {
        const selectedOptions: any = {};
        const varientOptions = productDetails?.variant_options_ej?.filter(
            (elem: any) => elem.display_name !== 'Color'
        );
        if (varientOptions && varientOptions.length) {
            varientOptions.forEach((option: any) => {
                const defaultOption =
                    option.option_values?.find((value: any) => value.is_default) ||
                    option.option_values[0];
                if (defaultOption) {
                    selectedOptions[option.id] = defaultOption.id;
                }
            });
        }
        return selectedOptions;
    };

    const getSelectedVarient = (selectedColorOption: any) => {
        let selectedVariant;
        const selectedProductOptions = {
            ...defaultProductExceptColor(),
            ...selectedColorOption,
        };

        if (productDetails?.variants_ej) {
            for (const key in productDetails?.variants_ej) {
                const varient = productDetails?.variants_ej[key];

                let allMatch = true;
                varient?.option_values?.forEach((option: any) => {
                    const selectedOption = selectedProductOptions[option.option_id];
                    if (!(option.id === selectedOption)) {
                        allMatch = false;
                    }
                });
                if (allMatch) {
                    selectedVariant = varient;
                    break;
                }
            }
        }
        return selectedVariant;
    };

    const getVarient = (option: any) => {
        setColorOption(option.value_data?.colors[0]);
        const selectedProductVarient = {...selectedVarient};
        selectedProductVarient[productOptionId] = option.id;
        const finalVarient = getSelectedVarient(selectedProductVarient);
        setSelectedVarient(finalVarient);
    };

    const getImageUrl = (image: any) => {
        console.log('test',image)
        let imagesUrl = ''
        if(image.length>0)
        {

        }else {

        }
        // if (image.slide_image_emd[0]) {
        //     try {
        //         imagesUrl = JSON.parse(image.slide_image_emd[0])
        //     } catch (e) {
        //
        //     }
        // }
        return imagesUrl.publicUrl
    }

    useEffect(() => {
        const colorVarientOptions = productDetails?.variant_options_ej?.find(
            (product: any) => product.display_name === 'Color'
        );
        setColorVarients([colorVarientOptions]);

        if (colorVarientOptions) {
            const selectedProductOptions: any = {};
            const selectedDefaultProductOption =
                colorVarientOptions?.option_values?.find(
                    (option: any) => option.is_default
                );
            if (selectedDefaultProductOption) {
                setSelectedVarient(
                    (selectedProductOptions[colorVarientOptions?.id] =
                        selectedDefaultProductOption?.id)
                );
            } else {
                setSelectedVarient(productDetails.variants_ej[0]);
            }
            setProductOptionId(colorVarientOptions?.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        averageReviewsCount,
        createNewWishlist,
        images,
        isModalOpen,
        isWishlistLoading,
        isCartLoading,
        isQuickViewLoading,
        navigate,
        productData,
        productNavigationUrl,
        queryParams,
        selectedSku,
        showAddToWishlistPopup,
        wishlists,
        colorVarients,
        colorOption,
        selectedVarient,
        getVarient,
        setIsModalOpen,
        setShowAddToWishlistPopup,
        setCreateNewWishlist,
        setWishlists,
        setIsWishListLoading,
        handleModalOpen,
        handleCloseModal,
        handleAddToCartButtonClick,
        handleViewDetailsClick,
        getImageUrl
    };
};

export default ExpProductCellController;
