import { CSSProperties, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import Text from "../Text/Text";
import Color from "../../constants/Color";

const Container = styled.div`
  display: flex;
  flex: 1;
  
  flex-wrap: wrap;
  justify-content: space-around;
`;
const CellContainer = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100px;
  padding: 0px;
  align-items: center;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;
const Cell = styled.div<{ selected: boolean; disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 8px;
  border-radius: 12px;
  height: 72px;
  gap: 8px;
    margin: 4px;
  min-width: 95px;
  box-shadow: 0 0 0
    ${(props) =>
      props.selected ? "2px " + Color.line.primary : "2px " + Color.line.white};
  background-color: ${(props) =>
    props.disabled
      ? Color.line.soft
      : props.selected
        ? "white"
        : "white"};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  transition:
    transform 0.05s ease-out,
    background-color 0.1s ease-out;
  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? Color.line.soft
        : props.selected
          ? Color.background.primaryLow
          : Color.line.soft};
  }
  &:active {
    transform: ${(props) => (props.disabled ? "none" : "scale(0.95)")};
    transition: background-color 1.2s ease-out;
  }
`;
const TextView = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 4px;
`;

const CellSelector = (props: Props) => {
  const [selectedOptions, setSelectedOptions] = useState(
    props.selectedOptions ? props.selectedOptions : []
  );

  useEffect(() => {
    setSelectedOptions(props.selectedOptions ? props.selectedOptions : []);
  }, [props.selectedOptions]);

  const onClick = (item: OptionProps) => {
    if (props.type === "multiple") {
      const result = selectedOptions.findIndex((e) => e.id === item.id);
      const tempArray = [...selectedOptions];
      if (result === -1) {
        //add object
        tempArray.push(item);
      } else {
        //delete object
        tempArray.splice(result, 1);
      }
      setSelectedOptions(tempArray);
      props.onClick && props.onClick(item);
      props.onChange && props.onChange(tempArray);
    } else {
      setSelectedOptions([item]);
      props.onClick && props.onClick(item);
      props.onChange && props.onChange([item]);
    }
  };

  return (
    <Container style={props.style} role={"container"}>
      {props.options.map((item, index) => {
        const isSelected = selectedOptions
          ? selectedOptions.some((e: OptionProps) => item.id === e.id)
          : false;
        return (
          <CellContainer
            role={"cell" + index}
            key={"cell" + index}
            onClick={() => {
              if (!item.disabled) onClick(item);
            }}
            disabled={item.disabled}
          >
            <Cell
              selected={isSelected}
              style={props.cellStyle}
              disabled={item.disabled}
            >
              {item.icon}
              <Text
                type="p2"
                weight="medium"
                style={{
                    color: "var(--text-clear-neutral-hard, rgba(0, 29, 61, 0.92)",
                    fontFeatureSettings: "'liga' off, 'clig' off",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "22px",
                    textAlign: "center",
                }}
              >
                {item.title}
              </Text>
            </Cell>
            <TextView>
              {item.subtitle && (
                <Text
                  type="p"
                  style={{ fontSize: 14, marginTop: 2, textAlign: "center" }}
                >
                  {item.subtitle}
                </Text>
              )}
            </TextView>
          </CellContainer>
        );
      })}
    </Container>
  );
};
export default CellSelector;
export interface Props {
  style?: CSSProperties;
  cellStyle?: CSSProperties;
  options: Array<OptionProps>;
  selectedOptions?: Array<OptionProps>;
  type?: "single" | "multiple";
  onChange?: (array: Array<OptionProps>) => void;
  onClick?: (item: OptionProps) => void;
}
export interface OptionProps {
  id: string;
  title: string;
  subtitle?: string;
  icon?: ReactElement;
  disabled?: boolean;
}
