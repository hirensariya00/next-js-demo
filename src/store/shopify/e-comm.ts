import { Http } from "../../utilities";

export class ShopifyEcomm {
    static async getCart() {
     
        try {
          const response = await Http.get({
            key: 'get-cart',
            url: `/exp-sf-cms/api/shopify/cart`,
            componentId: 'user-cart',
            enableSSR: false,
          });
          return response.data;
        } catch (e) {
          throw new Error(e);
        }
      }
    
      // Create cart For Shopify 
      static async createCart({line_items}:{line_items?: any}) {
        try {
          const response = await Http.post({
            key: 'create-cart',
            url: `/exp-sf-cms/api/shopify/carts`,
            componentId: 'user-cart-create',
            enableSSR: false,
            config: {
              body: {
                lines: line_items,
              },
            },
          });
          return response.data;
        } catch (e) {
          throw new Error(e);
        }
      }
    
    
      // Add to cart for Shopify 
      static async addToCart({line_items}:{line_items?:any}) {
        try {
          const response = await Http.post({
            key: 'add-to-cart',
            url: `/exp-sf-cms/api/shopify/carts/items`,
            componentId: 'add-product-to-cart',
            enableSSR: false,
            config: {
              body: {
                lines: line_items,
              },
            },
          });
          return response.data;
        } catch (e) {
          throw new Error(e);
        }
      }
    
      // update cart for Shopify 
      static async updateCart({ itemId, line_item }:{ itemId?:any, line_item?:any }) {
        try {
          const response = await Http.put({
            key: 'update-cart',
            url: `/exp-sf-cms/api/shopify/carts/items/${encodeURIComponent(itemId)}`,
            componentId: 'update-product-in-cart',
            enableSSR: false,
            config: {
              body: {
                line: line_item,
              },
            },
          });
          return response.data;
        } catch (e) {
          throw new Error(e);
        }
      }
    
      // delete Item In Cart for Shopify 
      static async deleteItemInCart({itemId}:{itemId:any}) {
        try {
          await Http.delete({
            key: 'delete-item',
            url: `/exp-sf-cms/api/shopify/carts/items/${encodeURIComponent(itemId)}`,
            componentId: 'delete-product-in-cart',
            enableSSR: false,
            config: {
              body: {},
            },
          });
        } catch (e) {
          console.error(e);
        }
      }
    
}