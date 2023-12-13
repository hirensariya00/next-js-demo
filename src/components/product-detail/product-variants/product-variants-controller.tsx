'use client'

import {useEffect, useState} from 'react';
import {EcommerceService} from '../../../services/ecommerce-service';

const ExpProductVariantController = ({product}: { product: any }) => {
    const [productCardData, setProductCardData] = useState<any>([]);
    const [productsDataLoading, setProductsDataLoading] = useState<boolean>(true);

    const getProductCardData = async () => {
        let apiProductData;

        try {
            if (product?.category_ids_esai?.length) {
                apiProductData = await EcommerceService.search({
                    searchObj: {
                        body: {
                            categories: product?.categories_esai[0],
                            category_id: product?.category_ids_esai[0],
                            facets: [],
                        },
                        sortBy: 'relevance',
                        orderBy: '',
                        fieldsToQuery:
                            'images_ej,price_efi,retail_price_ef,custom_url,page_slug_esi,calculated_price_efi,sale_price_efi,categories_tree_ej,variant_options_ej,variants_ej,provider_specific_data_ej,brand_esi,brand_page_slug_esi,reviews_count_eii,reviews_rating_sum_eii',
                        skip: 0,
                        limit: 5,
                    },
                });
                const filteredProducts = apiProductData?.Data?.items?.filter(
                    (elem: any) => elem.sku_esi !== product?.sku_esi
                );
                setProductCardData(filteredProducts);
                setProductsDataLoading(false);
            }
        } catch (error: any) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    };

    useEffect(() => {
        getProductCardData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {productCardData, productsDataLoading, getProductCardData};
};

export default ExpProductVariantController;
