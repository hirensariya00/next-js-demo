'use client'

import {useEffect, useState, Dispatch, SetStateAction} from 'react';
// import {
//     AnalyticsService,
//     AuthService,
//     EcommerceService,
//     toast,
//     useNavigate,
//     useSearchParams,
// } from 'experro-storefront';
// import {processPrice} from '../../../cms-utils';

interface ExpProductActionControllerProps {
    product: {
        brand_esi: string;
        categories_esai: string;
        calculated_price_efi: number;
        inventory_tracking_esi: string;
        inventory_level_eii: number;
        sku_esi: string;
        sku_for_analytics_esli: any;
        name_esi: string;
        provider_id_esi: string;
    };

    selectedVariant: {
        option_values: any[];
        sku: string;
        id: string;
        inventory_level: number;
        purchasing_disabled: boolean;
        purchasing_disabled_message: string;
    };

    selectedModifiers: any[];
    setIsProductPreviewModalOpen?: Dispatch<SetStateAction<boolean>>;
    analyticsMode?: string | undefined;
    analyticsSearchTerm?: string | null | undefined;
    analyticsCategory?: string | undefined;
    analyticsWidgetId?: any;
}

const ExpProductActionController = (props: ExpProductActionControllerProps) => {
    const {
        product,
        selectedVariant,
        selectedModifiers,
        setIsProductPreviewModalOpen,
        analyticsMode,
        analyticsSearchTerm,
        analyticsCategory,
        analyticsWidgetId,
    } = props;

    // const [queryParams] = useSearchParams();
    // const navigate = useNavigate();
    const [isWishListLoading, setIsWishListLoading] = useState<boolean>(false);
    const [wishlists, setWishlists] = useState<any>([]);
    const [products, setProducts] = useState<{
        purchaseDisabledMessage: string;
        quantityForAddToCart: number;
    }>({
        purchaseDisabledMessage: '',
        quantityForAddToCart: 1,
    });
    const [isloading, setIsLoading] = useState<{
        addToCart: boolean;
        buyNow: boolean;
    }>({
        addToCart: false,
        buyNow: false,
    });

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

    const handleProductQuantityIncDec = (operation: string, event: any) => {
        if (operation === 'direct') {
            return setProducts({
                ...products,
                quantityForAddToCart: event?.target?.value,
            });
        }
        if (operation === 'inc') {
            setProducts({
                ...products,
                quantityForAddToCart: products?.quantityForAddToCart + 1,
            });
        } else if (operation === 'desc') {
            setProducts({
                ...products,
                quantityForAddToCart: products?.quantityForAddToCart - 1,
            });
        }
    };

    const checkQuantityInputValue = () => {
        if (products?.quantityForAddToCart < 1) {
            setProducts({...products, quantityForAddToCart: 1});
        }
    };

    const triggerProductAddedToCartAnalyticsEvent = () => {
        // const mode = analyticsMode || queryParams.get('m') || 'direct';
        // const searchTerm = analyticsSearchTerm || queryParams.get('st');
        // const category = analyticsCategory || queryParams.get('c');
        // const widgetId = queryParams.get('w') || analyticsWidgetId;

        // AnalyticsService.trackProductAddedToCart({
        //     sku: product?.sku_esi,
        //     sku_for_analytics: product?.sku_for_analytics_esli,
        //     variantSku: selectedVariant?.sku,
        //     totalValue: product.calculated_price_efi * products?.quantityForAddToCart,
        //     quantity: products?.quantityForAddToCart,
        //     price: processPrice(product, selectedVariant, selectedModifiers),
        //     name: product.name_esi,
        //     brand: product.brand_esi,
        //     mode: mode,
        //     widgetId: widgetId,
        //     searchTerm: searchTerm,
        //     category: category,
        //     productCategories: product.categories_esai,
        // });

        // addModeDataToLocalStorageForThePurchaseAnalytics(
        //     mode,
        //     searchTerm,
        //     category,
        //     product.sku_esi,
        //     product?.sku_for_analytics_esli,
        //     product?.categories_esai,
        //     selectedVariant?.sku,
        //     widgetId,
        //     selectedVariant?.id
        // );
    };

    const addToCart = async (isBuyItNow: boolean) => {
        // const userDetails = AuthService.getUserDetails();
        try {
            if (!isBuyItNow) {
                setIsLoading({...isloading, addToCart: true});
            } else {
                setIsLoading({...isloading, buyNow: true});
            }
            let cartDetails: any;
            const line_items: any = [
                {
                    product_id: +product?.provider_id_esi,
                    quantity:
                        products?.quantityForAddToCart > 0
                            ? products?.quantityForAddToCart
                            : 1,
                },
            ];
            const option_selections = [];
            if (selectedVariant) {
                // line_items[0].variant_id = +selectedVariant.id;
                for (const i in selectedVariant.option_values) {
                    const option = selectedVariant.option_values[i];
                    option_selections.push({
                        option_id: option.option_id,
                        option_value: option.id,
                    });
                }
            }

            if (selectedModifiers) {
                for (const optionId in selectedModifiers) {
                    option_selections.push({
                        option_id: parseInt(optionId),
                        option_value: selectedModifiers[optionId],
                    });
                }
            }

            if (option_selections.length > 0) {
                line_items[0].option_selections = option_selections;
            }

            // if (userDetails?.userCartObj?.id) {
            //     const cartId = userDetails?.userCartObj?.id;
            //     cartDetails = await EcommerceService.addToCart({
            //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //         //@ts-ignore
            //         cartId,
            //         line_items,
            //     });
            //     if (cartDetails.Status === 'failure') {
            //         toast.error(cartDetails.Error.message);
            //         setIsLoading({...isloading, addToCart: false});
            //         return;
            //     }
            // }
            // else {
            //     let cartId: any = '';
            //     if (userDetails?.userInfo?.ecommCustomerId) {
            //         cartId = userDetails.userInfo?.ecommCustomerId;
            //     }
            //     cartDetails = await EcommerceService.createCart({
            //         customerId: cartId,
            //         line_items: line_items,
            //     });
            //     if (cartDetails.Status === 'failure') {
            //         toast.error(cartDetails.Error.message);
            //         setIsLoading({...isloading, addToCart: false});
            //         return;
            //     }
            // }
            //
            // const userTemp = {...userDetails};

            // if (cartDetails.Status !== 'failure') {
            //     triggerProductAddedToCartAnalyticsEvent();
            //     userTemp.userCartObj = await EcommerceService.getCart();
            // }
            // AuthService.setUserDetails(userTemp);
            // if (!isBuyItNow) {
            //     setIsLoading({...isloading, addToCart: false});
            //     if (setIsProductPreviewModalOpen) {
            //         setIsProductPreviewModalOpen(false);
            //     }
            //     document.dispatchEvent(new Event('CART_REFRESH'));
            //     document.dispatchEvent(new Event('OPEN_CART_SLIDER'));
            //     toast.success('Product added to cart');
            // } else {
            //     document.dispatchEvent(new Event('CART_REFRESH'));
            //     navigate('/checkout');
            //     setIsLoading({...isloading, buyNow: false});
            // }
        } catch (e) {
            // toast.error('Something went wrong please try again');
            setIsLoading({addToCart: false, buyNow: false});
            // eslint-disable-next-line no-console
            console.error(e);
        }
    };

    function checkCanAddToCart() {
        if (
            product.inventory_tracking_esi === 'product' &&
            product.inventory_level_eii <= 0
        ) {
            setProducts({
                ...products,
                purchaseDisabledMessage:
                    'The selected product combination is currently unavailable.',
            });
        } else if (
            product.inventory_tracking_esi === 'variant' &&
            selectedVariant?.inventory_level <= 0
        ) {
            setProducts({
                ...products,
                purchaseDisabledMessage:
                    'The selected product combination is currently unavailable.',
            });
        } else if (selectedVariant?.purchasing_disabled) {
            setProducts({
                ...products,
                purchaseDisabledMessage: selectedVariant.purchasing_disabled_message
                    ? selectedVariant.purchasing_disabled_message
                    : 'The selected product combination is currently unavailable.',
            });
        } else {
            setProducts({...products, purchaseDisabledMessage: ''});
        }
    }

    useEffect(() => {
        // checkCanAddToCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedVariant]);

    return {
        purchaseDisabledMessage: products?.purchaseDisabledMessage,
        quantityForAddToCart: products?.quantityForAddToCart,
        setIsWishListLoading,
        isWishListLoading,
        addToCartLoading: isloading?.addToCart,
        isBuyNowLoading: isloading?.buyNow,
        setWishlists,
        wishlists,
        handleProductQuantityIncDec,
        checkQuantityInputValue,
        addToCart,
    };
};

export default ExpProductActionController;
