import React, { useState, useEffect, ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";

import AnimationCheck from "../../assets/animations/button-check.json";
import Text from "../Text/Text";
import { Color } from "../../constants";

const Container = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  padding: 0px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1.0)};
  width: 100%;
`;

const Box = styled.div<{
  selected: boolean;
  error?: boolean;
  height?: number;
  width?: number;
  position: "left" | "right";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.height ? props.height + "px" : "22px")};
  width: ${(props) => (props.width ? props.width + "px" : "22px")};
  min-height: ${(props) => (props.height ? props.height + "px" : "22px")};
  min-width: ${(props) => (props.width ? props.width + "px" : "22px")};
  background-color: ${(props) =>
    props.selected
      ? props.error
        ? Color.status.color.error
        : Color.background.primary
      : props.error
        ? Color.status.color.errorDefault
        : Color.background.primaryLow};
  border: ${(props) =>
    props.selected
      ? "1px solid " +
        (props.error ? Color.status.color.error : Color.background.primary)
      : "1px solid " +
        (props.error ? Color.line.redSoft : Color.line.primarySoft)};
  border-radius: 4px;
  transition:
    background-color 0.2s ease-in-out,
    border 0.2s ease-in-out,
    transform 0.05s ease-out;
  margin-right: ${(props) =>
    props.position === "left"
      ? "10px"
      : "0px"}; /* Agrega un margen a la derecha cuando la posición es 'left' */
  &:hover {
    background-color: ${(props) =>
      props.selected
        ? props.error
          ? Color.status.color.error
          : Color.background.primary
        : props.error
          ? Color.status.color.errorDefault
          : Color.line.primarySoft};
  }
  &:active {
    transform: scale(0.9);
  }
`;

const TextView = styled.div`
  flex-grow: 1;
  text-align: left;
`;

const Checkbox = (props: Props) => {
  const [selected, setSelected] = useState(props.selected);

  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelected(!selected);
    props.onClick && props.onClick(event);
  };

  return (
    <Container data-testid="checkbox" onClick={onClick} {...props}>
      {props.position === "left" && (
        <Box
          selected={selected}
          error={props.error}
          height={props.height}
          width={props.width}
          position={props.position}
        >
          {selected && (
            <Player
              style={{ height: 18, width: 18 }}
              autoplay={true}
              loop={false}
              keepLastFrame={true}
              src={AnimationCheck}
              onEvent={(event) => {
                if (event === "complete") {
                }
              }}
            />
          )}
        </Box>
      )}
      <TextView>
        {props.children && props.children}
        {props.label && <Text type="p">{props.label}</Text>}
        {props.sublabel && (
          <Text type="p" style={{ fontSize: 12 }}>
            {props.sublabel}
          </Text>
        )}
      </TextView>
      {props.position === "right" && (
        <Box
          selected={selected}
          error={props.error}
          height={props.height}
          width={props.width}
          position={props.position}
        >
          {selected && (
            <Player
              style={{ height: 18, width: 18 }}
              autoplay={true}
              loop={false}
              keepLastFrame={true}
              src={AnimationCheck}
              onEvent={(event) => {
                if (event === "complete") {
                }
              }}
            />
          )}
        </Box>
      )}
    </Container>
  );
};

Checkbox.defaultProps = {
  position: "left",
};

export default Checkbox;

export interface Props extends ComponentPropsWithoutRef<"button"> {
  selected: boolean;
  label?: string;
  sublabel?: string;
  error?: boolean;
  height?: number;
  width?: number;
  position?: "left" | "right";
}
