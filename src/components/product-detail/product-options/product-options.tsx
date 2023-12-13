'use client'

import { Fragment, memo, Dispatch, SetStateAction } from 'react';
import ExpProductOptionsController from './product-options-controller';

interface ProductOptionsSection {
  productOptions: any;
  setSelectedProductOption: Dispatch<SetStateAction<any>>;
  selectedProductOption: any;
  getVariantFromSelectOption: any;
}

const ExpProductOptions = (props: ProductOptionsSection) => {
  const {
    productOptions,
    setSelectedProductOption,
    selectedProductOption,
    getVariantFromSelectOption,
  } = props;

  const {
    selectedProductOptionValue,
    handleSelectedProductOptionChange,
    handleProductOptionDropDownChange,
  } = ExpProductOptionsController({
    productOptions,
    selectedProductOption,
    setSelectedProductOption,
    getVariantFromSelectOption,
  });

  return (
    <>
      {productOptions?.map((productOption: any, index: number) => (
        <Fragment key={index?.toString()}>
          {productOption?.type === 'rectangles' ? (
            <div
              className={`${
                productOption?.display_name === 'Metal Color'
                  ? 'form-field option-style-swatch'
                  : 'option-style-swatch-ractangle'
              }`}>
              <label className="form-label" htmlFor="id1">
                {productOption?.display_name}:
                {productOption.required ? '* ' : ''}
                <span>
                  {selectedProductOptionValue[JSON.stringify(productOption.id)]}
                </span>
              </label>

              <div className="form-radio-group form-radio-group-inline">
                {productOption?.option_values?.map(
                  (option: any, index: number) => (
                    <div
                      key={index?.toString()}
                      onClick={handleSelectedProductOptionChange.bind(
                        this,
                        productOption.id,
                        option.id
                      )}
                      className={`form-radio-item m-b-15 ${
                        productOption.display_name === 'Metal Color'
                          ? option.label
                              .toLowerCase()
                              .split(' ')
                              .join('-')
                              .replace(/[^0-9A-Za-z]/gi, '-')
                          : ''
                      }`}>
                      <input
                        type="radio"
                        className={`form-radio ${
                          selectedProductOptionValue[productOption.id] ===
                          option.label
                            ? 'is-selected'
                            : ''
                        }`}
                        id="radio11"
                      />
                      <label className="form-label" htmlFor="radio11">
                        {productOption.display_name === 'Metal Color'
                          ? option.label.split(' ').length > 2
                            ? option.label.split(' ')[
                                option.label.split(' ').length - 1
                              ]
                            : 'Pt'
                          : option.label}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : productOption.type === 'radio_buttons' ? (
            <div className="form-field option-style-swatch-ractangle">
              <label className="form-label" htmlFor="id1">
                {productOption?.display_name}:
                {productOption.required ? '* ' : ''}
                <span>
                  {selectedProductOptionValue[JSON.stringify(productOption.id)]}
                </span>
              </label>

              <div className="form-radio-group form-radio-group-inline">
                {productOption?.option_values?.map((option: any) => (
                  <div
                    key={option.id}
                    className="form-radio-item m-b-15"
                    onClick={handleSelectedProductOptionChange.bind(
                      this,
                      productOption.id,
                      option.id
                    )}>
                    <input
                      type="radio"
                      className={`form-radio ${
                        selectedProductOptionValue[productOption.id] ===
                        option.label
                          ? 'is-selected'
                          : ''
                      }`}
                      id="radio1"
                    />
                    <label className="form-label" htmlFor="radio1">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ) : productOption.type === 'dropdown' ? (
            <div className="form-field">
              <label className="form-label" htmlFor="id2">
                {productOption.display_name}:{' '}
                {productOption.required ? '* ' : ''}
              </label>

              <select
                onChange={handleProductOptionDropDownChange.bind(
                  this,
                  productOption.id
                )}
                className="form-select">
                {productOption?.option_values?.map(
                  (option: any, index: number) => (
                    <option key={index?.toString()} value={option.id}>
                      {option.label}
                    </option>
                  )
                )}
              </select>
            </div>
          ) : productOption.type === 'swatch' ? (
            <div className="form-field option-style-swatch-ractangle">
              <label className="form-label" htmlFor="id1">
                {productOption.display_name}:
                {productOption.required ? '* ' : ''}
                <span>
                  {selectedProductOptionValue[JSON.stringify(productOption.id)]}
                </span>
              </label>

              <div className="swatch-list flex justify-start align-center">
                {productOption?.option_values?.map(
                  (option: any, index: number) => (
                    <div
                      key={index}
                      onClick={handleSelectedProductOptionChange.bind(
                        this,
                        productOption.id,
                        option.id
                      )}
                      className="form-radio-item m-b-15 swatch-item">
                      <input
                        type="radio"
                        className={`swatch-radio ${
                          selectedProductOptionValue[productOption.id] ===
                          option.label
                            ? 'is-selected'
                            : ''
                        }`}
                        id="radio11"
                        aria-label="swathc-radio"
                      />
                      <label className="swatch-label" htmlFor="radio11">
                        <span
                          style={{
                            backgroundColor:
                              option?.value_data?.colors?.length &&
                              option?.value_data?.colors?.[0],
                          }}></span>
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            ''
          )}
        </Fragment>
      ))}
    </>
  );
};

export default memo(ExpProductOptions);
