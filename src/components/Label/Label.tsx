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
const ChipsContainerSmall = styled.div<{disabled?: boolean}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 30px;
    border-radius: 50%;
    background-color: ${props => props.disabled ? Color.background.soft : Color.background.primaryLow};
`
const ChipsContainerBig = styled.div<{disabled?: boolean}>`
     display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 12px;
    height: 32px;
    left: 118px;
    top: 1082px;
    border-radius: 555px;
    background-color: ${props => props.disabled ? Color.background.soft : Color.background.primaryLow};
`
const ChipSelector = styled.div<{disabled?: boolean}>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 12px;
    height: 32px;
    border: 1px solid ${props => props.disabled ? Color.line.low : Color.line.full};
    opacity: ${props => props.disabled ? 0.6 : 1};
    box-sizing: border-box;
    border-radius: 555px;
`;
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
            case 'pending-remittance':
                return{
                    color: '#0000008F',
                    backgroundColor: '#F2F2F2',
                    text: 'Pendiente remesa'
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
            case 'failed':
                return{
                    color: Color.text.red,
                    backgroundColor: Color.background.redLow,
                    text: 'Fallido'
                }
            case 'cancel':
                return{
                    color: Color.text.red,
                    backgroundColor: Color.background.redLow,
                    text: 'Cancelada'
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
            case 'active':
                return{
                    color: '#448B6D',
                    backgroundColor: '#E4F8EE',
                    text: 'Activa'
                }
            case 'paid':
                return{
                    color: '#448B6D',
                    backgroundColor: '#E4F8EE',
                    text: 'Pagado'
                }
            case 'Resuelto':
                return{
                    color: '#448B6D',
                    backgroundColor: '#E4F8EE',
                    text: 'Resuelto'
                }
        }
    }

    return(props.type === 'chip' ? 
        props.size === 'big' ?
            <ChipsContainerBig 
                role="chip" 
                {...props}
            >
                <Text type='p2' weight='medium' style={{color:props.disabled ? Color.text.high : Color.text.primary}}>
                    {props.text.slice(0,1).toLocaleUpperCase()+props.text.slice(1,props.text.length).toLocaleLowerCase()}
                </Text> 
            </ChipsContainerBig>
        : props.size === 'selector' ?
            <ChipSelector 
                role="chip" 
                {...props}
            >
                <Text type='p2' weight='medium'>
                    {props.text}
                </Text> 
            </ChipSelector>
        :
            <ChipsContainerSmall 
                role="chip" 
                style={{...props.style, background: props.disabled ? Color.background.soft : Color.background.primaryLow}}
            >
                <Text type='p2' weight='medium' style={{color:props.disabled ? Color.text.high : Color.text.primary}}>
                    {props.text.slice(0,1).toLocaleUpperCase()+props.text.slice(1,2)}
                </Text> 
            </ChipsContainerSmall>
    :
        <LabelStyled 
            role="label" 
            id="Label" 
            {...props} 
            style={{background: props.backgroundColor ? props.backgroundColor: (selectedColor ? selectedColor.backgroundColor : Color.background.soft), ...props.style}}
        >
            <Text 
                type='p' 
                style={{fontSize: props.style?.fontSize ? props.style.fontSize : 14, fontWeight: 500, color: props.color ? props.color : (selectedColor ? selectedColor.color : Color.text.full)}}
            >
                {selectedColor?.text ? selectedColor.text : props.text}
            </Text>
        </LabelStyled>
    )
}
export default Label;
export interface Props extends ComponentPropsWithoutRef<"div">{
    text: string,
    disabled?: boolean,
    type?: 'label' | 'chip'
    size?: 'big' | 'small' | 'selector'
    backgroundColor?:string,
    color?:string,
}