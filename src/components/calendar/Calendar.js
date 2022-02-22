import {useMediaQuery} from "@mui/material";
import {FullWidthCalendar} from "./FullWidthCalendar";
import {PhoneCalendar} from "./PhoneCalendar";
import {momentLocalizer} from "react-big-calendar";
import moment from "moment";
import {CustomEvent} from "./CustomEvent";
import {actionsDefinitions} from "../actions/actionsDefinitions";

const localizer = momentLocalizer(moment)

const eventStyleGetter = (event) => {
    return {
        style: {
            backgroundColor: event.event.color,
            borderRadius: '5px',
            opacity: 0.9,
            color: 'black',
            border: '0px'
        }
    }
}

export const Calendar = ({events}) => {

    const matches = useMediaQuery('(min-width:700px)');

    const mapEvents = () => events?.map(event => ({
        title: event?.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
        event: event
    })) ?? []

    const onSelectSlot = (info) => {
        actionsDefinitions.addEvent(info)
    }

    const onDoubleClick = (info) => {
        actionsDefinitions.deleteEvent(info.event)
    }

    const components = {
        event: CustomEvent
    }

    const commonCalendarProps = {
        onSelectSlot,
        onDoubleClickEvent: onDoubleClick,
        components,
        startAccessor: "start",
        endAccessor: "end",
        selectable: true,
        events: mapEvents(),
        localizer,
        eventPropGetter: eventStyleGetter
    }

    return matches ? <FullWidthCalendar commonCalendarProps={commonCalendarProps} /> :
        <PhoneCalendar commonCalendarProps={commonCalendarProps} />
}