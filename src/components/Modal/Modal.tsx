import { forwardRef, Ref } from 'react';
import styled from 'styled-components';
import Text from '../Text/Text'
import ModalPrimary, { ModalPrimaryProps, ModalRef } from './ModalPrimary';

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
const WebView = styled.iframe``

const ModalComponent = forwardRef((props: ModalProps, ref: Ref<ModalRef>) =>{

    return(
        props.type === 'form' ?
            <ModalPrimary
                ref={ref}
                {...props}
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
            </ModalPrimary>
        : props.type === 'web' ?
            <ModalPrimary
                ref={ref}
                {...props}
            >
                <WebView
                    id={'web-iframe'}
                    src={props.url} 
                    width="100%" 
                    height="100%"
                    style={{border: 'none'}}
                />
            </ModalPrimary>
        :
            <ModalPrimary
                ref={ref}
                {...props}
            />
    )
})
export default ModalComponent;
export interface ModalProps extends ModalPrimaryProps{
    options?: Array<{
        id: string,
        title?: string,
        Data?: JSX.Element,
        hidden?: boolean
    }>
    url?: string
}