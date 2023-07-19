import { useEffect, useState, ChangeEvent, CSSProperties, useRef } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';

import Color from '../../constants/Color';
import Text from '../Text/Text';
import Checkbox from '../Checkbox/CheckboxList';
import Button from '../Button/Button';
import SearchBar from '../SearchBar/SearchBar';
import { ChevronDown } from 'lucide-react';

const Container = styled.div`
    position: relative;
    width: fit-content;
`
const ButtonFilter = styled.button<{selected: boolean}>`
    position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 32px;
	padding: 0px 12px;
	border-radius: 20px;
	border: ${props => props.disabled ? '0px solid' : (props.selected ? '0px solid' : '1px solid '+ Color.line.soft)};
	background-color: ${props => props.disabled ? Color.status.neutral.hover : (props.selected ? Color.background.deepBlue : 'transparent')};
	cursor: ${props => props.disabled ? 'default' : 'pointer'};
	&:hover{
		background-color: ${props => props.disabled ? Color.status.neutral.hover : (props.selected ? Color.background.deepBlue : Color.background.low)};
	}
`
const FilterView = styled.div<{position?: 'bottom-right' | 'bottom-left'}>`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 36px;
    right: ${props => props.position === 'bottom-right' ? undefined : 0};
    left: ${props => props.position === 'bottom-left' ? undefined : 0};
    padding: 8px 16px;
    border-radius: 6px;
    height: 278px;
    width: 320px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
`
const ContentView = styled.div`
    display: flex;
    flex: 1;
    overflow-y: auto;
`
const BottomBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 8px;
    border-top: 1px solid ${Color.line.soft};
    margin-top: 8px;
`
const BadgeView = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    height: 18px;
    width: 18px;
    background-color: ${Color.background.full};
`

const Filter = (props: FilterDefaultProps) =>{

    const [ showView, _setShowView ] = useState(false);
    const [ selectedOptions, _setSelectedOptions ] = useState<Array<{id: string}>>([]);
    const [ options, setOptions ] = useState(props.options);
    const [ fuse, setFuse ] = useState<any>(undefined);
    const [ searchText, setSearchText ] = useState<string | undefined>(undefined);

    const selectedOptionsRef = useRef(selectedOptions);
    const setSelectedOptions = (data: Array<{id: string}>) => {
        selectedOptionsRef.current = data;
        _setSelectedOptions(data);
    };

    const showViewRef = useRef(showView);
    const setShowView = (data: boolean) => {
        showViewRef.current = data;
        _setShowView(data);
    };

    useEffect(() =>{
        //Init fuse.js search
        setFuse(new Fuse(props.options, {
            keys: ['label', 'id']
        }))
        setOptions(props.options);
    },[props.options]);

    useEffect(() =>{
        setSelectedOptions(props.selectedOptions ? props.selectedOptions : []);
    },[props.selectedOptions]);

    useEffect(() =>{
        //On click outside the filter view
        document.addEventListener('mousedown', (e: any) => {
            const element = document.getElementById(props.id);
            if(element !== null){
                if(!element.contains(e.target) && showViewRef.current === true){
                    //onSave(selectedOptionsRef.current);
                    setShowView(false);
                }
            }
        });
        return document.removeEventListener('mousedown', onFilterClick);
    }, []);

    const onOptionChange = (selection: Array<{id: string}>) =>{
        const temp = [...selection]
        setSelectedOptions(temp);
    }

    const onSave = (selection: Array<{id: string}>) =>{
        setShowView(false);
        props.onChange && props.onChange(selection);
    }

    const onRemove = () =>{
        setSelectedOptions([]);
    }

    const onSelectAll = () =>{
        setSelectedOptions(props.options);
    }

    const onFilterClick = (e: any) =>{
        e.stopPropagation();
        if(showView){
            onSave(selectedOptions);
        }
        else{
            setShowView(true);
        }
    }

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) =>{
        const searchText = e.target.value;
        setSearchText(searchText);
        if(searchText){
            const result = fuse.search(searchText);
            const temp = result.map((obj: any) => obj.item);
            setOptions(temp);
        }
        else{
            setOptions(props.options);
        }
    }

    return(
        <Container
            id={props.id}
            role="filter"
            style={props.style}
        >
            <ButtonFilter
                role="filter-button"
                selected={(selectedOptions.length > 0) ? true : false}
                disabled={props.disabled}
                onClick={onFilterClick}
            >
                <Text type='p' style={{color: props.disabled ? Color.text.low : selectedOptions.length > 0 ? 'white' : Color.text.high, fontSize: 14, marginRight: 4}}>
                    {props.label}
                </Text>
                <ChevronDown height={18} width={18} color={props.disabled ? Color.text.low : (selectedOptions.length > 0 ? 'white' : Color.text.high)}/>
            </ButtonFilter>
            {showView &&
                <FilterView
                    role="filter-menu"
                    position={props.position}
                >
                    {!props.hideSearchBar &&
                        <SearchBar
                            defaultValue={searchText}
                            style={{borderBottom: '1px solid '+Color.line.soft}}
                            placeholder={'Buscar'}
                            design={'secondary'}
                            onChange={onSearchChange}
                        />
                    }
                    <ContentView>
                        <Checkbox
                            style={{paddingTop: 16}}
                            options={options}
                            selectedOptions={selectedOptions}
                            type={props.type === 'multiple' ? 'multiple' : 'single'}
                            height={18}
                            width={18}
                            onChange={onOptionChange}
                        />
                    </ContentView>
                    <BottomBar>
                        {props.type === 'multiple' &&
                            <Button
                                design={'text'}
                                size={'small'}
                                style={{marginRight: 4}}
                                onClick={onSelectAll}
                            >
                                Seleccionar todo
                            </Button>
                        }
                        <Button
                            design={'text'}
                            size={'small'}
                            style={{marginRight: 4}}
                            onClick={onRemove}
                        >
                            Borrar
                        </Button>
                        <Button
                            design={'primary'}
                            size={'small'}
                            onClick={() => onSave(selectedOptions)}
                        >
                            Aplicar
                        </Button>
                    </BottomBar>
                </FilterView>
            }
        </Container>
    )
}
export default Filter;
export interface FilterDefaultProps{
    id: string,
    label: string,
    disabled?: boolean,
    type: 'single' | 'multiple',
    position?: 'bottom-right' | 'bottom-left'
    options: Array<{
        id: string,
        label: string,
        sublabel?: string
    }>
    selectedOptions?: Array<{
        id: string
    }>
    hideSearchBar?: boolean,
    style?: CSSProperties,
    onChange?: (r: Array<{id: string}>) => void
}