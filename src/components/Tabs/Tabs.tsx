import { CSSProperties, useEffect, useState } from 'react';
import styled from 'styled-components';

import Color from '../../constants/Color';
import Text from '../Text/Text';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 36px;
    width: fit-content;
    gap: 16px;
`
const Cell = styled.div<{selected: boolean, color?: string}>`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-bottom: ${props => props.selected ? '2px solid '+(props.color ? props.color : Color.line.primary) : '0px'};
`
const Container2 = styled.div`
    display: flex;
    flex-direction: row;
    width: fit-content;
    gap: 4px;
`
const Cell2 = styled.div<{selected: boolean, color?: string}>`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 7px 16px;
    border-radius: 32px;
    background-color: ${props => props.selected ? (props.color ? props.color : Color.background.primaryLow) : 'transparent'};
    transition: background-color 0.15s ease-in;
    &:hover{
        background-color: ${props => props.selected ? Color.background.primaryLow : Color.status.neutral.hover};
    }
`
const Label2 = styled(Text)<{selected: boolean, textColor?: string}>`
    font-size: 14px;
    color: ${props => props.selected ? (props.textColor ? props.textColor : Color.text.primary) : Color.text.high};
    width: max-content;
    transition: color 0.15s ease-in;
`

const Tabs = (props: Props) =>{

    const [ selection, setSelection ] = useState(props.selectedOption ? props.selectedOption : props.options[0]);

    useEffect(() =>{
        if(props.selectedOption){
            setSelection(props.selectedOption);
        }
    }, [props.selectedOption]);

    const onClick = (option: OptionProps) =>{
        setSelection(option);
        props.onChange && props.onChange(option);
    }

    return(props.design === 'secondary' ?
        <Container2
            role={'container'}
            style={{backgroundColor: props.backgroundColor, ...props.style}}
        >
            {props.options.map(item =>{
                const selected = selection.id === item.id ? true : false;
                return(
                    <Cell2
                        role={item.id}
                        key={item.id}
                        selected={selected}
                        onClick={() => onClick(item)}
                        style={props.cellStyle}
                        color={props.cellColor}
                    >
                        <Text 
                            type='p' 
                            weight='medium'
                            style={{fontSize: 14, color: selected ? (props.textColor ? props.textColor : Color.text.primary) : Color.text.high, width: 'max-content', ...props.textStyle}}
                        >
                            {item.title}
                        </Text>
                    </Cell2>
                )
            })}
        </Container2>
    :
        <Container
            role={'container'}
            style={{backgroundColor: props.backgroundColor, ...props.style}}
        >
            {props.options.map(item =>{
                const selected = selection.id === item.id ? true : false;
                return(
                    <Cell
                        role={item.id}
                        key={item.id}
                        selected={selected}
                        onClick={() => onClick(item)}
                        style={props.cellStyle}
                        color={props.cellColor}
                    >
                        <Label2 
                            type='p' 
                            weight='medium'
                            textColor={props.textColor}
                            selected={selected}
                            style={props.textStyle}
                        >
                            {item.title}
                        </Label2>
                    </Cell>
                )
            })}
        </Container>
    )
}
export default Tabs;
export interface Props{
    style?: CSSProperties,
    cellStyle?: CSSProperties,
    textStyle?: CSSProperties,
    cellColor?: string,
    textColor?: string,
    backgroundColor?: string,
    options: Array<OptionProps>
    selectedOption?: OptionProps,
    design?: 'primary' | 'secondary'
    onChange?: (option: OptionProps) => void
}
export interface OptionProps{
    id: string,
    title: string
}