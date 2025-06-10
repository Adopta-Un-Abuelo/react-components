import { useState } from "react";
import Modal from "./Modal";
import Text from "../Text/Text";
import Input from "../Input/Basic/Input";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { action } from "storybook/actions";
import { userEvent, within, expect } from "storybook/test";

const meta: Meta<typeof Modal> = {
	title: "Components/Modal",
	component: Modal,
	tags: ["autodocs"],
	args: {
		isVisible: false,
		title: "Title",
		subtitle: "Subtitle",
		hideHeader: false,
		hideClose: false,
		buttonProps: {
			children: "Save",
			disabled: false,
			loading: false,
		},
		onClose: action("onClose"),
	},
	argTypes: {
		isVisible: {
			control: "boolean",
			description: "boolean",
			table: {
				defaultValue: { summary: "false" },
			},
		},
		onClose: {
			action: "onClose",
			description: "() => void",
		},
		title: {
			description: "string",
			control: "text",
		},
		subtitle: {
			description: "string",
			control: "text",
		},
		error: {
			description: "string",
			control: "text",
		},
		type: {
			description: "default | full-screen | web | form | lateral",
			control: "select",
			options: ["default", "full-screen", "web", "form ", "lateral"],
			table: {
				defaultValue: { summary: "default" },
			},
		},
		hideHeader: {
			description: "boolean",
			control: "boolean",
			table: {
				defaultValue: { summary: "false" },
			},
		},
		hideClose: {
			description: "boolean",
			control: "boolean",
			table: {
				defaultValue: { summary: "false" },
			},
		},
		buttonProps: {
			description: "ButtonProps",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
	args: {},
	render: (args) => {
		const [isVisible, setIsVisible] = useState(false);
		return (
			<div>
				<button role="button" onClick={() => setIsVisible(true)}>
					Show modal
				</button>
				<Modal
					{...args}
					isVisible={isVisible}
					onClose={() => {
						setIsVisible(false);
						action("onClose")();
					}}
				>
					<Text type="p">Modal children</Text>
				</Modal>
			</div>
		);
	},
};

export const FullScreen: Story = {
	args: {
		type: "full-screen",
	},
	render: (args) => {
		const [isVisible, setIsVisible] = useState(false);
		return (
			<div>
				<button role="button" onClick={() => setIsVisible(true)}>
					Show modal
				</button>
				<Modal
					{...args}
					isVisible={isVisible}
					onClose={() => {
						setIsVisible(false);
						action("onClose")();
					}}
				>
					<Text type="p">Modal children</Text>
				</Modal>
			</div>
		);
	},
};

export const Lateral: Story = {
	args: {
		type: "lateral",
	},
	render: (args) => {
		const [isVisible, setIsVisible] = useState(false);
		return (
			<div>
				<button role="button" onClick={() => setIsVisible(true)}>
					Show modal
				</button>
				<Modal
					{...args}
					isVisible={isVisible}
					onClose={() => {
						setIsVisible(false);
						action("onClose")();
					}}
				>
					<Text type="p">Modal children</Text>
				</Modal>
			</div>
		);
	},
};

export const Form: Story = {
	args: {
		type: "form",
		options: [
			{
				id: "input1",
				title: "Input 1",
			},
		],
	},
	render: (args) => {
		const [isVisible, setIsVisible] = useState(false);
		return (
			<div>
				<button role="button" onClick={() => setIsVisible(true)}>
					Show modal
				</button>
				<Modal
					{...args}
					isVisible={isVisible}
					onClose={() => {
						setIsVisible(false);
						action("onClose")();
					}}
				/>
			</div>
		);
	},
};

export const Web: Story = {
	args: {
		type: "web",
		url: "https://adoptaunabuelo.org",
	},
	render: (args) => {
		const [isVisible, setIsVisible] = useState(false);
		return (
			<div>
				<button role="button" onClick={() => setIsVisible(true)}>
					Show modal
				</button>
				<Modal
					{...args}
					isVisible={isVisible}
					onClose={() => {
						setIsVisible(false);
						action("onClose")();
					}}
				/>
			</div>
		);
	},
};
