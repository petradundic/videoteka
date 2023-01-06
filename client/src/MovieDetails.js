import React, {useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const MovieDetails = () => {
    const params = useParams();
    const [director, setDirector] = useState("");
    const [movie, setMovie] = useState("");

    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; // ako nema tokena vratit korisnika na prijavu
    }

    async function getMovie(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        
        const movieList = await fetch(`http://localhost:3000/movies/movie/${params.id}`, options);
        const movieJson = await movieList.json();
       console.log("m: ", movieJson);
        setMovie(movieJson);

        const directorList = await fetch(`http://localhost:3000/movies/director/${movieJson.director_id}`, options);
        const directorJson = await directorList.json();

        setDirector(directorJson.name);

    }

    
    useEffect(() => {
        getMovie();
    }, []);

    return(
        <div className="container justify-content-center">
            <div className="row border rounded rounded">
            <div className="col-5 m-6 p-4">
            <p><b>Product: </b>{movie.name}</p>
            <p><b>Genre: </b>{movie.genre}</p>
            <p><b>Duration: </b>{movie.duration}</p>
            <p><b>Format: </b>{movie.format}</p>
            <p><b>Director: </b>{director}</p>
            <p><b>Year: </b>{movie.year}</p>
            <p><b>Oscar: </b>{movie.oscar}</p>

            
            </div>
            <div className="col-6">
            <img src={movie.image} class="mw-100 mh-100"/><br/>
            </div>
            </div>
        </div>
    )
}

export default MovieDetails;
