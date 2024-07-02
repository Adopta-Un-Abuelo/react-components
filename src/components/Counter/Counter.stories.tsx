import Counter from "./Counter";
import { Color } from "../../constants";

export default {
  title: "Components/Counter",
  component: Counter,
  tags: ["autodocs"],
  args: {
    amount: 217,
  },
};

export const Default = {
  args: {
    amount: 217,
    backgroundColor: Color.background.primary,
    color: "white",
    fontSize: 40,
    height: 50,
    width: 30,
  },
  play: async ({ canvasElement }: any) => {
    /*const canvas = within(canvasElement);
		const label = await canvas.getByRole('dropdown');
        expect(label).toBeInTheDocument();*/
  },
};
