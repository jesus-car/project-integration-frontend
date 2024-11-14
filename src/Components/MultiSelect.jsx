import { Select } from "@mui/material"
import { useEffect, useState } from "react"
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import "../styles/multiSelect.css"
import { GetIcon } from "./ListFeature";

const MultiSelect = (props) => {
    const [currentfeatures, setfeatures] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
      setfeatures(props.value.map((x) => x.id));
      setOptions(props.featureList)
    }, [props.featureList, props.value])


    const handleChange = (event) => {
        const {
          target: { value },
        } = event;

        const newSelectedOptions = options.filter(option => value.includes(option.id));        
        setfeatures(value);
        props.onChange(newSelectedOptions)
    };
 
    
  return (
    <div className="w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Seleccione Caracteristicas *
        </label>
        <Select
          className="w-full overflow-hidden"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={currentfeatures} 
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', gap: 0.5, overflowX: "auto", scrollbarWidth: "none"}}>
              {selected.map((value) => {
                const option = options.find((opt) => opt.id === value);
                return (
                  <Chip key={value.id} label={option.name} icon={GetIcon(option.iconName)}>
                  </Chip>
                )
              })}
            </Box>
          )}
        >
          {options.map((feature) => (
            <MenuItem
              key={feature.id}
              value={feature.id}              
            >
              {GetIcon(feature.iconName)}
              {feature.name}
            </MenuItem>
          ))}
        </Select>
    </div>
  
  )
}

export default MultiSelect;