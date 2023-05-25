import { ReactElement, CSSProperties } from 'react';

import InputPrimary from './InputPrimary';
import InputSecondary from './InputSecondary';
import InputRange from './InputRange';
import InputLocation from './InputLocation';
import { InputStyledProps } from './InputStyled';

const Input = (props: Props) =>{

    return(props.type === 'range' ?
        <InputRange
            {...props}
        />
    : props.type === 'location' ?
        <InputLocation
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
export interface Props extends InputStyledProps{
    containerStyle?: CSSProperties,
    icon?: ReactElement,
    error?: string|undefined,
    lineColor?: string,
    thumbColor?: string,
    min?: number,
    max?: number,
    unit?: string,
    hideRange?: boolean
    country?: string,
    design?: 'primary' | 'secondary',
    onPhoneChange?:(item:any)=>void,
    onLocationChange?: (result: {
        address: string,
        geocoder: google.maps.GeocoderResult,
        location: google.maps.LatLngLiteral
    }) => void
}