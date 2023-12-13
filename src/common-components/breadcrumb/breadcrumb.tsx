import Link from 'next/link'

interface ExpBreadcrumbProps {
    pageData: any;
    categoryPage?: boolean;
}

const ExpBreadcrumb = (props: ExpBreadcrumbProps) => {
    const {pageData, categoryPage} = props;

    const crumbArray: any = [];
    // const [params_query] = useSearchParams();

    const getParentId = (childId: any) => {
        const foundKey = pageData?.category_tree_ej?.find(
            (elem: any) => elem?.id === +childId
        );

        if (pageData?.provider_id_esi !== childId) {
            crumbArray[foundKey?.depth] = foundKey;
        }
        if (foundKey && foundKey?.parent_id !== 0) {
            getParentId(foundKey?.parent_id);
        }
    };

    // if (params_query.get('c_id')) {
    //   getParentId(params_query.get('c_id'));
    // } else
    if (categoryPage) {
        getParentId(pageData?.provider_id_esi);
    }

    // Should be in format - Home > [Intermediate Nodes] > Opened Page
    return (
        <div className="breadcrumb-section">
            <div className="container">
                <ul className="breadcrumb">
                    {/* Home. */}
                    <li>
                        <Link prefetch={false} href={'/'} to="/">Home</Link>
                    </li>

                    {/* Intermediate Nodes */}
                    {crumbArray?.map((item: any) => {
                        return (
                            item?.name && (
                                <li key={item.id}>
                                    <Link href={`${item?.page_slug}`} prefetch={false} to={`${item?.page_slug}`}>{item?.name}</Link>
                                </li>
                            )
                        );
                    })}

                    {/* Opened Page */}
                    {(pageData?.name_esi || pageData?.page_title_esi) && (
                        <li>
                            {pageData?.page_title_esi
                                ? pageData?.page_title_esi
                                : pageData?.name_esi}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ExpBreadcrumb;
