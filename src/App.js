import './App.css';
import {Actions} from "./components/actions/Actions";
import {Calendar} from "./components/calendar/Calendar"
import {useEffect, useState} from 'react'
import {eventsRepository} from './repository/eventRepository'

function App() {

    const [events, setEvents] = useState([])

    useEffect(() => {
        eventsRepository.getAllEvents()
            .then(events => setEvents(events))
    }, [])

  return (
    <div className="App">
        <Actions />
      <Calendar events={events} />
    </div>
  );
}

export default App;
