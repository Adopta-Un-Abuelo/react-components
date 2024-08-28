import { ReactElement, useEffect, useState, useRef, CSSProperties } from 'react';
import styled from 'styled-components';
import Country from '../../constants/Country';
import GLPN from 'google-libphonenumber';

import Color from '../../constants/ColorV2';
import Select  from '../Select/SelectPhone';
import Text from '../Text/Text';
import InputStyled,  { InputStyledProps } from './InputStyled';

const Container = styled.div`
`
const InputContainer = styled.div<{$focus: boolean, $error: boolean}>`
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    border-radius: 12px;
    padding: 0px;
    height: 56px;
    min-height: 56px;
    outline: none;
    box-shadow: 0 0 0 ${props => props.$focus ? '2px '+Color.border.neutralMedium : (props.$error ? '1px '+Color.text.red : '1px '+Color.border.neutralSoft)};
    padding: 0px 16px;
    background-color: white;
    cursor: text;
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
const Column = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`
const IconView = styled.div`
    margin-right: 8px;
`
const Placeholder = styled(Text)<{$focus: boolean, $phone: boolean, $error: boolean}>`
    position: absolute;
    top: ${props => props.$focus ? '8px' : '16px'};
    left: ${props => props.$phone ? (props.$focus ? '74px' : '112px') : 'unset'};
    color: ${props => props.$error ? Color.text.red : Color.text.neutralMedium};
    font-size: ${props => props.$focus ? '12px' : '15px'} !important;
    transition: top 0.1s ease-out, font-size 0.1s ease-out;
`
const InputSecondary = (props: InputSecondaryProps) =>{

    const phoneUtil = GLPN.PhoneNumberUtil.getInstance();
   
    const input = useRef<HTMLInputElement>(null);
    const [ inputValue, setInputValue ] = useState<string | number | readonly string[] | undefined>(undefined);
    const [ country , setCountry ] = useState<any>(Country[0]);
    const [ focus, setFocus ] = useState(false);

    useEffect(() =>{
        setInputValue(props.value);
    },[props.value]);

    useEffect(() =>{
        if(props.country){
            const result = Country.filter(item => item.prefix === props.country);
            if(result.length > 0)
                onCountryChange(result[0]);
        }
    }, [props.country]);

    const onInputChange = (e: any) =>{
        setInputValue(e.target.value);
        props.onChange && props.onChange(e);
        if(props.type === 'tel'){
            const value = e.target.value.replaceAll(/\s/g,'');
            const phone = country.prefix + value;
            props.onPhoneChange && props.onPhoneChange({
                country: country.prefix, 
                value: value,
                isValid: (phone.length > 8 && phone.length < 18) ? phoneUtil.isValidNumberForRegion(phoneUtil.parse(phone, country.countryCode), country.countryCode) : false
            });
        }
    }

    const onCountryChange = (country:any) =>{
        setCountry(country);
        const value = (inputValue && typeof inputValue === 'string') ? inputValue.replaceAll(/\s/g,'') : "";
        const phone = country.prefix + value;
        props.onPhoneChange && props.onPhoneChange({
            country: country.prefix, 
            value: value,
            isValid: (phone.length >=6 && phone.length < 18) ? phoneUtil.isValidNumberForRegion(phoneUtil.parse(phone, country.countryCode), country.countryCode) : false
        });
    }

    const onInputFocus = (e: any) =>{
        setFocus(true);
        props.onFocus && props.onFocus(e);
    }

    const onInputBlur = (e: any) =>{
        setFocus(false);
        props.onBlur && props.onBlur(e);
    }

    return(
        <Container
            style={props.containerStyle}
        >
            <InputContainer
                $error={props.error ? true : false}
                style={props.style}
                $focus={focus}
                onClick={() => input.current?.focus()}
            >
                {props.icon ? 
                    <IconView>
                        {props.icon}
                    </IconView>
                : props.type === 'tel' ?
                    <IconView>
                        <Select
                            selectedItem={country} 
                            onChange={item => onCountryChange(item)} 
                            id="country" 
                            options={Country}
                            $focus={(focus || inputValue) ? true : false}
                        />
                    </IconView>
                : null}
                <Column>
                    <Placeholder 
                        role="placeholder"
                        type='p'
                        $phone={props.type === 'tel'}
                        $focus={(focus || inputValue || props.defaultValue) ? true : false}
                        $error={props.error ? true : false}
                    >
                        {props.placeholder}
                    </Placeholder>
                    <InputStyled 
                        ref={input}
                        {...props}
                        value={props.value ? props.value : inputValue}
                        placeholder=''
                        style={{marginTop: 14, opacity: (props.type === 'date' || props.type === 'time') ? ((focus || inputValue || props.defaultValue) ? 1 : 0) : 1, ...props.style}}
                        onChange={onInputChange}
                        onFocus={onInputFocus}
                        onBlur={onInputBlur}
                    />
                </Column>
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
export default InputSecondary;
export interface InputSecondaryProps extends InputStyledProps{
    containerStyle?: CSSProperties,
    icon?: ReactElement,
    error?: string|undefined,
    focus?: boolean,
    phone?: boolean,
    design?: string,
    country?: string,
    onPhoneChange?:(item:{
        country: string,
        value?: any,
        isValid: boolean
    })=>void
}