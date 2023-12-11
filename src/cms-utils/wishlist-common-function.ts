//@ts-nocheck
// import {AuthService, EcommerceService, toast} from 'experro-storefront';

// export const handleAddToWishListClick = async (
//     wishlistData: any,
//     providerId: string,
//     setShowAddToWishlistPopup: any,
//     varientId: string
// ) => {
//     try {
//         const wishlistObj: any = {product_id: parseInt(providerId)};
//
//         if (varientId) {
//             wishlistObj['variant_id'] = varientId;
//         }
//         const addToWishListResponse = await EcommerceService.addItemToWishlist({
//             wishlistId: wishlistData.id,
//             body: {
//                 items: [wishlistObj],
//             },
//         });
//         if (addToWishListResponse.Status === 'failure') {
//             return toast.error(addToWishListResponse.Error.message);
//         }
//         setShowAddToWishlistPopup(false);
//         toast.success('Product added to the wishlist');
//     } catch (err) {
//         // eslint-disable-next-line no-console
//         console.error(err);
//     }
// };
//
// export const handleWishlistPopupToggle = async (
//     setIsWishListLoading: any,
//     setShowAddToWishlistPopup: any,
//     showAddToWishlistPopup: boolean,
//     setWishlists: any,
//     navigate: any
// ) => {
//     if (!AuthService.isUserLoggedIn()) {
//         return navigate('/login');
//     }
//
//     setShowAddToWishlistPopup(!showAddToWishlistPopup);
//     if (!showAddToWishlistPopup && AuthService.isUserLoggedIn()) {
//         try {
//             setIsWishListLoading(true);
//             const wishlistResponse = await EcommerceService.getAllWishlists();
//             if (wishlistResponse) {
//                 setWishlists(wishlistResponse);
//             }
//             setIsWishListLoading(false);
//         } catch (err) {
//             setIsWishListLoading(false);
//             // eslint-disable-next-line no-console
//             console.error(err);
//         }
//     }
// };

export const handleCreateNewWishlistButtonClick = (
    setShowCreateNewWishListPopUp: any,
    setShowAddToWishlistPopup: any,
    event: any
) => {
    event.preventDefault();
    setShowCreateNewWishListPopUp(true);
    setShowAddToWishlistPopup(false);
};

export const getWishListById = async (id: string) => {
    const returnObj = {
        ogWishlist: [],
        productData: [],
        wishlistName: '',
    };

    // if (id) {
    //     try {
    //         const wishListId = id;
    //         const wishlist = await EcommerceService.getWishlistById(wishListId);
    //         returnObj.wishlistName = wishlist?.name;
    //         returnObj['ogWishlist'] = wishlist?.items;
    //         try {
    //             if (wishlist?.items?.length) {
    //                 const wishlistProductIds = wishlist?.items?.map((item: any) => {
    //                     return item.product_id;
    //                 });
    //                 const stringTuple = wishlistProductIds
    //                     .map(String)
    //                     .map((num: any) => `"${num}"`)
    //                     .join(',');
    //                 const finalString = `(${stringTuple})`;
    //
    //                 const productResponse: any =
    //                     await EcommerceService.searchProductByField({
    //                         fieldValue: finalString,
    //                         fieldName: 'provider_id_esi',
    //                         fieldsToQuery: '',
    //                     });
    //                 if (productResponse?.Status === 'success') {
    //                     returnObj['productData'] = productResponse.Data?.items;
    //                 }
    //             } else {
    //                 returnObj['productData'] = [];
    //             }
    //         } catch (err) {
    //             throw new Error(err as string);
    //         }
    //     } catch (error) {
    //         throw new Error(error as string);
    //     }
    // }
    return returnObj;
};
