'use client'

import {EcommerceService} from '../../services/ecommerce-service';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {fieldData} from '../../common-components/form/form';

const ExpFooterNewsletterController = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({mode: 'onTouched'});
    const [isLoading] = useState<boolean>(false);
    const [emailValue, setEmailValue] = useState('');

    const fieldData: fieldData[] = [
        {
            field: 'email',
            requisite: {
                name: 'email',
                labelValue: '',
                value: emailValue,
                onFieldChange: setEmailValue,
                placeholder: 'abc@xyz.com',
                validation: {
                    required: {value: true, message: 'Email is required.'},
                    pattern: {
                        value: RegExp(
                            /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/i
                        ),
                        message: 'Email should be in valid format...!',
                    },
                },
            },
        },
    ];

    const signUpHandler = async (data: any) => {
        const formSubmit = await EcommerceService.subscribeToNewsLetter(
            data?.email
        );
        if (formSubmit?.Status === 'success') {
            // toast.success(formSubmit.Data);
        } else {
            // toast.error(formSubmit.Error.message);
        }
        setEmailValue('');
    };

    return {
        isLoading,
        signUpHandler,
        register,
        handleSubmit,
        errors,
        fieldData,
        emailValue,
    };
};
export default ExpFooterNewsletterController;
