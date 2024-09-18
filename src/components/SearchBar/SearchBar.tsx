import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import { Search } from "lucide-react";
import { Color } from "../../constants";

const InputView = styled.div`
	display: flex;
	align-items: center;
	padding: 0px;
	height: auto;
`;

const InputStyled = styled.input<{ $design?: "primary" | "secondary" }>`
	height: 38px;
	border-radius: 100px;
	border: none;
	box-shadow: ${(props) =>
		props.$design === "secondary" ? "none" : `0 0 0 1px ${Color.line.soft}`};
	font-family: "Poppins";
	font-size: 14px;
	padding: 0px;
	width: -webkit-fill-available;
	width: -moz-available;
	outline: none;
	background: ${(props) =>
		props.$design === "primary"
			? "var(--surface-clear-neutral-soft, rgba(0, 29, 61, 0.04))"
			: "white"};
	&:hover {
		cursor: pointer;
	}
	&:focus {
		box-shadow: ${(props) =>
			props.$design === "secondary"
				? "none"
				: `0 0 0 1px ${Color.text.full}`};
		background: white;
		cursor: text;
	}
`;

const IconStyle = styled.div<{ $design?: "primary" | "secondary" }>`
	position: absolute;
	display: flex;
	align-items: center;
	margin-left: ${(props) =>
		props.$design === "secondary" ? "0px;" : "16px;"};
`;

const SearchBar = (props: Props) => {
	const { id, style, design, ...restProps } = props;

	return props.type === "big" ? (
		//BIG
		<InputView id={id} role="search-bar" style={style}>
			<IconStyle
				$design={design}
				style={{ height: 24, width: 24 }}
			>
				<Search stroke={Color.text.high} />
			</IconStyle>
			<InputStyled
				role="input"
				style={{
					height: "48px",
					paddingLeft:
						design === "secondary" ? "36px" : "46px",
				}}
				{...restProps}
				$design={design}
			/>
		</InputView>
	) : (
		// SMALL
		<InputView id={id} role="search-bar" style={style}>
			<IconStyle
				$design={design}
				style={{ height: 22, width: 22 }}
			>
				<Search stroke={Color.text.high} />
			</IconStyle>
			<InputStyled
				role="input"
				style={{
					fontSize: 16,
					paddingLeft:
						design === "secondary" ? "36px" : "46px",
				}}
				$design={design}
				{...restProps}
			/>
		</InputView>
	);
};

export default SearchBar;

export interface Props extends ComponentPropsWithoutRef<"input"> {
	type?: "big" | "small";
	design?: "primary" | "secondary";
}
