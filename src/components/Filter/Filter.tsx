import FilterDefault, { FilterDefaultProps } from './FilterDefault';
import FilterDate, { FilterDateProps } from './FilterDate';
import FilterRatio, { FilterRatioProps } from './FilterRatio';


const Filter = (props: FilterDefaultProps | FilterDateProps | FilterRatioProps) =>{

    return((props.type === 'date') ? 
        <FilterDate
            {...props}
        />
    : props.type === 'ratio' ?
        <FilterRatio
            {...props}
        />
    :
        <FilterDefault
            {...props}
        />
    )
}
export default Filter;