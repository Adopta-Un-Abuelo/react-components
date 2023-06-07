import { forwardRef, Ref, useEffect, useImperativeHandle, useState, ComponentPropsWithoutRef, CSSProperties } from 'react';
import styled from 'styled-components';
import Button, { ButtonProps } from '../Button/Button'
import Text from '../Text/Text'
import { X } from 'lucide-react'
import media from 'styled-media-query';
import Color from '../../constants/Color';
import Modal from 'react-modal';

const TitleView = styled.div`
    position: sticky;
    display: flex;
    flex-direction: column;
    padding: 18px 24px;
    top: 0px;
    background-color: white;
    ${media.lessThan("small")`
        padding: 16px;
    `}
`
const ChildrenView = styled.div`
    padding: 0px 24px;
`
const Title = styled.div`
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: ${Color.text.full};
    ${media.lessThan("small")`
        font-size: 22px;
    `}
`;
const Subtitle = styled.div`
    font-family: Poppins;
    font-style: normal;
    font-size: 14px;
    line-height: 22px;
    color: #828282;
    ${media.lessThan("small")`
        font-size: 16px;
        margin-top: 8px;
    `}
`;
const Buttons = styled.div`
    position: sticky;
    display: flex;
    flex: 1;
    bottom: 0;
    align-items: center;
    justify-content: flex-end;
    padding: 8px 24px;
    border-top: 1px solid ${Color.line.soft};
    background-color: white;
    ${media.lessThan("small")`
        padding: 8px 16px;
    `}
`;
const ErrorView = styled.div`
    background-color: ${Color.background.redLow};
    padding: 12px 24px;
    margin-top: 24px;
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
`
const LabelColumn = styled.div`
    display: flex;
    width: 112px;
    align-items: center;
`
const DataColumn = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`
const Separator = styled.div`
    content: none;
    margin-bottom: 24px;
`;

const ModalComponent = forwardRef((props: ModalProps, ref: Ref<ModalRef>) =>{

    const [ isVisible, setIsVisible ] = useState(props.isVisible);
    const [ show, setShow ] = useState(false); 

    useImperativeHandle(ref, () => ({
        close(){
            onClose();
        }
    }));

    useEffect(() =>{
        //Open
        if(props.isVisible){
            setIsVisible(true);
            delay(100).then(() =>{
                setShow(true);
            });
        }
        //Close
        else{
            setShow(false);
            delay(500).then(() =>{
                setIsVisible(false);
            });
        }
    },[props.isVisible]);

    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const onClose = () =>{
        setShow(false);
        delay(300).then(() =>{
            setIsVisible(false);
            props.onClose && props.onClose();
        });
    }

    return(
        <Modal
            role="modal"
            isOpen={isVisible}
            ariaHideApp={false}
            style={{
                content: {
                    position: 'absolute',
                    width: props.type === 'full-screen' ? '100%' : 500,
                    maxWidth: props.type === 'full-screen' ? '100%' : 'calc(100% - 24px)',
                    maxHeight: 'calc(100% - 24px)',
                    background: '#FFFFFF',
                    boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: props.type === 'full-screen' ? '12px 12px 0px 0px' : 12,
                    top: props.type !== 'full-screen' ? (show ? '50%' : '150%') : 'unset',
                    bottom: props.type === 'full-screen' ? (show ? '0px' : '-100vh') : 'unset',
                    transition: 'top 0.3s ease-out, bottom 0.3s ease-out, transform 0.3s ease-in-out',
                    left: '50%',
                    transform: props.type === 'full-screen' ? 'translate(-50%, 0%)' : 'translate(-50%, -50%) scale('+(show ? 1 : 0.2)+')',
                    overflow:'hidden',
                    overflowY: 'auto',
                    border: 'none',
                    padding: 0,
                    ...props.style
                },
                overlay:{
                    backgroundColor: 'rgba(0, 0, 0, '+(show ? 0.6 : 0)+')',
                    transition: ' background-color 0.3s ease-out',
                    zIndex: 1000
                }
            }}
        >
            {!props.hideHeader &&
                <TitleView>
                    {!props.hideClose &&
                        <Button
                            style={{position:"absolute", alignSelf:"flex-end", cursor:"pointer"}}
                            icon={<X height={20} width={20} color={Color.text.full}/>}
                            design='image'
                            onClick={onClose}
                        />
                    }
                    {props.title &&
                        <Title>{props.title}</Title>
                    }
                    {props.subtitle &&
                        <Subtitle>{props.subtitle}</Subtitle>
                    }
                    {props.Header}
                </TitleView>
            }
            <ChildrenView
                style={props.contentStyle}
            >
                {props.options && props.options.map((item, index) =>{
                    if(item.hidden){
                        return null;
                    }
                    else if(item.id === 'separator')
                        return(
                            <Separator key={'separator-'+index}/>
                        )
                    else
                        return (
                            <Row
                                key={'option-'+item.id}
                            >
                                <LabelColumn>
                                    <Text type='c1' weight="medium">
                                        {item.title}
                                    </Text>
                                </LabelColumn>
                                <DataColumn>
                                    {item.Data}
                                </DataColumn>
                            </Row>
                        )
                })}
                {props.children}
            </ChildrenView>
            {props.error && 
                <ErrorView>
                    <Text type='p' style={{color: Color.status.color.error, fontSize:12}}>
                        {props.error}
                    </Text>
                </ErrorView>
            }
            {props.buttonProps &&
                <Buttons>
                    {props.Bottom}
                    {props.buttonProps &&
                        <Button 
                            {...props.buttonProps}
                        >
                            {props.buttonProps.children ? props.buttonProps.children : 'Guardar'}
                        </Button>
                    }
                </Buttons>
            }
        </Modal>
    )
})
export default ModalComponent;
export interface ModalProps extends ComponentPropsWithoutRef<"div">{
    isVisible: boolean,
    type?: 'default' | 'full-screen' | 'form',
    title?:string,
    subtitle?:string,
    error?:string,
    hideClose?: boolean,
    hideHeader?: boolean,
    contentStyle?: CSSProperties,
    Header?: JSX.Element,
    Bottom?: JSX.Element,
    buttonProps?: ButtonProps,
    options?: Array<{
        id: string,
        title?: string,
        Data?: JSX.Element,
        hidden?: boolean
    }>
    onClose:()=>void
}
export interface ModalRef{
    close: () => void
}