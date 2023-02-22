import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getEvents, deleteEvent, joinEvent, leaveEvent } from "../../managers/EventManager"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const [ refresh, setRefresh ] = useState(true)
    const navigate = useNavigate()

    const getAllEvents = () => {
        getEvents().then(data => setEvents(data))
    }

    useEffect(() => {
        getAllEvents()
    }, [refresh])

    const handleDelete = (id) => {
        deleteEvent(id).then(() => {
            setRefresh()
            }) 
    }

    const handleJoin = (id) => {
        joinEvent(id).then(() => {
            {getAllEvents()}
            }) 
    }

    const handleLeave = (id) => {
        leaveEvent(id).then(() => {
            {getAllEvents()}
            }) 
    }

    return (
        <article className="events">
            <button className="btn btn-2 icon-create"
                onClick={() => {
                    navigate({ pathname: "new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">Event: {event.name}</div>
                        <div className="event__date">Date: {event.date}</div>
                        <div className="event__location">Location: {event.location}</div>
                        {/* <div className="event__host">Organized By: {event.organizer}</div> */}
                        {
                        event.joined ?
                        // TODO: create the Leave button
                        <button onClick={ () => { handleLeave(event.id) } }>Leave Event</button>
                        :
                        // TODO: create the Join button
                        <button onClick={ () => { handleJoin(event.id) } }>Join Event</button>
                        }
                        <div className="event__footer">
                        </div>
                        <button><Link to={`/events/edit/${event.id}`}>Edit Event</Link></button>
                        <button className="event"
            onClick={() => {
                handleDelete(event.id)
            }}>Delete Event</button>
                    </section>
                })
            }
            
        </article>
    )
}