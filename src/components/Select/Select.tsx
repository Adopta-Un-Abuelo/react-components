import { useState, useEffect, ComponentPropsWithoutRef, CSSProperties, Fragment } from 'react';
import styled from 'styled-components';

import Text from '../Text/Text';
import Color from '../../constants/Color';
import { ChevronDown, ChevronUp, Check } from 'lucide-react'

const Container = styled.div`
    position: relative;
`
const SelectStyled = styled.div<{showMenu: boolean}>`
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid ${Color.line.soft};
    padding: 0px 12px;
    height: 36px;
    border-radius: 4px;
    cursor: pointer;
    background-color: white;
    gap: 8px;
`
const OptionsView = styled.div`
    position: absolute;
    top: 42px;
    z-index: 1000;
    border: 1px solid rgba(0, 0, 0, 0.04);
    border: 1px solid ${Color.line.soft};
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px #0000001A;
    max-height: 220px;
    overflow: scroll;
    width: 100%;
`
const Option = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 16px;
    cursor: pointer;
    gap: 8px;
    &:hover{
        background-color: ${Color.background.soft};
    }
`

const Select = (props: Props) =>{
    const [ showMenu, setShowMenu ] = useState(false);
    const [ selectedValues, setSelectedValues ] = useState<Array<any>>([props.options && props.options[0]]);

    useEffect(() =>{
        window.addEventListener('click', (e) => closeMenu(e));
        return window.removeEventListener('click', () => undefined);
    }, []);

    useEffect(() =>{
        if(props.selectedItem){
            setSelectedValues([props.selectedItem]);
        }
    }, [props.selectedItem]);

    const onSelectClick = (e: any) =>{
        if (!e) var e: any = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        setShowMenu(!showMenu);
    }

    const closeMenu = (e: any) =>{
        const element = document.getElementById(props.id);
        if(element !== null){
            if(!element.contains(e.target)){
                setShowMenu(false);
            }
        }
    }

    const onOptionClick = (option: any, e: any) =>{
        if (!e) var e: any = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        if (props.multi) {
            setSelectedValues(prevValues => {
                if (prevValues.includes(option)) {
                    // Si el valor ya está seleccionado, lo quitamos
                    return prevValues.filter(v => v !== option);
                } else {
                    // Si el valor no está seleccionado, lo añadimos
                    const temp = [...prevValues, option]
                    temp.sort((a, b) => a.label.localeCompare(b.label))
                    return temp
                }
            });
        } else {
            setSelectedValues([option]);
        }
        setShowMenu(false);
        if (props.onChange) {
            props.multi ? props.onChange(selectedValues) : props.onChange(selectedValues[0]);
        }
    }

    return(
        <Container>
            <SelectStyled
                role="select"
                id={props.id}
                showMenu={showMenu}
                style={props.style}
                onClick={onSelectClick}
            >
                <div style={{flex: 1, display: 'flex'}}>
                    {selectedValues.map((item, index) => (
                        <Fragment key={index}>
                            {item.icon}
                            {!props.hideTitle && (
                                <Text
                                    type='p'
                                    style={{ paddingRight: 10, paddingLeft: 10, fontSize: 14, color: props.style ? props.style.color : Color.text.full}}
                                >
                                    {item.label}
                                </Text>
                            )}
                        </Fragment>
                    )).sort()}
                </div>
                {showMenu ?
                    <ChevronUp height={20} width={20}/>
                : 
                    <ChevronDown height={20} width={20}/>
                }
            </SelectStyled>
            {showMenu && 
                <OptionsView
                    role="menu"
                    style={props.optionStyle}
                >
                    {props.options.map((item, index)=>{
                        return(
                            <Option
                                role={'cell-'+index}
                                key={props.id+'-cell-'+index}
                                onClick={(e: any) => onOptionClick(item, e)}
                            >
                                {props.multi && selectedValues.includes(item) && <Check width={20} height={20}/>}
                                {item.icon}
                                <Text type='p'>{item.label}</Text>
                            </Option>
                        )
                    })}
                </OptionsView>
            }
        </Container>
    )
}
export default Select;
export interface Props extends ComponentPropsWithoutRef<"div">{
    id: string,
    optionStyle?: CSSProperties,
    hideTitle?: boolean,
    options: Array<OptionProps>
    selectedItem?: OptionProps
    multi?: boolean,
    onChange?: (option: any) => void
}
interface OptionProps {
    icon?: React.ReactElement,
    label: string
}