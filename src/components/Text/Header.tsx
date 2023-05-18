import React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';

import Color from '../../constants/Color';

const H1 = styled.h1`
	padding: 0px;
	margin: 0px;
	font-family: 'Poppins', 'sans-serif';
	color: ${Color.text.full};
	font-size: 36px;
	${media.lessThan("medium")`
		font-size: 28px;
    `}
`
const H2 = styled.h2`
	padding: 0px;
	margin: 0px;
	font-family: 'Poppins', 'sans-serif';
	color: ${Color.text.full};
	font-size: 28px;
	${media.lessThan("medium")`
		font-size: 24px;
    `}
`
const H3 = styled.h3`
	padding: 0px;
	margin: 0px;
	font-family: 'Poppins', 'sans-serif';
	color: ${Color.text.full};
	font-size: 24px;
	${media.lessThan("medium")`
		font-size: 20px;
    `}
`
const H4 = styled.h4`
	padding: 0px;
	margin: 0px;
	font-family: 'Poppins', 'sans-serif';
	color: ${Color.text.full};
	font-size: 20px;
	${media.lessThan("medium")`
		font-size: 18px;
    `}
`
const H5 = styled.h5`
	padding: 0px;
	margin: 0px;
	font-family: 'Poppins', 'sans-serif';
	color: ${Color.text.full};
	font-size: 18px;
	${media.lessThan("medium")`
		font-size: 17px;
    `}
`
const H6 = styled.h6`
	padding: 0px;
	margin: 0px;
	font-family: 'Poppins', 'sans-serif';
	color: ${Color.text.full};
	font-size: 16px;
`

const Header = (props: Props) =>{

	const { children, type, weight, style, ...rest } = props;

	if(type === 'h1')
		return(
			<H1
				style={{
					fontWeight: weight === 'bold' ? 700 : weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 400,
					...style
				}}
				{...rest}
			>
				{children}
			</H1>
		)
	else if(type === 'h2')
		return(
			<H2
				style={{
					fontWeight: weight === 'bold' ? 700 : weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 400,
					...style
				}}
				{...rest}
			>
				{children}
			</H2>
		)
	else if(type === 'h3')
		return(
			<H3
				style={{
					fontWeight: weight === 'bold' ? 700 : weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 400,
					...style
				}}
				{...rest}
			>
				{children}
			</H3>
		)
	else if(type === 'h4')
		return(
			<H4
				style={{
					fontWeight: weight === 'bold' ? 700 : weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 400,
					...style
				}}
				{...rest}
			>
				{children}
			</H4>
		)
	else if(type === 'h5')
		return(
			<H5
				style={{
					fontWeight: weight === 'bold' ? 700 : weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 400,
					...style
				}}
				{...rest}
			>
				{children}
			</H5>
		)
	else
		return(
			<H6
				style={{
					fontWeight: weight === 'bold' ? 700 : weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 400,
					...style
				}}
				{...rest}
			>
				{children}
			</H6>
		)
}
export default Header;
export interface Props extends ComponentPropsWithoutRef<"h1">{
	type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | any,
	weight?: 'semibold' | 'medium' | any
}