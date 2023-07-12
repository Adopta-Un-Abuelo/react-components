import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';

import Color from '../../constants/ColorV2';

const B1 = styled.p`
	padding: 0px;
	margin: 0px;
	font-family: 'Poppins', 'sans-serif';
	color: ${Color.text.neutralHard};
	font-size: 18px;
	${media.lessThan("medium")`
		font-size: 15px;
    `}
`
const B2 = styled.p`
	padding: 0px;
	margin: 0px;
	font-family: 'Poppins', 'sans-serif';
	color: ${Color.text.neutralHard};
	font-size: 15px;
	${media.lessThan("medium")`
		font-size: 14px;
    `}
`
const B3 = styled.p`
	padding: 0px;
	margin: 0px;
	font-family: 'Poppins', 'sans-serif';
	color: ${Color.text.neutralHard};
	font-size: 13px;
	${media.lessThan("medium")`
		font-size: 13px;
    `}
`

const Button = (props: ButtonProps) =>{

	const { children, type, weight, style, ...rest } = props;

	if(type === 'b1')
		return(
			<B1
				style={{
					fontWeight: weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 400,
					...style
				}}
				{...rest}
			>
				{children}
			</B1>
		)
	else if(type === 'b2')
		return(
			<B2
				style={{
					fontWeight: weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 400,
					...style
				}}
				{...rest}
			>
				{children}
			</B2>
		)
	else
		return(
			<B3
				style={{
					fontWeight: weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 400,
					...style
				}}
				{...rest}
			>
				{children}
			</B3>
		)
}
export default Button;
export interface ButtonProps extends ComponentPropsWithoutRef<"p">{
	type: 'b1' | 'b2' | 'b3',
	weight?: 'semibold' | 'medium' | 'regular'
}