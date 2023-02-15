export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            //This Autherization header will be in every fetch call to the database to let the server know which user is logged in.
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}



export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
        headers:{
            //This Autherization header will be in every fetch call to the database to let the server know which user is logged in.
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
     })
        .then()
}

export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            //This Autherization header will be in every fetch call to the database to let the server know which user is logged in.
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
     })
        .then()
}