import { useState, useRef, CSSProperties } from 'react';
import styled from "styled-components";

import Color from '../../constants/ColorV2';
import Text from '../Text/Text';

const Container = styled.div`
    width: fit-content;
`
const InputContainer = styled.div<{$focus: boolean, $error: boolean, loading?: boolean}>`
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 12px;
    padding: 0px;
    height: 56px;
    min-height: 56px;
    outline: none;
    box-shadow: 0 0 0 ${props => props.$focus ? '2px '+Color.border.neutralMedium : (props.$error ? '1px '+Color.text.red : '1px '+Color.border.neutralSoft)};
    background-color: white;
    opacity: ${props => props.loading ? 0.5 : 1};
    cursor: ${props => props.loading ? 'default' : 'text'};
`
const ErrorDiv = styled.div`
    margin: 0px 12px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    display: flex;
    color: ${Color.text.red};
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
    color: ${Color.text.neutralHard};
    cursor: inherit;
    appearance: textfield;
    letter-spacing: 12px;
    &::placeholder{
        color: ${Color.text.neutralSoft}
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
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
                $error={props.error ? true : false}
                style={props.style}
                $focus={focus}
                loading={props.loading}
                onClick={() => input.current?.focus()}
            >
                <Input
                    role='input'
                    type='number'
                    value={value}
                    placeholder='------'
                    disabled={props.loading}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={onTextChange}
                />
            </InputContainer>
            {props.error && 
                <ErrorDiv
                    role="error"
                >
                    <Text type='p' style={{color: Color.text.red, marginTop: 8, fontSize: 14, lineHeight: '18px'}}>
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
    loading?: boolean,
    onChange?: (code: string) => void
}