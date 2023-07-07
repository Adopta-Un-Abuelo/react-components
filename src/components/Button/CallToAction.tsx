import React, { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

import Color from '../../constants/Color';

const CallToActionStyled = styled.button<{loading?: boolean, disabled?: boolean, textColor?: string, size?: string}>`
    display: flex;
    gap: 8px;
    align-items: center;
	background: none;
    border: none;
	cursor: ${props => (props.disabled || props.loading) ? 'default' : 'pointer'};
	opacity: ${props => (props.disabled || props.loading) ? 0.5 : 1};
	color: ${props => props.textColor ? props.textColor : Color.text.primary};
    font-family: 'Poppins', 'sans-serif';
	font-size: ${props => props.size === 'small' ? '14px' : '16px'};
	&:hover{
		text-decoration: ${props => (props.disabled || props.loading) ? 'none' : 'underline'};;
	}
`

const CallToAction = (props: Props) => {

    const {children, icon, iconPosition, ...restProps} = props;
    
  	return (
        <CallToActionStyled 
            role="button"
            loading={props.loading}
            textColor={props.textColor}
            disabled={props.disabled}
            {...restProps}
            onClick={(e: any) => (props.onClick && !props.loading && !props.disabled) && props.onClick(e)}
        >
            {iconPosition !== 'right' ? icon : undefined}
            {children}
            {iconPosition === 'right' ? icon : undefined}
        </CallToActionStyled>
  	);
};
export default CallToAction;
export interface Props extends ComponentPropsWithoutRef<"button">{
	size?: 'small' | 'normal',
	icon?: React.ReactElement,
	iconPosition?: 'left' | 'right'
	loading?: boolean,
    disabled?: boolean,
	textColor?: string
}
