import { ComponentPropsWithoutRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Color } from '../../constants';
import Text from '../Text/Text';

const LabelStyled = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 8px;
    width: fit-content;
    height: 28px;
    border-radius: 3px;
`
const Label = (props: Props) =>{

    const [ selectedColor, setSelectedColor ] = useState<{color: string, backgroundColor: string, text: string} | undefined>(undefined);

    useEffect(() =>{
        setSelectedColor(getColor());
    },[props.text]);

    const getColor = () =>{
        switch(props.text){
            case 'inRegister':
                return{
                    color: '#2D7FD9',
                    backgroundColor: '#E5F1FC',
                    text: 'En registro'
                }
            case 'registered':
                return{
                    color: '#2D7FD9',
                    backgroundColor: '#E5F1FC',
                    text: 'Registrado'
                }
            case 'waiting':
                return{
                    color: '#2D7FD9',
                    backgroundColor: '#E5F1FC',
                    text: 'Pendiente de match'
                }
            case 'training':
                return{
                    color: '#2D7FD9',
                    backgroundColor: '#E5F1FC',
                    text: 'Formación en proceso'
                }
            case 'match':
                return{
                    color: '#59C183',
                    backgroundColor: '#E7F6ED',
                    text: 'Match'
                }
            case 'shutdown':
                return{
                    color: '#FF5A5A',
                    backgroundColor: '#FCEDF1',
                    text: 'Baja'
                }
            case 'banned':
                return{
                    color: '#FF5A5A',
                    backgroundColor: '#FCEDF1',
                    text: 'Bloqueado'
                }
            case 'exVolunteer':
                return{
                    color: '#FF5A5A',
                    backgroundColor: '#FCEDF1',
                    text: 'Ex-voluntario'
                }
            case 'paused':
                return{
                    color: '#828282',
                    backgroundColor: '#F2F2F2',
                    text: 'Pausa'
                }
            case 'inProgress':
                return{
                    color: '#FF8854',
                    backgroundColor: '#FFF6E5',
                    text: 'En proceso'
                }
            case 'En proceso':
                return{
                    color: '#FF8854',
                    backgroundColor: '#FFF6E5',
                    text: 'En proceso'
                }
            case 'pending':
                return{
                    color: '#0000008F',
                    backgroundColor: '#F2F2F2',
                    text: 'Pendiente'
                }
            case 'Pendiente':
                return{
                    color: '#0000008F',
                    backgroundColor: '#F2F2F2',
                    text: 'Pendiente'
                }
            case 'canceled':
                return{
                    color: Color.text.red,
                    backgroundColor: Color.background.redLow,
                    text: 'Cancelado'
                }
            case 'No resuelto':
                return{
                    color: Color.text.red,
                    backgroundColor: Color.background.redLow,
                    text: 'No resuelto'
                }
            case 'done':
                return{
                    color: '#448B6D',
                    backgroundColor: '#E4F8EE',
                    text: 'Resuelto'
                }
            case 'Resuelto':
                return{
                    color: '#448B6D',
                    backgroundColor: '#E4F8EE',
                    text: 'Resuelto'
                }
        }
    }

    return(selectedColor ?
        <LabelStyled 
            role="label" 
            id="Label" 
            {...props}
            style={{background: selectedColor.backgroundColor, ...props.style}}
        >
            <Text
                type='p' 
                style={{fontSize: props.style?.fontSize ? props.style.fontSize : 14, fontWeight: 500, color: selectedColor.color}}
            >
                {selectedColor.text}
            </Text>
        </LabelStyled>
    :
        <LabelStyled 
            role="label" 
            id="Label" 
            {...props} 
            style={{background: props.backgroundColor ? props.backgroundColor: Color.background.soft, ...props.style}}
        >
            <Text 
                type='p' 
                style={{fontSize: props.style?.fontSize ? props.style.fontSize : 14, fontWeight: 500, color: props.color}}
            >
                {props.text}
            </Text>
        </LabelStyled>
    )
}
export default Label;
export interface Props extends ComponentPropsWithoutRef<"div">{
    text?: string,
    backgroundColor?:string,
    color?:string,
}