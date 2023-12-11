//@ts-nocheck

import { useEffect, useRef, useState } from 'react';
import { Settings } from 'react-slick';

/**
 * A custom component that handles slider breakpoint changes based on the element width.
 * @param componentDataDispatcher - The data object of the component dispatcher.
 * @param settings - The settings object for the slider.
 * @returns Object containing the sliderSettings and refAttributes.
 */
const SliderBreakPoint = ({
  settings,
  id,
  itemLength,
}: {
  id?: any;
  itemLength?: any;
  settings: Settings;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const refAttributes: any = { ref: elementRef };

  // eslint-disable-next-line no-restricted-globals
  const [elementWidth, setElementWidth] = useState<number>(innerWidth);
  const [sliderSettings, setSliderSettings] = useState<Settings>(settings);

  useEffect(() => {
    if (itemLength < (settings?.slidesToShow || 0)) {
      setSliderSettings(itemLength);
    }
    if (!elementRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      // @ts-ignore @typescript-eslint/ban-ts-comment
      setElementWidth(elementRef.current?.offsetWidth);
    });
    resizeObserver.observe(elementRef.current);
    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, itemLength]);

  useEffect(() => {
    breakPointChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementWidth, id]);

  const breakPointChange = () => {
    if (settings?.responsive?.length)
      // eslint-disable-next-line array-callback-return
      settings?.responsive.find((item: any) => {
        // @ts-ignore @typescript-eslint/ban-ts-comment
        if (elementWidth >= item?.breakpoint) {
          const updatedSlider: any = {};
          Object?.keys(item?.settings ? item?.settings : {}).length &&
            Object?.keys(item?.settings).map(
              (key: string) =>
                (updatedSlider[`${key}`] = item?.settings[`${key}`])
            );
          setSliderSettings({
            ...sliderSettings,
            ...updatedSlider,
          });
          return true;
        }
      });
  };

  return { sliderSettings, refAttributes };
};

export default SliderBreakPoint;
