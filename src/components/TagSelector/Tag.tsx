import { CSSProperties } from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';

import Text from '../Text/Text';
import Color from '../../constants/Color';

const Container = styled.div<{ selected: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    border-radius: 1000px;    
    box-shadow: ${props => props.selected ? '0 0 0 2px '+Color.line.primary : '0 0 0 2px '+Color.text.white};
    background: var(--surface-invert, #FFF); 
    margin: 3.9px;
    margin-bottom: 8px;
    cursor: pointer;
    max-width: 120px;
    flex: 0 1 auto;
    gap: 10px;

    /* Altura fija para contenedores sin subtítulo */
    height: 36px;
    line-height: 24px; /* Para centrar verticalmente el texto en contenedores sin subtítulo */

    ${media.lessThan("small")`
        width: auto;
        max-width: none;    
    `}
`

const TextStyled = styled(Text)<{ selected: boolean }>`
    color: var(--text-clear-neutral-hard, rgba(0, 29, 61, 0.92));
    font-feature-settings: 'liga' off, 'clig' off;
    font-style: normal;
    font-weight: 500;
    font-size: 14px !important;
    text-align: center;
`

const Tags = (props: Props) => {

    const onClick = () => {
        props.onClick && props.onClick();
    }

    return (
        <Container
            role={props.role}
            style={props.style}
            selected={props.selected}
            onClick={onClick}
        >
            <TextStyled type='p' selected={props.selected}>
                {props.title}
            </TextStyled>
        </Container>
    )
}
export default Tags;

export interface Props {
    role?: string
    style?: CSSProperties,
    title: string,
    subtitle?: string,
    selected: boolean,
    onClick?: () => void
}