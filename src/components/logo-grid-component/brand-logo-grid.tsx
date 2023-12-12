'use client'
import ExpBrandLogoGridController from './brand-logo-grid-controller';
// import { ExpLoadingPlaceholder } from '../../common-components/loading-placeholder';
import ExpLinkParser from '../../cms-utils/link-parser';
// import { ExpCustomImageRenderer } from '../../common-components/custom-image-rendrer';
import {expDataSourceConstants} from '../../cms-utils/constants';
import Image from "next/image";

export interface ExpBrandLogoGridProps {
    id: string;
    component_content: any;

    componentFieldData: any
}

/**
 * Renders a Brand Logo component.
 * @param props - The Brand Logo component props.
 * @returns The rendered Brand Logo component.
 */
const ExpBrandLogoGrid = (props: ExpBrandLogoGridProps) => {
    const {id, component_content,componentFieldData} = props;
    const staticWidthArr: string[] = ['1280', '768'];
    const {componentDataDispatcher, contentModel,getImageUrl} = ExpBrandLogoGridController({
        id,
        component_content,

    });
    return (
        <>
            {/*<ExpLoadingPlaceholder*/}
            {/*  loaderClassName="manufacturers-section column-5 section-gap"*/}
            {/*  contentModel={contentModel}*/}
            {/*  isLoading={componentDataDispatcher.isLoading}*/}
            {/*  componentData={componentDataDispatcher.componentData}*/}
            {/*/>*/}

            {componentFieldData?.id &&(
                    <div className="manufacturers-section section-gap">
                        <div className="container">
                            <div className="flex justify-center">
                                <div className="col-1 col-10 col-md-12">
                                    <div className="row flex flex-wrap manufacturers-listing">
                                        {componentFieldData?.logo_list_com
                                                ?.length &&
                                            componentFieldData?.logo_list_com?.map(
                                                (item: any, index: number) => {
                                                    return (
                                                        <div
                                                            key={index.toString()}
                                                            className="col col-3 col-mob-4 col-xs-6 flex align-center justify-center brand-item">
                                                            {item?.slider_link_et ? (
                                                                <ExpLinkParser
                                                                    to={item?.slider_link_et}
                                                                    ariaLabel="brand image">
                                                                    <div className="has-img">
                                                                        {item?.slider_image_emd && (

                                                                            <Image
                                                                                src={getImageUrl(item.slider_image_emd)}
                                                                                width={315}
                                                                                height={88}
                                                                                alt="Picture of the author"
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </ExpLinkParser>
                                                            ) : (
                                                                <ExpLinkParser
                                                                    to={item?.slider_link_et}
                                                                    ariaLabel="brand image"
                                                                    rel="nofollow">
                                                                    <div className="has-img">
                                                                        {item?.slider_image_emd && (
                                                                            <Image
                                                                                src={getImageUrl(item.slider_image_emd)}
                                                                                width={315}
                                                                                height={88}
                                                                                alt="Picture of the author"
                                                                            />

                                                                        )}
                                                                    </div>
                                                                </ExpLinkParser>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
};

export default ExpBrandLogoGrid;
