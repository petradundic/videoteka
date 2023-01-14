
import React, {useContext, useState, useEffect} from 'react';

const NeverBorrowed = () => {
    
    const [movies, setMovies] = useState([]);
    const [never, setNever] = useState([]);

    async function getMovies(){
        
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const movieList = await fetch("http://127.0.0.1:3000/movies/movies", options);

        const movieJson = await movieList.json();

        setMovies(movieJson.movies);
        console.log("MOVIES: ", movieJson);

        

    }

    function getneverBorrowed(){
        let tempMovies=[];
        
        tempMovies=movies.filter(item=>item.timesBorrowed===0)
    setNever(tempMovies);
    }

    useEffect(() => {
        getMovies();
      }, []);

      useEffect(() => {
        getneverBorrowed();
      }, [movies]);

  return (
    <div>
        <h2>Nikad posudeni filmovi</h2>
        <div>{never ? never.map((el,index) => (
              <p key={el._id}>{index+1}. {el.name} </p>)) :""}
            
          
         
        </div>
    </div>
  )
}

export default NeverBorrowed