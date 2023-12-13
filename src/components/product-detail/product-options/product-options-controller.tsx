'use client'

import { useCallback, useEffect, useState } from 'react';

interface ExpProductOptionsControllerProps {
  productOptions: any;
  selectedProductOption: any;
  setSelectedProductOption: any;
  getVariantFromSelectOption: any;
}

const ExpProductOptionsController = (
  props: ExpProductOptionsControllerProps
) => {
  const {
    productOptions,
    selectedProductOption,
    setSelectedProductOption,
    getVariantFromSelectOption,
  } = props;

  const [selectedProductOptionValue, setSelectedProductOptionValue] =
    useState<any>({});

  const getSelectedOptionValue = useCallback(() => {
    const selectedProductOptionValue: any = {};
    // eslint-disable-next-line array-callback-return
    productOptions.find((option: any) => {
      const value = option?.option_values.find((value: any) => {
        if (
          value.id.toString() === selectedProductOption[option.id].toString()
        ) {
          return value;
        }
        return undefined; // Return undefined when the condition is not met
      });
      selectedProductOptionValue[option.id] = value ? value.label : null; // Handle the case when `value` is null
    });
    setSelectedProductOptionValue(selectedProductOptionValue);
  }, [productOptions, selectedProductOption]);

  const handleSelectedProductOptionChange = useCallback(
    (productOptionId: string, optionId: any, event: any) => {
      event.preventDefault();
      setSelectedProductOption({
        ...selectedProductOption,
        [`${productOptionId}`]: optionId.toString(),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedProductOption]
  );

  const handleProductOptionDropDownChange = useCallback(
    (productOptionId: string, event: any) => {
      event.preventDefault();
      setSelectedProductOption({
        ...selectedProductOption,
        [`${productOptionId}`]: event?.target?.value.toString(),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedProductOption]
  );

  useEffect(() => {
    if (selectedProductOption) {
      getSelectedOptionValue();
      getVariantFromSelectOption();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProductOption]);

  return {
    selectedProductOptionValue,
    handleSelectedProductOptionChange,
    handleProductOptionDropDownChange,
  };
};

export default ExpProductOptionsController;
