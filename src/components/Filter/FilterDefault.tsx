import { useEffect, useState, ChangeEvent, CSSProperties, useRef } from "react";
import styled from "styled-components";
import Fuse from "fuse.js";
import Modal from "../Modal/Modal";
import Color from "../../constants/Color";
import Text from "../Text/Text";
import Checkbox from "../Checkbox/CheckboxList";
import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";
import { ChevronDown } from "lucide-react";

const Container = styled.div`
  position: relative;
  width: fit-content;
`;

const ButtonFilter = styled.button<{ selected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
  padding: 0px 12px;
  border-radius: 20px;
  border: ${(props) =>
    props.disabled
      ? "0px solid"
      : props.selected
        ? "0px solid"
        : "1px solid " + Color.line.soft};
  background-color: ${(props) =>
    props.disabled
      ? Color.status.neutral.hover
      : props.selected
        ? Color.background.deepBlue
        : "transparent"};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? Color.status.neutral.hover
        : props.selected
          ? Color.background.deepBlue
          : Color.background.low};
  }
`;

const FilterView = styled.div<{ position?: "bottom-right" | "bottom-left" }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 36px;
  right: ${(props) => (props.position === "bottom-right" ? undefined : 0)};
  left: ${(props) => (props.position === "bottom-left" ? undefined : 0)};
  padding: 8px 16px;
  border-radius: 6px;
  height: 278px;
  width: 320px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentView = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
`;

const BottomBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  border-top: 1px solid ${Color.line.soft};
  margin-top: 8px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ModalWrapper = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;

const ButtonFilterSmallScreen = styled(ButtonFilter)`
  @media (min-width: 769px) {
    display: none;
  }
`;

