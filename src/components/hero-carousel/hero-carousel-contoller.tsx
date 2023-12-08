import { useEffect, useState } from 'react';
import { ExpImageParser } from '../../../utils/image-parser';
import { getContentLibraryData } from '../../../utils/get-content-library-data';
import {
  expCommonDispatcherKeys,
  ExpComponentDataDispatcher,
} from '../../../utils/component-data-dispatcher';

interface ExpHeroCarouselControllerProps {
  isAutoPlay?: string | boolean;
  component_content: any;
  isShowSubTitle?: string;
  isShowTitle?: string;
  titleTextPosition?: string;
  titleSize?: string;
  subTitleSize?: string;
  id?: string;
}

/**
 * Controller function for the HeroCarousel component.
 * @param props - The controller props.
 * @returns The controller result.
 */
const ExpHeroCarouselController = (props: ExpHeroCarouselControllerProps) => {
  const {
    isAutoPlay,
    component_content,
    isShowSubTitle,
    isShowTitle,
    titleTextPosition,
    titleSize,
    subTitleSize,
    id,
  } = props;

  const modelKeyForSSR = 'hero-ssr';
  let parsedContentModel: any | undefined;
  /**
   * slideKey will be passed in slider as key,
   * Problem : Slider was not getting  re-renderd at a time of changing props (in our case options from ui-builder) specifically 'Auto Play' option
   * solution : key for any compenent we are giving each time key gets updated and that  will make whole component to
   *            re-render and new settings will gets applied ,
   *            Date.now() we have passed and  this will be unique each time.
   *            That  will be passed in useEffect, giving dependacy for isAutoPlay in our case, will set sliderKey that time.
   */
  const [sliderKey, setSliderKey] = useState<any>(Date.now());
  const { contentModel, modelInternalName } = JSON.parse(
    component_content === undefined ? '{}' : component_content
  );

  const {
    setComponentDataDispatcher,
    componentDataDispatcher,
    isComponentLoaded,
    isRenderingOnServer,
  } = ExpComponentDataDispatcher({
    id,
    modelInternalName: modelInternalName,
    modelKeyForSSR: modelKeyForSSR,
  });
  if (contentModel?.trim().length) {
    parsedContentModel = JSON.parse(contentModel);
  }

  useEffect(() => {
    if (isComponentLoaded) {
      setComponentDataDispatcher({
        type: expCommonDispatcherKeys.fetchingData,
      });
      if (contentModel?.trim()?.length) {
        (async () => {
          setComponentDataDispatcher({
            type: expCommonDispatcherKeys.dataFetched,
            data: await getContentLibraryData(
              parsedContentModel,
              modelInternalName,
              modelKeyForSSR,
              id
            ),
          });
        })();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    contentModel,
    isShowTitle,
    isShowSubTitle,
    titleTextPosition,
    subTitleSize,
    titleSize,
  ]);

  useEffect(() => {
    if (!document.querySelector(`#link-${id}`)) {
      if (
        componentDataDispatcher?.componentData?.hero_carousel_com?.length &&
        componentDataDispatcher?.componentData?.hero_carousel_com[0]
          ?.slide_image_emd?.length &&
        componentDataDispatcher?.componentData?.hero_carousel_com[0]
          ?.slide_image_emd
      ) {
        const linkElement = document.createElement('link');
        linkElement.id = `link-${id}`;
        linkElement.rel = 'preload';
        linkElement.as = 'image';
        linkElement.href = ExpImageParser(
          componentDataDispatcher?.componentData?.hero_carousel_com[0]
            ?.slide_image_emd || ''
        )?.imageUrl;
        linkElement.imageSizes = '50vw';

        document.head.appendChild(linkElement);
      }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [
    componentDataDispatcher?.componentData?.hero_carousel_com?.length &&
      componentDataDispatcher?.componentData?.hero_carousel_com[0]
        ?.slide_image_emd?.length &&
      componentDataDispatcher?.componentData?.hero_carousel_com[0]
        ?.slide_image_emd[0],
  ]);

  useEffect(() => {
    setSliderKey(Date.now());
  }, [isAutoPlay]);

  return {
    componentDataDispatcher,
    isRenderingOnServer,
    contentModel,
    sliderKey,
  };
};

export default ExpHeroCarouselController;
