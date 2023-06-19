import { ReactElement, CSSProperties } from 'react';

import InputPrimary from './InputPrimary';
import InputSecondary from './InputSecondary';
import InputRange, { InputRangeProps } from './InputRange';
import InputLocation, { InputLocationProps } from './InputLocation';
import InputDateRange, { InputDateRangeProps } from './InputDateRange';
import InputImage, { InputImageProps } from './InputImage';
import { InputStyledProps } from './InputStyled';

const Input = (props: InputProps | LocationProps | RangeProps | DateRangeProps | ImageProps) =>{

    return(props.type === 'range' ?
        <InputRange
            {...props}
        />
    : props.type === 'location' ?
        <InputLocation
            {...props}
        />
    : props.type === 'range-date' ?
        <InputDateRange
            {...props}
        />
    : props.type === 'image' ?
        <InputImage
            {...props}
        />
    : props.design === 'secondary' ?
        <InputSecondary
            {...props}
        />
    :
        <InputPrimary
            {...props}
        />
    )
}
export default Input;
export interface InputProps extends InputStyledProps{
    type: 'text' | 'tel' | 'email' | 'date' | 'password' | 'time' | 'number',
    containerStyle?: CSSProperties,
    icon?: ReactElement,
    error?: string|undefined,
    country?: string,
    design?: 'primary' | 'secondary',
    onPhoneChange?:(item:any)=>void,
}

export interface LocationProps extends InputLocationProps{
    type: 'location'
}

export interface RangeProps extends InputRangeProps{
    type: 'range'
}

export interface DateRangeProps extends InputDateRangeProps{
    type: 'range-date'
}

export interface ImageProps extends InputImageProps{
    type: 'image'
}