import React, { CSSProperties, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'react-dates/initialize';
import './filter-date.css';
import 'react-dates/lib/css/_datepicker.css'

import Color from '../../constants/Color';
import Text from '../Text/Text';
import Button from '../Button/Button';
import { ChevronDown } from 'lucide-react';
import { DayPickerRangeController, FocusedInputShape } from 'react-dates';

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
	&:hover{
		background-color: ${props => props.disabled ? Color.status.neutral.hover : Color.background.low};
	}
`
const FilterView = styled.div<{position?: 'bottom-right' | 'bottom-left'}>`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 36px;
    right: ${props => props.position === 'bottom-right' ? undefined : 0};
    left: ${props => props.position === 'bottom-left' ? undefined : 0};
    padding: 0px 0px 8px;
    border-radius: 6px;
    width: 320px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
`
const BottomBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 8px 16px 0px;
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

const Filter = (props: FilterDateProps) =>{

    const [ showView, _setShowView ] = useState(false);
    const [ startDate, setStartDate ] = useState<moment.Moment | null>(null);
    const [ endDate, setEndDate ] = useState<moment.Moment | null>(null);
    const [ focusedInput, setFocusedInput ] = useState<FocusedInputShape | null>('startDate');

    const showViewRef = useRef(showView);
    const setShowView = (data: boolean) => {
        showViewRef.current = data;
        _setShowView(data);
    };

    useEffect(() =>{
        //On click outside the filter view
        document.addEventListener('mousedown', (e: any) => {
            const element = document.getElementById(props.id);
            if(element !== null){
                if(!element.contains(e.target)){
                    setShowView(false);
                }
            }
        });
        return document.removeEventListener('mousedown', onFilterClick);
    }, []);

    useEffect(() =>{
        if(props.selectedOptions){
            setStartDate(props.selectedOptions.startDate);
            setEndDate(props.selectedOptions.endDate);
        }
        else{
            setStartDate(null);
            setEndDate(null);
        }
    },[props.selectedOptions]);

    const onSave = () =>{
        setShowView(false);
        props.onChange && props.onChange({
            startDate: startDate,
            endDate: endDate
        });
    }

    const onRemove = () =>{
        setEndDate(null);
        setStartDate(null);
        setFocusedInput('startDate');
        props.onChange && props.onChange({
            startDate: null,
            endDate: null
        });
    }

    const onFilterClick = (e: any) =>{
        e.stopPropagation();
        if(showView){
            setShowView(false);
        }
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
                role="filter-button"
                selected={(startDate && endDate) ? true : false}
                disabled={props.disabled}
                onClick={onFilterClick}
            >
                <Text type='p' style={{color: props.disabled ? Color.text.low : (startDate && endDate) ? Color.text.full : Color.text.high, fontSize: 14, marginRight: 4}}>
                    {props.label}
                </Text>
                {(startDate && endDate) ?
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
                <FilterView position={props.position}>
                    <DayPickerRangeController
                        startDate={startDate}
                        endDate={endDate}
                        onDatesChange={({ startDate, endDate }) => {
                            setStartDate(startDate);
                            setEndDate(endDate);
                        }}
                        focusedInput={focusedInput}
                        noBorder={true}
                        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                        initialVisibleMonth={() => moment()}
                    />
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
                            Aplicar
                        </Button>
                    </BottomBar>
                </FilterView>
            }
        </Container>
    )
}
export default Filter;
export interface FilterDateProps{
    id: string,
    label: string,
    disabled?: boolean,
    position?: 'bottom-right' | 'bottom-left',
    type: 'date',
    style?: CSSProperties,
    selectedOptions?: {
        startDate: moment.Moment | null,
        endDate: moment.Moment | null,
    },
    onChange?: (r: {
        startDate: moment.Moment | null,
        endDate: moment.Moment | null
    }) => void
}