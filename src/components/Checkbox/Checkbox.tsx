import React, { useState, useEffect, ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';

import AnimationCheck from '../../assets/animations/button-check.json';
import Text from '../Text/Text';
import { Color } from '../../constants';

const Container = styled.button`
    display: flex;
    flex-direction: row;
    background: none;
    border: none;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    padding: 0px;
    opacity: ${props => props.disabled ? 0.5 : 1.0};
`
const Box = styled.div<{selected: boolean, error?: boolean, height?: number, width?: number}>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    height: ${props => props.height ? props.height+'px' : '22px'};
    width: ${props => props.width ? props.width+'px' : '22px'};
    min-height: ${props => props.height ? props.height+'px' : '22px'};
    min-width: ${props => props.width ? props.width+'px' : '22px'};
    background-color: ${props => props.selected ? (props.error ? Color.status.color.error : Color.background.primary) : (props.error ? Color.status.color.errorDefault : Color.background.primaryLow)};
    border: ${props => props.selected ? '1px solid '+(props.error ? Color.status.color.error : Color.background.primary) : '1px solid '+(props.error ? Color.line.redSoft : Color.line.primarySoft)};
    border-radius: 4px;
    transition: background-color 0.2s ease-in-out, border 0.2s ease-in-out, transform .05s ease-out;
    &:hover{
        background-color: ${props => props.selected ? (props.error ? Color.status.color.error : Color.background.primary) : (props.error ? Color.status.color.errorDefault : Color.line.primarySoft)};
    }
    &:active{
        transform: scale(0.90);
    }
`
const TextView = styled.div`
    margin-left: 10px;
    text-align: left;
`

const Checkbox = (props: Props) =>{

    const [ selected, setSelected ] = useState(props.selected);

    useEffect(() =>{
        setSelected(props.selected);
    },[props.selected]);

    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        setSelected(!selected);
        props.onClick && props.onClick(event);
    }

    return(
        <Container
            data-testid="checkbox"
            onClick={onClick}
            {...props}
        >
            <Box
                selected={selected}
                error={props.error}
                height={props.height} 
                width={props.width}
            >
                {selected &&
                    <Player 
                        style={{height: 18, width: 18}}
                        autoplay={true}
                        loop={false}
                        keepLastFrame={true}
                        src={AnimationCheck}
                        onEvent={(event) =>{
                            if(event === 'complete'){
                                //props.onSuccess && props.onSuccess(true);
                            }
                        }}
                    />
                }
            </Box>
            <TextView>
                {props.children && props.children}
                {props.label &&
                    <Text
                        type='p'
                    >
                        {props.label}
                    </Text>
                }
                {props.sublabel &&
                    <Text
                        type='p'
                        style={{fontSize: 12}}
                    >
                        {props.sublabel}
                    </Text>
                }
            </TextView>
        </Container>
    )
}
export default Checkbox;
export interface Props extends ComponentPropsWithoutRef<"button">{
    selected: boolean,
    label?: string,
    sublabel?: string,
    error?: boolean,
    height?: number,
    width?: number
}