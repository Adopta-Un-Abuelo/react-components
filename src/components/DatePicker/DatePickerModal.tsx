import DatePicker from "react-mobile-datepicker";
import "./date-picker.css"

const DatePickerComponent = (props: DatePickerProps) => {
	const monthMap: any = {
        '1': 'Ene',
        '2': 'Feb',
        '3': 'Mar',
        '4': 'Abr',
        '5': 'May',
        '6': 'Jun',
        '7': 'Jul',
        '8': 'Ago',
        '9': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dic',
    };

	return (
		<DatePicker
			value={props.defaultValue}
			isOpen={props.isVisible}
			isPopup={true}
			theme={"default"}
			dateConfig={{
                date: {
					format: "DD",
					caption: "Día",
					step: 1,
				},
                month: {
					format: (value: any) => monthMap[value.getMonth() + 1],
					caption: "Mes",
					step: 1,
				},
				year: {
					format: "YYYY",
					caption: "Año",
					step: 1,
				},
			}}
            headerFormat={"DD/MM/YYYY"}
            showHeader={false}
            min={new Date(1900, 1, 1)}
            max={new Date()}
            confirmText={"Aceptar"}
            cancelText={"Cancelar"}
			onSelect={props.onSave}
			onCancel={props.onClose}
		/>
	);
};
export default DatePickerComponent;
export interface DatePickerProps {
	isVisible: boolean;
    defaultValue?: Date;
    onSave: (date: Date) => void
	onClose: () => void;
}
