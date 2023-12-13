'use clirnt'
import {useEffect, useState} from 'react';
import {IconProductLeft} from '../../../assets/icons/product-left';
import {IconProductRight} from '../../../assets/icons/product-right';

const ExpProductImageController = () => {
    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState<boolean>(false);
    const [ImageSlider, setImageSlider] = useState<any>();
    const [ThumnnailImageSlider, setThumnnailImageSlider] = useState<any>();
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

    const slidersetting = {
        dots: false,
        arrows: true,
        infinite: false,
        autoPlay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: (
            <button type="button" className="slick-arrow slick-prev">
                <IconProductLeft/>
            </button>
        ),
        nextArrow: (
            <button type="button" className="slick-arrow slick-next">
                <IconProductRight/>
            </button>
        ),
    };

    const thumbslidersetting = {
        dots: false,
        arrows: false,
        infinite: false,
        autoPlay: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleWindowSizeChange = () => {
        setDeviceWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    return {
        setIsImagePreviewOpen,
        isImagePreviewOpen,
        setImageSlider,
        ImageSlider,
        setThumnnailImageSlider,
        ThumnnailImageSlider,
        deviceWidth,
        slidersetting,
        thumbslidersetting,
    };
};

export default ExpProductImageController;
