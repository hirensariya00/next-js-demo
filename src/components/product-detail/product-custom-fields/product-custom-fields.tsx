'use client'
import {memo} from 'react';

interface ExpProductCustomFieldsProps {
    product: any;
}

const ExpProductCustomFields = (props: ExpProductCustomFieldsProps) => {
    const {product} = props;

    return (
        <>
            {!!product?.custom_fields_ej?.length && (
                <div className="product-detail-bulletine m-b-24 p-b-24">
                    <ul className="m-0 list-style-none">
                        {product?.custom_fields_ej.map((obj: any) => (
                            <div key={obj.id}>
                                <li>
                                    <span className="product-detail-title">{obj?.name}</span>
                                    <span>{obj?.value}</span>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default memo(ExpProductCustomFields);
