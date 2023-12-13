/* eslint-disable no-script-url */
import {ContentService} from '../services/content-service';
import Link from 'next/link'

const IsCMSApp = true
const parseLink = (to: string) => {
    let link = 'javascript:void(0)';
    let isExternalLink = false;

    try {
        if (to) {
            if (to.indexOf('//') !== -1) {
                if (new URL(to).host !== new URL(window.location.href).host) {
                    link = to;
                    isExternalLink = true;
                } else {
                    link = new URL(to).pathname;
                }
            } else {
                link = to;
            }
        }
    } catch (err) {
        console.error(err);
    }

    return {link, isExternalLink};
};

/**
 * A custom link parser component that handles internal and external links based on the provided 'to' prop.
 * @param children - The child elements to be rendered within the link.
 * @param to - The destination URL.
 * @param target - The target attribute.
 * @param dangerouslySetInnerHTML - An object with a '__html' property containing HTML content to be rendered within the link.
 * @param className - The CSS class.
 * @param title - The title attribute.
 * @param ariaLabel - The aria-label attribute.
 * @param rel - The rel attribute.
 * @param onClick - The click event handler.
 * @param style - The inline style object.
 * @param id - The id attribute.
 * @returns Rendered ExpLinkParser component.
 */
const ExpLinkParser = ({
                           children,
                           to,
                           target = '_self',
                           dangerouslySetInnerHTML,
                           className,
                           title,
                           ariaLabel,
                           rel,
                           onClick,
                           style,
                           id,
                       }: any) => {
    const {link, isExternalLink} = parseLink(to);

    return (
        <>
            {!dangerouslySetInnerHTML ? (
                <>
                    {!isExternalLink && IsCMSApp && link !== 'javascript:void(0)' ? (
                        <Link
                            href={ContentService.parseVariableValue(link)}
                            style={style}
                            id={id}
                            title={title}
                            aria-label={ariaLabel}
                            rel={rel}
                            className={className}
                            target={target}
                            to={ContentService.parseVariableValue(link)}>
                            {children}
                        </Link>
                    ) : (
                        <a
                            id={id}
                            suppressHydrationWarning
                            title={title}
                            aria-label={ariaLabel}
                            rel={rel}
                            className={className}
                            target={target}
                            href={ContentService.parseVariableValue(link)}
                            onClick={onClick}>
                            {children}
                        </a>
                    )}
                </>
            ) : (
                <>
                    {!isExternalLink &&
                    IsCMSApp &&
                    link !== 'javascript:void(0)' &&
                    !link.startsWith('#') ? (
                        <Link
                            href={ContentService.parseVariableValue(link)}
                            id={id}
                            style={style}
                            title={title}
                            className={className}
                            aria-label={ariaLabel}
                            target={target}
                            rel={rel}
                            to={ContentService.parseVariableValue(link)}
                            dangerouslySetInnerHTML={{
                                __html: ContentService.parseVariableValue(
                                    dangerouslySetInnerHTML?.__html
                                ),
                            }}
                        />
                    ) : (
                        <a
                            id={id}
                            style={style}
                            suppressHydrationWarning
                            title={title}
                            aria-label={ariaLabel}
                            className={className}
                            target={target}
                            rel={rel}
                            href={ContentService.parseVariableValue(link)}
                            dangerouslySetInnerHTML={{
                                __html: ContentService.parseVariableValue(
                                    dangerouslySetInnerHTML?.__html
                                ),
                            }}
                            onClick={onClick}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default ExpLinkParser;
