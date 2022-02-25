import {useContext, useState} from "react";
import {
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    FormGroup,
    IconButton,
    TextField,
    Tooltip
} from "@mui/material";
import {ColorPicker} from "./ColorPicker";
import {DateTimePicker} from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import HelpIcon from '@mui/icons-material/Help';
import {isValidCron} from 'cron-validator'
import Swal from "sweetalert2";
import {eventsRepository} from "../../repository/eventRepository";
import {ReloadContext} from "../../App";

export const UpdateEvent = ({event: baseEvent}) => {

    const [event, setEvent] = useState(baseEvent)

    const { reloadFunction } = useContext(ReloadContext)

    const onChangeTitle = ({target}) => {
        setEvent({...event, title: target.value})
    }

    const onChangeType = ({target}) => {
        setEvent({...event, type: target.value})
    }

    const setColor = ({target}) => {
        setEvent({...event, color: target.value})
    }

    const toggleAllDay = ({target}) => {
        setEvent({...event, allDay: target.checked})
    }

    const toggleRepeatable = ({target}) => {
        setEvent({...event, repeatable: target.checked})
    }

    const setStartDate = (value) => {
        setEvent({...event, start: value._d})
    }

    const setEndDate = (value) => {
        setEvent({...event, end: value._d})
    }

    const setCron = (value) => {
        setEvent({...event, cron: value})
    }

    const getButton = () => {
        if (event.id) {
            return getUpdateAndDeleteButtons()
        } else {
            return getAddButton()
        }
    }

    const getUpdateAndDeleteButtons = () => (
        <div style={{display: 'flex', flexDirection: 'row-reverse', gap: '1em', justifyContent: 'space-around'}}>
            <Button onClick={updateEvent} color="primary" variant="contained">
                Update Event!
            </Button>
            <Button onClick={deleteEvent} color="warning" variant="contained">
                Delete Event!
            </Button>
        </div>
    )

    const getAddButton = () => (
        <Button onClick={addEvent} color="primary" variant="contained">
            Add Event!
        </Button>
    )

    const addEvent = () => {
        if (!event.repeatable) {
            delete event.cron
        }
        Swal.showLoading()
        eventsRepository.addEvent(event)
            .then(() => Swal.fire({
                icon: 'success',
                text: 'Great success!'
            }).then(() => reloadFunction()))
            .catch(err => Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: err
            }).then(() => reloadFunction()))
    }

    const updateEvent = () => {
        if (!event.repeatable) {
            delete event.cron
        }
        Swal.showLoading()
        eventsRepository.updateEvent(event)
            .then(() => Swal.fire({
                icon: 'success',
                text: 'Great success!'
            }).then(() => reloadFunction()))
            .catch(err => Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: err
            }).then(() => reloadFunction()))
    }

    const deleteEvent = () => {
        Swal.showLoading()
        eventsRepository.deleteEvent(event)
            .then(() => Swal.fire({
                icon: 'success',
                text: 'Event deleted!'
            }).then(() => reloadFunction()))
            .catch(err => Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: err
            }).then(() => reloadFunction()))
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'space-between', gap: '2em'}}>
            <Card style={{padding: '1em'}}>
                <CardContent
                    style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1em'}}>
                    <TextField
                        label="Title"
                        fullWidth
                        onChange={onChangeTitle}
                        value={event?.title}
                    />
                    <TextField
                        label="Type"
                        fullWidth
                        onChange={onChangeType}
                        value={event?.type}
                    />
                    <ColorPicker
                        color={event?.color}
                        setColor={setColor}
                    />
                    <FormGroup style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <FormControlLabel control={<Checkbox checked={event?.allDay ?? false} onChange={toggleAllDay}/>}
                                          label="All Day"/>
                        <FormControlLabel
                            control={<Checkbox checked={event?.repeatable ?? false} onChange={toggleRepeatable}/>}
                            label="Repeatable"/>
                    </FormGroup>

                    {!event?.allDay && <DatePickers event={event} setStart={setStartDate} setEnd={setEndDate}/>}

                    {!!event?.repeatable && <CronPicker cron={event?.cron ?? ''} setCron={setCron}/>}
                </CardContent>
            </Card>
            {getButton()}
        </div>
    )
}

const DatePickers = ({event, setStart, setEnd}) => {

    return (
        <div style={{display: 'flex', flexDirection: "column", gap: "1em"}}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Date"
                    value={event?.start ?? new Date()}
                    onChange={setStart}
                />
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date"
                    value={event?.end ?? new Date()}
                    onChange={setEnd}
                />
            </LocalizationProvider>
        </div>
    )
}

const CronPicker = ({cron: outerCron, setCron: outerSetCron}) => {

    const [error, setError] = useState(false)

    const setCron = ({target}) => {
        const cron = target.value
        if (!isValidCron(cron)) {
            setError(true)
        } else {
            setError(false)
        }
        outerSetCron(cron)
    }

    const getCronHref = () =>
        outerCron.split(" ").join("_")


    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextField
                value={outerCron}
                onChange={setCron}
                label="Set cron for repeating"
                style={{width: '80%'}}
                error={error}
            />
            <Tooltip title="Help with cron?">
                <IconButton onClick={() => window.open("https://crontab.guru/#" + getCronHref(), "_blank")}>
                    <HelpIcon/>
                </IconButton>
            </Tooltip>
        </div>
    )
}