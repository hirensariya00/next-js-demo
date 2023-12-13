'use client'

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { memo } from 'react';
import ExpProductTabSectionController from './product-tab-section-controller';
import { IconStar } from '../../../assets/icons/star';
import { ExpProductAverageReview } from '../product-average-review';

interface ExpProductTabSectionProps {
  product: {
    brand_esi: string;
    description_eti: string;
    categories_esai: string;
    calculated_price_efi: number;
    inventory_tracking_esi: string;
    inventory_level_eii: number;
    sku_esi: string;
    warranty_es: string;
    sku_for_analytics_esli: any;
    name_esi: string;
    custom_fields_ej: any;
    provider_id_esi: string;
  };
  productReviews: any;
  averageReviewsCount: any;
  totalReviewCount: any;
  handleWriteAReviewClick: any;
}

const ExpProductTabSection = (props: ExpProductTabSectionProps) => {
  const {
    product,
    productReviews,
    averageReviewsCount,
    totalReviewCount,
    handleWriteAReviewClick,
  } = props;

  const { selectedTab, onTabChange, reviewTabRef, tabRef} =
    ExpProductTabSectionController({
      product,
    });

  return (
    <div className="product-tab-section m-t-120" ref={tabRef}>
      <div className="tab-row m-b-48 product-description-block">
        {product?.description_eti ? (
          <div
            className={`tab-list p-b-8 m-b-24 ${
              selectedTab === 'description' ? 'tab-active ' : ''
            }`}>
            <h6
              className="tab-title"
              onClick={() => onTabChange('description')}>
              Description
            </h6>
          </div>
        ) : (
          ''
        )}

        {product?.description_eti && (
          <div className="tab-content-section">
            {selectedTab === 'description' ? (
              <div className="tab-content">
                <p
                  dangerouslySetInnerHTML={{
                    __html: product?.description_eti,
                  }}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </div>

      <div className="tab-row m-b-48">
        {product?.warranty_es?.length > 0 && (
          <div
            className={`tab-list p-b-8 m-b-24 ${
              selectedTab === 'details' ? 'tab-active' : ''
            }`}>
            <h6 className="tab-title" onClick={() => onTabChange('details')}>
              Warranty
            </h6>
          </div>
        )}

        <div className="tab-content-section">
          {selectedTab === 'details' ? (
            <div className="tab-content">
              <p
                dangerouslySetInnerHTML={{
                  __html: product?.warranty_es,
                }}></p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {!!product?.custom_fields_ej?.length && (
        <div className="tab-row m-b-48 additional-info">
          <div
            className={`tab-list p-b-8 m-b-24 ${
              selectedTab === 'Additional Information' ? 'tab-active' : ''
            }`}>
            <h6
              className="tab-title"
              onClick={() => onTabChange('Additional Information')}>
              Additional Information
            </h6>
          </div>

          <div className="tab-content-section">
            {selectedTab === 'Additional Information' ? (
              <>
                {!!product?.custom_fields_ej?.length && (
                  <div className="tab-content">
                    <ul className="list-style-none m-b-0 row gutter-md">
                      {product?.custom_fields_ej.map((obj: any) => (
                        <li className="col col-6 col-mob-12" key={obj.id}>
                          <span className="product-detail-title">
                            {obj?.name}
                          </span>
                          <span>{obj?.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      )}

      {productReviews?.length ? (
        <div className="tab-row m-b-48" ref={reviewTabRef}>
          <div
            className={`tab-list p-b-8 m-b-24 ${
              selectedTab === 'Customer Reviews' ? 'tab-active' : ''
            }`}>
            <h6
              className="tab-title"
              onClick={() => onTabChange('Customer Reviews')}>
              Customer Reviews
            </h6>
          </div>

          <div className="tab-content-section" id="review-tab-content">
            {selectedTab === 'Customer Reviews' ? (
              <div className="tab-content">
                <div className="row flex justify-space align-start">
                  <div className="col">
                    <ul className="m-b-0 rating-star-list">
                      <ExpProductAverageReview
                        averageReviewsCount={averageReviewsCount}
                        starFillClassName={'icon icon-big icon-fill'}
                        starClassName={'icon icon-big'}
                      />
                    </ul>
                    <p className="medium m-b-0 m-t-16">
                      Based on {totalReviewCount} Reviews
                    </p>
                  </div>
                  <div className="col">
                    <div
                      className="medium text-underline pointer"
                      onClick={() => handleWriteAReviewClick()}>
                      Write a Review
                    </div>
                  </div>
                </div>

                <ul className="list-style-none product-reviews-list m-b-0">
                  {productReviews &&
                    productReviews.map((review: any, index: number) => {
                      if (review.status === 'approved') {
                        return (
                          <>
                            <li
                              key={index?.toString()}
                              className="product-review-item">
                              <div className="row align-center m-b-8">
                                <div className="col">
                                  <ul className="rating-star-list">
                                    {review?.rating > 0 ? (
                                      <li>
                                        <i className="icon icon-big icon-fill">
                                          <IconStar />
                                        </i>
                                      </li>
                                    ) : (
                                      <li>
                                        <i className="icon icon-big">
                                          <IconStar />
                                        </i>
                                      </li>
                                    )}
                                    {review?.rating > 1 ? (
                                      <li>
                                        <i className="icon icon-big icon-fill">
                                          <IconStar />
                                        </i>
                                      </li>
                                    ) : (
                                      <li>
                                        <i className="icon icon-big">
                                          <IconStar />
                                        </i>
                                      </li>
                                    )}
                                    {review?.rating > 2 ? (
                                      <li>
                                        <i className="icon icon-big icon-fill">
                                          <IconStar />
                                        </i>
                                      </li>
                                    ) : (
                                      <li>
                                        <i className="icon icon-big">
                                          <IconStar />
                                        </i>
                                      </li>
                                    )}
                                    {review?.rating > 3 ? (
                                      <li>
                                        <i className="icon icon-big icon-fill">
                                          <IconStar />
                                        </i>
                                      </li>
                                    ) : (
                                      <li>
                                        <i className="icon icon-big">
                                          <IconStar />
                                        </i>
                                      </li>
                                    )}
                                    {review?.rating > 4 ? (
                                      <li>
                                        <i className="icon icon-big icon-fill">
                                          <IconStar />
                                        </i>
                                      </li>
                                    ) : (
                                      <li>
                                        <i className="icon icon-big">
                                          <IconStar />
                                        </i>
                                      </li>
                                    )}
                                  </ul>
                                </div>

                                <div className="col">
                                  <div className="productReview-author">
                                    <p className="m-b-0 medium flex gray-800">
                                      <span className="dark-color">
                                        {review?.name}
                                      </span>
                                      on
                                      {new Date(
                                        review.date_reviewed
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="review-wrapper">
                                <div>
                                  <p className="m-b-8 dark-color medium font-medium">
                                    {review?.title}
                                  </p>
                                </div>

                                <div className="review-body">
                                  <p className="m-b-0">{review?.text}</p>
                                </div>
                              </div>
                            </li>
                          </>
                        );
                      }
                      return null;
                    })}
                </ul>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default memo(ExpProductTabSection);
