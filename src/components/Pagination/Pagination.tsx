import { CSSProperties, useEffect, useState } from "react";
import styled from "styled-components";
import Color from "../../constants/Color";
import Text from "../../components/Text/Text";
import {
	ChevronLeft,
	ChevronRight,
	ChevronLast,
	ChevronFirst,
} from "lucide-react";

const Container = styled.div`
	display: flex;
	align-items: center;
`;
const Icon = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 26px;
	height: 26px;
	border-radius: 42px;
	&:hover {
		background-color: ${Color.background.soft};
	}
`;

const Pagination = (props: Props) => {
	const [start, setStart] = useState(0);
	const [steps, setSteps] = useState(0);

	useEffect(() => {
		setSteps(Math.ceil(props.length / props.rowsPerPage));
	}, [props.length, props.rowsPerPage]);

	useEffect(() => {
		if (props.start && props.start < steps) setStart(props.start);
	}, [props.start]);

	const nextPage = () => {
		if (start < steps - 1) {
			const page = start + 1;
			setStart(page);
			props.onChange && props.onChange(page);
		}
	};

	const prevPage = () => {
		if (start > 0) {
			const page = start - 1;
			setStart(page);
			props.onChange && props.onChange(page);
		}
	};

	const firstPage = () => {
		if (start > 0) {
			setStart(0);
			props.onChange && props.onChange(0);
		}
	};

	const lastPage = () => {
		if (start < steps - 1) {
			setStart(steps - 1);
			props.onChange && props.onChange(steps - 1);
		}
	};

	return (
		<Container role="pagination" style={props.style}>
			<Icon
				role="first-arrow"
				onClick={firstPage}
				style={{ cursor: start === 0 ? "auto" : "pointer" }}
			>
				<ChevronFirst
					style={{
						stroke: start === 0 ? Color.text.low : Color.text.full,
					}}
				/>
			</Icon>
			<Icon
				role="left-arrow"
				onClick={prevPage}
				style={{ cursor: start === 0 ? "auto" : "pointer" }}
			>
				<ChevronLeft
					style={{
						stroke: start === 0 ? Color.text.low : Color.text.full,
					}}
				/>
			</Icon>
			<Text
				type="p"
				style={{ color: Color.text.full, margin: "0px 12px" }}
			>
				<span style={{ fontWeight: 700 }}>{start + 1}</span> de{" "}
				<span style={{ fontWeight: 700 }}>{steps}</span>
			</Text>
			<Icon
				role="right-arrow"
				onClick={nextPage}
				style={{ cursor: start === steps - 1 ? "auto" : "pointer" }}
			>
				<ChevronRight
					style={{
						stroke:
							start === steps - 1
								? Color.text.low
								: Color.text.full,
					}}
				/>
			</Icon>
			<Icon
				role="last-arrow"
				onClick={lastPage}
				style={{ cursor: start === steps - 1 ? "auto" : "pointer" }}
			>
				<ChevronLast
					style={{
						stroke:
							start === steps - 1
								? Color.text.low
								: Color.text.full,
					}}
				/>
			</Icon>
		</Container>
	);
};
export default Pagination;
export interface Props {
	style?: CSSProperties;
	start?: number;
	length: number;
	rowsPerPage: number;
	onChange?: (page: number) => void;
}
