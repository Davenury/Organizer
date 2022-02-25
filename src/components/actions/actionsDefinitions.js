import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {UpdateEvent} from "./UpdateEvent";

const EnhancedSwal = withReactContent(Swal)

const addEvent = (info) => {

    const cron = `${info.start.getMinutes()} ${info.start.getHours()} * * ${info.start.getDay()}`

    const event = { start: info.start, end: info.end, cron: cron }

    EnhancedSwal.fire({
        html: <UpdateEvent event={event} />,
        showConfirmButton: false
    })
}

const updateEvent = (event) => {
    EnhancedSwal.fire({
        html: <UpdateEvent event={event} />,
        showConfirmButton: false
    })
}

export const actionsDefinitions = {
    addEvent,
    updateEvent
}