import { ComponentPropsWithoutRef, useState, useRef } from 'react';
import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';

import AnimationLoading from '../../assets/animations/loading-small.json';

import { Send } from 'lucide-react';
import Color from '../../constants/ColorV2';
import Button from '../Button/ButtonImage';

const Container = styled.div<{loading?: boolean, focus?: boolean}>`
    display: flex;
    align-items: center;
    height: 48px;
    border-radius: 100px;
    outline: none;
    box-shadow: 0 0 0 ${props => props.focus ? '2px '+Color.border.neutralMedium : '1px '+Color.border.neutralSoft};
    padding: 0px 20px;
    background-color: ${props => props.loading ? Color.surface.neutralSoft : 'white'};
`
const Input = styled.input<{loading?: boolean}>`
    display: flex;
    flex: 1;
    font-family: 'Poppins';
    font-size: 14px;
    border: none;
    color: ${Color.text.neutralHard};
    background-color: transparent;
    &:focus{
        outline: none;
    }
`
const InputChat = (props: InputChatProps) =>{

    const input = useRef<HTMLInputElement>(null);
    const [ text, setText ] = useState("");
    const [ focus, setFocus ] = useState(false);

    const { style, ...rest} = props;

    const onChange = (e: any) =>{
        setText(e.target.value);
        props.onChange && props.onChange(e);
    }

    const onSend = () =>{
        if(text){
            props.onSend && props.onSend(text);
            setText("");
        }
    }

    const onKeyDown = (e: any) =>{
        if (e.key === 'Enter') {
            onSend();
        }
        props.onKeyDown && props.onKeyDown(e);
    }

    const onInputFocus = (e: any) =>{
        setFocus(true);
        props.onFocus && props.onFocus(e);
    }

    const onInputBlur = (e: any) =>{
        setFocus(false);
        props.onBlur && props.onBlur(e);
    }

    return(
        <Container
            style={style}
            loading={props.loading}
            focus={focus}
        >
            <Input
                {...rest}
                value={text}
                ref={input}
                disabled={props.loading}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
            />
            {props.loading ?
                <Player 
                    style={{height: 48, width: 48}}
                    src={AnimationLoading}
                    loop={true}
                    autoplay={true}
                />
            :
                <Button
                    disabled={!text}
                    icon={<Send height={20} width={20} color={Color.text.primary}/>}
                    onClick={onSend}
                />
            }
        </Container>
    )
}
export default InputChat;
export interface InputChatProps extends ComponentPropsWithoutRef<"input">{
    loading?: boolean
    onSend?: (text: string) => void
}