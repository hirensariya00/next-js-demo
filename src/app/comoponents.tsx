import * as cheerio from 'cheerio';

import {getRecordBySlug, getRecordByVersion} from '../services/get-record-data'
import {ExpHeroCarousel1} from '../components/hero-carousel-1'
import ExpCTABanner from "@/components/cta-banner-1/cta-banner-v1";
import ExpZigZagBanner from "@/components/zig-zag-banner-1/zig-zag-banner"
import {ExpBrandLogoGrid} from "@/components/logo-grid-component";
import {ExpUSPBanner} from '../components/usp-banner'
import {ExpProductCard} from "@/components/product-card";

const Components = async () => {
    const pageData = await getRecordBySlug(`https://excore-bigcommerce-demo.experro.com/apis/content/v1/collection/find-by-slug?page_slug=/`)

    const data1 = cheerio.load(
        JSON.parse(pageData.Data.content_epe)['cms-page-drop1']
    );
    const data2 = cheerio.load(
        JSON.parse(pageData.Data.content_epe)['cms-page-drop2']
    );
    let componentDetails = [];
    for (let i = 0; i < data1('div').contents().length; i++) {
        const detailsObject = {
            contentModalData: JSON.parse(JSON.parse(data1('div').contents()[i]?.attribs?.component_content)?.contentModel),
            contentModelInternalName: JSON.parse(data1('div').contents()[i]?.attribs?.component_content)?.modelInternalName,
            props: data1('div').contents()[i]?.attribs
        }
        componentDetails.push(detailsObject)
    }

    for (let i = 0; i < data2('div').contents().length; i++) {
        const detailsObject = {
            contentModalData: JSON.parse(JSON.parse(data2('div').contents()[i]?.attribs?.component_content)?.contentModel),
            contentModelInternalName: JSON.parse(data2('div').contents()[i]?.attribs?.component_content)?.modelInternalName,
            props: data2('div').contents()[i]?.attribs
        }
        componentDetails.push(detailsObject)
    }

    const data = await Promise.all(componentDetails.map(async (item) => {
        const result = await getRecordByVersion(item.contentModalData?.id, item.contentModelInternalName)
        return {
            [item.contentModelInternalName]: result.Data,
            contentModelInternalName: item.contentModelInternalName,
            props: item.props
        }
    }));
    return <>
        {
            data.map((item, index) => {
                return item.contentModelInternalName === "hero_carousel" ?
                    <ExpHeroCarousel1
                        {...item.props}
                        componentFieldData={item['hero_carousel']}
                    /> : item.contentModelInternalName === "cta_banner" ? <>
                        <ExpCTABanner
                            {...item.props}
                            componentFieldData={item['cta_banner']}/></> : item.contentModelInternalName === "zigzag_layout" ? <>
                        <ExpZigZagBanner {...item.props}
                                         componentFieldData={item['zigzag_layout']}/></> : item.contentModelInternalName === "brand_logo" ? <>
                        <ExpBrandLogoGrid {...item.props}
                                          componentFieldData={item['brand_logo']}/></> : item.contentModelInternalName === "usp_banner" ? <>
                        <ExpUSPBanner {...item.props}
                                      componentFieldData={item['usp_banner']}/></> : item.contentModelInternalName === "product_set" ? <>
                        <ExpProductCard {...item.props} componentFieldData={item['product_set']}/></> : <></>
            })
        }
    </>
}

export default Components;
