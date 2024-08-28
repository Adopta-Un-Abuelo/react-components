import React, { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

import Color from '../../constants/Color';

const ButtonText = styled.button.attrs<{$size?: 'small' | 'normal'}>(props => ({}))`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: ${props => props.$size === 'small' ? '36px' : '56px'};
	padding: ${props => props.$size === 'small' ? '0px 12px' : '0px 24px'};
	border-radius: 10000px;
	border: none;
	background-color: transparent;
	transition: transform .05s ease-out; 
	cursor: ${props => props.disabled ? 'default' : 'pointer'};
    gap: 8px;
    font-family: 'Poppins', 'sans-serif';
	font-size: ${props => props.$size === 'small' ? '14px' : '16px'};
    color: ${props => props.style?.color ? props.style.color : Color.text.full};
    opacity: ${props => props.disabled ? 0.5 : 1};
	&:hover{
		background-color: ${props => props.disabled ? 'transparent' : Color.status.neutral.hover};
	}
	&:active {
		transform: scale(0.95);
	}
`

const Button = ({size, icon, iconPosition, loading, ...restProps}: Props) => {

  	return (
        <ButtonText
            role="button"
            {...restProps}
            disabled={restProps.disabled || loading}
            onClick={(e: any) => (restProps.onClick && !loading && !restProps.disabled) && restProps.onClick(e)}
        >
            {(icon && iconPosition !== 'right') && icon}
            {restProps.children}
            {(icon && iconPosition === 'right') && icon}
        </ButtonText>
  	);
};
export default Button;
export interface Props extends ComponentPropsWithoutRef<"button">{
	size?: 'small' | 'normal',
	icon?: React.ReactElement,
	iconPosition?: 'left' | 'right'
	loading?: boolean,
}
