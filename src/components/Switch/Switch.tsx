import styled from "styled-components";
import ColorV2 from "@constants/ColorV2";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const Container = styled.div<{ $active: boolean, $color?: string }>`
    position: relative;
	display: flex;
	width: 48px;
	height: 28px;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
	border-radius: 100px;
	background: ${(props) =>
		props.$active ? (props.$color ? props.$color : ColorV2.surface.primary) : ColorV2.surface.neutralLow};
	cursor: pointer;
    transition: background 0.3s;
`;
const Tag = styled.div<{ $active: boolean }>`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
	height: 24px;
	width: 24px;
	background-color: white;
	border-radius: 100px;
    top: 2px;
    left: ${props => props.$active ? "22px" : "2px"};
    transition: left 0.3s;
`;

const Switch = (props: SwitchProps) => {
	const [active, setActive] = useState<boolean>(false);

	useEffect(() => {
		if (props.active) setActive(props.active);
		else setActive(false);
	}, [props.active]);

	return (
		<Container
            role="container"
			$active={active}
			$color={props.color}
			onClick={() => {
				props.onChange && props.onChange(!active);
				setActive(!active);
			}}
		>
			<Tag
                role="tag"
                $active={active}
            >
                {active &&
                    <Check color={props.color ? props.color : ColorV2.text.primary} strokeWidth={3} height={18} width={18}/>
                }
            </Tag>
		</Container>
	);
};
export default Switch;
export interface SwitchProps {
	active?: boolean;
	color?: string;
	onChange?: (on: boolean) => void;
}
