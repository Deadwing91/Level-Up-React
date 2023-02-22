import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGame, getGameTypes, updateGame } from '../../managers/GameManager.js'


export const UpdateGameForm = () => {
    const navigate = useNavigate()
    const { gameId } = useParams() //useParams() is a hook that allows components to access URL parameters from the current route.
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        name: "",
        designer: "",
        description: "",
        number_of_players: 0,
        skill_level: "",
        gametype: 0 // set new property to store pk integer from gameType object returned from database
    })

    useEffect(() => {
        getGameTypes().then(res => setGameTypes(res))
            getGame(gameId).then(res => {
            // get response from server then set value of key gameTypeId to pk int of game_type object
            setCurrentGame(res) 
        })
    }, 
    [gameId])

    const changeGameState = (Event) => {
        // TODO: Complete the onChange function
        const copy = {...currentGame}
        copy[Event.target.name] = Event.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Game Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="text" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label className="label">Game Type:</label>
                    <select required autoFocus className="gameTypeList" value={currentGame.gametype} onChange={(evt) => {const copy = {...currentGame}
                    copy.gametype = parseInt(evt.target.value)
                    setCurrentGame(copy)}}
                    >
                        {gameTypes.map(gametype => (<option
                                    name={gametype.label}
                                    className="form-control"
                                    value={gametype.id}
                                    key={`gametype--${gametype.id}`}
                                >{gametype.label}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        name: currentGame.name,
                        designer: currentGame.designer,
                        description: currentGame.description,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: currentGame.skill_level,
                        // gametype: parseInt(currentGame.gametype)

                    }

                    if (currentGame.gametype.id) {
                        game.gametype = currentGame.gametype.id 
    
                    } else {
                        game.gametype = parseInt(currentGame.gametype)
                    }

                    // Send POST request to your API
                    updateGame(gameId, game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}