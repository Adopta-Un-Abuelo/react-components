import styled from "styled-components";
import Text from "../Text/Text";
import { CSSProperties } from "react";
import media from "styled-media-query";

const Container = styled.div`
	position: relative;
	width: fit-content;
	width: 108px;
	height: 132px;
	${media.lessThan("small")`
		height: 120px;
		width: 96px;
	`}
`;
const IconContainer = styled.div<{ $backgroundColor?: string }>`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 96px;
	width: 96px;
	margin-top: 6px;
	background-color: ${(props) => props.$backgroundColor};
	${media.lessThan("small")`
		height: 84px;
		width: 84px;
	`}
`;
const Background = styled.div`
	position: absolute;
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
`;
const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 1;
	position: relative;
	height: 100%;
`;

const StampSVG = (props: { isMobile: boolean }) => {
	if (props.isMobile)
		return (
			<svg
				width="96"
				height="120"
				viewBox="0 0 96 120"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M0 4C2.20914 4 4 2.20914 4 0H6V6H0V4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M12 4C14.2091 4 16 2.20914 16 0H18V6H6V0H8C8 2.20914 9.79086 4 12 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M24 4C26.2091 4 28 2.20914 28 0H30V6H18V0H20C20 2.20914 21.7909 4 24 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M36 4C38.2091 4 40 2.20914 40 0H42V6H30V0H32C32 2.20914 33.7909 4 36 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M48 4C50.2091 4 52 2.20914 52 0H54V6H42V0H44C44 2.20914 45.7909 4 48 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M60 4C62.2091 4 64 2.20914 64 0H66V6H54V0H56C56 2.20914 57.7909 4 60 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M72 4C74.2091 4 76 2.20914 76 0H78V6H66V0H68C68 2.20914 69.7909 4 72 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M84 4C86.2091 4 88 2.20914 88 0H90V6H78V0H80C80 2.20914 81.7909 4 84 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 120C4 117.791 2.20914 116 -1.74846e-07 116L-2.62268e-07 114L6 114L6 120L4 120Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 108C4 105.791 2.20914 104 -4.37114e-07 104L-5.24537e-07 102L6 102L6 114L0 114L-8.74228e-08 112C2.20914 112 4 110.209 4 108Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 96C4 93.7909 2.20914 92 -4.37114e-07 92L-5.24537e-07 90L6 90L6 102L0 102L-8.74228e-08 100C2.20914 100 4 98.2091 4 96Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 84C4 81.7909 2.20914 80 -4.37114e-07 80L-5.24537e-07 78L6 78L6 90L0 90L-8.74219e-08 88C2.20914 88 4 86.2091 4 84Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 72C4 69.7909 2.20914 68 -4.37114e-07 68L-5.24536e-07 66L6 66L6 78L0 78L-8.74219e-08 76C2.20914 76 4 74.2091 4 72Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 60C4 57.7909 2.20914 56 -4.37114e-07 56L-5.24536e-07 54L6 54L6 66L0 66L-8.74219e-08 64C2.20914 64 4 62.2091 4 60Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 48C4 45.7909 2.20914 44 -4.37114e-07 44L-5.24536e-07 42L6 42L6 54L0 54L-8.74219e-08 52C2.20914 52 4 50.2091 4 48Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 36C4 33.7909 2.20914 32 -4.37114e-07 32L-5.24537e-07 30L6 30L6 42L0 42L-8.74228e-08 40C2.20914 40 4 38.2091 4 36Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 24C4 21.7909 2.20914 20 -4.37114e-07 20L-5.24537e-07 18L6 18L6 30L0 30L-8.74228e-08 28C2.20914 28 4 26.2091 4 24Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 12C4 9.79086 2.20914 8 -4.37114e-07 8L-5.24537e-07 6L6 6L6 18L0 18L-8.74228e-08 16C2.20914 16 4 14.2091 4 12Z"
					fill="white"
				/>
				<rect x="7" y="7" width="82" height="82" fill="white" />
				<rect
					x="7"
					y="7"
					width="82"
					height="82"
					stroke="white"
					stroke-width="2"
				/>
				<rect
					width="84"
					height="24"
					transform="translate(6 90)"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M96 116C93.7909 116 92 117.791 92 120L90 120L90 114L96 114L96 116Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M84 116C81.7909 116 80 117.791 80 120L78 120L78 114L90 114L90 120L88 120C88 117.791 86.2091 116 84 116Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M72 116C69.7909 116 68 117.791 68 120L66 120L66 114L78 114L78 120L76 120C76 117.791 74.2091 116 72 116Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M60 116C57.7909 116 56 117.791 56 120L54 120L54 114L66 114L66 120L64 120C64 117.791 62.2091 116 60 116Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M48 116C45.7909 116 44 117.791 44 120L42 120L42 114L54 114L54 120L52 120C52 117.791 50.2091 116 48 116Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M36 116C33.7909 116 32 117.791 32 120L30 120L30 114L42 114L42 120L40 120C40 117.791 38.2091 116 36 116Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M24 116C21.7909 116 20 117.791 20 120L18 120L18 114L30 114L30 120L28 120C28 117.791 26.2091 116 24 116Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M12 116C9.79086 116 8 117.791 8 120L6 120L6 114L18 114L18 120L16 120C16 117.791 14.2091 116 12 116Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M92 -1.74846e-07C92 2.20914 93.7909 4 96 4L96 6L90 6L90 -2.62268e-07L92 -1.74846e-07Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M92 12C92 14.2091 93.7909 16 96 16L96 18L90 18L90 6L96 6L96 8C93.7909 8 92 9.79086 92 12Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M92 24C92 26.2091 93.7909 28 96 28L96 30L90 30L90 18L96 18L96 20C93.7909 20 92 21.7909 92 24Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M92 36C92 38.2091 93.7909 40 96 40L96 42L90 42L90 30L96 30L96 32C93.7909 32 92 33.7909 92 36Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M92 48C92 50.2091 93.7909 52 96 52L96 54L90 54L90 42L96 42L96 44C93.7909 44 92 45.7909 92 48Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M92 60C92 62.2091 93.7909 64 96 64L96 66L90 66L90 54L96 54L96 56C93.7909 56 92 57.7909 92 60Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M92 72C92 74.2091 93.7909 76 96 76L96 78L90 78L90 66L96 66L96 68C93.7909 68 92 69.7909 92 72Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M92 84C92 86.2091 93.7909 88 96 88L96 90L90 90L90 78L96 78L96 80C93.7909 80 92 81.7909 92 84Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M92 96C92 98.2091 93.7909 100 96 100L96 102L90 102L90 90L96 90L96 92C93.7909 92 92 93.7909 92 96Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M92 108C92 110.209 93.7909 112 96 112L96 114L90 114L90 102L96 102L96 104C93.7909 104 92 105.791 92 108Z"
					fill="white"
				/>
			</svg>
		);
	else
		return (
			<svg
				width="108"
				height="132"
				viewBox="0 0 108 132"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M0 4C2.20914 4 4 2.20914 4 0L6 0V6H0L0 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M12 4C14.2091 4 16 2.20914 16 0L18 0V6H6V0L8 0C8 2.20914 9.79086 4 12 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M24 4C26.2091 4 28 2.20914 28 0L30 0V6H18V0L20 0C20 2.20914 21.7909 4 24 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M36 4C38.2091 4 40 2.20914 40 0L42 0V6H30V0L32 0C32 2.20914 33.7909 4 36 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M48 4C50.2091 4 52 2.20914 52 0L54 0V6H42V0L44 0C44 2.20914 45.7909 4 48 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M60 4C62.2091 4 64 2.20914 64 0L66 0V6H54V0L56 0C56 2.20914 57.7909 4 60 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M72 4C74.2091 4 76 2.20914 76 0L78 0V6H66V0L68 0C68 2.20914 69.7909 4 72 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M84 4C86.2091 4 88 2.20914 88 0L90 0V6H78V0L80 0C80 2.20914 81.7909 4 84 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M96 4C98.2091 4 100 2.20914 100 0L102 0V6H90V0L92 0C92 2.20914 93.7909 4 96 4Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 132C4 129.791 2.20914 128 -1.74844e-07 128L-2.62268e-07 126L6 126L6 132L4 132Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 120C4 117.791 2.20914 116 -4.37114e-07 116L-5.24535e-07 114L6 114L6 126L0 126L-8.7421e-08 124C2.20914 124 4 122.209 4 120Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 108C4 105.791 2.20914 104 -4.37114e-07 104L-5.24535e-07 102L6 102L6 114L0 114L-8.7421e-08 112C2.20914 112 4 110.209 4 108Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 96C4 93.7909 2.20914 92 -4.37114e-07 92L-5.24537e-07 90L6 90L6 102L0 102L-8.74228e-08 100C2.20914 100 4 98.2091 4 96Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 84C4 81.7909 2.20914 80 -4.37114e-07 80L-5.24537e-07 78L6 78L6 90L0 90L-8.74228e-08 88C2.20914 88 4 86.2091 4 84Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 72C4 69.7909 2.20914 68 -4.37114e-07 68L-5.24537e-07 66L6 66L6 78L0 78L-8.74228e-08 76C2.20914 76 4 74.2091 4 72Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 60C4 57.7909 2.20914 56 -4.37114e-07 56L-5.24537e-07 54L6 54L6 66L0 66L-8.74228e-08 64C2.20914 64 4 62.2091 4 60Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 48C4 45.7909 2.20914 44 -4.37114e-07 44L-5.24537e-07 42L6 42L6 54L0 54L-8.74228e-08 52C2.20914 52 4 50.2091 4 48Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 36C4 33.7909 2.20914 32 -4.37114e-07 32L-5.24537e-07 30L6 30L6 42L0 42L-8.74228e-08 40C2.20914 40 4 38.2091 4 36Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 24C4 21.7909 2.20914 20 -4.37114e-07 20L-5.24537e-07 18L6 18L6 30L0 30L-8.74228e-08 28C2.20914 28 4 26.2091 4 24Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 12C4 9.79086 2.20914 8 -4.37114e-07 8L-5.24537e-07 6L6 6L6 18L0 18L-8.74228e-08 16C2.20914 16 4 14.2091 4 12Z"
					fill="white"
				/>
				<rect x="7" y="7" width="94" height="94" fill="white" />
				<rect
					x="7"
					y="7"
					width="94"
					height="94"
					stroke="white"
					stroke-width="2"
				/>
				<rect
					width="96"
					height="24"
					transform="translate(6 102)"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M108 128C105.791 128 104 129.791 104 132L102 132L102 126L108 126L108 128Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M96 128C93.7909 128 92 129.791 92 132L90 132L90 126L102 126L102 132L100 132C100 129.791 98.2091 128 96 128Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M84 128C81.7909 128 80 129.791 80 132L78 132L78 126L90 126L90 132L88 132C88 129.791 86.2091 128 84 128Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M72 128C69.7909 128 68 129.791 68 132L66 132L66 126L78 126L78 132L76 132C76 129.791 74.2091 128 72 128Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M60 128C57.7909 128 56 129.791 56 132L54 132L54 126L66 126L66 132L64 132C64 129.791 62.2091 128 60 128Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M48 128C45.7909 128 44 129.791 44 132L42 132L42 126L54 126L54 132L52 132C52 129.791 50.2091 128 48 128Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M36 128C33.7909 128 32 129.791 32 132L30 132L30 126L42 126L42 132L40 132C40 129.791 38.2091 128 36 128Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M24 128C21.7909 128 20 129.791 20 132L18 132L18 126L30 126L30 132L28 132C28 129.791 26.2091 128 24 128Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M12 128C9.79086 128 8 129.791 8 132L6 132L6 126L18 126L18 132L16 132C16 129.791 14.2091 128 12 128Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M104 -1.74846e-07C104 2.20914 105.791 4 108 4L108 6L102 6L102 -2.62268e-07L104 -1.74846e-07Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M104 12C104 14.2091 105.791 16 108 16L108 18L102 18L102 6L108 6L108 8C105.791 8 104 9.79086 104 12Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M104 24C104 26.2091 105.791 28 108 28L108 30L102 30L102 18L108 18L108 20C105.791 20 104 21.7909 104 24Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M104 36C104 38.2091 105.791 40 108 40L108 42L102 42L102 30L108 30L108 32C105.791 32 104 33.7909 104 36Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M104 48C104 50.2091 105.791 52 108 52L108 54L102 54L102 42L108 42L108 44C105.791 44 104 45.7909 104 48Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M104 60C104 62.2091 105.791 64 108 64L108 66L102 66L102 54L108 54L108 56C105.791 56 104 57.7909 104 60Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M104 72C104 74.2091 105.791 76 108 76L108 78L102 78L102 66L108 66L108 68C105.791 68 104 69.7909 104 72Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M104 84C104 86.2091 105.791 88 108 88L108 90L102 90L102 78L108 78L108 80C105.791 80 104 81.7909 104 84Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M104 96C104 98.2091 105.791 100 108 100L108 102L102 102L102 90L108 90L108 92C105.791 92 104 93.7909 104 96Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M104 108C104 110.209 105.791 112 108 112L108 114L102 114L102 102L108 102L108 104C105.791 104 104 105.791 104 108Z"
					fill="white"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M104 120C104 122.209 105.791 124 108 124L108 126L102 126L102 114L108 114L108 116C105.791 116 104 117.791 104 120Z"
					fill="white"
				/>
			</svg>
		);
};

const Stamp = (props: StampProps) => {
	const isMobile = window.innerWidth <= 450;

	return (
		<Container role="stamp" style={props.style}>
			<Background>
				<StampSVG isMobile={isMobile} />
			</Background>
			<Content>
				<IconContainer $backgroundColor={props.backgroundColor}>
					<Text type="d1">{props.icon}</Text>
				</IconContainer>
				<Text
					type="p"
					style={{
						maxWidth: "-webkit-fill-available",
						margin: "4px 9px 0px",
						fontFamily: "DM Mono",
						fontSize: 13,
						maxHeight: 24,
						textAlign: "center",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{props.title}
				</Text>
			</Content>
		</Container>
	);
};
export default Stamp;
export interface StampProps {
	style?: CSSProperties;
	icon: string;
	title: string;
	backgroundColor: string;
}
