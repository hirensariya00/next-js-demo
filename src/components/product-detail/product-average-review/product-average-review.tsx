'use client'

import {memo} from 'react';
import {IconStar} from '../../../assets/icons/star';

interface ExpProductAverageReviewProps {
    averageReviewsCount: number | undefined;
    starFillClassName: string;
    starClassName: string;
}

const ExpProductAverageReview = (props: ExpProductAverageReviewProps) => {
    const {averageReviewsCount, starFillClassName, starClassName} = props;

    return (
        <>
            {averageReviewsCount! > 0 ? (
                <li>
                    <i className={starFillClassName}>
                        <IconStar/>
                    </i>
                </li>
            ) : (
                <li>
                    <i className={starClassName}>
                        <IconStar/>
                    </i>
                </li>
            )}

            {averageReviewsCount! > 1 ? (
                <li>
                    <i className={starFillClassName}>
                        <IconStar/>
                    </i>
                </li>
            ) : (
                <li>
                    <i className={starClassName}>
                        <IconStar/>
                    </i>
                </li>
            )}

            {averageReviewsCount! > 2 ? (
                <li>
                    <i className={starFillClassName}>
                        <IconStar/>
                    </i>
                </li>
            ) : (
                <li>
                    <i className={starClassName}>
                        <IconStar/>
                    </i>
                </li>
            )}

            {averageReviewsCount! > 3 ? (
                <li>
                    <i className={starFillClassName}>
                        <IconStar/>
                    </i>
                </li>
            ) : (
                <li>
                    <i className={starClassName}>
                        <IconStar/>
                    </i>
                </li>
            )}

            {averageReviewsCount! > 4 ? (
                <li>
                    <i className={starFillClassName}>
                        <IconStar/>
                    </i>
                </li>
            ) : (
                <li>
                    <i className={starClassName}>
                        <IconStar/>
                    </i>
                </li>
            )}
        </>
    );
};

export default memo(ExpProductAverageReview);
