'use client'
import {useEffect, useState, useCallback} from 'react';
import {EcommerceService} from '../../services/ecommerce-service';

interface ExpProductDetailControllerProps {
    product: any;
    showFullPageDetails?: boolean;
}

const ExpProductDetailController = (props: ExpProductDetailControllerProps) => {
    const {product, showFullPageDetails} = props;
    // const navigate = useNavigate();

    const [productOptions, setProductOptions] = useState<any>([]);
    const [selectedVariant, setSelectedVariant] = useState<any>();
    const [selectedProductOption, setSelectedProductOption] = useState<any>();
    const [selectedModifiers, setSelectedModifiers] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [productReviews, setProductReviews] = useState<any>([]);
    const [averageReviewsCount, setAverageReviewsCount] = useState<
        number | undefined
    >();
    const [totalReviewCount, setTotalReviewCount] = useState<
        number | undefined
    >();
    const [showCreateNewWishListPopup, setShowCreateNewWishListPopUp] =
        useState<boolean>(false);
    const [showAddToWishlistPopup, setShowAddToWishlistPopup] =
        useState<boolean>(false);

    const handleWriteAReviewClick = () => {
        if (showFullPageDetails) {
            setIsModalOpen(true);
        } else {
            // navigate(`${product.page_slug_esi}#write_review`);
        }
    };

    const getProductReviewsAndAverageReviewCount = async () => {
        try {
            const productReviewDataResponse =
                await EcommerceService.getProductReviewsByProductId({
                    productId: product.provider_id_esi,
                });
            if (productReviewDataResponse) {
                setProductReviews(productReviewDataResponse);
                let totalReviewCount = 0;
                let totalRatings = 0;
                productReviewDataResponse?.forEach((review: any) => {
                    if (review.status === 'approved') {
                        totalReviewCount += 1;
                        totalRatings += review.rating;
                    }
                });
                setAverageReviewsCount(Math.round(totalRatings / totalReviewCount));
                setTotalReviewCount(totalReviewCount);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getProductOptionsAndSetDefaultSelected = useCallback(() => {
        const productOptionsReaponse = product?.variant_options_ej;
        if (productOptionsReaponse) {
            setProductOptions(productOptionsReaponse);
            productOptionsReaponse.forEach((productOption: any) => {
                let defaultSelected = productOption.option_values.filter((opt: any) => {
                    return opt.is_default;
                });
                if (defaultSelected?.length === 0) {
                    defaultSelected = productOption.option_values[0];
                } else {
                    defaultSelected = defaultSelected[0];
                }

                setSelectedProductOption((prevState: any) => {
                    return {
                        ...prevState,
                        [`${productOption.id}`]: defaultSelected.id.toString(),
                    };
                });
            });
        }
    }, [product?.variant_options_ej]);

    const getVariantFromSelectOption = useCallback(() => {
        let selectedVariant;
        if (product?.variants_ej) {
            for (const key in product?.variants_ej) {
                const variant = product?.variants_ej[key];
                let allMatch = true;
                variant?.option_values?.forEach((option: any) => {
                    const selectedOption = selectedProductOption[option.option_id];
                    if (!(selectedOption && option.id.toString() === selectedOption)) {
                        allMatch = false;
                    }
                });
                if (allMatch) {
                    selectedVariant = variant;
                    break;
                }
            }
        }
        setSelectedVariant(selectedVariant);
    }, [product?.variants_ej, selectedProductOption]);

    const setDefaultModifiers = () => {
        const defaultModifiers: any = {};
        if (product?.provider_specific_data_ej?.modifiers?.length) {
            for (const modifier of product?.provider_specific_data_ej?.modifiers) {
                if (modifier.type === 'checkbox') {
                    if (modifier.config?.checked_by_default === true) {
                        defaultModifiers[modifier.id] = modifier.option_values[0].id;
                    }
                } else if (
                    modifier.type === 'swatch' ||
                    modifier.type === 'rectangles' ||
                    modifier.type === 'radio_buttons' ||
                    modifier.type === 'dropdown'
                ) {
                    for (const index in modifier.option_values) {
                        const option = modifier.option_values[index];
                        if (option.is_default) {
                            defaultModifiers[modifier.id] = modifier.option_values[index].id;
                            break;
                        }
                    }
                }
            }
            setSelectedModifiers(defaultModifiers);
        }
    };

    useEffect(() => {
        // getProductReviewsAndAverageReviewCount();
        getProductOptionsAndSetDefaultSelected();
        setDefaultModifiers();
        if (window.location.hash === '#write_review') {
            setIsModalOpen(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        productOptions,
        selectedVariant,
        setSelectedProductOption,
        selectedProductOption,
        setSelectedModifiers,
        selectedModifiers,
        isModalOpen,
        setIsModalOpen,
        productReviews,
        averageReviewsCount,
        totalReviewCount,
        setShowCreateNewWishListPopUp,
        showCreateNewWishListPopup,
        setShowAddToWishlistPopup,
        showAddToWishlistPopup,
        handleWriteAReviewClick,
        getVariantFromSelectOption,
        getProductReviewsAndAverageReviewCount,
    };
};

export default ExpProductDetailController;
