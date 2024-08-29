import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

import Color from '../../../src/constants/Color';

const Container = styled.button`
    display: inline-flex;
    padding: 0px;
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
    color: ${props => props.style?.color ? props.style.color : Color.text.full};
    &:active {
		transform: scale(0.95);
	}
`
const IconContainer = styled.div.attrs<{$disabled?: boolean}>(props => ({}))`
    display: inline-flex;
    padding: 12px;
    border-radius: 1000px;
    align-items: center;
    justify-content: center;
    &:hover{
        background-color: ${props => !props.$disabled && Color.status.neutral.hover}
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

const ButtonImage = ({src, icon, loading, ...restProps}: Props) =>{

    return(
        <Container
            role="button"
            {...restProps}
            disabled={restProps.disabled || loading}
            onClick={(e: any) => (restProps.onClick && !loading && !restProps.disabled) && restProps.onClick(e)}
        >
            <IconContainer
                $disabled={restProps.disabled}
            >
                {icon ?
                    icon
                :
                    <Icon
                        src={src}
                    />
                }
            </IconContainer>
            {restProps.children &&
                <ChildrenView>
                    {restProps.children}
                </ChildrenView>
            }
        </Container>
    )
}
export default ButtonImage;
export interface Props extends ComponentPropsWithoutRef<"button">{
    src?: string,
    icon?: React.ReactElement,
    loading?: boolean
}