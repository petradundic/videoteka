import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";


const Movie = (props) => {
  let navigate = useNavigate();
  const [role, setRole] = useState("");
  const [movie, setMovie] = useState("");
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState("");
  const [director, setDirector] = useState("");

  if (localStorage.getItem("token") === null){
    window.location.href = '/login'; // ako nema tokena vratit korisnika na prijavu
  }

  async function getMovie(){
    const options = {headers:{
        Authorization: "Bearer " + localStorage.getItem("token")
    }};
    const movieList = await fetch(`http://localhost:3000/movies/movie/${props.id}`, options);
    const movieJson = await movieList.json();
    setMovie(movieJson);
  }

  async function getDirector() {
    const options = {headers:{
        Authorization: "Bearer " + localStorage.getItem("token")
    }};

    console.log("DId: ", props);
    const directorList = await fetch(`http://localhost:3000/movies/director/${props.director}`, options);
    const directorJson = await directorList.json();
    setDirector(directorJson);
  }

  useEffect(() => {
    getMovie();
    //getDirector();
}, []);


  function getCurrent(){
        const myuser = JSON.parse(localStorage.getItem("user"));
        if (myuser){
            setUserName(myuser.name);
            setRole(myuser.role);
            setUserId(myuser.id);
        }
  }

  async function deleteMovie(e){
      e.preventDefault();

      const requestOptions = {
          method: 'DELETE'
        }

    fetch(`http://localhost:3000/movies/deleteMovie/${props.id}`,requestOptions)
    .then((res) => res.json())
            .then((data) => {
                if (data.success){
                  window.location.href = '/';
                } else {
                    alert("Cannot delete!")
                }
            })
  }

  useEffect(() => {
    getCurrent();
  }, []);

  return(
    <div className="col-4 p-5">
        <Link to={`/details/${movie._id}`} className="text-decoration-none"><div class="text-dark text-center"><b>{movie.name}</b></div></Link>
        <Link to={`/details/${movie._id}`}><div class="text-center"><img className="w-75 p-3" src={movie.image}/></div></Link>
        <p class="text-center">Genre: {movie.genre}</p><br/>
        <p class="text-center">Director: {director.name} {director.surname}</p><br/>
        
        { role === "admin" ? (
        <div  class="text-center">
            <Link to={`/editMovie/${movie._id}`}>
            <button className="btn btn-primary btn-sm m-1">Edit</button></Link>
            <button className="btn btn-danger btn-sm m-1" onClick={deleteMovie}>Delete</button><br/><br/><br/>
         </div>
        ) : <div></div>
    }
    <br/><br/><br/>
    </div>
)
}
export default Movie;
