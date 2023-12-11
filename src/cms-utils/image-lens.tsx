'use client'
//@ts-nocheck
import {useRef, useState, CSSProperties, MouseEventHandler} from 'react';

interface ImageMagnifierProps {
    height?: string | number;
    width?: string | number;
    imageUrl: string;
    className?: string;
    transitionTime?: number;
    zoomScale?: number;
    style?: CSSProperties;
    altText: string;
}

/**
 * A React component that displays an image with a magnifying effect on hover.
 *
 * @param height - The height of the magnifier container.
 * @param width - The width of the magnifier container.
 * @param imageUrl - The URL of the image to be displayed in the magnifier.
 * @param className - Additional CSS class names for the magnifier container.
 * @param transitionTime - The transition time in seconds for the zoom effect.
 * @param zoomScale - The scale factor to apply when zooming the image.
 * @param style - Additional inline styles for the magnifier container.
 * @param altText - The alternative text for the image.
 *
 * @returns {JSX.Element} The ImageMagnifier component.
 */

const ImageMagnifier = (props: ImageMagnifierProps) => {
    const {
        className = '',
        zoomScale = 1.5,
        height = 568,
        width = 568,
        style = {},
        imageUrl,
        transitionTime = 0.1,
        altText = 'Experro',
    } = props;
    //@ts-ignore
    const ref = useRef<HTMLDivElement>(null);
    const [zoom, setZoom] = useState<boolean>(false);
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);

    const handleMouseOver: MouseEventHandler<HTMLDivElement> = () => {
        setZoom(true);
    };

    const handleMouseOut: MouseEventHandler<HTMLDivElement> = () => {
        setZoom(false);
    };

    const handleMouseMovement: MouseEventHandler<HTMLDivElement> = (e) => {
        if (ref.current) {
            const {left: offsetLeft, top: offsetTop} = ref.current.getBoundingClientRect();
            // eslint-disable-next-line no-restricted-globals
            const x = ((e.pageX - offsetLeft - scrollX) / ref.current.offsetWidth) * 100;
            // eslint-disable-next-line no-restricted-globals
            const y = ((e.pageY - offsetTop - scrollY) / ref.current.offsetHeight) * 100;
            setMouseX(x);
            setMouseY(y);
        }
    };

    const transform: CSSProperties = {
        transformOrigin: `${mouseX}% ${mouseY}%`,
    };

    const innerDivStyle: CSSProperties = {
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 436px',
        transition: `transform ${transitionTime}s ease-out`,
        backgroundImage: `url('${imageUrl}')`,
        backgroundColor: '#F6F8FA',
        backgroundBlendMode: 'multiply',
    };

    return (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <div
            className={className}
            style={{
                ...style,
                height,
                width,
                overflow: 'hidden',
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseMove={handleMouseMovement}
            ref={ref}
            aria-label={altText}>
            <div
                aria-label={altText}
                style={{
                    ...transform,
                    ...innerDivStyle,
                    transform: zoom ? `scale(${zoomScale})` : 'scale(1.0)',
                }}
                className={className}
            />
        </div>
    );
};

export default ImageMagnifier;
