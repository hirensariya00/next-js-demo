'use server'
export const getMenuData = async (menuId: string) => {
    try {
        const menuData = await fetch(`https://excore-bigcommerce-demo.experro.com/apis/menu-service/public/v1/menu-items-by-language/${menuId}?dataFieldsToQuery=id,internal_name,title,page_slug,current_version_id`);
        return menuData.json();
    } catch (error) {
        return error;
    }
}
