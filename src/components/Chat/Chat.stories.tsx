import type { Meta, StoryObj } from "@storybook/react";
import Chat from "./Chat";
import { userEvent, within, expect, fn } from "@storybook/test";

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
				createdAt: new Date("2024-12-20 22:26"),
			},
			{
				key: "4-sender",
				User: {
					name: "Pepe",
				},
				media: [
					{
						category: "media",
						filename: null,
						size: 965,
						content_type: "image/png",
						sid: "ME82c979932cf8bc1f36dece00b9c3f83f",
						url: "https://raw.githubusercontent.com/test-images/png/refs/heads/main/202105/cs-black-000.png",
					},
				],
				text: "Sender message más largo donde debería",
				type: "sender",
				state: "read",
				createdAt: new Date("2024-12-20 22:27"),
			},
			{
				key: "5-sender",
				User: {
					name: "Pepe",
				},
				text: "Sender message más largo donde debería aparecer un salto de linea",
				type: "sender",
				state: "read",
				createdAt: new Date(),
			},
		],
		templates: [
			{
				id: "welcome",
				title: "Bienvenida",
				subtitle: "Mensaje de bienvenida para nuevos voluntarios",
				description: "¡Hola! ¿Cómo estás?",
			},
			{
				id: "missing_call_sales",
				title: "Llamada perdida ventas",
				subtitle: "Mensaje para aviso de llamada realizada",
				description: "¡Hola! ¿Cómo estás?",
			},
			{
				id: "match_offline",
				title: "Nuevo match offline",
				subtitle: "Mensaje para aviso de nuevo match visitas",
				description: "¡Hola! ¿Cómo estás?",
			},
			{
				id: "match_online",
				title: "Nuevo match online",
				subtitle: "Mensaje para aviso de nuevo match llamadas",
				description:
					"*TENEMOS A TU NUEVO ABUELO/A* 😍\n\nHola {{1}}, accede a la app para conocerle y llama a la residencia para concertar la primera visita. Ten un poco de paciencia y si no te cogen el teléfono intenta llamar en varias ocasiones.\n\nTe lo explicamos todo en este vídeo en 1 minuto ✅\n\nAprovechamos para darte las gracias por tu compromiso y por la paciencia. Este número es únicamente para envío de mensajes automáticos. Si tienes cualquier consulta puedes escribirnos al {{2}}. ¡Estaremos encantados de ayudarte!\n\n🔔 Recuerda activar las notificaciones push para estar al tanto de todo!",
			},
		],
		onSend: fn(),
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

export const WithTemplates: Story = {
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
				media: [
					{
						category: "media",
						filename: null,
						size: 965,
						content_type: "image/png",
						sid: "ME82c979932cf8bc1f36dece00b9c3f83f",
						url: "https://raw.githubusercontent.com/test-images/png/refs/heads/main/202105/cs-black-000.png",
					},
				],
				text: "Sender message más largo donde debería aparecer un salto de linea",
				type: "sender",
				state: "undelivered",
				createdAt: new Date("2024-12-20 22:26"),
			},
			{
				key: "4-sender",
				User: {
					name: "Pepe",
				},
				text: "Sender message más largo donde debería",
				type: "sender",
				state: "read",
				createdAt: new Date("2024-12-20 22:27"),
			},
		],
	},
};
