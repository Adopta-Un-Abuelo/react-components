import { ReactElement, useEffect, useState, useRef, CSSProperties } from 'react';
import styled from 'styled-components';
import Color from '../../constants/Color';
import Country from '../../constants/Country';
import GLPN from 'google-libphonenumber';

import Select  from '../Select/SelectPhone';
import Text from '../Text/Text';
import InputStyled,  { InputStyledProps } from './InputStyled';

const Container = styled.div`
`
const InputContainer = styled.div<{focus: boolean, error: boolean}>`
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    border-radius: 12px;
    padding: 0px;
    height: 56px;
    min-height: 56px;
    outline: none;
    box-shadow: 0 0 0 ${props => props.focus ? '2px '+Color.line.full : (props.error ? '1px '+Color.status.color.error : '1px '+Color.line.soft)};
    padding: 0px 16px;
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
const Column = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`
const IconView = styled.div`
    margin-right: 8px;
`
const Placeholder = styled(Text)<{focus: boolean, phone: boolean, error: boolean}>`
    position: absolute;
    top: ${props => props.focus ? '8px' : '16px'};
    left: ${props => props.phone ? (props.focus ? '74px' : '112px') : 'unset'};
    color: ${props => props.error ? Color.status.color.error : Color.text.high};
    font-size: ${props => props.focus ? '12px' : '15px'} !important;
    transition: top 0.1s ease-out, font-size 0.1s ease-out;
`
const InputSecondary = (props: Props) =>{

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
            const result = Country.filter(item => item.countryCode === props.country);
            setCountry(result[0]);
        }
    }, [props.country]);

    const onInputChange = (e: any) =>{
        setInputValue(e.target.value);
        props.onChange && props.onChange(e);
        if(props.type === 'tel'){
            const phone = country.prefix + e.target.value;
            props.onPhoneChange && props.onPhoneChange({
                country: country.prefix, 
                value: e.target.value,
                isValid: (phone.length > 8 && phone.length < 18) ? phoneUtil.isValidNumberForRegion(phoneUtil.parse(phone, country.countryCode), country.countryCode) : false
            });
        }
    }

    const onCountryChange = (country:any) =>{
        setCountry(country);
        const phone = country.prefix + (inputValue ? inputValue : "");
        props.onPhoneChange && props.onPhoneChange({
            country: country.prefix, 
            value: inputValue,
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
            data-testid="input"
            style={props.containerStyle}
        >
            <InputContainer
                error={props.error ? true : false}
                style={props.style}
                focus={focus}
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
                            focus={(focus || inputValue) ? true : false}
                        />
                    </IconView>
                : null}
                <Column>
                    <Placeholder 
                        type='p'
                        phone={props.type === 'tel'}
                        focus={(focus || inputValue || props.defaultValue) ? true : false}
                        error={props.error ? true : false}
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
                <ErrorDiv>
                    <Text type='p' style={{color: Color.status.color.error, marginTop: 8, fontSize: 14, lineHeight: '18px'}}>
                        {props.error}
                    </Text>
                </ErrorDiv>
            }
        </Container>
    )
}
export default InputSecondary;
export interface Props extends InputStyledProps{
    containerStyle?: CSSProperties,
    icon?: ReactElement,
    error?: string|undefined,
    country?: string,
    onPhoneChange?:(item:{
        country: string,
        value?: any,
        isValid: boolean
    })=>void
}