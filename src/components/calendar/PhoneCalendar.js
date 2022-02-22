import {Calendar as BigCalendar} from "react-big-calendar";

export const PhoneCalendar = ({ commonCalendarProps }) => {

    return (<div style={{ height: '80vh', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
        <BigCalendar
            defaultView="day"
            views={['day', 'agenda']}
            {...commonCalendarProps}
        />
    </div>)
}