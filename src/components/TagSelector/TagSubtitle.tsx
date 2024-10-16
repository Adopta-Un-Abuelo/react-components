import { CSSProperties } from "react";
import styled from "styled-components";
import media from "styled-media-query";

import Text from "../Text/Text";
import Color from "../../constants/Color";

const Container = styled.div<{
    $selected: boolean;
    $onlyVisual: boolean;
    $design: "design1" | "design2";
}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 8px;
    border-radius: ${(props) => (props.$onlyVisual ? "12px" : "12px")};
    box-shadow: ${(props) =>
        props.$selected
            ? "0 0 0 2px " + Color.line.primary
            : props.$design === "design2"
            ? "0 0 0 1px " + Color.line.soft
            : "0 0 0 1px " + Color.text.white};
    background: var(--surface-invert, #fff);
    margin: 3.9px;
    margin-bottom: 8px;
    cursor: pointer;
    max-width: 120px;
    flex: 1 0 0;
    gap: 10px;

    /* Altura fija para contenedores con subtítulo */
    height: 74px;
    line-height: 24px; /* Para centrar verticalmente el texto en contenedores con subtítulo */

    ${media.lessThan("small")`
        width: auto;
        max-width: none;    
    `}
`;

const TextStyled = styled(Text)`
    color: var(--text-clear-neutral-hard, rgba(0, 29, 61, 0.92));
    font-feature-settings: "liga" off, "clig" off;
    font-style: normal;
    font-weight: 500;
    font-size: 14px !important;
    text-align: center;
`;

const SubtitleStyled = styled(Text)`
    color: var(--text-clear-neutral-medium, rgba(0, 29, 61, 0.56));
    text-align: center;
    font-family: Poppins;
    font-size: 13px !important;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

const TagsSubtitle = (props: Props) => {
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
            $design={props.design || "design1"}
            onClick={onClick}
        >
            <TextStyled type="p">{props.title}</TextStyled>
            <SubtitleStyled type="p">{props.subtitle}</SubtitleStyled>
        </Container>
    );
};
export default TagsSubtitle;

export interface Props {
    role?: string;
    style?: CSSProperties;
    title: string;
    subtitle: string;
    selected: boolean;
    onlyVisual?: boolean;
    design?: "design1" | "design2";
    onClick?: () => void;
}


