import type { Meta, StoryObj } from "@storybook/react";
import Chat from "./Chat";
import { userEvent, within, expect } from "@storybook/test";

const meta: Meta<typeof Chat> = {
	title: "Components/Chat",
	component: Chat,
	tags: ["autodocs"],
	args: {
		messages: [
			{
				key: "1-sender",
				User: {
					name: "Pepe",
				},
				text: "Sender message",
				type: "sender",
				state: "delivered",
				createdAt: new Date("2024-12-18 22:22"),
			},
			{
				key: "1-recipient",
				User: {
					name: "Pepa",
				},
				text: "Recipient message",
				type: "recipient",
				state: "failed",
				createdAt: new Date("2024-12-18 22:23"),
			},
			{
				key: "2-recipient",
				User: {
					name: "Pepa",
				},
				text: "Recipient message 2",
				type: "recipient",
				state: "read",
				createdAt: new Date("2024-12-18 22:24"),
			},
			{
				key: "2-sender",
				User: {
					name: "Pepe",
				},
				text: "Sender message",
				type: "sender",
				state: "sent",
				createdAt: new Date("2024-12-18 22:25"),
			},
			{
				key: "3-sender",
				User: {
					name: "Pepe",
				},
				text: "Sender message más largo donde debería aparecer un salto de linea",
				type: "sender",
				state: "undelivered",
				createdAt: new Date("2024-12-18 22:26"),
			},
			{
				key: "4-sender",
				User: {
					name: "Pepe",
				},
				text: "Sender message más largo donde debería",
				type: "sender",
				state: "read",
				createdAt: new Date("2024-12-18 22:27"),
			},
			{
				key: "4-sender",
				User: {
					name: "Pepe",
				},
				text: "Sender message más largo donde debería aparecer un salto de linea",
				type: "sender",
				state: "read",
				createdAt: new Date("2024-12-18 22:28"),
			},
		],
	},
};

export default meta;
type Story = StoryObj<typeof Chat>;

export const Default: Story = {
	play: async ({ canvasElement, step }: any) => {
		const canvas = within(canvasElement);
		const container = await canvas.getByRole("container");
		const cell = await canvas.getByRole("cell2");
		await step("render", async () => {
			expect(container).toBeInTheDocument();
			expect(cell).toBeInTheDocument();
		});
		await step("click", async () => {
			userEvent.click(cell);
		});
	},
};
