import * as cheerio from 'cheerio';

import {getRecordBySlug, getRecordByVersion} from '../services/get-record-data'
import {ExpHeroCarousel1} from '../components/hero-carousel'
import ExpCTABanner from "@/components/cta-banner/cta-banner-v1";
import ExpZigZagBanner from "@/components/zig-zag-banner/zig-zag-banner"

const Components = async () => {
    const pageData = await getRecordBySlug(`https://excore-bigcommerce-demo.experro.com/apis/content/v1/collection/find-by-slug?page_slug=/&version_id=a2858bac-0d04-4e52-a2f6-43863c193129-72`)
    const $ = cheerio.load(
        JSON.parse(pageData.Data.content_epe)['cms-page-drop1']
    );
    //@ts-ignore
    const contents = $('div').contents();

    let componentDetails = [];
    for (let i = 0; i < contents.length - 1; i++) {
        const detailsObject = {
            contentModalData: JSON.parse(JSON.parse(contents[i]?.attribs?.component_content)?.contentModel),
            contentModelInternalName: JSON.parse(contents[i]?.attribs?.component_content)?.modelInternalName,
            props: contents[i]?.attribs
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
                        componentData={item['hero_carousel']}
                    /> : item.contentModelInternalName === "cta_banner" ? <>
                        <ExpCTABanner
                            {...item.props}
                            componentData={item['cta_banner']}/></> : item.contentModelInternalName === "zigzag_layout" ? <>
                        <ExpZigZagBanner {...item.props} componentData={item['zigzag_layout']}/></> : <></>
            })
        }
    </>
}

export default Components;
