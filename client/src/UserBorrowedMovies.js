import React, {useContext, useState, useEffect} from 'react';
import Movie from './Movie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, useLocation,useNavigate } from 'react-router'

const UserBorrowedMovies = () => {
    const [borrowedMovies,setBorrowedMovies]=useState([]);
    const [borrowed,setBorrowed]=useState([]);
    const [movies,setMovies]=useState([]);
    const navigate=useNavigate(); 
    const userId= localStorage.getItem("_id");




const getMovies = async () => {
  const response = await fetch(
    "http://localhost:3000/movies/movies"
  ).then((response) => response.json());
  setMovies(response.movies);
  console.log("resp movies",response);
  console.log("all movies---------", movies);
};

const getAllBorrowed = async () => {
  const response = await fetch(
    `http://localhost:3000/movies/borrowMoviesByUser/${userId}`
  ).then((response) => response.json());
    setBorrowed(response);
    console.log(response);
    console.log("borrowed by user---------", borrowed);
};

const getUserMovies=()=>{
    let enrC=movies;
    let notC=[];
    let tempCourses=movies;

    borrowed.forEach(el => {
        tempCourses=tempCourses.filter(item=>el.movie_id!==item._id)
        
    });
    notC=tempCourses;

    tempCourses.forEach(element => {
        enrC=enrC.filter(item=>element._id!==item._id)
        
    });
    setBorrowedMovies(enrC);
    //setNotEnrolledCourses(notC);
    
}




useEffect(() => {
  getMovies();
  getAllBorrowed();
  
},[]);

useEffect(() => {
 getUserMovies();
 console.log("drugi useeff");
},[movies, borrowed]);

  return (
    <div>
        
        <h2>Posudeni filmovi</h2>
        <div>{borrowedMovies ? borrowedMovies.map((el) => (
              <p key={el._id}>{el.name} <button className="btn btn-danger btn-sm m-1">Vrati film</button></p>)) :""}
            
          
         
        </div>
         

    </div>
  )
}

export default UserBorrowedMovies