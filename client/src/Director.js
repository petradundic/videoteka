import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Director = () => {
    let navigate = useNavigate();
    const [directors, setDirectors] = useState([]);
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);

    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; // ako nema tokena vratit korisnika na prijavu
    }
    
    async function getDirectors(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const directorList = await fetch("http://127.0.0.1:3000/movies/directors", options);
        const directorJson = await directorList.json();

        console.log("Directors", directorJson.directors);
        setDirectors(directorJson.directors);
    }

    function getCurrent(){
        const myuser = JSON.parse(localStorage.getItem("user"));
        if (myuser){
            setRole(myuser.role);
        }
    }

    useEffect(() => {
        getDirectors();
        getCurrent();
    }, []);

    async function deleteDirector(id){
        const requestOptions = {
            method: 'DELETE'
          }
  
      fetch(`http://localhost:3000/movies/deleteDirector/${id}`,requestOptions)
      .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    window.location.href = '/directors';
                } else {
                    setIsCorrect(false);
                    setMessage("Cannot delete")
                }
            })
    }
  
    return (
        <div className="container justify-content-center">
            <div className="row">
            { Object.keys(directors).map((item) => (
                <div className="col-4 p-5">
                <p className='text-center text-uppercase text-primary'><b>{directors[item].name}</b></p><br/>
                <p className='text-center text-uppercase text-primary'><b>{directors[item].surname}</b></p><br/>
                <p className='text-center text-uppercase text-primary'><b>{directors[item].born}</b></p><br/>
                <div className='text-center'><img src={directors[item].image} width={150} height={150}/></div><br/><br/>
                {/*<span><b>Year:</b>{producers[item].year}</span><br/>
                <span><b>Country:</b>{producers[item].country}</span><br/>
                <span><b>Description:</b>{producers[item].description}</span><br/><br/>*/}

                { role === "admin" ? (
                    <div className='text-center'>
                    <Link to={`/editDirector/${directors[item]._id}`}>
                    <button className="btn btn-primary btn-lg m-2">Edit</button></Link>
                    <button className="btn btn-danger btn-lg m-2" onClick={()=> deleteDirector(directors[item]._id)}>Delete</button><br/>
                    { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
        
                    <br/><br/>
                    </div>
                ): (
                    <Link to={`/directorDetails/${directors[item]._id}`}>
                <div className='text-center'><button className="btn btn-light m-2">Details</button></div></Link>
                )}
             </div>

            ))}
            </div>
        </div>
    )
}

export default Director;