import React, { useState, useEffect, ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

import Color from '../../constants/Color'; 

const Container = styled.div`
    display: flex;
    flex-direction: row;
`
const Step = styled.div<{isSelected: boolean}>`
    display: flex;
    height: 8px;
    width: 8px;
    border-radius: 5px;
    margin-right: 16px;
    background-color: ${props => props.isSelected ? Color.background.primary : Color.text.low};
`

const BreadCrumb = ({steps=1, ...props}: Props) =>{

    const [ selectedStep, setSelectedStep ] = useState<number>(props.selectedStep ? props.selectedStep : 0);
    const stepsArray = Array.from(Array(steps).keys());

    useEffect(() =>{
        if(props.selectedStep)
            setSelectedStep(props.selectedStep);
    }, [props.selectedStep]);

    return(
        <Container
            data-testid="bread-crumb"
            {...props}
        >
            {stepsArray.map((item, index) =>(
                <Step
                    key={'crumb'+index}
                    isSelected={selectedStep === index}
                />
            ))}
        </Container>
    )
}
export default BreadCrumb;
export interface Props extends ComponentPropsWithoutRef<"div">{
    selectedStep?: number
    steps: number
}