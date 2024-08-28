import { ReactElement, CSSProperties } from 'react';

import InputPrimary, { InputPrimaryProps } from './InputPrimary';
import InputSecondary, { InputSecondaryProps } from './InputSecondary';
import InputRange, { InputRangeProps as ImportedInputRangeProps } from './InputRange';
import InputLocation, { InputLocationPrimaryProps as ImportedInputLocationPrimaryProps, InputLocationSecondaryProps as ImportedInputLocationSecondaryProps } from './InputLocation';
import InputDateRange, { InputDateRangeProps } from './InputDateRange';
import InputImage, { InputImageProps } from './InputImage';
import InputChat, { InputChatProps } from './InputChat';
import InputCode, { InputCodeProps } from './InputCode';
import InputDate, { InputDatePrimaryProps, InputDateSecondaryProps } from './InputDate';
import { InputStyledProps } from './InputStyled';

const Input = (
  props: InputProps | LocationPrimaryProps | LocationSecondaryProps | RangeProps | DateRangeProps | ImageProps | ChatProps | CodeProps | DatePrimaryProps | DateSecondaryProps
) => {

    const castRangeProps = (props: RangeProps): ImportedInputRangeProps => {
        return {
            ...props,
            min: typeof props.min === 'string' ? parseFloat(props.min) : props.min,
            max: typeof props.max === 'string' ? parseFloat(props.max) : props.max,
        };
    };

    return (props.type === 'range' ?
        <InputRange
            {...castRangeProps(props as RangeProps)}
        />
        : props.type === 'location' ?
            <InputLocation
                {...props as ImportedInputLocationPrimaryProps | ImportedInputLocationSecondaryProps}
            />
        : props.type === 'range-date' ?
            <InputDateRange
                {...props as DateRangeProps}
            />
        : props.type === 'image' ?
            <InputImage
                {...props as ImageProps}
            />
        : props.type === 'chat' ?
            <InputChat
                {...props as ChatProps}
            />
        : props.type === 'code' ?
            <InputCode
                {...props as CodeProps}
            />
        : props.type === 'date' ?
            <InputDate
                {...props as DatePrimaryProps | DateSecondaryProps}
            />
        : props.design === 'secondary' ?
            <InputSecondary
                {...props as InputSecondaryProps}
            />
        :
            <InputPrimary
                {...props as InputPrimaryProps}
            />
    );
};

export default Input;

export interface InputProps extends InputStyledProps {
    type: 'text' | 'tel' | 'email' | 'date' | 'password' | 'time' | 'number' | 'range' | 'range-date' | 'image' | 'chat' | 'code' | 'location',
    containerStyle?: CSSProperties,
    icon?: ReactElement,
    unit?: string,
    error?: string | undefined,
    country?: string,
    hideRange?: boolean,
    design?: 'primary' | 'secondary',
    options?: any,
    onPhoneChange?: (item: any) => void,
}

export interface LocationPrimaryProps extends Omit<ImportedInputLocationPrimaryProps, 'type'> {
    design: 'primary',
    type: 'location',
}

export interface LocationSecondaryProps extends Omit<ImportedInputLocationSecondaryProps, 'type'> {
    design: 'secondary',
    type: 'location',
}

export interface RangeProps extends ImportedInputRangeProps {
    type: 'range',
    lineColor?: string,
    backgroundColor?: string,
    thumbColor?: string,
    min?: number,
    max?: number,
    unit?: string,
    hideRange?: boolean
}

export interface DateRangeProps extends InputDateRangeProps {
    type: 'range-date'
}

export interface ImageProps extends InputImageProps {
    type: 'image'
}

export interface ChatProps extends InputChatProps {
    type: 'chat'
}

export interface CodeProps extends InputCodeProps {
    type: 'code'
}

export interface DatePrimaryProps extends InputDatePrimaryProps {
    design: 'primary',
    type: 'date'
}

export interface DateSecondaryProps extends InputDateSecondaryProps {
    design: 'secondary',
    type: 'date'
}