import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getGames, deleteGame } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ refresh, setRefresh ] = useState(true)
    const [ games, setGames ] = useState([
            {id: 0,
            name: "",
            description: "",
            gametype: {},
            number_of_players: 0,
            skill_level: 0,
            gamer: {}
            }
    ])

    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [refresh])

    const handleDelete = (id) => {
        deleteGame(id).then(() => {
            setRefresh()
            }) 
    }

    return (<>

        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
        navigate({ pathname: "/games/new" })
        }}
        >Register New Game
        </button>
        
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.name} by {game.designer}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <div className="game__description">Description: {game.description}</div>
                        <div className="game__gametype">Game Type: {game.gametype.label}</div>
                        <button><Link to={`/games/edit/${game.id}`}>Edit Game</Link></button>
                        <button className="game__gametype"
            onClick={() => {
                handleDelete(game.id)
            }}>Delete Game</button>
                    </section>
                })
            }
        </article>
        </>)
}