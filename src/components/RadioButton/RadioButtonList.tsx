import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import RadioButton from './RadioButton';

const Container = styled.div`
`

const RadioButtonList = (props: Props) =>{

    const [ selection, setSelection ] = useState(props.options.filter(e => e.selected));
    const [ update, setUpdate ] = useState(false);

    const onClick = (item: any) =>{
        const result = selection.findIndex(obj => item.id === obj.id);
        let tempArray = selection;
        if(props.type === 'single') tempArray = [item];
        else if(result === -1)
            tempArray.push(item);
        else
            tempArray.splice(result, 1);
        setSelection(tempArray);
        setUpdate(!update);
        props.onChange && props.onChange(tempArray);
    }

    return(
        <Container role="radiobuttonlist">
            {props.options.map((item, index) => {
                const active = selection.some(e => e.id === item.id);
                return(
                    <RadioButton
                        id={item.id}
                        key={item.id+'-'+index}
                        style={{marginBottom: 16}}
                        children={item.children}
                        selected={active}
                        onClick={() => onClick(item)}
                    />
                )
            })}
        </Container>
    )
}
export default RadioButtonList;
export interface Props{
    options: Array<OptionProps>,
    type: 'single' | 'multiple',
    onChange?: (data: Array<OptionProps>) => void
}
interface OptionProps {
    id: string,
    children: ReactElement,
    selected?: boolean
}