import { ReactElement, useEffect, useState, useRef, CSSProperties } from 'react';
import styled from "styled-components";

import Color from '../../constants/Color';
import Text from '../Text/Text';

const Container = styled.div`
    width: fit-content;
`
const InputContainer = styled.div<{focus: boolean, error: boolean}>`
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 12px;
    padding: 0px;
    height: 56px;
    min-height: 56px;
    outline: none;
    box-shadow: 0 0 0 ${props => props.focus ? '2px '+Color.line.full : (props.error ? '1px '+Color.status.color.error : '1px '+Color.line.soft)};
    background-color: transparent;
    cursor: text;
`
const ErrorDiv = styled.div`
    margin: 0px 12px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    display: flex;
    color: ${Color.status.color.error};
`;
const Input = styled.input`
    display: flex;
    font-family: 'DM Mono';
    font-size: 24px;
    width: 160px;
    border: none;
    outline: none;
    height: 100%;
    padding: 0px 16px;
    background-color: transparent;
    color: ${Color.text.full};
    cursor: inherit;
    appearance: textfield;
    letter-spacing: 12px;
    ::placeholder{
        color: ${Color.text.medium}
    }
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`

const InputCode = (props: InputCodeProps) =>{

    const input = useRef<HTMLInputElement>(null);
    const [ focus, setFocus ] = useState(false);
    const [ value, setValue ] = useState<string | undefined>(undefined);

    const onTextChange = (e: any) =>{
        if(e.target.value.length <= 6){
            setValue(e.target.value);
            if(e.target.value.length === 6){
                input.current?.blur();
                props.onChange && props.onChange(e.target.value);
            }
        }
    }

    return(
        <Container
            style={props.containerStyle}
        >
            <InputContainer
                error={props.error ? true : false}
                style={props.style}
                focus={focus}
                onClick={() => input.current?.focus()}
            >
                <Input
                    role='input'
                    type='number'
                    value={value}
                    placeholder='------'
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={onTextChange}
                />
            </InputContainer>
            {props.error && 
                <ErrorDiv
                    role="error"
                >
                    <Text type='p' style={{color: Color.status.color.error, marginTop: 8, fontSize: 14, lineHeight: '18px'}}>
                        {props.error}
                    </Text>
                </ErrorDiv>
            }
        </Container>
    )
}
export default InputCode;
export interface InputCodeProps{
    style?: CSSProperties,
    containerStyle?: CSSProperties,
    error?: string,
    onChange?: (code: string) => void
}