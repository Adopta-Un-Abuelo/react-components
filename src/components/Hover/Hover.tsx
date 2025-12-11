import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import ColorV2 from "../../constants/ColorV2";

const Container = styled.div`
	position: relative;
	display: inline-block;
`;

const HiddenDiv = styled.div`
	display: none;
	position: absolute;
	top: 100%;
	left: 0;
	background-color: white;
	border: 1px solid ${ColorV2.border.neutralSoft};
	padding: 24px;
	z-index: 10;
	border-radius: 24px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	${Container}:hover & {
		display: block;
	}
`;

const Hover = ({ children, modalProps, ...props }: HoverProps) => {
	return (
		<Container {...props}>
			{children}
			<HiddenDiv {...modalProps} />
		</Container>
	);
};
export default Hover;
export interface HoverProps extends ComponentPropsWithoutRef<"div"> {
	modalProps: React.ComponentProps<"div">;
}
