import {Calendar as BigCalendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';


export const FullWidthCalendar = ({ commonCalendarProps }) => {

    return (<div style={{ height: '80vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
        <BigCalendar
            defaultView="week"
            {...commonCalendarProps}
        />
    </div>)

}