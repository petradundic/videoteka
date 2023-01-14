import React, {useContext, useState, useEffect} from 'react';
import Movie from './Movie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, useLocation,useNavigate } from 'react-router'
import { Link } from 'react-router-dom';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [mov, setMov] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const navigate=useNavigate(); 
    const userId=localStorage.getItem("_id");
    const role=localStorage.getItem("role");
    const isToken=localStorage.getItem("token")

    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; // ako nema tokena vratit korisnika na prijavu
    }

    function onChangeSearch(e) {
        setSearch(e.target.value);
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

    async function getData(search){
        const data = await fetch(`http://127.0.0.1:3000/movies/moviesByGenre/${search}`);
        const dataJson = await data.json();
        console.log("INFO", dataJson);
        setSearchResult(dataJson);
        
    }

    useEffect(() => {
        getMovies();
      }, []);
    
    useEffect(() => {
        getDirectors();
    }, []);


    return(

        <div className='container'>
            <br/>
            <form className="example" onSubmit={(e) => {getData(e);}}>
                <div className="form-group col-md-6 form-check-inline">
                    <input
                        type="text"
                        value={search} className="form-control" 
                        placeholder="Search by genre, director"
                        onChange={onChangeSearch}
                        onBlur={onChangeSearch}
                    ></input>
                    <Link to={`/searchResult/${search}`}><button type="submit" className="btn btn-outline-secondary lg"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg></button></Link>
            </div>
            </form>
            <br/>
         <div>{(role==="admin") ? <Navigate to ="/AdminHome"/> :
         <div className='container justify-content-center'>
        {(isToken===null) ? <button text="Login"  className="btn btn-outline-secondary" onClick={()=>navigate("/Login")}>Login</button> : ("  ") }
        <button text="SignUp"  className="btn btn-outline-secondary" onClick={()=>navigate("/Register")}>Register</button>
        <button className="btn btn-outline-secondary" onClick={()=>navigate(`/EditUser/${userId}`)}>Edit profile</button>
        <button className="btn btn-outline-secondary" text="Logout" onClick={()=>navigate("/Logout")}>Logout</button> 
        <button className="btn btn-outline-secondary" onClick={()=>navigate(`/UserBorrowedMovies/${userId}`)}>Posudeni filmovi</button>
        <div className="row">
            
                { Object.keys(movies).map((it) => {
                return (
                   
                         <Movie id = { movies[it]._id } image = { movies[it].image } name = { movies[it].name } genre = { movies[it].genre }  format = { movies[it].format } year = { movies[it].year } oscar = { movies[it].oscar } director = { movies[it].director_id} />
                                    
                   
                )
                
                })}
                 </div>
        </div>}</div>

    </div>

        
    )

}

export default Home;