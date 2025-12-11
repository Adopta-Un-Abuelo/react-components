import styled from "styled-components";
import Text from "../../components/Text/Text";
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
	margin-top: 8px;
	margin-left: 5px;
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
				width="102"
				height="126"
				viewBox="0 0 102 126"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g filter="url(#filter0_d_13051_9213)">
					<rect x="10" y="9" width="82" height="82" fill="white" />
					<rect
						x="10"
						y="9"
						width="82"
						height="82"
						stroke="white"
						stroke-width="2"
					/>
					<rect
						width="84"
						height="24"
						transform="translate(9 92)"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M3 6C5.20914 6 7 4.20914 7 2H9V8H3V6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M15 6C17.2091 6 19 4.20914 19 2H21V8H9V2H11C11 4.20914 12.7909 6 15 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M27 6C29.2091 6 31 4.20914 31 2H33V8H21V2H23C23 4.20914 24.7909 6 27 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M39 6C41.2091 6 43 4.20914 43 2H45V8H33V2H35C35 4.20914 36.7909 6 39 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M51 6C53.2091 6 55 4.20914 55 2H57V8H45V2H47C47 4.20914 48.7909 6 51 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M63 6C65.2091 6 67 4.20914 67 2H69V8H57V2H59C59 4.20914 60.7909 6 63 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M75 6C77.2091 6 79 4.20914 79 2H81V8H69V2H71C71 4.20914 72.7909 6 75 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M87 6C89.2091 6 91 4.20914 91 2H93V8H81V2H83C83 4.20914 84.7909 6 87 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M95 2C95 4.20914 96.7909 6 99 6L99 8L93 8L93 2L95 2Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M95 14C95 16.2091 96.7909 18 99 18L99 20L93 20L93 8L99 8L99 10C96.7909 10 95 11.7909 95 14Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M95 26C95 28.2091 96.7909 30 99 30L99 32L93 32L93 20L99 20L99 22C96.7909 22 95 23.7909 95 26Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M95 38C95 40.2091 96.7909 42 99 42L99 44L93 44L93 32L99 32L99 34C96.7909 34 95 35.7909 95 38Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M95 50C95 52.2091 96.7909 54 99 54L99 56L93 56L93 44L99 44L99 46C96.7909 46 95 47.7909 95 50Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M95 62C95 64.2091 96.7909 66 99 66L99 68L93 68L93 56L99 56L99 58C96.7909 58 95 59.7909 95 62Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M95 74C95 76.2091 96.7909 78 99 78L99 80L93 80L93 68L99 68L99 70C96.7909 70 95 71.7909 95 74Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M95 86C95 88.2091 96.7909 90 99 90L99 92L93 92L93 80L99 80L99 82C96.7909 82 95 83.7909 95 86Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M95 98C95 100.209 96.7909 102 99 102L99 104L93 104L93 92L99 92L99 94C96.7909 94 95 95.7909 95 98Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M95 110C95 112.209 96.7909 114 99 114L99 116L93 116L93 104L99 104L99 106C96.7909 106 95 107.791 95 110Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M99 118C96.7909 118 95 119.791 95 122L93 122L93 116L99 116L99 118Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M87 118C84.7909 118 83 119.791 83 122L81 122L81 116L93 116L93 122L91 122C91 119.791 89.2091 118 87 118Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M75 118C72.7909 118 71 119.791 71 122L69 122L69 116L81 116L81 122L79 122C79 119.791 77.2091 118 75 118Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M63 118C60.7909 118 59 119.791 59 122L57 122L57 116L69 116L69 122L67 122C67 119.791 65.2091 118 63 118Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M51 118C48.7909 118 47 119.791 47 122L45 122L45 116L57 116L57 122L55 122C55 119.791 53.2091 118 51 118Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M39 118C36.7909 118 35 119.791 35 122L33 122L33 116L45 116L45 122L43 122C43 119.791 41.2091 118 39 118Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M27 118C24.7909 118 23 119.791 23 122L21 122L21 116L33 116L33 122L31 122C31 119.791 29.2091 118 27 118Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M15 118C12.7909 118 11 119.791 11 122L9 122L9 116L21 116L21 122L19 122C19 119.791 17.2091 118 15 118Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 122C7 119.791 5.20914 118 3 118L3 116L9 116L9 122L7 122Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 110C7 107.791 5.20914 106 3 106L3 104L9 104L9 116L3 116L3 114C5.20914 114 7 112.209 7 110Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 98C7 95.7909 5.20914 94 3 94L3 92L9 92L9 104L3 104L3 102C5.20914 102 7 100.209 7 98Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 86C7 83.7909 5.20914 82 3 82L3 80L9 80L9 92L3 92L3 90C5.20914 90 7 88.2091 7 86Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 74C7 71.7909 5.20914 70 3 70L3 68L9 68L9 80L3 80L3 78C5.20914 78 7 76.2091 7 74Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 62C7 59.7909 5.20914 58 3 58L3 56L9 56L9 68L3 68L3 66C5.20914 66 7 64.2091 7 62Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 50C7 47.7909 5.20914 46 3 46L3 44L9 44L9 56L3 56L3 54C5.20914 54 7 52.2091 7 50Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 38C7 35.7909 5.20914 34 3 34L3 32L9 32L9 44L3 44L3 42C5.20914 42 7 40.2091 7 38Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 26C7 23.7909 5.20914 22 3 22L3 20L9 20L9 32L3 32L3 30C5.20914 30 7 28.2091 7 26Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 14C7 11.7909 5.20914 10 3 10L3 8L9 8L9 20L3 20L3 18C5.20914 18 7 16.2091 7 14Z"
						fill="white"
					/>
				</g>
				<defs>
					<filter
						id="filter0_d_13051_9213"
						x="0"
						y="0"
						width="102"
						height="126"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB"
					>
						<feFlood
							flood-opacity="0"
							result="BackgroundImageFix"
						/>
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="1" />
						<feGaussianBlur stdDeviation="1.5" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_13051_9213"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_13051_9213"
							result="shape"
						/>
					</filter>
				</defs>
			</svg>
		);
	else
		return (
			<svg
				width="114"
				height="138"
				viewBox="0 0 114 138"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g filter="url(#filter0_d_13052_9519)">
					<rect x="10" y="9" width="94" height="94" fill="white" />
					<rect
						x="10"
						y="9"
						width="94"
						height="94"
						stroke="white"
						stroke-width="2"
					/>
					<rect
						width="96"
						height="24"
						transform="translate(9 104)"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M3 6C5.20914 6 7 4.20914 7 2H9V8H3V6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M15 6C17.2091 6 19 4.20914 19 2H21V8H9V2H11C11 4.20914 12.7909 6 15 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M27 6C29.2091 6 31 4.20914 31 2H33V8H21V2H23C23 4.20914 24.7909 6 27 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M39 6C41.2091 6 43 4.20914 43 2H45V8H33V2H35C35 4.20914 36.7909 6 39 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M51 6C53.2091 6 55 4.20914 55 2H57V8H45V2H47C47 4.20914 48.7909 6 51 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M63 6C65.2091 6 67 4.20914 67 2H69V8H57V2H59C59 4.20914 60.7909 6 63 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M75 6C77.2091 6 79 4.20914 79 2H81V8H69V2H71C71 4.20914 72.7909 6 75 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M87 6C89.2091 6 91 4.20914 91 2H93V8H81V2H83C83 4.20914 84.7909 6 87 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M99 6C101.209 6 103 4.20914 103 2H105V8H93V2H95C95 4.20914 96.7909 6 99 6Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M107 2C107 4.20914 108.791 6 111 6L111 8L105 8L105 2L107 2Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M107 14C107 16.2091 108.791 18 111 18L111 20L105 20L105 8L111 8L111 10C108.791 10 107 11.7909 107 14Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M107 26C107 28.2091 108.791 30 111 30L111 32L105 32L105 20L111 20L111 22C108.791 22 107 23.7909 107 26Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M107 38C107 40.2091 108.791 42 111 42L111 44L105 44L105 32L111 32L111 34C108.791 34 107 35.7909 107 38Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M107 50C107 52.2091 108.791 54 111 54L111 56L105 56L105 44L111 44L111 46C108.791 46 107 47.7909 107 50Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M107 62C107 64.2091 108.791 66 111 66L111 68L105 68L105 56L111 56L111 58C108.791 58 107 59.7909 107 62Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M107 74C107 76.2091 108.791 78 111 78L111 80L105 80L105 68L111 68L111 70C108.791 70 107 71.7909 107 74Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M107 86C107 88.2091 108.791 90 111 90L111 92L105 92L105 80L111 80L111 82C108.791 82 107 83.7909 107 86Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M107 98C107 100.209 108.791 102 111 102L111 104L105 104L105 92L111 92L111 94C108.791 94 107 95.7909 107 98Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M107 110C107 112.209 108.791 114 111 114L111 116L105 116L105 104L111 104L111 106C108.791 106 107 107.791 107 110Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M107 122C107 124.209 108.791 126 111 126L111 128L105 128L105 116L111 116L111 118C108.791 118 107 119.791 107 122Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M111 130C108.791 130 107 131.791 107 134L105 134L105 128L111 128L111 130Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M99 130C96.7909 130 95 131.791 95 134L93 134L93 128L105 128L105 134L103 134C103 131.791 101.209 130 99 130Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M87 130C84.7909 130 83 131.791 83 134L81 134L81 128L93 128L93 134L91 134C91 131.791 89.2091 130 87 130Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M75 130C72.7909 130 71 131.791 71 134L69 134L69 128L81 128L81 134L79 134C79 131.791 77.2091 130 75 130Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M63 130C60.7909 130 59 131.791 59 134L57 134L57 128L69 128L69 134L67 134C67 131.791 65.2091 130 63 130Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M51 130C48.7909 130 47 131.791 47 134L45 134L45 128L57 128L57 134L55 134C55 131.791 53.2091 130 51 130Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M39 130C36.7909 130 35 131.791 35 134L33 134L33 128L45 128L45 134L43 134C43 131.791 41.2091 130 39 130Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M27 130C24.7909 130 23 131.791 23 134L21 134L21 128L33 128L33 134L31 134C31 131.791 29.2091 130 27 130Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M15 130C12.7909 130 11 131.791 11 134L9 134L9 128L21 128L21 134L19 134C19 131.791 17.2091 130 15 130Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 134C7 131.791 5.20914 130 3 130L3 128L9 128L9 134L7 134Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 122C7 119.791 5.20914 118 3 118L3 116L9 116L9 128L3 128L3 126C5.20914 126 7 124.209 7 122Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 110C7 107.791 5.20914 106 3 106L3 104L9 104L9 116L3 116L3 114C5.20914 114 7 112.209 7 110Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 98C7 95.7909 5.20914 94 3 94L3 92L9 92L9 104L3 104L3 102C5.20914 102 7 100.209 7 98Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 86C7 83.7909 5.20914 82 3 82L3 80L9 80L9 92L3 92L3 90C5.20914 90 7 88.2091 7 86Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 74C7 71.7909 5.20914 70 3 70L3 68L9 68L9 80L3 80L3 78C5.20914 78 7 76.2091 7 74Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 62C7 59.7909 5.20914 58 3 58L3 56L9 56L9 68L3 68L3 66C5.20914 66 7 64.2091 7 62Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 50C7 47.7909 5.20914 46 3 46L3 44L9 44L9 56L3 56L3 54C5.20914 54 7 52.2091 7 50Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 38C7 35.7909 5.20914 34 3 34L3 32L9 32L9 44L3 44L3 42C5.20914 42 7 40.2091 7 38Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 26C7 23.7909 5.20914 22 3 22L3 20L9 20L9 32L3 32L3 30C5.20914 30 7 28.2091 7 26Z"
						fill="white"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7 14C7 11.7909 5.20914 10 3 10L3 8L9 8L9 20L3 20L3 18C5.20914 18 7 16.2091 7 14Z"
						fill="white"
					/>
				</g>
				<defs>
					<filter
						id="filter0_d_13052_9519"
						x="0"
						y="0"
						width="114"
						height="138"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB"
					>
						<feFlood
							flood-opacity="0"
							result="BackgroundImageFix"
						/>
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="1" />
						<feGaussianBlur stdDeviation="1.5" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_13052_9519"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_13052_9519"
							result="shape"
						/>
					</filter>
				</defs>
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
						margin: "4px 3px 0px 9px",
						width: "100%",
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
