export const getRecordBySlug = async (url: string) => {
    // const data = await fetch(`https://excore-bigcommerce-demo.experro.com/apis/content/v1/collection/find-by-slug?page_slug=${'/'}&version_id=${'eac04c89-62c7-4cfa-b77c-8a32ef2fb8ba-1'}`)
    // const data = await fetch(`https://excore-bigcommerce-demo.experro.com/apis/content/v1/collection/hero_carousel/579c96be-54ad-4723-9f40-72a292eedeba`)
    const data = await fetch(url)
    return data.json()
}
export const getRecordByVersion = async (id: string, contentModalInternalName: string) => {
    const data = await fetch(`https://excore-bigcommerce-demo.experro.com/apis/content/v1/collection/${contentModalInternalName}/${id}`)
    return data.json()
}
