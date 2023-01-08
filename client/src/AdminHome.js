import React, {useContext, useState, useEffect} from 'react';
import Movie from './Movie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, useLocation,useNavigate } from 'react-router'


const AdminHome = () => {
    const [movies, setMovies] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [mov, setMov] = useState([]);
    const navigate=useNavigate(); 
    const userId=localStorage.getItem("_id");

    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; // ako nema tokena vratit korisnika na prijavu
    }
    console.log(userId);
    async function getMovies(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const movieList = await fetch("http://127.0.0.1:3000/movies/movies", options);

        const movieJson = await movieList.json();

        //console.log("Chocolates", chocolateJson.chocolates);
        setMovies(movieJson.movies);
        console.log("MOVIES: ", movieJson);
    }


    async function getDirectors(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        

        const directorList = await fetch("http://127.0.0.1:3000/movies/directors", options);
        const directorJson = await directorList.json();

        setDirectors(directorJson.directors);
        
    }

    useEffect(() => {
        getMovies();
      }, []);
    
    useEffect(() => {
        getDirectors();
    }, []);


    return(

        
        <div className='container justify-content-center'>
        <button text="Logout" onClick={()=>navigate("/Logout")}>Logout</button> 
         
            <div>adminnn</div>
                { Object.keys(movies).map((it) => {
                return (
                    <div className="row">
                         <Movie id = { movies[it]._id } image = { movies[it].image } name = { movies[it].name } genre = { movies[it].genre }  format = { movies[it].format } year = { movies[it].year } oscar = { movies[it].oscar } director = { movies[it].director} />
                                    
                    </div>
                )
                
                })}
        </div>
    )

}

export default AdminHome;