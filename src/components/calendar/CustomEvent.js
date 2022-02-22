import {Typography} from "@mui/material";

export const CustomEvent = ({event, title}) => {

    return <div style={{backgroundColor: event.event.color, display: "flex", justifyContent: "center", padding: "5px"}}>
        <Typography variant="body2">{title}</Typography>
    </div>

}