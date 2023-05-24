import { ReactElement, useEffect, useState, CSSProperties } from 'react';
import styled from 'styled-components';
import Color from '../../constants/Color';
import Country from '../../constants/Country';
import GLPN from 'google-libphonenumber';

import Select, { CountryProps }  from '../Select/SelectPhone';
import Text from '../Text/Text';
import InputStyled,  { InputStyledProps } from './InputStyled';

const Container = styled.div`
`
const InputContainer = styled.div<{focus: boolean, error: boolean}>`
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    border-radius: 6px;
    padding: 0px;
    height: 40px;
    min-height: 40px;
    outline: none;
    box-shadow: 0 0 0 ${props => props.focus ? '1px '+Color.line.primarySoft : 'none'};
    padding: 0px 16px;
    background-color: ${props => props.focus ? 'white' : (props.error ? Color.status.color.errorDefault : Color.background.soft)};
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
const InputPrimary = (props: Props) =>{

    const phoneUtil = GLPN.PhoneNumberUtil.getInstance();
   
    const [ inputValue, setInputValue ] = useState<string | number | readonly string[] | undefined>(undefined);
    const [ country , setCountry ] = useState<CountryProps>(Country[0]);
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

    const onCountryChange = (country: CountryProps) =>{
        setCountry(country);
        const phone = country.prefix + (inputValue ? inputValue : "");
        props.onPhoneChange && props.onPhoneChange({
            country: country.prefix, 
            value: inputValue,
            isValid: (phone.length >= 6 && phone.length < 18) ? phoneUtil.isValidNumberForRegion(phoneUtil.parse(phone, country.countryCode), country.countryCode) : false
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
            >
                {props.icon ? 
                    <IconView>
                        {props.icon}
                    </IconView>
                : props.type === 'tel' ?
                    <IconView>
                        <Select
                            optionStyle={{top: 45}}
                            selectedItem={country}
                            onChange={item => onCountryChange(item)}
                            id="country"
                            options={Country}
                            focus={false}
                        />
                    </IconView>
                : null}
                <Column>
                    <InputStyled 
                        {...props}
                        value={inputValue}
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
export default InputPrimary;
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