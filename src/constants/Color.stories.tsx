import Color from "./Color";
import Text from "../components/Text/Text";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;
const ColorContainer = styled.div`
  display: flex;
  height: 100px;
  width: 100px;
  align-items: flex-end;
  padding: 8px;
  border-radius: 12px;
`;

export default {
  title: "Design System/Color",
  component: Color,
  tags: ["autodocs"],
};

export const Background = (args: any) => {
  const keys = Object.keys(Color.background);
  const values = Object.values(Color.background);
  return (
    <div>
      <Text type="h5" style={{ marginBottom: 12 }}>
        Background
      </Text>
      <Row>
        {values.map((color, index) => (
          <ColorContainer key={index} style={{ backgroundColor: color }}>
            <Text type="p2">{keys[index]}</Text>
          </ColorContainer>
        ))}
      </Row>
    </div>
  );
};

export const Line = (args: any) => {
  const keys = Object.keys(Color.line);
  const values = Object.values(Color.line);
  return (
    <div>
      <Text type="h5" style={{ marginBottom: 12 }}>
        Line
      </Text>
      <Row>
        {values.map((color, index) => (
          <ColorContainer key={index} style={{ backgroundColor: color }}>
            <Text type="p2">{keys[index]}</Text>
          </ColorContainer>
        ))}
      </Row>
    </div>
  );
};

export const text = (args: any) => {
  const keys = Object.keys(Color.text);
  const values = Object.values(Color.text);
  return (
    <div>
      <Text type="h5" style={{ marginBottom: 12 }}>
        Text
      </Text>
      <Row>
        {values.map((color, index) => (
          <ColorContainer key={index} style={{ backgroundColor: color }}>
            <Text type="p2">{keys[index]}</Text>
          </ColorContainer>
        ))}
      </Row>
    </div>
  );
};

export const StatusPrimary = (args: any) => {
  const keys = Object.keys(Color.status.primary);
  const values = Object.values(Color.status.primary);
  return (
    <div>
      <Text type="h5" style={{ marginBottom: 12 }}>
        Status primary
      </Text>
      <Row>
        {values.map((color, index) => (
          <ColorContainer key={index} style={{ backgroundColor: color }}>
            <Text type="p2">{keys[index]}</Text>
          </ColorContainer>
        ))}
      </Row>
    </div>
  );
};

export const StatusSecondary = (args: any) => {
  const keys = Object.keys(Color.status.secondary);
  const values = Object.values(Color.status.secondary);
  return (
    <div>
      <Text type="h5" style={{ marginBottom: 12 }}>
        Status secondary
      </Text>
      <Row>
        {values.map((color, index) => (
          <ColorContainer key={index} style={{ backgroundColor: color }}>
            <Text type="p2">{keys[index]}</Text>
          </ColorContainer>
        ))}
      </Row>
    </div>
  );
};

export const StatusNeutral = (args: any) => {
  const keys = Object.keys(Color.status.neutral);
  const values = Object.values(Color.status.neutral);
  return (
    <div>
      <Text type="h5" style={{ marginBottom: 12 }}>
        Status neutral
      </Text>
      <Row>
        {values.map((color, index) => (
          <ColorContainer key={index} style={{ backgroundColor: color }}>
            <Text type="p2">{keys[index]}</Text>
          </ColorContainer>
        ))}
      </Row>
    </div>
  );
};

export const StatusColor = (args: any) => {
  const keys = Object.keys(Color.status.color);
  const values = Object.values(Color.status.color);
  return (
    <div>
      <Text type="h5" style={{ marginBottom: 12 }}>
        Status color
      </Text>
      <Row>
        {values.map((color, index) => (
          <ColorContainer key={index} style={{ backgroundColor: color }}>
            <Text type="p2">{keys[index]}</Text>
          </ColorContainer>
        ))}
      </Row>
    </div>
  );
};