const ButtonFilterLargeScreen = styled(ButtonFilter)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Filter = (props: FilterDefaultProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showFilterView, setShowFilterView] = useState(false);
  const [selectedOptions, _setSelectedOptions] = useState<
    Array<{ id: string; label: string }>
  >([]);
  const [temporarySelectedOptions, setTemporarySelectedOptions] = useState<
    Array<{ id: string; label: string }>
  >([]);
  const [options, setOptions] = useState(props.options);
  const [fuse, setFuse] = useState<any>(undefined);
  const [searchText, setSearchText] = useState<string | undefined>(undefined);

  const selectedOptionsRef = useRef(selectedOptions);
  const setSelectedOptions = (data: Array<{ id: string; label: string }>) => {
    selectedOptionsRef.current = data;
    _setSelectedOptions(data);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowModal(false);
      setShowFilterView(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Init fuse.js search
    setFuse(
      new Fuse(props.options, {
        keys: ["label", "id"],
      })
    );
    setOptions(props.options);
  }, [props.options]);

  useEffect(() => {
    setSelectedOptions(props.selectedOptions ? props.selectedOptions : []);
  }, [props.selectedOptions]);

  const onOptionChange = (selection: Array<{ id: string }>) => {
    const formattedSelection = selection.map((item) => ({
      id: item.id,
      label: findLabelById(item.id),
    }));

    setTemporarySelectedOptions(formattedSelection);
  };

  const findLabelById = (id: string): string => {
    const option = options.find((option) => option.id === id);
    return option ? option.label : "";
  };

  const onSave = () => {
    setSelectedOptions(temporarySelectedOptions);
    setShowModal(false);
    setShowFilterView(false);
    props.onChange && props.onChange(temporarySelectedOptions);
  };

  const onRemove = () => {
    setTemporarySelectedOptions([]);
    setSelectedOptions([]);
    props.onChange && props.onChange([]);
  };

  const onSelectAll = () => {
    setTemporarySelectedOptions(options);
    setSelectedOptions(options);
  };

  const onFilterClickSmallScreen = () => {
    setTemporarySelectedOptions(selectedOptions);
    setShowModal(true);
    setShowFilterView(false);
  };

  const onFilterClickLargeScreen = () => {
    setShowFilterView(true);
    setShowModal(false);
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (searchText) {
      const result = fuse.search(searchText);
      const temp = result.map((obj: any) => obj.item);
      setOptions(temp);
    } else {
      setOptions(props.options);
    }
  };

  const getFilterLabel = () => {
    if (props.type === "single" && selectedOptions.length === 1) {
      return selectedOptions[0].label;
    }
    if (props.type === "multiple" && selectedOptions.length > 0) {
      return `${selectedOptions.length} seleccionados`;
    }
    return props.label;
  };

  const renderBottomBar = () => (
    <BottomBar>
      {props.type === "multiple" && (
        <Button
          design={"text"}
          size={"small"}
          style={{ marginRight: 4 }}
          onClick={onSelectAll}
        >
          Seleccionar todo
        </Button>
      )}
      <Text
        type="b1"
        weight="medium"
        style={{
          color: "var(--text-clear-neutral-hard, rgba(0, 29, 61, 0.92)",
          fontFeatureSettings: "'liga' off, 'clig' off",
          fontFamily: "Poppins",
          fontSize: "15px",
          fontStyle: "normal",
          fontWeight: 500,
          cursor: "pointer",
          textDecoration: "underline",
          lineHeight: "22px",
        }}
        onClick={onRemove}
      >
        Restaurar
      </Text>
      <Button design={"primary"} size={"small"} onClick={onSave}>
        Aplicar
      </Button>
    </BottomBar>
  );

  return (
    <Container id={props.id} role="filter" style={props.style}>
      {/* Botón para pantallas pequeñas que abre el modal */}
      <ButtonFilterSmallScreen
        role="filter-button"
        selected={selectedOptions.length > 0}
        disabled={props.disabled}
        onClick={onFilterClickSmallScreen}
      >
        <Text
          type="p"
          style={{
            color: props.disabled
              ? Color.text.low
              : selectedOptions.length > 0
                ? "white"
                : Color.text.high,
            fontSize: 14,
            marginRight: 4,
          }}
        >
          {getFilterLabel()}
        </Text>
        <ChevronDown
          height={18}
          width={18}
          color={
            props.disabled
              ? Color.text.low
              : selectedOptions.length > 0
                ? "white"
                : Color.text.high
          }
        />
      </ButtonFilterSmallScreen>

      {/* Botón para pantallas grandes que abre el FilterView */}
      <ButtonFilterLargeScreen
        role="filter-button"
        selected={selectedOptions.length > 0}
        disabled={props.disabled}
        onClick={onFilterClickLargeScreen}
      >
        <Text
          type="p"
          style={{
            color: props.disabled
              ? Color.text.low
              : selectedOptions.length > 0
                ? "white"
                : Color.text.high,
            fontSize: 14,
            marginRight: 4,
          }}
        >
          {getFilterLabel()}
        </Text>
        <ChevronDown
          height={18}
          width={18}
          color={
            props.disabled
              ? Color.text.low
              : selectedOptions.length > 0
                ? "white"
                : Color.text.high
          }
        />
      </ButtonFilterLargeScreen>

      {/* Mostrar Modal solo en pantallas pequeñas */}
      {showModal && (
        <ModalWrapper>
          <Modal
            type="full-screen"
            isVisible={showModal}
            onClose={() => {
              setShowModal(false);
            }}
            hideClose={true}
          >
            <HeaderContainer>
              <SearchBar
                defaultValue={searchText}
                style={{ width: "100%", marginTop: "4px" }}
                placeholder={"Buscar"}
                design={"primary"}
                onChange={onSearchChange}
              />
              <Text
                type="h3"
                weight="semibold"
                style={{
                  color: "var(--text-clear-neutral-hard, rgba(0, 29, 61, 0.92)",
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  fontFamily: "Poppins",
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "22px",
                  marginLeft: "8px",
                }}
                onClick={() => {
                  setShowModal(false);
                  setTemporarySelectedOptions(selectedOptions);
                }}
              >
                Cancelar
              </Text>
            </HeaderContainer>

            <ContentView>
              <Checkbox
                style={{ paddingTop: 16, width: "100%" }}
                options={options}
                selectedOptions={temporarySelectedOptions}
                type={props.type === "multiple" ? "multiple" : "single"}
                height={18}
                position="right"
                width={18}
                onChange={onOptionChange}
              />
            </ContentView>

            {temporarySelectedOptions.length > 0 && renderBottomBar()}
          </Modal>
        </ModalWrapper>
      )}

      {showFilterView && (
        <FilterView role="filter-menu" position={props.position}>
          {!props.hideSearchBar && (
            <SearchBar
              defaultValue={searchText}
              style={{ borderBottom: "1px solid " + Color.line.soft }}
              placeholder={"Buscar"}
              design={"secondary"}
              onChange={onSearchChange}
            />
          )}
          <ContentView>
            <Checkbox
              style={{ paddingTop: 16 }}
              options={options}
              selectedOptions={selectedOptions}
              type={props.type === "multiple" ? "multiple" : "single"}
              height={18}
              width={18}
              onChange={onOptionChange}
            />
          </ContentView>
          {renderBottomBar()}
        </FilterView>
      )}
    </Container>
  );
};

export default Filter;

export interface FilterDefaultProps {
  id: string;
  label: string;
  disabled?: boolean;
  type: "single" | "multiple";
  position?: "bottom-right" | "bottom-left";
  options: Array<{
    id: string;
    label: string;
    sublabel?: string;
  }>;
  selectedOptions?: Array<{
    id: string;
    label: string;
  }>;
  hideSearchBar?: boolean;
  style?: CSSProperties;
  onChange?: (r: Array<{ id: string; label: string }>) => void;
}
