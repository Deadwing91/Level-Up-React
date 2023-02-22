import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { getEvent, updateEvent } from '../../managers/EventManager.js'


export const UpdateEventForm = () => {
    const navigate = useNavigate()
    const { eventId } = useParams()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        name: "",
        date: "",
        location: "",
        game: {},
        gameId: 0,
    })

    useEffect(() => {
        getGames().then(res => setGames(res))
        getEvent(eventId).then(res => {
            // get response from server then set value of key gameTypeId to pk int of game_type object
            setCurrentEvent(res)
        })
    }, 
    [eventId])

    const changeEventState = (Event) => {
        // TODO: Complete the onChange function
        const copy = {...currentEvent}
        copy[Event.target.name] = Event.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Update Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Event Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Event Date: </label>
                    <input type="dateTime-local" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Event Location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label className="label">Game:</label>
                    <select required autoFocus className="gameList" value={currentEvent.gameId} onChange={(evt) => {const copy = {...currentEvent}
                    copy.gameId = parseInt(evt.target.value)
                    setCurrentEvent(copy)}}
                    >
                        {games.map(game => (<option
                                    name={game.name}
                                    className="form-control"
                                    value={game.id}
                                    key={`game--${game.id}`}
                                >{game.name}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        name: currentEvent.name,
                        date: currentEvent.date,
                        location: currentEvent.location,
                        game: currentEvent.game
                    }

                    // Send POST request to your API
                    updateEvent(eventId, event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}