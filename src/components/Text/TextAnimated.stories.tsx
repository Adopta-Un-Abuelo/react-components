import TextAnimated from "./Animated";

export default {
	title: "Design System/TextAnimated",
	component: TextAnimated,
	tags: ["autodocs"],
};

export const Animated = (args: any) => {
	return (
		<div>
			<TextAnimated
				type="h4"
				weight="semibold"
				options={["en pareja", "en familia", "solo", "con amigos"]}
                interval={2500}
			>
				{"Escribe una carta {{data}}"}
			</TextAnimated>
		</div>
	);
};
