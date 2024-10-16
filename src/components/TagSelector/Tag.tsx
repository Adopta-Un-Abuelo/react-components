import { CSSProperties } from "react";
import styled from "styled-components";
import media from "styled-media-query";

import Text from "../Text/Text";
import Color from "../../constants/Color";

const Container = styled.div<{ $selected: boolean, $onlyVisual: boolean, $design: 'design1' | 'design2' }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    border-radius: ${(props) =>
        props.$onlyVisual ? "1000px" : "1000px"};
    box-shadow: ${(props) =>
        props.$selected
            ? "0 0 0 2px " + Color.line.primary
            : props.$design === 'design2'
            ? "0 0 0 1px " + Color.line.soft 
            : "0 0 0 1px " + Color.text.white};
    background: var(--surface-invert, #fff);
    margin: 3.9px;
    cursor: ${(props) => (props.$onlyVisual ? "default" : "pointer")};
    margin-bottom: 8px;
    max-width: 150px;
    flex: 0 1 auto;
    gap: 10px;

    height: 36px;
    line-height: 24px;

    ${media.lessThan("small")`
        width: auto;
        max-width: none;    
    `}
`;

const TextStyled = styled(Text)`
    color: var(--text-clear-neutral-hard, rgba(0, 29, 61, 0.92));
    font-feature-settings:
        "liga" off,
        "clig" off;
    font-style: normal;
    font-weight: 500;
    font-size: 14px !important;
    text-align: center;
`;

const Tags = (props: Props) => {
    const onClick = () => {
        if (!props.onlyVisual) {
            props.onClick && props.onClick();
        }
    };

    return (
        <Container
            role={props.role}
            style={props.style}
            $selected={props.selected}
            $onlyVisual={props.onlyVisual || false}
            $design={props.design || 'design1'} 

            onClick={onClick}
        >
            <TextStyled type="p">
                {props.title}
            </TextStyled>
        </Container>
    );
};
export default Tags;

export interface Props {
    role?: string;
    style?: CSSProperties;
    title: string;
    selected: boolean;
    onClick?: () => void;
    onlyVisual?: boolean;
    design?: 'design1' | 'design2'; 

}