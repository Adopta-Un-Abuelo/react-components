import { useEffect, useState, forwardRef, Ref, useImperativeHandle, CSSProperties } from 'react';
import styled from 'styled-components';

import { MoreVertical } from 'lucide-react';
import Button from "@components/Button/Button";
import Color from "@constants/Color";
import Text from "@components/Text/Text";

const Container = styled.div`
    position: relative;
`
const FilterView = styled.div<{$position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left', $show: boolean, $padding: boolean}>`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: ${props => (props.$position === 'bottom-left' || props.$position === 'bottom-right') ? '44px' : 'unset'};
    bottom: ${props => (props.$position === 'top-left' || props.$position === 'top-right') ? '44px' : 'unset'};
    right: ${props => (props.$position === 'bottom-left' || props.$position === 'top-left') ? '8px' : 'unset'};
    left: ${props => (props.$position === 'bottom-right' || props.$position === 'top-right') ? '8px' : 'unset'};
    padding: ${props => props.$padding ? '16px' :' 0px'};
    border-radius: 12px;
    width: max-content;
    background-color: white;
    box-shadow: 6px 6px 10px 1px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    border: 1px solid ${Color.line.soft};
    overflow: hidden;
    opacity: ${props => props.$show ? 1 : 0};
    transform: ${props => props.$show ? 'scale(1)' : 'scale(0)'};
    transform-origin: ${props => (props.$position === 'bottom-right' || props.$position === 'top-right' ? 'left' : 'right')} ${props => (props.$position === 'top-right' || props.$position === 'top-left' ? 'bottom' : 'top')};
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
    font-family: 'Poppins';
    color: ${Color.text.full};
`
const IconView = styled.div`
    cursor: pointer;
`
const MenuCell = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    gap: 12px;
    cursor: pointer;
    &:hover{
        background-color: ${Color.status.neutral.hover};
    }
`

const MenuList = forwardRef((props: MenuProps, ref: Ref<MenuRef>) =>{

    const [ showView, setShowView ] = useState(false);

    useImperativeHandle(ref, () => ({
        close(){
            setShowView(false);
        }
    }));

    useEffect(() =>{
        //On click outside the filter view
        const handleClickOutside = (e: MouseEvent) => {
            const element = document.getElementById(props.id);
            if(element !== null){
                if(!element.contains(e.target as Node)){
                    if(showView) {
                        onButtonClick(e as unknown as React.MouseEvent);
                    }
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    const onButtonClick = (e: React.MouseEvent) =>{
        e.stopPropagation();
        if(showView){
            setShowView(false);
            props.onChange && props.onChange(false);
        }
        else{
            setShowView(true);
            props.onChange && props.onChange(true);
        }
    }

    const onClick = (e: React.MouseEvent, option: OptionsProps) =>{
        e.stopPropagation();
        setShowView(false);
        props.onClick && props.onClick(option)
    }

    return(
        <Container
            id={props.id}
            role="menu"
            style={props.style}
        >
            {props.Icon ?
                <IconView
                    onClick={onButtonClick}
                >
                    {props.Icon}
                </IconView>
            :
                <Button
                    style={{backgroundColor: showView ? Color.status.neutral.active : undefined}}
                    design='image'
                    icon={props.icon ? props.icon : <MoreVertical/>}
                    onClick={onButtonClick}
                />
            }
            <FilterView
                $padding={props.options ? false : true}
                $position={props.position}
                style={props.menuStyle}
                $show={showView}
            >
                {props.children}
                {props.options && props.options.map((option, index) =>(
                    <MenuCell
                        key={'action'+index}
                        style={{borderBottom: index+1 === props.options?.length ? 'none' : '1px solid '+Color.line.soft}}
                        onClick={(e) => onClick(e, option)}
                    >
                        {option.icon}
                        <Text type="p" style={{ color: option.labelColor }}>
                            {option.label}
                        </Text>
                    </MenuCell>
                ))}
            </FilterView>
        </Container>
    )
})
export default MenuList;
/**
 * Dropdown menu component with customizable positioning and icon trigger.
 * Automatically closes when clicking outside. Supports both predefined options and custom children.
 *
 * @example
 * ```tsx
 * <Menu
 *   id="actions-menu"
 *   position="bottom-right"
 *   options={[
 *     { id: "edit", label: "Edit", icon: <EditIcon /> },
 *     { id: "delete", label: "Delete", labelColor: "red" }
 *   ]}
 *   onClick={(option) => handleAction(option.id)}
 * />
 * ```
 */
export interface MenuProps{
    /** Unique identifier required for click-outside detection */
    id: string,
    style?: CSSProperties,
    /** Custom styles for the dropdown menu container */
    menuStyle?: CSSProperties,
    /** Icon for the button trigger (lowercase, used with Button component) */
    icon?: React.ReactElement,
    /** Icon element for custom trigger (uppercase, replaces Button) */
    Icon?: React.ReactElement,
    /** Positioning of the dropdown relative to the trigger button */
    position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
    /** Custom content to display in menu (alternative to options) */
    children?: React.ReactNode,
    /** Array of menu items with labels and icons */
    options?: Array<OptionsProps>,
    /** Callback fired when menu visibility changes */
    onChange?: (visible: boolean) => void,
    /** Callback fired when a menu option is clicked */
    onClick?: (option: OptionsProps) => void
}
export interface OptionsProps{
    id: string,
    label: string,
    /** Custom text color for the label */
    labelColor?: string,
    icon?: React.ReactElement
}
export interface MenuRef{
    /** Programmatically close the menu */
    close: () => void
}