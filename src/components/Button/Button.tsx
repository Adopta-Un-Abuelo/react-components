import React, { ComponentPropsWithoutRef } from 'react';

import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import ButtonText from './ButtonText';
import ButtonImage from './ButtonImage';
import CallToAction from './CallToAction';

const Button = (props: ButtonProps) => {

  	return (
		props.design === 'secondary' ?
			<ButtonSecondary
				{...props}	
			/>
		: props.design === 'text' ?
			<ButtonText
				{...props}
			/>
		: props.design === 'image' ?
			<ButtonImage
				{...props}
			/>
		: props.design === 'call-to-action' ?
			<CallToAction
                {...props}
            />
		:
			<ButtonPrimary
				{...props}
			/>
  	);
};
export default Button;
export interface ButtonProps extends ComponentPropsWithoutRef<"button">{
	design?: 'primary' | 'secondary' | 'text' | 'image' | 'call-to-action',
	size?: 'small' | 'normal',
	icon?: React.ReactElement,
	iconPosition?: 'left' | 'right'
	loading?: boolean,
	disabled?: boolean,
	success?: boolean,
	textColor?: string,
	animationDelay?: number,
	animationTime?: number,
	onSuccess?: (success: boolean) => void
}
