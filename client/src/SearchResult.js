import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import Movie from './Movie';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchResult = () => {
    const params = useParams();
    console.log("PARAMS", params);
    const [movies, setMovies] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [mov, setMov] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);


    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; // ako nema tokena vratit korisnika na prijavu
    }

    async function getMovies(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const movieList = await fetch(`http://127.0.0.1:3000/movies/moviesByGenre/${params.search}`);

        const movieJson = await movieList.json();

        //console.log("Chocolates", chocolateJson.chocolates);
        setMovies(movieJson);
        console.log("MOVIES: ", movieJson);
    }


    function onChangeSearch(e) {
        setSearch(e.target.value);
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
        const data = await fetch(`http://127.0.0.1:3000/movies/moviesByGenre/${params.search}`);
        const dataJson = await data.json();
        console.log("INFO", dataJson);
        setSearchResult(dataJson);

        if ((dataJson.length == 0) && params.search.includes('h') && params.search.includes(' ')){
            const data = await fetch(`http://127.0.0.1:3000/movies/moviesByDuration/${params.search}`);
            const dataJson = await data.json();
            console.log("INFO", dataJson);
            setSearchResult(dataJson);
            if (dataJson.length > 0){
                return;
            }
        } 

        if ((dataJson.length == 0) && params.search.includes(' ')){
            const data = await fetch(`http://127.0.0.1:3000/movies/moviesByDirector/${params.search}`);
            const dataJson = await data.json();
            console.log("INFO", dataJson);
            setSearchResult(dataJson);
            if (dataJson.length > 0){
                return;
            }
        }

        if ((dataJson.length == 0)){
            const data = await fetch(`http://127.0.0.1:3000/movies/moviesByFormat/${params.search}`);
            const dataJson = await data.json();
            console.log("INFO", dataJson);
            setSearchResult(dataJson);
            if (dataJson.length > 0){
                return;
            }
        }
        
    }

    
    useEffect(() => {
        getMovies();
        getDirectors();
        getData();
    }, [params.search, search]);


    return(
        <div className='container'>
            <br/>
            <Link to={`/ `}><button type="submit" className="btn btn-outline-secondary">Home</button></Link>
            
        
        <div className='container justify-content-center'>
            
             <div className="row">
                { searchResult.length == 0 ? <p>No results!</p> :  
                Object.keys(searchResult).map((it) => {
                    return (
                       
                            <Movie id = { searchResult[it]._id } image = { searchResult[it].image } name = { searchResult[it].name } genre = { searchResult[it].genre }  format = { searchResult[it].format } year = { searchResult[it].year } oscar = { searchResult[it].oscar } director = { searchResult[it].director_id} />
                                        
                       
                    )
                })}
                 </div>
        </div>
        </div>
    )

}

export default SearchResult;
