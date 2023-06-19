import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/es' 

import Text from '../Text/Text';
import { Clock } from 'lucide-react';
import Color from '../../constants/Color';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 16px;
    border-radius: 6px;
    width: fit-content;
`

const Countdown = (props: Props) =>{

    moment.locale('es');
    const { toDate, textColor, color, ...restProps } = props;

    const [ days, setDays ] = useState(0);
    const [ time, setTime ] = useState('');
    const [ warn, setWarn ] = useState(false);

    useEffect(() =>{
        if(toDate)
            getSecondsDiff();
    },[toDate]);

    const getSecondsDiff = () =>{
        const start = moment(toDate);
        const end = moment();
        const durantion = moment.duration(start.diff(end));
        
        const days = durantion.asDays();
        const hours = durantion.asHours();
        if(days < 1){
            if(hours < 2)
                setWarn(true);
            else
                setWarn(false);
        }
        else
            setWarn(false);
        durantion.locale('es');
        setDays(durantion.asDays());
        setTime(durantion.humanize());
    }

    return(
        <Container
            role='container'
            {...restProps}
            style={{
                backgroundColor: warn ? Color.status.color.error : color ? color : restProps.style?.backgroundColor,
                ...restProps.style
            }}
        >
            <Clock 
                height={20} 
                width={20} 
                color={warn ? 'white' : textColor ? textColor : Color.text.full} 
                style={{marginRight: 8}}
            />
            <Text 
                type='p2' 
                weight='medium' 
                style={{color: warn ? 'white' : textColor ? textColor : Color.text.full}}
            >
                {time} {days < 0 ? 'de retraso' : 'restantes'}
            </Text>
        </Container>
    )
}
export default Countdown;
export interface Props extends ComponentPropsWithoutRef<'div'>{
    toDate: Date,
    color?: string,
    textColor?: string
}