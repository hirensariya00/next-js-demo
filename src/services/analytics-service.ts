import {CommonUtilities} from "../utilities";

declare const window: any;
const fixedEvents = [
  'product_searched', 'product_viewed', 'category_viewed',
  'product_added_to_cart', 'product_removed_from_cart', 'product_purchased',
  'cart_viewed', 'checkout_initiated', 'checkout_completed', 'widget_loaded', 'trackWidgetViewed'
];

export class AnalyticsService {
  static isAnalyticsEnabled() {
    return !CommonUtilities.isRenderingOnServer() && !CommonUtilities.isRenderingInHeadlessBrowser() && window.Countly;
  }

  static async isGAEnabled() {
    if (!CommonUtilities.isRenderingOnServer() && !CommonUtilities.isRenderingInHeadlessBrowser()) {
      if (!window.gtag) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(window.gtag ? true : false);
          }, 400)
        });
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  static async login(email) {
    if (this.isAnalyticsEnabled() && window.location.hostname !== 'localhost') {
      try {
        const userId = window?.Countly?.get_device_id();
        if (userId !== email) {
          window.Countly.change_id(email, true);
          window.Countly.q.push(['change_id', email, true]);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (await this.isGAEnabled()) {
      window.gtag('set', 'user_id', email);
      window.gtag("event", "login", {method: "Website"});
    }
  }

  static async logout() {
    if (this.isAnalyticsEnabled()) {
      try {
        const newDeviceId = CommonUtilities.generateUUID();
        window.Countly.change_id(newDeviceId, false);
        window.Countly.q.push(['change_id', newDeviceId, false]);
      } catch (e) {
        console.error(e);
      }
    }
  }

  static async updateUserDetails(userDetails) {
    if (this.isAnalyticsEnabled()) {
      window.Countly.q.push(['user_details', userDetails]);
    }
    if (await this.isGAEnabled()) {
      window.gtag('set', 'user_properties', userDetails);
    }
  }

  static trackPageView({pageTitle, pageUrl}) {
    if (this.isAnalyticsEnabled()) {
      window.Countly.q.push(['track_pageview']);
    }
  }

  static async trackEvent({eventName, count, sum, dur, eventData}) {
    if (this.isAnalyticsEnabled() && window.location.hostname !== 'localhost') {
      window.Countly.q.push(['add_event', {
        "key": eventName,
        "count": count ? count : 1,
        "sum": sum ? sum : 0,
        "dur": dur ? dur : 0,
        "segmentation": eventData ? eventData : {}
      }])
    }
    if (await this.isGAEnabled() && fixedEvents.indexOf(eventName) === -1) {
      window.gtag('event', eventName, eventData);
    }
  }

  static async trackProductSearched({search_location,searchTerm,sku_for_analytics, noOfResults, sku, products_detail}: {search_location?:string, searchTerm: string | undefined, noOfResults: number | undefined, sku?: string[], sku_for_analytics?: string[] | undefined, products_detail?: string[] | undefined}) {
    if (noOfResults === 0) {
      this.trackEvent({
        eventName: 'product_searched_zero_result',
        dur: 0,
        sum: noOfResults,
        count: 1,
        eventData: {
          search_location: search_location,
          search_term: searchTerm
        }
      });
    } else {
      this.trackEvent({
        eventName: 'product_searched',
        dur: 0,
        sum: noOfResults,
        count: 1,
        eventData: {
          search_term: searchTerm,
          search_location: search_location,
          products_detail:products_detail,
          sku: sku,
          sku_for_analytics: sku_for_analytics,
        }
      });
    }

    if (await this.isGAEnabled()) {
      window.gtag('set', 'page_title', 'Search');
      window.gtag("event", "search", {
        search_term: searchTerm
      });
    }
  }

  static async trackWidgetViewed ({noOfResults, mode, products_detail, sku, sku_for_analytics, algorithm, rule, rule_type, widget_id, context_type, context_data, variant}) {
    this.trackEvent({
      eventName: 'widget_viewed',
      dur: 0,
      sum: noOfResults,
      count: 1,
      eventData: {
        products_detail: products_detail,
        sku: sku,
        sku_for_analytics: sku_for_analytics,
        mode: mode,
        algorithm: algorithm,
        rule:rule,
        rule_type:rule_type,
        widget_id:widget_id,
        context_type:context_type,
        context_data:context_data,
        variant:variant,
      }
    });
  }
  
  static async trackProductViewed({sku, mode, image, widgetId, searchTerm,search_location, category, price, name, brand, productCategories, sku_for_analytics, is_primary_algorithm, is_secondary_algorithm, algorithm, is_merchandising, rule, rule_type, widget_id, context_type, context_data, variant, rules}:any) {
    const eventData = {
      sku: sku,
      name: name,
      image:image,
      price: price,
      mode: mode,
      // widget_id: widgetId,
      search_term: searchTerm,
      search_location:search_location,
      category: category,
      sku_for_analytics: sku_for_analytics,
      is_primary_algorithm: is_primary_algorithm,
      is_secondary_algorithm:is_secondary_algorithm,
      algorithm: algorithm,
      is_merchandising:is_merchandising,
      rule:rule,
      rule_type:rule_type,
      widget_id:widget_id,
      context_type:context_type,
      context_data:context_data,
      variant:variant,
      rules:rules,
    };
    if (productCategories) {
      try {
          let seq = 1;
          for (let i = 0; i < productCategories?.length; i++) {
            eventData[`product_category${seq > 1 ? seq : ''}`] = productCategories[i];
              seq++;
          }
        } catch (e) {
          console.error(e);
        }
      }
    this.trackEvent({
      eventName: 'product_viewed',
      dur: 0,
      sum: 0,
      count: 1,
      eventData
    });
    if (await this.isGAEnabled()) {
      const item = {
        item_id: sku,
        item_name: name,
        currency: "USD",
        item_brand: brand,
        price: price,
        quantity: 1,
        discount: 0
      };
      if (productCategories) {
        try {
          const maxCategoriesToConsider = productCategories.length > 5 ? 5 : productCategories.length;
          let seq = 1;
          for (let j = 0; j < maxCategoriesToConsider; j++) {
            if (productCategories[j] != 'All') {
              item[`item_category${seq > 1 ? seq : ''}`] = productCategories[j];
              seq++;
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
      window.gtag("event", "view_item", {
        currency: "USD",
        value: price,
        items: [
          item
        ]
      });
    }
    return;
  }

  static async trackCategoryViewed({categoryName, items, categoryId,provider_id_esi, sku, sku_for_analytics, products_detail}: {categoryName: string, items: any, categoryId: string,provider_id_esi:string, sku?: string[], sku_for_analytics?: string[] | undefined, products_detail?:string[] | undefined}) {
    this.trackEvent({
      eventName: 'category_viewed',
      count: 1,
      sum: 0,
      dur: 0,
      eventData: {
        category_id:categoryId,
        category_name: categoryName,
        sku: sku,
        products_detail:products_detail,
        sku_for_analytics: sku_for_analytics
      }
    });
    if (await this.isGAEnabled()) {
      const categoryItems = [];
      for (let i = 0; i < items.length; i++) {
        const item = {
          item_id: items[i].sku_esi,
          item_name: items[i].name || items[i].name_eti || items[i].name_esi,
          item_brand: items[i].brand_esi ? items[i].brand_esi : '',
          price: items[i].calculated_price_efi,
          quantity: 1,
          item_category: categoryName,
          item_list_id: provider_id_esi,
          item_list_name: categoryName,
          discount: 0,
          currency: "USD",
          index: i + 1
        };
        if (items[i].categories_esai) {
          try {
            const maxCategoriesToConsider = items[i].categories_esai.length > 5 ? 5 : items[i].categories_esai.length;
            let seq = 2;
            for (let j = 0; j < maxCategoriesToConsider; j++) {
              if (items[i].categories_esai[j] != categoryName && items[i].categories_esai[j] != 'All') {
                item[`item_category${seq}`] = items[i].categories_esai[j];
                seq++;
              }
            }
          } catch (e) {
            console.error(e);
          }
        }
        categoryItems.push(item);
      }
      window.gtag("event", "view_item_list", {
        currency: "USD",
        item_list_id: provider_id_esi,
        item_list_name: categoryName,
        items: categoryItems
      });
    }

  }

  static async trackProductAddedToCart({
                                         sku,
                                         sku_for_analytics,
                                         variantSku,
                                         mode,
                                        //  widgetId,
                                         searchTerm,
                                         search_location,
                                         category,
                                         totalValue,
                                         quantity,
                                         price,
                                         name,
                                         brand,
                                         productCategories,
                                         is_primary_algorithm,
                                         is_secondary_algorithm,
                                         algorithm,
                                         is_merchandising,
                                         rule,
                                         rule_type,
                                         widget_id,
                                         context_type,
                                         context_data,
                                         variant,
                                         rules
                                       }:any) {
    if (!mode) {
      mode = 'direct'
    }
    const eventData: any = {
      sku,
      sku_for_analytics,
      variant_sku: variantSku,
      mode,
      quantity,
      is_primary_algorithm,
      is_secondary_algorithm,
      algorithm,
      is_merchandising,
      rule,
      rule_type,
      context_type,
      context_data,
      variant,
      rules
    };
    if (widget_id) {
      eventData.widget_id = widget_id;
    }
    if (searchTerm) {
      eventData.search_term = searchTerm;
    }
    if (search_location) {
      eventData.search_location = search_location;
    }
    if (category) {
      eventData.category = category;
    }
    if (productCategories) {
      try {
          let seq = 1;
          for (let i = 0; i < productCategories?.length; i++) {
            eventData[`product_category${seq > 1 ? seq : ''}`] = productCategories[i];
              seq++;
          }
        } catch (e) {
          console.error(e);
        }
      }
    this.trackEvent({
      eventName: 'product_added_to_cart',
      count: 1,
      sum: totalValue,
      dur: 0,
      eventData
    });
    const item =  {
        item_id: sku,
        item_name: name,
        currency: "USD",
        item_brand: brand,
        price: price,
        quantity: quantity
    }

    if (productCategories) {
      try {
        const maxCategoriesToConsider = productCategories.length > 5 ? 5 : productCategories.length;
        let seq = 1;
        for (let j = 0; j < maxCategoriesToConsider; j++) {
          if (productCategories[j] != 'All') {
            item[`item_category${seq > 1 ? seq : ''}`] = productCategories[j];
            seq++;
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (await this.isGAEnabled()) {
      window.gtag("event", "add_to_cart", {
        currency: "USD",
        value: totalValue,
        items: [ item ]
      });
    }
  }

  static trackProductRemovedFromCart({
                                       sku,
                                       sku_for_analytics,
                                       totalValue,
                                       quantity,
                                       productCategories,
                                       variant_sku,
                                       search_location,
                                       is_primary_algorithm,
                                       is_secondary_algorithm,
                                       algorithm,
                                       is_merchandising,
                                       rule,
                                       rule_type,
                                       widget_id,
                                       context_type,
                                       context_data,
                                       variant,
                                       rules
                                     }:any) {
  const eventData = {
    sku,
    sku_for_analytics,
    quantity,
    variant_sku,
    search_location,
    is_primary_algorithm,
    is_secondary_algorithm,
    algorithm,
    is_merchandising,
    rule,
    rule_type,
    widget_id,
    context_type,
    context_data,
    variant,
    rules
  };
  if (productCategories) {
    try {
      let seq = 1;
      for (let i = 0; i < productCategories?.length; i++) {
        eventData[`product_category${seq > 1 ? seq : ''}`] =
          productCategories[i];
        seq++;
      }
    } catch (e) {
      console.error(e);
    }
  }
    return this.trackEvent({
      eventName: 'product_removed_from_cart',
      count: 1,
      sum: totalValue,
      dur: 0,
      eventData
    });
  }

  static trackProductPurchased({sku,product_categories, variantSku, mode, widgetId, searchTerm,search_location, category, totalValue, quantity, sku_for_analytics , is_primary_algorithm,is_secondary_algorithm, algorithm, is_merchandising, rule, rule_type, widget_id, context_type, context_data, variant, rules}:any) {
    const eventData={
      sku,
      sku_for_analytics,
      variant_sku: variantSku,
      mode,
      // widget_id: widgetId,
      search_term: searchTerm,
      search_location,
      category,
      quantity,
      is_primary_algorithm,
      is_secondary_algorithm,
      algorithm,
      is_merchandising,
      rule,
      rule_type,
      widget_id,
      context_type,
      context_data,
      variant,
      rules
    }
    if (product_categories) {
      try {
        let seq = 1;
        for (let i = 0; i < product_categories?.length; i++) {
          eventData[`product_category${seq > 1 ? seq : ''}`] = product_categories[i];
            seq++;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return this.trackEvent({
      eventName: 'product_purchased',
      count: 1,
      sum: totalValue,
      dur: 0,
      eventData
    })
  }

  static async trackCartViewed({totalValue, totalQuantity, items}) {
    this.trackEvent({
      eventName: 'cart_viewed',
      count: 1,
      sum: totalValue,
      dur: 0,
      eventData: {
        quantity: totalQuantity
      }
    });

    if (await this.isGAEnabled()) {
      const cartItems = [];
      for (let i = 0; i < items.length; i++) {
        cartItems.push({
          item_id: items[i].sku_esi,
          item_name: items[i].name,
          item_brand: items[i].brand_esi,
          price: items[i].sale_price,
          quantity: items[i].quantity
        });
      }
      window.gtag("event", "view_cart", {
        currency: "USD",
        value: totalValue,
        items: cartItems
      });
    }
  }

  static async trackCheckoutInitiated({items, totalValue, totalQuantity}) {
    return this.trackEvent({
      eventName: 'checkout_initiated',
      count: 1,
      sum: totalValue,
      dur: 0,
      eventData: {
        quantity: totalQuantity,
        amount:totalValue
      }
    });
  }

  static async trackCheckoutCompleted({items, totalValue, totalQuantity}) {
    return this.trackEvent({
      eventName: 'checkout_completed',
      count: 1,
      sum: totalValue,
      dur: 0,
      eventData: {
        quantity: totalQuantity,
        amount:totalValue
      }
    });
  }

  static async trackWidgetLoaded({widgetId, widgetName, type, algorithm}) {
    return this.trackEvent({
      eventName: 'widget_loaded',
      count: 1,
      sum: 0,
      dur: 0,
      eventData: {
        widget_id: widgetId,
        widget_name: widgetName,
        type: type,
        algorithm: algorithm
      }
    });
  }
}
