import {useMediaQuery} from "@mui/material";
import {FullWidthCalendar} from "./FullWidthCalendar";
import {PhoneCalendar} from "./PhoneCalendar";
import {momentLocalizer} from "react-big-calendar";
import moment from "moment";
import {CustomEvent} from "./CustomEvent";
import {actionsDefinitions} from "../actions/actionsDefinitions";
import {useEffect, useState} from "react";
import {eventsRepository} from "../../repository/eventRepository";

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

export const Calendar = () => {

    const [events, setEvents] = useState([])

    // Probably good use case for Redux?
    useEffect(() => {
        eventsRepository.getAllEvents()
            .then(events => setEvents(events))
    }, [])

    const minTime = new Date()
    minTime.setHours(4, 0, 0)
    const maxTime = new Date()
    maxTime.setHours(23, 0, 0)

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
        actionsDefinitions.updateEvent(info.event)
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
        eventPropGetter: eventStyleGetter,
        min: minTime,
        max: maxTime
    }

    return matches ? <FullWidthCalendar commonCalendarProps={commonCalendarProps} /> :
        <PhoneCalendar commonCalendarProps={commonCalendarProps} />
}