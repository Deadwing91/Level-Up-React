import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent } from "../../managers/EventManager"
import { getGames } from "../../managers/GameManager"

export const EventForm = () => {
    const navigate = useNavigate()
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
        game: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGames().then(res => setGames(res))
    }, [])

    const changeEventState = (event) => {
        const copy = { ...currentEvent }
        copy[event.target.name] = event.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name of Event:</label>
                    <input type="text" name="name" required className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label className="label">Event Game: </label>
                <select
                        name="game"
                        className="form-control"
                        value={currentEvent.game}
                        onChange={(event) => {
                            const copy = { ...currentEvent }
                            copy.game = parseInt(event.target.value)
                            setCurrentEvent(copy)
                        }}>
                        <option value="0">Choose:</option>
                        {games.map(game => ( 
                                    <option key={`game--${game.id}`} value={game.id} name={game.name}>{game.name}</option>                         
                            ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location of Event:</label>
                    <input type="text" name="location" required className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of Event:</label>
                    <input type="dateTime-local" name="date" required className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="start_time">Time of Event:</label>
                    <input type="time" name="start_time" required className="form-control"
                        value={currentEvent.start_time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>  */}
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        name: currentEvent.name,
                        date: currentEvent.date,
                        location: currentEvent.location,
                        game: parseInt(currentEvent.game)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}