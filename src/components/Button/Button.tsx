import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';

import AnimationCheck from '../../assets/animations/button-check.json';
import AnimationLoading from '../../assets/animations/button-loading.json';
import AnimationLoadingBlack from '../../assets/animations/button-loading-black.json';

import Text from '../Text/Text';
import Color from '../../constants/Color';
import ButtonText from './ButtonText';
import ButtonImage from './ButtonImage';
import CallToAction from './CallToAction';

const ButtonPrimary = styled.button<{size?: 'small' | 'normal', loading?: boolean, disabled?: boolean, success?: boolean}>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: ${props => props.size === 'small' ? '36px' : '56px'};
	padding: ${props => props.loading ? '0px' : (props.size === 'small' ? '0px 12px' : '0px 24px')};
	border-radius: 1000px;
	border: none;
	color: white;
	background-color: ${props => props.success ? Color.status.color.success : Color.background.primary};
	opacity: ${props => props.disabled ? 0.48 : 1};
	transition: transform .05s ease-out, width 0.2s ease-out, background-color 0.2s ease-out, opacity 0.2s ease-out; 
	min-width: ${props => props.size === 'small' ? '80px' : '100px'};
	cursor: ${props => (props.disabled || props.loading) ? 'default' : 'pointer'};
	:hover{
		background-color: ${props => (props.disabled || props.loading) ? Color.background.primary : Color.status.primary.hover};
	}
	:active {
		transform: ${props => (props.disabled || props.loading) ? 'none' : 'scale(0.95)'};
	}
`
const ButtonSecondary = styled.button<{size?: 'small' | 'normal', loading?: boolean, disabled?: boolean, success?: boolean}>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: ${props => props.size === 'small' ? '36px' : '56px'};
	padding: ${props => props.loading ? '0px' : (props.size === 'small' ? '0px 12px' : '0px 24px')};
	border-radius: 1000px;
	border: ${props => props.success ? 'none' : '1px solid '+ Color.background.primary};
	opacity: ${props => props.disabled ? 0.48 : 1};
	background-color: ${props => props.success ? Color.status.color.success : 'transparent'};
	transition: transform .05s ease-out, width 0.2s ease-out, background-color 0.2s ease-out; 
	min-width: ${props => props.size === 'small' ? '80px' : '100px'};
	cursor: ${props => (props.disabled || props.loading) ? 'default' : 'pointer'};
	:hover{
		background-color: ${props => (props.disabled || props.loading) ? 'transparent' : Color.background.primary+'30'};
	}
	:active {
		transform: ${props => (props.disabled || props.loading) ? 'none' : 'scale(0.95)'};
	}
`
const Label = styled(Text)<{size?: 'small' | 'normal', loading?: boolean, icon: boolean}>`
	font-size: ${props => props.size === 'small' ? '14px' : '15px'};
	width: 100%;
	margin-left: ${props => props.icon ? 6 : 0}; 
	color: white;
`

const Button = (props: Props) => {

	const [ showLabel, setShowLabel ] = useState(true);
	const [ prevLabel, setPrevLabel ] = useState(props.label);

	useEffect(() =>{
		if(prevLabel !== props.label){
			setShowLabel(false);
			delay(props.animationDelay ? props.animationDelay : 600).then(() =>{
				setShowLabel(true);
				setPrevLabel(props.label);
			});
		}
	},[props.label]);

	const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );

  	return (
		props.design === 'secondary' ?
			<ButtonSecondary
				data-testid="button"
				type="button"
				size={props.size}
				loading={props.loading}
				success={props.success}
				{...props}
			>
				{props.success ?
					<Player 
						style={{height: props.size === 'small' ? 25 : 30, width: props.size === 'small' ? 25 : 30}}
						autoplay={true}
						loop={false}
						keepLastFrame={true}
						src={AnimationCheck}
					/>
				: props.loading ?
					<Player 
						style={{width: props.size === 'small' ? 80 : 100}}
						autoplay={true}
						loop={true}
						src={AnimationLoadingBlack}
					/>
				:
					<>
					{(props.icon && props.iconPosition !== 'right') && props.icon}
					<Label
						type='p'
						weight='medium'
						loading={props.loading}
						size={props.size}
						icon={props.icon ? true : false}
						style={{
							fontWeight: props.style?.fontWeight ? props.style?.fontWeight : 500, 
							fontSize: props.style?.fontSize ? props.style?.fontSize : props.size === 'small' ? 14 : 15,
							color: props.textColor ? props.textColor : Color.text.primary
						}}
					>
						{props.label}
					</Label>
					{(props.icon && props.iconPosition === 'right') && props.icon}
					</>
				}
			</ButtonSecondary>
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
				data-testid="button"
				type="button"
				size={props.size}
				loading={props.loading}
				success={props.success}
				{...props}
			>
				{props.success ?
					<Player 
						style={{height: props.size === 'small' ? 25 : 30, width: props.size === 'small' ? 25 : 30}}
						autoplay={true}
						loop={false}
						keepLastFrame={true}
						src={AnimationCheck}
						onEvent={(event) =>{
							if(event === 'complete'){
								props.onSuccess && props.onSuccess(true);
							}
						}}
					/>
				: props.loading ?
					<Player 
						style={{width: props.size === 'small' ? 80 : 100}}
						autoplay={true}
						loop={true}
						src={AnimationLoading}
					/>
				:
					<>
					{(props.icon && props.iconPosition !== 'right') && props.icon}
					<Label
						type='p'
						weight='medium'
						loading={props.loading}
						size={props.size}
						icon={props.icon ? true : false}
						style={{
							width: 'unset',
							margin: '0px 6px',
							fontWeight: props.style?.fontWeight ? props.style?.fontWeight : 500, 
							fontSize: props.style?.fontSize ? props.style?.fontSize : props.size === 'small' ? 14 : 15,
							color: props.textColor ? props.textColor : 'white',
							opacity: showLabel ? 1 : 0,
							transform: showLabel ? 'translateY(0px)' : 'translateY(10px)',
							transition: 'opacity '+(props.animationTime ? props.animationTime : 0.3)+'s ease-out, transform '+(props.animationTime ? props.animationTime : 0.3)+'s ease-out'
						}}
					>
						{prevLabel}
					</Label>
					{(props.icon && props.iconPosition === 'right') && props.icon}
					</>
				}
			</ButtonPrimary>
  	);
};
export default Button;
export interface Props extends ComponentPropsWithoutRef<"button">{
	label: string;
	design?: 'primary' | 'secondary' | 'text' | 'image' | 'call-to-action',
	size?: 'small' | 'normal',
	icon?: React.ReactElement,
	iconPosition?: 'left' | 'right'
	loading?: boolean,
	success?: boolean,
	textColor?: string,
	animationDelay?: number,
	animationTime?: number,
	onSuccess?: (success: boolean) => void
}
