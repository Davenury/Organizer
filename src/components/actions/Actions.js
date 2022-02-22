import {useMediaQuery} from "@mui/material";
import {FullWidthActions} from "./FullWidthActions";
import {PhoneActions} from "./PhoneActions";

export const Actions = () => {

    const matches = useMediaQuery('(min-width:700px)');


    return matches ? <FullWidthActions /> : <PhoneActions />
}