import { ComponentPropsWithoutRef, useState, useRef } from 'react';
import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';

import AnimationLoading from '../../assets/animations/loading-small.json';

import { Send } from 'lucide-react';
import { Color } from '../../constants';
import Button from '../Button/ButtonImage';

const Container = styled.div<{loading?: boolean}>`
    display: flex;
    align-items: center;
    height: 48px;
    border-radius: 100px;
    border: 1px solid ${Color.line.soft};
    padding: 0px 20px;
    background-color: ${props => props.loading ? Color.background.soft : 'transparent'};
`
const Input = styled.input<{loading?: boolean}>`
    display: flex;
    flex: 1;
    font-family: 'Poppins';
    font-size: 14px;
    border: none;
    color: ${Color.text.full};
    background-color: transparent;
    :focus{
        outline: none;
    }
`
const InputChat = (props: InputChatProps) =>{

    const input = useRef<HTMLInputElement>(null);
    const [ text, setText ] = useState("");

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

    return(
        <Container
            style={style}
            loading={props.loading}
        >
            <Input
                {...rest}
                value={text}
                ref={input}
                disabled={props.loading}
                onChange={onChange}
                onKeyDown={onKeyDown}
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
                    icon={<Send height={20} width={20} color={Color.text.full}/>}
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