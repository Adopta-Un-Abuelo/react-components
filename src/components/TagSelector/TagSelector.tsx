import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Tag from './Tag';
import TagSubtitle from './TagSubtitle';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const TagSelector = (props: Props) =>{

    const [ selection, setSelection ] = useState<Array<OptionProps>>(props.optionsSelected ? props.optionsSelected : []);

    useEffect(() => {
        if(props.optionsSelected)
            setSelection(props.optionsSelected)
    },[props.optionsSelected]);

    const onClick = (item: OptionProps) =>{
        if(props.type === 'single'){
            const index = selection.findIndex((e: any) => e.id === item.id);
            if(index > -1){  //Remove the object
                setSelection([]);
                props.onChange && props.onChange([]);
            }
            else{
                setSelection([item]);
                props.onChange && props.onChange([item]);
            }
        }
        else if(props.type === 'multiple'){
            const tempArray: any = [...selection];
            const index = tempArray.findIndex((e: any) => e.id === item.id);
            if(index > -1)  //Remove the object
                tempArray.splice(index, 1);
            else
                tempArray.push(item);
            setSelection(tempArray)
            props.onChange && props.onChange(tempArray);
        }
    }

    return(
        <Container
        role='container'
        style={props.style}
    >
        {props.options.map((item, index) =>{
            const isSelected = selection.some(temp => temp.id === item.id);
            return item.subtitle ? (
                <TagSubtitle
                    role={item.id}
                    key={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    selected={isSelected}
                    onClick={() => onClick(item)}
                />
            ) : (
                <Tag
                    role={item.id}
                    key={item.id}
                    title={item.title}
                    selected={isSelected}
                    onClick={() => onClick(item)}
                />
            )
        })}
    </Container>
    )
}
export default TagSelector;
export interface Props{
    type?: 'multiple' | 'single',
    style?: any,
    options: Array<OptionProps>,
    optionsSelected?: Array<OptionProps>,
    onChange?: (selection: Array<OptionProps>) => void
}
export interface OptionProps{
    id: string,
    title: string,
    subtitle: string,
    style?: React.CSSProperties // Add a style property to OptionProps
}