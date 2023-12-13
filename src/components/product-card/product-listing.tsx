'use client'

import {Fragment} from 'react';
import Slider, {Settings} from 'react-slick';
import {expDataSourceConstants} from '../../cms-utils';
import {ExpProductCell} from '../product-cell';

export interface ExpProductListingProps {
    productsData: any;
    productsDataLoading: any;
    mappingObj: any;
    dataSource: string;
    sliderView?: {
        showSliderView: Boolean;
        settings: Settings;
    };
}

const ExpProductListing = (props: ExpProductListingProps) => {
    const {
        productsData,
        productsDataLoading,
        mappingObj,
        dataSource,
        sliderView = {
            showSliderView: false,
            settings: {},
        },
    } = props;
    const {settings, showSliderView} = sliderView;
    return (
        <>
            {/* If No Data Found */}
            {!!(
                !productsData?.Data?.items?.length &&
                !productsDataLoading &&
                mappingObj?.sourceKey?.length &&
                mappingObj?.sourceValue?.length
            ) && (
                <div className="col">
                    <p className="h5">No data found</p>
                </div>
            )}
            {/* If Source is not selected or source value not filled */}
            {!!(
                !productsData?.Data?.items?.length &&
                !productsDataLoading &&
                !mappingObj?.sourceKey?.length &&
                !mappingObj?.sourceValue?.length
            ) && (
                <div className="col">
                    <p className="h5">Please Select Source</p>
                </div>
            )}

            {/* Fetching Products */}
            {!!(!productsData?.Data?.items?.length && productsDataLoading) && (
                <div className="position-relative" style={{height: '300px'}}>
                    <div className={'cart-loading'}>
                        <div className="loader-wrapper">
                            <div className="loader-main flex"/>
                        </div>
                    </div>
                </div>
            )}

            {/* Products fetched successfully */}
            {!!productsData?.Data?.items?.length && (
                <>
                    {showSliderView ? (
                        <Slider {...settings}>
                            {productsData?.Data?.items?.map((product: any, index: number) => (
                                <Fragment key={index.toString()}>
                                    <ExpProductCell
                                        productDetails={product}
                                        showActionButtons={false}
                                        mode={'widget'}
                                        widgetId={
                                            !!(
                                                mappingObj?.headingText?.length ||
                                                dataSource === expDataSourceConstants?.CONTENT_LIBRARY
                                            ) && mappingObj?.headingText
                                        }
                                    />
                                </Fragment>
                            ))}
                        </Slider>
                    ) : (
                        <div className="row">
                            {productsData?.Data?.items?.map((product: any, index: number) => (
                                <Fragment key={index.toString()}>
                                    <ExpProductCell
                                        productDetails={product}
                                        showActionButtons={false}
                                        mode="widget"
                                        widgetId={
                                            !!(
                                                mappingObj?.headingText?.length ||
                                                dataSource === expDataSourceConstants?.CONTENT_LIBRARY
                                            ) && mappingObj?.headingText
                                        }
                                    />
                                </Fragment>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default ExpProductListing;
