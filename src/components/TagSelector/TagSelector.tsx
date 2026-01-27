import React, { useEffect, useState, CSSProperties } from "react";
import styled from "styled-components";

import Tag from "./Tag";
import TagSubtitle from "./TagSubtitle";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const TagSelector = (props: Props) => {
    const [selection, setSelection] = useState<Array<OptionProps>>(
        props.optionsSelected ? props.optionsSelected : [],
    );

    useEffect(() => {
        if (props.optionsSelected) setSelection(props.optionsSelected);
    }, [props.optionsSelected]);

    const onClick = (item: OptionProps) => {
        if (props.type === "single") {
            const index = selection.findIndex((e) => e.id === item.id);
            if (index > -1) {
                //Remove the object
                setSelection([]);
                props.onChange && props.onChange([]);
            } else {
                setSelection([item]);
                props.onChange && props.onChange([item]);
            }
        } else if (props.type === "multiple") {
            const tempArray: OptionProps[] = [...selection];
            const index = tempArray.findIndex((e) => e.id === item.id);
            if (index > -1)
                //Remove the object
                tempArray.splice(index, 1);
            else tempArray.push(item);
            setSelection(tempArray);
            props.onChange && props.onChange(tempArray);
        }
    };

    return (
        <Container role="container" style={props.style}>
            {props.options.map((item, index) => {
                const isSelected = selection.some(
                    (temp) => temp.id === item.id,
                );
                return item.subtitle ? (
                    <TagSubtitle
                        role={item.id}
                        key={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        selected={isSelected}
                        onlyVisual={props.onlyVisual}
                        design={props.design}
                        onClick={() => onClick(item)}
                    />
                ) : (
                    <Tag
                        role={item.id}
                        key={item.id}
                        title={item.title}
                        selected={isSelected}
                        onlyVisual={props.onlyVisual}
                        design={props.design}
                        onClick={() => onClick(item)}
                    />
                );
            })}
        </Container>
    );
};
export default TagSelector;
/**
 * Tag selector component for single or multiple selection of options.
 * Renders clickable tags with optional subtitles in a flex-wrap layout.
 *
 * @example
 * ```tsx
 * <TagSelector
 *   type="multiple"
 *   options={[
 *     { id: "1", title: "React" },
 *     { id: "2", title: "TypeScript", subtitle: "Recommended" }
 *   ]}
 *   optionsSelected={selectedTags}
 *   onChange={(tags) => setSelectedTags(tags)}
 * />
 * ```
 */
export interface Props {
    /** Selection mode: `single` for radio-like, `multiple` for multi-select */
    type?: "multiple" | "single";
    style?: CSSProperties;
    /** Available tag options to display */
    options: Array<OptionProps>;
    /** Pre-selected options (controlled component pattern) */
    optionsSelected?: Array<OptionProps>;
    /** Callback fired when selection changes, receives array of selected options */
    onChange?: (selection: Array<OptionProps>) => void;
    /** When true, disables click interactions (display only) */
    onlyVisual?: boolean;
    /** Visual design variant */
    design?: "design1" | "design2";
}
export interface OptionProps {
    id: string;
    /** Main text displayed on the tag */
    title: string;
    /** Optional secondary text below the title */
    subtitle?: string;
    style?: React.CSSProperties;
}
