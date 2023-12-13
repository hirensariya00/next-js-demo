import './search-preview.scss';
import Link from "next/link";
import ExpProductPrice from '../product-price/product-price';

interface ExpSearchPreviewProps {
    productData: any;
    isLoading: boolean;
    handleSubmit: any;
    searchText: string;
}

const ExpSearchPreview = (props: ExpSearchPreviewProps) => {
    const {productData, isLoading, handleSubmit, searchText} = props;

    return (
        <>
            {!isLoading ? (
                <>
                    {productData?.items?.length ? (
                        <div className="search-result-list custom-scrollbar">
                            {productData?.items?.map((product: any, index: number) => (
                                <div key={index?.toString()} className="search-item">
                                    <div className="search-item-image">
                                        <Link
                                            href={`${product?.page_slug_esi}?m=search&st=${searchText}&aq=true`}
                                            // to={`${product?.page_slug_esi}?m=search&st=${searchText}&aq=true`}
                                            className="has-image-fill">
                                            <img
                                                src={
                                                    product?.images_ej?.length
                                                        ? `${product?.images_ej[0]?.url_zoom.replace(
                                                            'https://cdn11.bigcommerce.com',
                                                            'https://product-images.experro.app'
                                                        )}&width=160`
                                                        : 'https://via.placeholder.com/736x450.png?text=Image+coming+soon'
                                                }
                                                alt={product?.name_eti}
                                                loading={'lazy'}
                                                width={75}
                                                height={75}
                                            />
                                        </Link>
                                    </div>

                                    <div className="search-item-detail">
                                        <p className="search-product-title brand-title">
                                            <Link
                                                className="reverse-color brand-link uppercase"
                                                href={`${product?.brand_page_slug_esi}`}>
                                                {product?.brand_esi}
                                            </Link>
                                        </p>

                                        <p className="search-product-title capitalize">
                                            <Link
                                                className="reverse-color"
                                                href={`${product?.page_slug_esi}?m=search&st=${searchText}&aq=true`}>
                                                {product?.name_eti}
                                            </Link>
                                        </p>

                                        <div className="price-section">
                      <span className="price-item">
                        <ExpProductPrice productDetails={product}/>
                      </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h5 className="text-center m-t-30 m-b-30">No Products Found...</h5>
                    )}

                    {productData?.items?.length ? (
                        <div className="search-result-message">
              <span
                  onClick={handleSubmit}
                  className="text-underline big reverse-color-link">
                More result {productData?.total_count > 1 ? '' : ''} (
                  {productData?.total_count})
                  {productData?.total_count === 1 ? '' : ''}
              </span>
                        </div>
                    ) : (
                        ''
                    )}
                </>
            ) : (
                <div className="loader-wrapper">
                    <div className="loader-main flex">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExpSearchPreview;
