import React, {useContext, useState, useEffect} from 'react';

const PopularMovies = () => {

    const [movies, setMovies] = useState([]);
    const [popular, setPopular] = useState([]);

    async function getMovies(){
        
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const movieList = await fetch("http://127.0.0.1:3000/movies/movies", options);

        const movieJson = await movieList.json();

        setMovies(movieJson.movies);
        console.log("MOVIES: ", movieJson);

        

    }

    function sortMovies(){
        let tempMovies=[];
        let topNumOfMovies=3;
        movies.sort((a, b) => (a.timesBorrowed < b.timesBorrowed) ? 1: -1);
        console.log("Sorted MOVIES: ", movies);

        for (let i = 0; i <topNumOfMovies; i++) {
            tempMovies.push(movies[i]);
        }
        setPopular(tempMovies);

        console.log("Final MOVIES: ", popular);
    }

    useEffect(() => {
        getMovies();
      }, []);

      useEffect(() => {
        sortMovies();
      }, [movies]);


      movies.sort(function(a, b) {
        return b.timesBorrowed - a.timesBorrowed;
      });

      movies.splice(5, movies.length);  // top 5
  return (
    <div>

         <h2>Popularni filmovi</h2>
        <div>{movies.length > 0 ? movies.map((el,index) => (
              <p key={el._id}>{index+1}. {el.name} {el.timesBorrowed}</p>)) :""}
        </div>
    </div>
  )
}

export default PopularMovies