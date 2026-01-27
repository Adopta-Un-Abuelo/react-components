import { useState, useEffect, useRef, useMemo, Fragment } from "react";
import styles from "./styles.module.css";

import FlipClockDigit from "./CounterDigit";

function Counter(props: Props) {
	const [counter, setCounter] = useState(
		props.amount > 0 ? props.amount - 10 : 0
	);
	const counterRef = useRef(counter);
	counterRef.current = counter;
	const countdownRef = useRef(0);

	useEffect(() => {
		clearTimer();
		setCounter(
			props.amount > 0
				? props.amount - (props.amount >= 10 ? 10 : props.amount)
				: 0
		);
		countdownRef.current = window.setInterval(tick, 400);
		return () => clearTimer();
	}, [props.amount]);

	function clearTimer() {
		window.clearInterval(countdownRef.current);
	}

	function tick() {
		setCounter(counterRef.current + 1);
		if (counterRef.current + 1 >= props.amount) {
			clearTimer();
		}
	}

	function parseAmount(amount: number) {
		const length = props.amount.toString().length;
		const currentSplit = amount.toString().split("");
		const nextSplit = (amount + 1).toString().split("");
		const auxSplit = [];

		for (var i = 0; i < length; i++) {
			if (length - currentSplit.length - i === 0) {
				break;
			} else {
				auxSplit.push("0");
			}
		}
		return {
			current: currentSplit,
			next: nextSplit,
		};
	}

	const sections = useMemo(() => {
		const formatted = parseAmount(counter);
		return [formatted];
	}, [counter]);

	const containerStyle = useMemo(() => {
		const t: Record<string, string | number | false | undefined> = {
			"--fcc-digit-color": props.color,
			"--fcc-background": props.backgroundColor,
			"--fcc-digit-block-width": props.width && props.width + "px",
			"--fcc-digit-block-height": props.height && props.height + "px",
			"--fcc-digit-font-size": props.fontSize && props.fontSize + "px",
			"--fcc-divider-color": props.borderColor,
		};
		return t;
	}, [props]);

	return (
		<div
			className={styles.fcc__container}
			data-testid="fcc-container"
			style={containerStyle}
		>
			{sections.map((item, idx) => {
				return (
					<Fragment key={`digit-block-${idx}`}>
						<div className={styles.fcc__digit_block_container}>
							{item.current.map((cItem, cIdx) => (
								<FlipClockDigit
									key={cIdx}
									current={item.current[cIdx]}
									next={item.next[cIdx]}
								/>
							))}
						</div>
					</Fragment>
				);
			})}
		</div>
	);
}

export default Counter;
/**
 * Animated flip-clock style counter that animates from zero to the target amount.
 * Each digit flips individually with a smooth animation effect.
 *
 * @example
 * ```tsx
 * <Counter
 *   amount={12345}
 *   height={60}
 *   width={40}
 *   fontSize={32}
 * />
 * ```
 */
export interface Props {
	/** Height in pixels for each digit block */
	height: number;
	/** Width in pixels for each digit block */
	width: number;
	/** Target number to count up to (animates from amount-10 or 0) */
	amount: number;
	/** Text color for the digits */
	color?: string;
	/** Background color for each digit block */
	backgroundColor?: string;
	/** Border/divider color between digit segments */
	borderColor?: string;
	/** Font size in pixels for the numbers */
	fontSize?: number;
}
