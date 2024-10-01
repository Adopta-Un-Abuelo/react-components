import React from "react";
import styled from "styled-components";
import Color from "../../constants/Color";
import Text from "../Text/Text";

const StyledTableWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  @media (min-width: 768px) {
    max-width: 800px;
    margin: 0 auto;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTr = styled.tr`
  height: 48px;
  padding: 8px 0px;
  align-items: center;
  &:hover {
    background: #f5f5f5;
  }
`;

const StyledTd = styled.td<{ $flexSize?: number }>`
  flex: ${({ $flexSize }) => $flexSize || 1};
  display: flex;
`;

const ScrollableTBody = styled.tbody`
  overflow-y: auto;
  max-height: 400px;
`;

const NoResultsMessage = styled.div`
  padding: 8px;
  text-align: center;
  color: gray;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  width: 100%;
  border-bottom: 1px solid lightgray;
`;

const StyledText = styled(Text).attrs(() => ({
  type: "p2",
  weight: "regular",
}))`
  color: ${Color.text.primaryBlack};
  text-overflow: ellipsis;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

// Función para calcular la edad a partir de la fecha de nacimiento
const calculateAge = (dateString: string): string => {
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Ajuste si no ha cumplido años aún en este año
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return `${age} años`;
};

// Tipado para las columnas de la tabla
type TableColumn = {
  key: string;
};

// Tipado para las props del componente StandardTable
interface StandardTableProps {
  columns: TableColumn[];
  data: any[];
  onRowClick: (rowData: any) => void;
  noResultsMessage?: string;
}

// Componente de tabla estándar que permite recibir columnas y datos dinámicos
const StandardTable: React.FC<StandardTableProps> = ({
  columns,
  data,
  onRowClick,
  noResultsMessage = "No hay resultados",
}) => {
  return (
    <StyledTableWrapper>
      <StyledTable>
        {data.length === 0 ? (
          <NoResultsMessage>{noResultsMessage}</NoResultsMessage>
        ) : (
          <ScrollableTBody>
            {data.map((item, index) => (
              <StyledTr key={index} onClick={() => onRowClick(item)}>
                <StyledTd>
                  <ContentContainer>
                    <StyledText type="p2">{item[columns[0].key]}</StyledText>
                    <StyledText type="p2">
                      {calculateAge(item[columns[1].key])}
                    </StyledText>
                  </ContentContainer>
                </StyledTd>
              </StyledTr>
            ))}
          </ScrollableTBody>
        )}
      </StyledTable>
    </StyledTableWrapper>
  );
};

export default StandardTable;
