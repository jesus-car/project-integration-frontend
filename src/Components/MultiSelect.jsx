import { Select } from "@mui/material"
import { useState } from "react"
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import { features } from "../utils/fakeData";
import "../styles/multiSelect.css"
import { GetIcon } from "./ListFeature";

const MultiSelect = (props) => {
    const [currentfeatures, setfeatures] = useState([]);

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setfeatures(value);
        props.onChange(value)
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
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} icon={GetIcon(value.icon)}>
                </Chip>
              ))}
            </Box>
          )}
        >
          {features.map((feature) => (
            <MenuItem
              key={feature.id}
              value={feature}              
            >
              {GetIcon(feature.icon)}
              {feature.name}
            </MenuItem>
          ))}
        </Select>
    </div>
  
  )
}

export default MultiSelect;