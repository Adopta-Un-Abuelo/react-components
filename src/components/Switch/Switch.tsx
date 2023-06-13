import React, { CSSProperties, ReactElement, useState } from 'react';
import styled from 'styled-components';

import Color from '../../constants/Color';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid ${Color.line.soft};
    width: fit-content;
    border-radius: 12px;
    overflow: hidden;
`
const Cell = styled.div<{selected: boolean}>`
    display: flex;
    padding: 12px 16px;
    cursor: pointer;
    background-color: ${props => props.selected ? Color.background.soft : 'transparent'};
    border-radius: 12px;
    align-items: center;
    justify-content: center;
`

const IconSwitch = (props: Props) =>{

    const [ selectedOption, setSelectedOption ] = useState(props.options[0]);

    return(
        <Container
            role='container'
            style={props.style}
        >
            {props.options.map(item =>{
                const selected = item.id === selectedOption.id;
                return(
                    <Cell
                        role={item.id}
                        key={'switch'+item.id} 
                        selected={selected}
                        onClick={() => {
                            setSelectedOption(item);
                            props.onChange && props.onChange(item);
                        }}
                    >
                        {React.cloneElement(item.icon, {
                            color: selected ? Color.text.primary : Color.text.high,
                            height: 20,
                            width: 20,
                            ...item.icon.props
                        })}
                    </Cell>
                )
            })}
        </Container>
    )
}
export default IconSwitch;
export interface Props{
    style?: CSSProperties,
    options: Array<{
        id: string,
        icon: ReactElement
    }> 
    onChange?: (option: {
        id: string,
        icon: any
    }) => void
}