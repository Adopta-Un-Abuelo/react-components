import { ReactElement, CSSProperties } from 'react';

import InputPrimary from './InputPrimary';
import InputSecondary from './InputSecondary';
import InputRange, { InputRangeProps } from './InputRange';
import InputLocation, { InputLocationPrimaryProps, InputLocationSecondaryProps } from './InputLocation';
import InputDateRange, { InputDateRangeProps } from './InputDateRange';
import InputImage, { InputImageProps } from './InputImage';
import InputChat, { InputChatProps } from './InputChat';
import InputCode, { InputCodeProps } from './InputCode';
import { InputStyledProps } from './InputStyled';

const Input = (props: InputProps | LocationPrimaryProps | LocationSecondaryProps | RangeProps | DateRangeProps | ImageProps | ChatProps | CodeProps) =>{

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
    : props.type === 'chat' ?
        <InputChat
            {...props}
        />
    : props.type === 'code' ?
        <InputCode
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

export interface LocationPrimaryProps extends InputLocationPrimaryProps{
    design: 'primary',
    type: 'location'
}

export interface LocationSecondaryProps extends InputLocationSecondaryProps{
    design: 'secondary',
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

export interface ChatProps extends InputChatProps{
    type: 'chat'
}

export interface CodeProps extends InputCodeProps{
    type: 'code'
}