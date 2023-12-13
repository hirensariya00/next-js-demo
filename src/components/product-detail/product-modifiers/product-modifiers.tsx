'use client'

import { memo, Dispatch, SetStateAction } from 'react';
import ExpProductModifiersController from './product-modifiers-controller';

interface ExpProductModifiersProps {
  product: {
    provider_specific_data_ej: { modifiers: any[] };
  };
  selectedModifiers: any;
  setSelectedModifiers: Dispatch<SetStateAction<boolean>>;
}

const ExpProductModifiers = (props: ExpProductModifiersProps) => {
  const { product, selectedModifiers, setSelectedModifiers } = props;

  const {
    selectedModifiersOptionValue,
    handleModifierDropDownChange,
    handleModifierChange,
  } = ExpProductModifiersController({
    product,
    selectedModifiers,
    setSelectedModifiers,
  });

  return (
    <>
      {product.provider_specific_data_ej?.modifiers?.map(
        (
          productModifier: {
            type: string;
            display_name: string;
            required: boolean;
            id: string;
            config: any;
            option_values: any[];
          },
          index: number
        ) => (
          <>
            {productModifier.type === 'text' && (
              <div
                key={index?.toString()}
                className={`form-field ${productModifier?.display_name
                  .toLowerCase()
                  .replace(/ /g, '-')}`}>
                <label className="form-label">
                  {productModifier?.display_name}:
                  {productModifier.required ? '* ' : ''}
                </label>

                <div className="form-text form-text-inline">
                  <div>
                    <input
                      type="text"
                      className="form-input"
                      name={productModifier.id}
                      id={productModifier.id}
                      onBlur={handleModifierDropDownChange.bind(
                        this,
                        productModifier.id
                      )}
                      defaultValue={productModifier.config.default_value}
                    />
                  </div>
                </div>
              </div>
            )}

            {productModifier.type === 'checkbox' && (
              <div className="form-field option-style-checkbox">
                <label className="form-label">
                  {productModifier?.display_name}:
                  {productModifier.required ? '* ' : ''}
                  <span>
                    {
                      selectedModifiersOptionValue[
                        JSON.stringify(productModifier.id)
                      ]
                    }
                  </span>
                </label>

                <div className="form-radio-group form-radio-group-inline">
                  <div
                    onClick={handleModifierChange.bind(
                      this,
                      productModifier.id,
                      selectedModifiers &&
                        selectedModifiers[productModifier.id] ===
                          productModifier?.option_values[0].id
                        ? productModifier?.option_values[1].id
                        : productModifier?.option_values[0].id
                    )}
                    className="form-radio-item m-b-15">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name={productModifier.id}
                      id={productModifier?.option_values[0].id}
                      checked={
                        selectedModifiers
                          ? selectedModifiers[productModifier.id] ===
                            productModifier?.option_values[0].id
                          : false
                      }
                    />
                    <label
                      className="form-label"
                      htmlFor={productModifier?.option_values[0].id}>
                      {productModifier.config?.checkbox_label}
                    </label>
                  </div>
                </div>
              </div>
            )}

            {productModifier.type === 'rectangles' && (
              <div className="form-field option-style-swatch-ractangle">
                <label className="form-label" htmlFor="id1">
                  {productModifier?.display_name}:
                  {productModifier.required ? '* ' : ''}
                  <span>
                    {
                      selectedModifiersOptionValue[
                        JSON.stringify(productModifier.id)
                      ]
                    }
                  </span>
                </label>

                <div className="form-radio-group form-radio-group-inline">
                  {productModifier?.option_values?.map((option: any) => (
                    <div
                      onClick={handleModifierChange.bind(
                        this,
                        productModifier.id,
                        option.id
                      )}
                      className="form-radio-item m-b-15">
                      <input
                        type="radio"
                        className={`form-radio ${
                          selectedModifiersOptionValue[productModifier.id] ===
                          option.label
                            ? 'is-selected'
                            : ''
                        }`}
                        id="radio11"
                      />
                      <label className="form-label" htmlFor="radio11">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {productModifier.type === 'radio_buttons' && (
              <div className="form-field option-style-swatch-ractangle">
                <label className="form-label" htmlFor="id1">
                  {productModifier?.display_name}:
                  {productModifier.required ? '* ' : ''}
                  <span>
                    {
                      selectedModifiersOptionValue[
                        JSON.stringify(productModifier.id)
                      ]
                    }
                  </span>
                </label>

                <div className="form-radio-group form-radio-group-inline">
                  {productModifier?.option_values?.map((option: any) => (
                    <div
                      key={option.id}
                      className="form-radio-item m-b-15"
                      onClick={handleModifierChange.bind(
                        this,
                        productModifier.id,
                        option.id
                      )}>
                      <input
                        type="radio"
                        className={`form-radio ${
                          selectedModifiersOptionValue[productModifier.id] ===
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
            )}

            {productModifier.type === 'dropdown' && (
              <div className="form-field">
                <label className="form-label" htmlFor="id2">
                  {productModifier.display_name}:{' '}
                  {productModifier.required ? '* ' : ''}
                </label>
                <select
                  onChange={handleModifierDropDownChange.bind(
                    this,
                    productModifier.id
                  )}
                  className="form-select">
                  <option value="">
                    Select {productModifier.display_name}
                  </option>
                  {productModifier?.option_values?.map(
                    (option: any, index: number) => (
                      <option key={index?.toString()} value={option.id}>
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}

            {productModifier.type === 'swatch' && (
              <div className="form-field option-style-swatch-ractangle">
                <label className="form-label" htmlFor="id1">
                  {productModifier.display_name}:
                  {productModifier.required ? '* ' : ''}
                  <span>
                    {
                      selectedModifiersOptionValue[
                        JSON.stringify(productModifier.id)
                      ]
                    }
                  </span>
                </label>

                <div className="swatch-list flex justify-start align-center">
                  {productModifier?.option_values?.map((option: any) => (
                    <div
                      onClick={handleModifierChange.bind(
                        this,
                        productModifier.id,
                        option.id
                      )}
                      key={option?.id}
                      className="form-radio-item m-b-15 swatch-item">
                      <input
                        type="radio"
                        className={`swatch-radio ${
                          selectedModifiersOptionValue[productModifier.id] ===
                          option.label
                            ? 'is-selected'
                            : ''
                        }`}
                        aria-label="swathc-radio"
                        id="radio11"
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
                  ))}
                </div>
              </div>
            )}
          </>
        )
      )}
    </>
  );
};

export default memo(ExpProductModifiers);
