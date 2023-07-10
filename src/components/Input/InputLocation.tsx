import { useState } from 'react';
import styled from 'styled-components';
import PlacesAutocomplete, { Suggestion, geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import InputSecondary, { InputSecondaryProps } from './InputSecondary';
import Color from '../../constants/Color';
import Text from '../Text/Text';

const SearchView = styled.div`
    position: relative;
    display: flex;
    flex: 1;
`
const DropdownMenu = styled.div`
    position: absolute;
    z-index: 1000;
    width: 100%;
    background-color: white;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
    top: 64px;
    border: 1px solid ${Color.line.soft};
`
const SuggestionView = styled.div<{selected: boolean}>`
    display: flex;
    flex: 1;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    background-color: ${props => props.selected ? Color.background.soft : 'white'};
    &:hover{
        background-color: ${Color.background.soft};
    }
`

const InputLocation = (props: InputLocationProps) =>{

    const [ searchText, setSearchText ] = useState<string | undefined>(undefined);
    const [ pointerPosition, setPointerPosition ] = useState<number | undefined>(undefined);

    const onLocationChange = (address: string) => {
        setSearchText(address);
    }

    const handleSelect = async (address: string) => {
        setSearchText(address);
        const result = await geocodeByAddress(address);
        const latLng = await getLatLng(result[0]);
        props.onLocationChange && props.onLocationChange({
            address: address,
            geocoder: result[0],
            location: latLng
        })
    }

    const onKeyDown = (e: any, suggestions: Readonly<Array<Suggestion>>) =>{
        if(suggestions && suggestions.length > 0){
            if (e.key === 'Enter') {
                const index = pointerPosition ? pointerPosition : 0;
                handleSelect(suggestions[index].description);
            }
            else if(e.key === 'ArrowDown'){
                if(pointerPosition === undefined){
                    setPointerPosition(0);
                }
                else if(pointerPosition < suggestions.length-1){
                    setPointerPosition(pointerPosition+1);
                }
            }
            else if(e.key === 'ArrowUp'){
                if(pointerPosition === undefined){
                    setPointerPosition(0);
                }
                else if(pointerPosition > 0){
                    setPointerPosition(pointerPosition-1);
                }
            }
        }
    }

    return(
        <PlacesAutocomplete 
            value={searchText}
            onChange={onLocationChange}
            onSelect={handleSelect}
            searchOptions={{
                types: ['address']
            }}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <SearchView>
                    <InputSecondary
                        {...getInputProps({
                            className: 'location-search-input',
                            placeholder: props.placeholder
                        })}
                        containerStyle={{flex: 1}}
                        value={searchText}
                        onKeyDown={(e: any) => onKeyDown(e, suggestions)}
                    />
                    {suggestions.length > 0 &&
                        <DropdownMenu
                            role="menu"
                        >
                            {suggestions.map((suggestion, index) => {
                                return (
                                    <SuggestionView
                                        {...getSuggestionItemProps(suggestion)}
                                        role={"cell"+index}
                                        selected={pointerPosition === index}
                                    >
                                        <Text type='p2' style={{textOverflow: 'ellipsis'}}>{suggestion.description}</Text>
                                    </SuggestionView>
                                )
                            })}
                        </DropdownMenu>
                    }
                </SearchView>
            )}
        </PlacesAutocomplete>
    )
}
export default InputLocation;
export interface InputLocationProps extends InputSecondaryProps{
    onLocationChange?: (result: {
        address: string,
        geocoder: google.maps.GeocoderResult,
        location: google.maps.LatLngLiteral
    }) => void
}