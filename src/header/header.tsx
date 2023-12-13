'use client'

// import { Link } from 'experro-storefront';
import ExpMenu from '../menu/menu';
import ExpLinkParser from '../cms-utils/link-parser';
import {IconBasket} from '../assets/icons/basket';
import {IconSearch} from '../assets/icons/search';
import {IconUser} from '../assets/icons/user';
// import { ExpCustomImageRenderer } from '../common-components/custom-image-rendrer';
import {IconArrowDown} from '../assets/icons/arrow-down';
import {IconHemburger} from '../assets/icons/hemburger';
import {IconArrowDownFill} from '../assets/icons/arrow-down-fill';
// import { expDataSourceConstants } from '../utils/constants';
import {IconCross} from '../assets/icons/cross';
import {ExpSearchPreview} from '../e-commerce/search-preview';
import {HeaderController} from './header-controller';
// import ExpCartPreview from '../e-commerce/cart/cart-preview/cart-preview';
import Link from "next/link";
import {pageData} from "@/app/_page-data";

interface CurrencyObj {
    id: number;
    is_default: boolean;
    last_updated: string;
    country_iso2: null | string;
    default_for_country_codes: string[];
    currency_code: string;
    currency_exchange_rate: string;
    name: string;
    token: string;
    auto_update: boolean;
    token_location: string;
    decimal_token: string;
    thousands_token: string;
    decimal_places: number;
    enabled: boolean;
    is_transactional: boolean;
    use_default_name: boolean;
}

