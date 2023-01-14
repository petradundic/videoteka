import React, {useContext, useState, useEffect} from 'react';
import Movie from './Movie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, useLocation,useNavigate } from 'react-router'


const Home = () => {
    const [movies, setMovies] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [mov, setMov] = useState([]);
    const navigate=useNavigate(); 
    const userId=localStorage.getItem("_id");
    const role=localStorage.getItem("role");
    const isToken=localStorage.getItem("token")

    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; // ako nema tokena vratit korisnika na prijavu
    }
    console.log(userId);
    console.log(role);
    async function getMovies(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const movieList = await fetch("http://127.0.0.1:3000/movies/movies", options);

        const movieJson = await movieList.json();

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


         <div>{(role==="admin") ? <Navigate to ="/AdminHome"/> :
         <div className='container justify-content-center'>
        {(isToken===null) ? <button text="Login"  onClick={()=>navigate("/Login")}>Login</button> : ("  ") }
        <button text="SignUp"  onClick={()=>navigate("/Register")}>Register</button>
        <button onClick={()=>navigate(`/EditUser/${userId}`)}>Edit profile</button>
        <button text="Logout" onClick={()=>navigate("/Logout")}>Logout</button> 
        <button onClick={()=>navigate(`/UserBorrowedMovies/${userId}`)}>Posudeni filmovi</button>

            
                { Object.keys(movies).map((it) => {
                return (
                    <div className="row">
                         <Movie id = { movies[it]._id } image = { movies[it].image } name = { movies[it].name } genre = { movies[it].genre }  format = { movies[it].format } year = { movies[it].year } oscar = { movies[it].oscar } director = { movies[it].director_id} />
                                    
                    </div>
                )
                
                })}
        </div>}</div>


        
    )

}

export default Home;