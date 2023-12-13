'use client'

import ExpProductPriceController from './product-price-controller';
import CurrencyFormat from '../../cms-utils/currency-format';

interface ExpProductPriceProps {
    productDetails?: any;
    selectedVariant?: any;
    selectedModifiers?: any;
}

const ExpProductPrice = (props: ExpProductPriceProps) => {
    const {productDetails, selectedVariant, selectedModifiers} = props;

    const {
        defaultCurrency,
        displayPrice,
        priceSaved,
        displayMSRP,
        retailPrice,
        price,
        displayWas,
        displayNow,
        salePrice,
    } = ExpProductPriceController({
        productDetails,
        selectedModifiers,
        selectedVariant,
    });

    return (
        <div className="price-section">
            {displayMSRP && (
                <div className="price-item price-section--withoutTax rrp-price--withoutTax">
                    <strong className="price-label">MSRP:</strong>
                    <span className="price price--rrp">
            <CurrencyFormat
                value={retailPrice}
                thousandSeparator={','}
                decimalSeparator={'.'}
                prefixSymbol={
                    process.env.REACT_APP_MULTI_CURRENCY_ENABLE === 'true' &&
                    defaultCurrency?.token
                        ? defaultCurrency?.token
                        : '$'
                }
            />
          </span>
                </div>
            )}

            {displayWas && (
                <div className="price-item price-section--withoutTax non-sale-price--withoutTax">
                    <strong className="price-label">Was:</strong>
                    <span className="price price--non-sale">
            <CurrencyFormat
                value={price}
                thousandSeparator={','}
                decimalSeparator={'.'}
                prefixSymbol={
                    process.env.REACT_APP_MULTI_CURRENCY_ENABLE === 'true' &&
                    defaultCurrency?.token
                        ? defaultCurrency?.token
                        : '$'
                }
            />
          </span>
                </div>
            )}

            <div
                className="price-item price-section--withoutTax"
                itemProp="offers"
                itemScope
                itemType="http://schema.org/Offer">
                {displayPrice && (
                    <strong
                        className="price-label"
                        style={{display: 'inline'}}
                        suppressHydrationWarning>
                        Price:
                    </strong>
                )}
                {displayNow && <strong className="price-label">Now:</strong>}

                <span className="price price--withoutTax">
          <CurrencyFormat
              value={salePrice}
              thousandSeparator={','}
              decimalSeparator={'.'}
              prefixSymbol={
                  process.env.REACT_APP_MULTI_CURRENCY_ENABLE === 'true' &&
                  defaultCurrency?.token
                      ? defaultCurrency?.token
                      : '$'
              }
          />
        </span>
            </div>

            {priceSaved > 0 && (
                <div className="price-section--saving price price-section-saving">
                    <span className="price"> (You save </span>
                    <span className="price price--saving">
            <CurrencyFormat
                value={priceSaved}
                thousandSeparator={','}
                decimalSeparator={'.'}
                prefixSymbol={
                    process.env.REACT_APP_MULTI_CURRENCY_ENABLE === 'true' &&
                    defaultCurrency?.token
                        ? defaultCurrency?.token
                        : '$'
                }
            />
          </span>
                    {/* TODO: unnecessary spam  */}
                    <span className="price"> )</span>
                </div>
            )}

            {productDetails.categories_esai?.indexOf('Engagement') > -1 && (
                <span className="category-wise-text">(Setting only)</span>
            )}
        </div>
    );
};

export default ExpProductPrice;
