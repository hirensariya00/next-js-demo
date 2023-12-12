'use client'
import { ContentModelDataInterface } from '../../interfaces/content-model-data.interface';

import {
  expCommonDispatcherKeys,
  ExpComponentDataDispatcher,
} from '../../cms-utils/component-data-dispatcher';

export interface ExpBrandLogoGridControllerProps {
  id: string;
  component_content: any;
}

/**
 * Controller function for the BrandLogoGrid component.
 * @param props - The controller props.
 * @returns The controller result.
 */
const ExpBrandLogoGridController = (props: ExpBrandLogoGridControllerProps) => {
  const { id, component_content } = props;

  const modelKeyForSSR = 'grid-ssr';
  const { contentModel, modelInternalName } = JSON.parse(
    component_content === undefined ? '{}' : component_content
  );

  const {
    componentDataDispatcher,
    setComponentDataDispatcher,
    isComponentLoaded,
  } = ExpComponentDataDispatcher({
    id,
    modelInternalName: modelInternalName,
    modelKeyForSSR: modelKeyForSSR,
  });

  let parsedContentModel: ContentModelDataInterface | undefined;

  if (contentModel?.trim().length)
    parsedContentModel = JSON.parse(contentModel);

  const getImageUrl = (image: any) => {
    let imagesUrl = ''
    if (image) {
      try {
        imagesUrl = JSON.parse(image)
      } catch (e) {

      }
    }
    return imagesUrl.publicUrl
  }

  // useEffect(() => {
  //   if (isComponentLoaded) {
  //     setComponentDataDispatcher({
  //       type: expCommonDispatcherKeys.fetchingData,
  //     });
  //     if (contentModel?.trim()?.length) {
  //       (async () => {
  //         setComponentDataDispatcher({
  //           type: expCommonDispatcherKeys.dataFetched,
  //           data: await getContentLibraryData(
  //             parsedContentModel,
  //             modelInternalName,
  //             modelKeyForSSR,
  //             id
  //           ),
  //         });
  //       })();
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [contentModel]);

  return { componentDataDispatcher, contentModel,getImageUrl };
};

export default ExpBrandLogoGridController;
