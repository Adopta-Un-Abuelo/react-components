import { useState, useEffect, CSSProperties } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../../assets/css/react_dates_overrides.css';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import Color from '../../constants/ColorV2';

const InputContainer = styled.div<{$focus: boolean}>`
    display: flex;
    align-items: center;
    border-radius: 12px;
    padding: 0px;
    height: 56px;
    outline: none;
    box-shadow: 0 0 0 ${props => props.$focus ? '2px '+Color.border.neutralMedium : '1px '+Color.border.neutralSoft};
    padding: 0px 6px;
`

const InputDateRange = (props: InputDateRangeProps) =>{

    const [ startDate, setStartDate ] = useState<moment.Moment | null>(props.startDate);
    const [ endDate, setEndDate ] = useState<moment.Moment | null>(props.endDate);
    const [ focusedInput, setFocusedInput ] = useState<FocusedInputShape | null>(null);

    useEffect(() => {
        setStartDate(props.startDate);
    },[props.startDate]);

    useEffect(() => {
        setEndDate(props.endDate);
    },[props.endDate]);

    return(
        <InputContainer
            style={props.style}
            $focus={focusedInput ? true : false}
        >
            <DateRangePicker
                startDateId="startDate"
                endDateId="endDate"
                startDate={startDate}
                endDate={endDate}
                noBorder={true}
                showClearDates={true}
                isOutsideRange={props.isOutsideRange}
                startDatePlaceholderText={'Fecha inicio'}
                endDatePlaceholderText={'Fecha final'}
                hideKeyboardShortcutsPanel={true}
                onDatesChange={({ startDate, endDate }) => {
                    setStartDate(startDate);
                    setEndDate(endDate);
                    props.onChange({startDate, endDate});
                }}
                focusedInput={focusedInput}
                onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            />
        </InputContainer>
    )
}
export default InputDateRange;
export interface InputDateRangeProps{
    style?: CSSProperties
    startDate: moment.Moment | null
    endDate: moment.Moment | null,
    focus?: boolean,
    onChange: (data: {startDate: moment.Moment | null, endDate: moment.Moment | null}) => void
    isOutsideRange?: (date: moment.Moment) => boolean
}