const Header = () => {
    const {
        selectedCurrency,
        isLoading,
        cartQuantity,
        searchText,
        showSearchPreview,
        searchResult,
        handleSubmit,
        handleSearchChange,
        handleMyAccountButtonClick,
        addClassToOpenSerch,
        removeClassToOpenSerch,
        addClassToOpenMobileMenu,
        removeClassToCloseMobileMenu,
        openCartSlider,
        handleCurrencyChange,
        currencyData,
        isOpenCartPreview,
        setIsOpenCartPreview,
        userLoggedInStatus,
        handleLogout,
        searchInputRef,
        basketRef,
    } = HeaderController();

    return (
        <header className="header-section">
            <div className="header-top-section">
                <div className="container">
                    <div className="row">
                        <div className="col col-10 col-mob-12">
                            <p
                                dangerouslySetInnerHTML={{
                                    __html:
                                        pageData?.globalSettings?.header_com?.length &&
                                        pageData?.globalSettings?.header_com[0]
                                            ?.pencil_banner_text_et,
                                }}
                            />
                        </div>

                        {currencyData?.length > 1 && (
                            <div className="col col-2 flex justify-right hide-for-mobile">
                                <div className="currency-selector">
                                    <div className="currency-selector-inner flex align-center">
                    <span className="currency-token">
                      {selectedCurrency?.currency_code}
                    </span>
                                        <i className="icon">
                                            <IconArrowDownFill/>
                                        </i>
                                    </div>

                                    <ul className="currency-list">
                                        {currencyData?.map((elem: CurrencyObj, index) => (
                                            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                                            <li key={index} onClick={() => handleCurrencyChange(elem)}>
                                                <span>{elem?.currency_code}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="header-middle-section">
                <div className="container">
                    <div className="header-middle-inner">
                        <div className="row flex justify-space position-relative">
                            <div className="col col-2 col-tab-4 col-mob-8 flex align-center">
                                <div className="hemburger-icon-block show-for-tablet m-r-24">
                  <span className="hemburger-link">
                    <i onClick={addClassToOpenMobileMenu} className="icon">
                      <IconHemburger/>
                    </i>
                  </span>
                                </div>

                                <div className="header-logo">
                                    <ExpLinkParser
                                        to="/"
                                        title="Header Logo"
                                        ariaLabel="Header Logo">
                                        {/*<ExpCustomImageRenderer*/}
                                        {/*  dataSource={expDataSourceConstants.CONTENT_LIBRARY}*/}
                                        {/*  contentLibraryImageData={*/}
                                        {/*    pageData?.globalSettings.site_com?.length &&*/}
                                        {/*      pageData?.globalSettings.site_com[0]?.logo_emd*/}
                                        {/*      ? pageData?.globalSettings.site_com[0]?.logo_emd[0]*/}
                                        {/*      : ''*/}
                                        {/*  }*/}
                                        {/*  height={'35'}*/}
                                        {/*  width={'184'}*/}
                                        {/*  staticWidthArr={['184', '184']}*/}
                                        {/*/>*/}
                                    </ExpLinkParser>
                                </div>
                            </div>

                            <div className="col col-8 flex justify-center mobile-menu-section">
                                <div className="mobile-menu-topbar show-for-tablet">
                                    <div className="menu-clone-button">
                                        <i onClick={removeClassToCloseMobileMenu} className="icon">
                                            <IconCross/>
                                        </i>
                                    </div>
                                    <div className="mobile-account-link flex align-center">
                                        <i className="icon m-r-10">
                                            <IconUser/>
                                        </i>
                                        {!userLoggedInStatus ? (
                                            <p>
                                                <Link to={''} href="/login/" className="reverse-color">
                                                    Log In &nbsp;
                                                </Link>
                                                /
                                                <Link href="/sign-up/" className="reverse-color">
                                                    &nbsp; Create account
                                                </Link>
                                            </p>
                                        ) : (
                                            <>
                                                <span onClick={handleLogout}>Log Out &nbsp;</span>/
                                                <Link href="/my-account/" className="reverse-color">
                                                    &nbsp; My account
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <nav className="header-navigation">
                                    <ExpMenu
                                        menuLinkObj={pageData?.globalSettings?.header_com}
                                        ulClasses={'flex align-center primary-navigation'}
                                        liClasses={'nav-item'}
                                        linkNameClasses={'nav-link flex align-center'}
                                        keyValueForMenu={'primary_navigation_menu_id_et'}
                                        iconForNavChild={
                                            <i className="icon menu-arrow-icon">
                                                <IconArrowDown/>
                                            </i>
                                        }
                                        index={0}
                                    />
                                </nav>
                            </div>

                            <div className="col col-2 col-mob-4 flex justify-right">
                                <ul className="icon-navigation flex align-center">
                                    <li className="search-toggle-link flex align-center">
                    <span id="search-icon">
                      <i
                          onClick={addClassToOpenSerch}
                          className="icon search-open-icon has-tooltip">
                        <IconSearch/>
                        <span className="tooltip">Search</span>
                      </i>
                      <i
                          onClick={removeClassToOpenSerch}
                          className="icon search-close-icon has-tooltip">
                        <IconCross/>
                        <span className="tooltip">Close</span>
                      </i>
                    </span>
                                    </li>

                                    <li className="hide-for-tablet position-relative flex align-center">
                    <span onClick={handleMyAccountButtonClick}>
                      <i className="icon">
                        <IconUser/>
                      </i>
                    </span>
                                        <ul className="icon-navigation-subnav text-center">
                                            <li>
                                                <Link href="/my-account/">My Account</Link>
                                            </li>
                                            <li>
                                                {userLoggedInStatus ? (
                                                    <span onClick={handleLogout}>Log Out</span>
                                                ) : (
                                                    <Link href="/login/">Login</Link>
                                                )}
                                            </li>
                                        </ul>
                                    </li>

                                    <li className='flex align-center'>
                    <span onClick={openCartSlider} className="cart-link" ref={basketRef}>
                      <i className="icon has-tooltip">
                        <IconBasket/>
                        <span className="cart-count">{cartQuantity}</span>
                        <span className="tooltip">Cart</span>
                      </i>
                    </span>
                                        {/*<ExpCartPreview*/}
                                        {/*  isCartPreview={isOpenCartPreview}*/}
                                        {/*  setIsCartPreview={setIsOpenCartPreview}*/}
                                        {/*  basketRef={basketRef}*/}
                                        {/*/>*/}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-search-section">
                <div className="container">
                    <div className="search-bar-inner">
                        <form action="" onSubmit={handleSubmit}>
                            <input
                                ref={searchInputRef}
                                type="text"
                                className="form-input"
                                placeholder="Search the store"
                                onChange={handleSearchChange}
                                value={searchText}
                            />
                        </form>

                        {showSearchPreview && (
                            <div className="search-result-block">
                                <ExpSearchPreview
                                    productData={searchResult}
                                    isLoading={isLoading}
                                    handleSubmit={handleSubmit}
                                    searchText={searchText}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
