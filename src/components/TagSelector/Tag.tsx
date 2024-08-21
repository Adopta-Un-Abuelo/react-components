import { CSSProperties } from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';

import Text from '../Text/Text';
import Color from '../../constants/Color';

const Container = styled.div<{selected: boolean, hasSubtitle: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: ${props => props.hasSubtitle ? 'auto' : '36px'};
    padding: ${props => props.hasSubtitle ? '16px 8px' : '7px 14px'};
    border-radius: ${props => props.hasSubtitle ? '12px' : '1000px'};    
    box-shadow: ${props => props.selected ? '0 0 0 2px '+Color.line.primary : '0 0 0 2px '+Color.text.white};
    background: var(--surface-invert, #FFF); 
    margin: 4px;
    cursor: pointer;
    gap: ${props => props.hasSubtitle ? '0' : '12px'};
    flex: ${props => props.hasSubtitle ? '1 0 0' : '0 1 auto'};
    min-width: 25px;
    

    ${media.lessThan("small")`
        height: ${(props: { hasSubtitle: any; }) => props.hasSubtitle ? 'auto' : '36px'};
        width: auto;
        max-width: none;    
    `}
`

const TextStyled = styled(Text)<{selected: boolean}>`
    color: var(--text-clear-neutral-hard, rgba(0, 29, 61, 0.92));
    font-feature-settings: 'liga' off, 'clig' off;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    font-size: 14px;
    text-align: center;
`

const SubtitleStyled = styled(Text)<{selected: boolean}>`
    color: var(--text-clear-neutral-medium, rgba(0, 29, 61, 0.56));
    text-align: center;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; 
`

const Tags = (props: Props) =>{

    const onClick = () =>{
        props.onClick && props.onClick();
    }

    return(
        <Container
            role={props.role}
            style={props.style}
            selected={props.selected}
            hasSubtitle={!!props.subtitle}

            onClick={onClick}
        >
            <TextStyled type='p' selected={props.selected}>
                {props.title}
            </TextStyled>
            {props.subtitle && (
                <SubtitleStyled type='p' selected={props.selected}>
                    {props.subtitle}
                </SubtitleStyled>
            )}
        </Container>
    )
}
export default Tags;
export interface Props{
    role?: string
    style?: CSSProperties,
    title: string,
    subtitle?: string,
    selected: boolean,
    onClick?: () => void
}