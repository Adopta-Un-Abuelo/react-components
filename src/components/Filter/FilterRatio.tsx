import { useEffect, useState, useRef, CSSProperties } from 'react';
import styled from 'styled-components';

import Color from '../../constants/Color';
import Text from '../Text/Text';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { ChevronDown } from 'lucide-react';

const Container = styled.div`
    position: relative;
    width: fit-content;
`
const ButtonFilter = styled.button<{selected: boolean}>`
    position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 32px;
	padding: 0px 12px;
	border-radius: 20px;
	border: ${props => props.disabled ? '0px solid' : (props.selected ? '2px solid '+Color.text.full : '1px solid '+ Color.line.soft)};
	background-color: ${props => props.disabled ? Color.status.neutral.hover : 'transparent'};
	cursor: ${props => props.disabled ? 'default' : 'pointer'};
	:hover{
		background-color: ${props => props.disabled ? Color.status.neutral.hover : Color.background.low};
	}
`
const FilterView = styled.div<{position?: 'bottom-right' | 'bottom-left'}>`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 36px;
    right: ${props => props.position === 'bottom-right' ? undefined : 0};
    left: ${props => props.position === 'bottom-left' ? undefined : 0};
    padding: 8px 16px;
    border-radius: 6px;
    height: 150px;
    width: 320px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
`
const ContentView = styled.div`
    display: flex;
    flex: 1;
    overflow-y: auto;
    align-items: center;
`
const BottomBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-top: 8px;
    border-top: 1px solid ${Color.line.soft};
`
const BadgeView = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    height: 18px;
    width: 18px;
    background-color: ${Color.background.full};
`

const Filter = (props: FilterRatioProps) =>{

    const [ showView, _setShowView ] = useState(false);
    const [ selection, setSelection ] = useState<number>(0);
    const [ inputValue, setInputValue ] = useState<undefined | number>(undefined)

    const showViewRef = useRef(showView);
    const setShowView = (data: boolean) => {
        showViewRef.current = data;
        _setShowView(data);
    };

    useEffect(() =>{
        if(props.selected)
            setSelection(props.selected);
    },[props.selected]);

    useEffect(() =>{
        //On click outside the filter view
        document.addEventListener('mousedown', (e: any) => {
            const element = document.getElementById(props.id);
            if(element !== null){
                if(!element.contains(e.target))
                    if(showView) onFilterClick(e);
            }
        });
        return document.removeEventListener('mousedown', onFilterClick);
    });

    const onInputChange = (e: any) =>{
        setInputValue(e.target.value);
    }

    const onSave = () =>{
        setShowView(false);
        if(inputValue){
            setSelection(inputValue)
            props.onChange && props.onChange(inputValue);
        }
    }

    const onRemove = () =>{
        setShowView(false);
        setSelection(0);
        setInputValue(undefined);
        props.onChange && props.onChange(undefined);
    }

    const onFilterClick = (e: any) =>{
        e.stopPropagation();
        if(showView)
            setShowView(false);
        else 
            setShowView(true);
    }

    return(
        <Container
            id={props.id}
            role="filter"
            style={props.style}
        >
            <ButtonFilter
                selected={(selection > 0) ? true : false}
                disabled={props.disabled}
                onClick={onFilterClick}
            >
                <Text type='p' style={{color: props.disabled ? Color.text.low : selection > 0 ? Color.text.full : Color.text.high, fontSize: 14, marginRight: 4}}>
                    {props.label}
                </Text>
                {selection > 0 ?
                    <BadgeView>
                        <Text type='p' style={{color: 'white', fontSize: 12, fontWeight: 600}}>
                            1
                        </Text>
                    </BadgeView>
                :
                    <ChevronDown height={18} width={18} color={props.disabled ? Color.text.low : Color.text.high}/>
                }
            </ButtonFilter>
            {showView &&
                <FilterView style={props.menuStyle} position={props.position}>
                    <ContentView>
                        <Input
                            style={{width: '100%', margin: 20}}
                            type='range'
                            min={props.min}
                            max={props.max}
                            defaultValue={selection}
                            onChange={onInputChange}
                        />
                    </ContentView>
                    <BottomBar>
                        <Button
                            design={'text'}
                            size={'small'}
                            style={{marginRight: 4}}
                            onClick={onRemove}
                        >
                            Borrar
                        </Button>
                        <div style={{display: 'flex', flex: 1}}/>
                        <Button
                            design={'primary'}
                            size={'small'}
                            onClick={onSave}
                        >
                            Guardar
                        </Button>
                    </BottomBar>
                </FilterView>
            }
        </Container>
    )
}
export default Filter;
export interface FilterRatioProps{
    id: string,
    label: string,
    disabled?: boolean,
    type: 'ratio',
    position?: 'bottom-right' | 'bottom-left'
    min: number, 
    max: number
    selected?: number
    style?: CSSProperties,
    menuStyle?: CSSProperties,
    onChange?: (result: number | undefined) => void
}