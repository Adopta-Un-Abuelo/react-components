import { useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import moment from 'moment';

import Color from '../../constants/Color';
import Text from '../Text/Text';
import CheckboxList from '../Checkbox/CheckboxList';
import Button from '../Button/Button';
import SearchBar from '../SearchBar/SearchBar';
import { ChevronDown } from 'lucide-react';
import FilterDate from './FilterDate';

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
	border: ${props => props.disabled ? '0px solid' : (props.selected ? '2px solid '+Color.text.full : '1px solid '+ Color.line.soft)};
	background-color: ${props => props.disabled ? Color.status.neutral.hover : 'transparent'};
	cursor: ${props => props.disabled ? 'default' : 'pointer'};
	:hover{
		background-color: ${props => props.disabled ? Color.status.neutral.hover : Color.background.low};
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

const Filter = (props: Props) =>{

    const [ showView, setShowView ] = useState(false);
    const [ selectedOptions, setSelectedOptions ] = useState<any>([]);
    const [ options, setOptions ] = useState(props.options ? props.options : []);
    const [ fuse, setFuse ] = useState<any>(undefined);

    useEffect(() =>{
        if(props.options){
            //Init fuse.js search
            setFuse(new Fuse(props.options, {
                keys: ['label', 'id']
            }))
            setOptions(props.options);
        }
    },[props.options]);

    useEffect(() =>{
        if(props.selectedOptions)
            setSelectedOptions(props.selectedOptions);
    },[props.selectedOptions]);

    useEffect(() =>{
        //On click outside the filter view
        document.addEventListener('mousedown', (e: any) => {
            const element = document.getElementById(props.id);
            if(element !== null){
                if(!element.contains(e.target)){
                    setShowView(false);
                }
            }
        });
        return document.removeEventListener('mousedown', onFilterClick);
    }, []);

    const onOptionChange = (selection: Array<any>) =>{
        //Search if, in current options, is this selection
        const temp = options;
        options.map((item, index) =>{
            const some = selection.some(e => item.id === e.id);
            if(some)
                temp[index].defaultSelection = true;
            else
                temp[index].defaultSelection = false;
            return item;
        })
        setOptions(temp);
    }

    const onSave = () =>{
        setShowView(false);
        //Get the selected options
        if(props.options){
            const temp = props.options.filter(item => item.defaultSelection);
            setSelectedOptions(temp);
            setOptions(props.options);
            props.onChange && props.onChange(temp);
        }
    }

    const onRemove = () =>{
        //Remove all selections
        if(props.options){
            const temp = props.options;
            props.options.map((item, index) =>{
                temp[index].defaultSelection = false;
                return item;
            })
            setOptions(temp);
            setSelectedOptions([]);
        }
    }

    const onSelectAll = () =>{
        if(props.options){
            const temp = props.options;
            props.options.map((item, index) =>{
                temp[index].defaultSelection = true;
                return item;
            })
            setOptions(temp);
            setSelectedOptions(temp);
        }
    }

    const onFilterClick = (e: any) =>{
        e.stopPropagation();
        if(showView){
            if(props.options){
                const temp = props.options;
                props.options.map((item, index) =>{
                    const some = selectedOptions.some((e: any) => item.id === e.id);
                    if(some)
                        temp[index].defaultSelection = true;
                    else
                        temp[index].defaultSelection = false;
                    return item;
                })
                setOptions(temp);
            }
            setShowView(false);
        }
        else
            setShowView(true);
    }

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) =>{
        const searchText = e.target.value;
        if(searchText){
            const result = fuse.search(searchText);
            const temp = result.map((obj: any) => obj.item);
            setOptions(temp);
        }
        else
            if(props.options)
                setOptions(props.options);
    }

    return(props.design === 'date' ? 
        <FilterDate
            {...props}
        /> 
    : props.options && props.options.length > 0 ?
        <Container
            id={props.id}
            data-testid="filter"
            style={props.style}
        >
            <ButtonFilter
                selected={(selectedOptions.length > 0) ? true : false}
                disabled={props.disabled}
                onClick={onFilterClick}
            >
                <Text type='p' style={{color: props.disabled ? Color.text.low : selectedOptions.length > 0 ? Color.text.full : Color.text.high, fontSize: 14, marginRight: 4}}>
                    {props.label}
                </Text>
                {selectedOptions.length > 0 ?
                    <BadgeView>
                        <Text type='p' style={{color: 'white', fontSize: 12, fontWeight: 600}}>
                            {selectedOptions.length}
                        </Text>
                    </BadgeView>
                :
                    <ChevronDown height={18} width={18} color={props.disabled ? Color.text.low : Color.text.high}/>
                }
            </ButtonFilter>
            {showView &&
                <FilterView position={props.position}>
                    {!props.hideSearchBar &&
                        <SearchBar
                            style={{borderBottom: '1px solid '+Color.line.soft}}
                            placeholder={'Buscar'}
                            design={'secondary'}
                            onChange={onSearchChange}
                        />
                    }
                    <ContentView>
                        <CheckboxList
                            style={{paddingTop: 16}}
                            options={options}
                            selectedOptions={selectedOptions}
                            selection={props.design === 'multiple' ? 'multiple' : 'single'}
                            height={18}
                            width={18}
                            onChange={onOptionChange}
                        />
                    </ContentView>
                    <BottomBar>
                        {props.design === 'multiple' &&
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
                            onClick={onSave}
                        >
                            Aplicar
                        </Button>
                    </BottomBar>
                </FilterView>
            }
        </Container>
    : null)
}
export default Filter;
export interface Props{
    id: string,
    label: string,
    disabled?: boolean,
    design?: 'single' | 'multiple' | 'date',
    position?: 'bottom-right' | 'bottom-left',
    options?: Array<{
        id: string,
        label: string,
        sublabel?: string,
        defaultSelection?: boolean
    }>
    selectedOptions?: {
        startDate: moment.Moment,
        endDate: moment.Moment
    } | Array<{
        id: string
    }>
    hideSearchBar?: boolean,
    style?: any,
    onChange?: (r: any) => void
}