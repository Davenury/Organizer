import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import * as React from 'react';
import {useEffect, useState} from "react";
import {colorsRepository} from "../../repository/colorRepository";

export const ColorPicker = ({ color, setColor }) => {

    const [colors, setColors] = useState([])

    useEffect(() => {
        (async () => colorsRepository.getAllColors()
            .then(data => setColors(data)))()
    }, [])

    return (<FormControl>
        <FormLabel>
            Event Color
        </FormLabel>
        <RadioGroup
            value={color}
            onChange={setColor}
        >
            <div style={{width: '100%', margin: "0 5px", display: 'flex', gap: '10px', flexDirection: 'row', overflowX: 'scroll'}}>
                {colors.map(color => (<SingleColorPick color={color.color} key={color.color} />))}
            </div>
        </RadioGroup>
    </FormControl>)
}

const SingleColorPick = ({ color }) => {

    return (
        <FormControlLabel
            value={color}
            control={<Radio style={{color: color}} size="large"/>}
            label=""
        />
    )
}