'use client'

import {ContentService} from '../services/content-service';
import ExpMenuController from './menu-controller';
import Link from 'next/link';

interface ExpMenuInterface {
    menuLinkObj?: any;
    ulClasses?: string;
    liClasses?: string;
    linkNameClasses?: string;
    childMenuItem?: any;
    keyValueForMenu: string;
    iconForNavChild?: any;
    index?: number;
}

const ExpMenu = (props: ExpMenuInterface) => {
    const {
        menuLinkObj,
        ulClasses,
        liClasses,
        linkNameClasses,
        childMenuItem,
        keyValueForMenu,
        iconForNavChild,
        index = 0,
    } = props;

    const {
        menuData,
        filterNavStringForClass,
        getMenuNameToShow,
        toggleMenuWithChild,
    } = ExpMenuController({menuLinkObj, childMenuItem, keyValueForMenu});

    return (
        <ul className={`${ulClasses} ${index > 0 ? `level-${index}` : ''}`}>
            {menuData?.map((menuItem: any) => {
                if (
                    (menuItem?.page_slug && menuItem.page_slug !== '#') ||
                    (menuItem?.link_es && menuItem.link_es !== '#')
                ) {
                    menuItem.redirectLink =
                        menuItem?.type === 'link' ? menuItem?.link_es : menuItem?.page_slug;

                    if (menuItem?.redirectLink.indexOf('//') !== -1) {
                        if (
                            new URL(menuItem.redirectLink).host ===
                            new URL(window.location.href).host
                        )
                            menuItem.redirectLink = new URL(menuItem.redirectLink).pathname;
                        else menuItem.isExternalLink = true;
                    }
                } else {
                    menuItem.isExternalLink = true;
                    menuItem.isNull = true;
                }

                return (
                    <li
                        id={menuItem?.id}
                        key={menuItem?.id}
                        className={`${
                            menuItem.children.length ? 'has-subnav' : ''
                        } ${liClasses} nav-item-${
                            menuItem.content_model_internal_name === 'custom_links'
                                ? filterNavStringForClass(menuItem.name_esi)
                                : filterNavStringForClass(menuItem.menu_title_es) ||
                                filterNavStringForClass(menuItem.title)
                        } ${menuItem?.class_name ? menuItem?.class_name : ''}`}>
                        {!menuItem.isExternalLink ? (
                            <div
                                className="link-wrap"
                                onClick={() => toggleMenuWithChild(menuItem?.id)}>
                                <Link
                                    href={ContentService.parseVariableValue(menuItem?.redirectLink)}
                                    className={linkNameClasses}
                                    target={menuItem?.link_target === 'New Tab' ? '_blank' : ''}>
                                    {getMenuNameToShow(menuItem)}
                                </Link>
                                {!!menuItem.children.length && iconForNavChild}
                            </div>
                        ) : !menuItem.isNull ? (
                            <Link
                                href={ContentService.parseVariableValue(menuItem?.redirectLink)}
                                className={linkNameClasses}
                                target={menuItem?.link_target === 'New Tab' ? '_blank' : ''}
                                rel="noreferrer">
                                {getMenuNameToShow(menuItem)}
                                {iconForNavChild}
                            </Link>
                        ) : (
                            <div
                                className="link-wrap"
                                onClick={() => toggleMenuWithChild(menuItem?.id)}>
                                <p className="no-link pointer">{getMenuNameToShow(menuItem)}</p>
                                {iconForNavChild}
                            </div>
                        )}
                        {!!menuItem.children.length && (
                            <ExpMenu
                                childMenuItem={menuItem.children}
                                ulClasses={'has-subnav-list'}
                                liClasses={'subnav-item'}
                                keyValueForMenu={keyValueForMenu}
                                iconForNavChild={iconForNavChild}
                                index={index + 1}
                            />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default ExpMenu;
