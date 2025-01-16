import React, { useState } from "react";
import ModalComponent from "../Modal/Modal";
import styled from "styled-components";
import Text from "../Text/Text";
import { ColorV2 } from "../../constants";

const Cell = styled.div<{ $isSelected?: boolean }>`
	position: relative;
	padding: 8px 12px;
	margin-bottom: 2px;
	border-radius: 12px;
	cursor: pointer;
	background-color: ${(props) =>
		props.$isSelected ? ColorV2.surface.neutralSoft : "transparent"};
	&:hover {
		background-color: ${ColorV2.surface.neutralSoft};
	}
`;

const TemplateModal: React.FC<TemplateModalProps> = (props) => {
	const [selectedOption, setSelectedOption] = useState<string | undefined>(
		undefined
	);

	return (
		<ModalComponent
			isVisible={props.isVisible}
			title={"Enviar plantilla"}
			subtitle={
				"Envía un mensaje predeterminado de WhatsApp para iniciar o retomar una conversación."
			}
			buttonProps={{
				children: "Enviar",
				disabled: !selectedOption,
				onClick: () => {
					props.onSend({ template: selectedOption });
					props.onClose();
				},
			}}
			contentStyle={{ paddingBottom: 24 }}
			onClose={props.onClose}
		>
			{props.templates.map((template) => {
				const isSelected = selectedOption === template.id;
				return (
					<Cell
						title={template.description}
						$isSelected={isSelected}
						onClick={() => setSelectedOption(template.id)}
					>
						<Text type="p">{template.title}</Text>
						<Text
							type="p2"
							style={{ color: ColorV2.text.neutralMedium }}
						>
							{template.subtitle}
						</Text>
					</Cell>
				);
			})}
		</ModalComponent>
	);
};

export default TemplateModal;
interface TemplateModalProps {
	isVisible: boolean;
	templates: {
		id: string;
		title: string;
		subtitle: string;
		description: string;
	}[];
	onSend: (data: { template?: string }) => void;
	onClose: () => void;
}
