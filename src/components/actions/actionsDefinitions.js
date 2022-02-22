import Swal from 'sweetalert2'
import {eventsRepository} from "../../repository/eventRepository";

const deleteEvent = (event) => {

    const swalOptions = {
        icon: "warning",
        title: "Are you sure?",
        text: "Deleted event cannot be restored!",
        showCancelButton: true,
        showDenyButton: event?.repeatable,
        confirmButtonText: "Delete event",
        denyButtonText: event?.repeatable && "Delete event and all repeats"
    }

    Swal.fire(swalOptions).then((result) => {
        if (result.isConfirmed) {
            eventsRepository.deleteEvent(event)
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Event successfully deleted"
                    })
                })
        } else if (result.isDenied) {
            eventsRepository.deleteEventAndAllOccurrences(event)
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Event successfully deleted"
                    })
                })
        }
    })
}

const addEvent = (slotInfo) => {
    //swal with adding form
}

export const actionsDefinitions = {
    addEvent,
    deleteEvent
}