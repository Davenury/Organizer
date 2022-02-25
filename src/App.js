import './App.css';
import React, {useState} from 'react'
import {Calendar} from "./components/calendar/Calendar"

export const ReloadContext = React.createContext({
    reload: false,
    reloadFunction: () => {}
})

function App() {

    // As Swal can be not directly under this component, it may not have context - maybe it's time to use Redux?
    const [reload, setReload] = useState(false)

    return (
        <ReloadContext.Provider value={{reload: reload, reloadFunction: () => setReload(reload => !reload)}}>
            <div className="App">
                <Calendar/>
            </div>
        </ReloadContext.Provider>
    );
}

export default App;
