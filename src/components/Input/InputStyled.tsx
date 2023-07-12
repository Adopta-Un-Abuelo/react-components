import { ComponentPropsWithRef, forwardRef } from 'react';
import styled from 'styled-components';
import Color from '../../constants/ColorV2';

const Input = styled.input<{hideCalendar?: boolean}>`
    font-family: 'Poppins';
    font-size: 15px;
    border: none;
    outline: none;
    padding: 0px;
    background-color: transparent;
    color: ${Color.text.neutralHard};
    width: 100%;
    cursor: inherit;
    &::placeholder{
        color: ${Color.text.neutralMedium}
    }
    &::-webkit-calendar-picker-indicator {
        display: ${props => props.hideCalendar && 'none'};
        -webkit-appearance: ${props => props.hideCalendar && 'none'};
    }
    &::-webkit-calendar-picker-indicator {
        background: none;
    }
`
const InputStyled = forwardRef((props: InputStyledProps, ref: any) =>{

    return(
        <Input
            ref={ref}
            role="input"
            {...props}
            maxLength={props.type === 'date' ? 10 : undefined}
        />
    )
})
export default InputStyled;
export interface InputStyledProps extends ComponentPropsWithRef<"input">{
    type?: 'text' | 'tel' | 'email' | 'date' | 'password' | 'range' | 'time' | 'number' | 'location',
    hideCalendar?: boolean
}