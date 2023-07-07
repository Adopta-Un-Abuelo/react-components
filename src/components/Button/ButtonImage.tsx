import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

import Color from '../../../src/constants/Color';

const Container = styled.button<{disabled?: boolean, textColor?: string}>`
    display: inline-flex;
    padding: 8px;
    border-radius: 1000px;
    cursor: ${props => !props.disabled && 'pointer'};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: ${props => props.disabled ? 0.5 : 1.0};
    border: none;
    background-color: transparent;
    transition: transform .05s ease-out, width 0.2s ease-out, background-color 0.4s ease-out, opacity 0.2s ease-out; 
    font-family: 'Poppins', 'sans-serif';
	font-size: 14px;
    color: ${props => props.textColor ? props.textColor : Color.text.full};
    &:hover{
        background-color: ${props => !props.disabled && Color.status.neutral.hover}
    }
    &:active {
		transform: scale(0.95);
	}
`
const ChildrenView = styled.div`
    margin-top: 4px;
`
const Icon = styled.img`
    height: 24px;
    width: 24px;
`

const ButtonImage = (props: Props) =>{

    return(
        <Container
            role="button"
            {...props}
            disabled={props.disabled || props.loading}
            onClick={(e: any) => (props.onClick && !props.loading && !props.disabled) && props.onClick(e)}
        >
            {props.icon ?
                props.icon
            :
                <Icon
                    src={props.src}
                />
            }
            <ChildrenView>
                {props.children}
            </ChildrenView>
        </Container>
    )
}
export default ButtonImage;
export interface Props extends ComponentPropsWithoutRef<"button">{
    src?: string,
    icon?: React.ReactElement,
    disabled?: boolean,
    loading?: boolean
}