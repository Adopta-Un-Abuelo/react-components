import styled from "styled-components";

import Text from "../Text/Text";
import { ColorV2 } from "../../constants";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: fit-content;
    gap: 2px;
`
const Cell = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 28px;
    border-radius: 6px;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);
    background-color: white;
`
const Line = styled.div`
    position: absolute;
    top: 20px;
    width: 100%;
    border-bottom: 1px solid ${ColorV2.surface.background};
`

const Counter = (props: Props) =>{

    const chars = props.amount.toString().split("");

    return(
        <Container>
            {chars.map((item) =>(
                <Cell>
                    <Line/>
                    <Text type='h3' weight='semibold' style={{color: ColorV2.text.primary, zIndex: 1}}>
                        {item}
                    </Text>
                </Cell>
            ))}
        </Container>
    )
}
export default Counter;
export interface Props{
    amount: number
}