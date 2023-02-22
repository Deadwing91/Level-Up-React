import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: "",
        number_of_players: 1,
        name: "",
        designer: "",
        description: "",
        gametype: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then(res => setGameTypes(res))
    }, [])

    const changeGameState = (event) => {
        // TODO: Complete the onChange function
        const copy = { ...currentGame }
        copy[event.target.name] = event.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
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
                <label className="label">Type of Game: </label>
                <select
                        name="gametype"
                        className="form-control"
                        value={currentGame.gametype}
                        onChange={(event) => {
                            const copy = { ...currentGame }
                            copy.gametype = parseInt(event.target.value)
                            setCurrentGame(copy)
                        }}>
                        <option value="0">Choose Game Type:</option>
                        {gameTypes.map(gametype => ( 
                                    <option key={`gametype--${gametype.id}`} value={gametype.id} name={gametype.label}>{gametype.label}</option>                         
                            ))}
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    //variable name matches server(django)
                    const game = {
                        name: currentGame.name,
                        designer: currentGame.designer,
                        description: currentGame.description,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: currentGame.skill_level,
                        game_type: parseInt(currentGame.gametype)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}