'use server'
export const getMenuData = async () => {
    try {
        const menuData = await fetch('https://excore-bigcommerce-demo.experro.com/apis/menu-service/public/v1/menu-items-by-language/30fe3a48-556c-44a8-b7c3-b696f0fa7964?dataFieldsToQuery=id,internal_name,title,page_slug,current_version_id');
        return menuData.json();
    } catch (error) {
        return error;
    }
}
