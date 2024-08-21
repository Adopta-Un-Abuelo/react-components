import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './editor.css'
import ButtonEditor from '../Button/ButtonEditor';
import Color from '../../constants/Color'
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Text from '../Text/Text';

const Container = styled.div`

`
const TextAreaView = styled.textarea<{design?: 'design-1' | 'design-2'}>`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 12px;
    width: -webkit-fill-available;
    width: -moz-available;
    height: 100px;
    font-family: 'Poppins';
    font-size: 15px;
    margin: 0px;
    border: none;
    border-radius: ${props => props.design === 'design-2' ? '12px' : '6px'};
    box-shadow: 0 0 0 ${props => props.design === 'design-2' ? '1px '+Color.line.soft  : 'none'};
    color: ${Color.text.full};
    //Remove resize handle
    resize: none;
    //Remove default scrollbars
    overflow: auto;
    outline: none;
    background-color: ${props => props.design === 'design-2' ? 'white' : Color.background.soft};
    &:placeholder-shown{
        &:focus{
            box-shadow: 0 0 0 ${props => props.design === 'design-2' ? '2px '+Color.line.full : '1px '+Color.line.primarySoft};
            cursor:text;
        }
    }
    &::placeholder {
        color: var(--text-clear-neutral-medium, rgba(0, 29, 61, 0.56));
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: Poppins;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
    }
    &:hover{
        cursor: pointer;
    }
    &:focus{
        box-shadow: 0 0 0 ${props => props.design === 'design-2' ? '2px '+Color.line.full : '1px '+Color.line.primarySoft};
        cursor:text;
    }
    &::-webkit-scrollbar{
        width: 12px;
    }
    &::-webkit-scrollbar-thumb {
        box-shadow: 0 0 0 4px rgba(0, 0, 0, 0);
        background-clip: padding-box;
        border-radius: 9999px;
        background-color: #E0E0E0;
    }
`


const TextArea = (props: Props) =>{

    const [ editorState, setEditorState] = useState<any>(undefined);
    const [ restLength, setRestLength ] = useState<number>(props.maxLength ? props.maxLength : 0);
    
    useEffect(()=>{
        if(props.value && props.type==="edit"){
            let convert = convertFromHTML(props.value)
            setEditorState(EditorState.createWithContent(
                ContentState.createFromBlockArray(convert.contentBlocks,convert.entityMap)
            ))
        }
    },[props.value])

    useEffect(() =>{
        if(props.maxLength)
            setRestLength(props.maxLength);
    },[props.maxLength]);

    const onTextAreChange = (value?:React.ChangeEvent<HTMLTextAreaElement>, data?:any) => {
        let result:any = undefined;
        if(value) result = value
        else {
            const convert= draftToHtml(convertToRaw(data.getCurrentContent()));
            result = {
                target:{
                    name: props.name,
                    value: convert
                }
            }
        }
        
        if(props.maxLength && result.target.value.length > props.maxLength) {
            // Si la longitud del texto ingresado es mayor que maxLength, no hagas nada
            return;
        }
    
        if(data) setEditorState(data)
        if(props.maxLength)
            setRestLength(result.target.value.length);
        props.onChange && props.onChange(result)
    }
    return(props.type==="edit" ? 
        <Container
            role='text-area'
            style={props.style}
        >
            <Editor 
                wrapperStyle={{width: '100%', height: 'calc(100% - 50px)'}}
                editorState= {editorState}
                onEditorStateChange={(data:any)=>{onTextAreChange(undefined, data)}} 
                placeholder={props.placeholder} 
                toolbar={{options: ['blockType']}} 
                toolbarCustomButtons={[
                    <ButtonEditor design={props.design} text="B" type={{control:"inline", value:"BOLD"}}/>, 
                    <ButtonEditor design={props.design} style={{"font-style": "italic"}} text="I" type={{control:"inline", value:"ITALIC"}}/>,
                    <ButtonEditor design={props.design} style={{"text-decoration":"underline"}} text="U" type={{control:"inline", value:"UNDERLINE"}}/>, 
                    <ButtonEditor design={props.design} style={{"text-decoration": "line-through"}} text="S" type={{control:"inline", value:"STRIKETHROUGH"}}/>,
                ]}  
                wrapperClassName={props.design === 'design-1' ? "wrapper" : "wrapper"}
                editorClassName={props.design === 'design-1' ? "editor" : "editorV2"} 
                toolbarClassName={props.design === 'design-1' ? "toolbar" : "toolbarV2"}
            />
        </Container>
    :
        <Container
            role='text-area'
        >
            <TextAreaView 
                defaultValue={props.defaultValue} 
                name={props.name}
                maxLength={props.maxLength}
                onKeyDown={(e) => {
                    if (props.maxLength && e.currentTarget.value.length >= props.maxLength && e.key !== 'Backspace' && e.key !== 'Delete') {
                        e.preventDefault();
                    }
                }}
                onChange={onTextAreChange} 
                data-testid="text_area"
                style={props.style} 
                design={props.design}
                placeholder={props.placeholder}
            />
            {props.maxLength &&
                <Text
                type="h3"
                weight="semibold"
                style={{
                    color: "var(--text-clear-neutral-medium, rgba(0, 29, 61, 0.56)",
                    fontFeatureSettings: "'liga' off, 'clig' off",
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    textAlign: "right",
                    lineHeight: "20px",
                    marginLeft: "16px",
                    marginTop: "8px"
                }}
                >
                    {restLength}/{props.maxLength} caracteres
                </Text>
            }
        </Container>
    )
} 
export default TextArea;
export interface Props extends ComponentPropsWithoutRef<"textarea">{
    value?: string,
    defaultValue?: string,
    placeholder?:string,
    type?: "default" | "edit",
    maxLength?: number,
    design?: 'design-1' | 'design-2'
}


