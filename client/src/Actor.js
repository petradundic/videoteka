import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Actor = () => {
    let navigate = useNavigate();
    const [actors, setActors] = useState([]);
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);

    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; // ako nema tokena vratit korisnika na prijavu
    }
    
    async function getActors(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const actorList = await fetch("http://127.0.0.1:3000/movies/actors", options);
        const actorJson = await actorList.json();

        console.log("Actors", actorJson.actors);
        setActors(actorJson.actors);
    }

    function getCurrent(){
        const myuser = JSON.parse(localStorage.getItem("user"));
        if (myuser){
            setRole(myuser.role);
        }
    }

    useEffect(() => {
        getActors();
        getCurrent();
    }, []);

    async function deleteActor(id){
        const requestOptions = {
            method: 'DELETE'
          }
  
      fetch(`http://localhost:3000/movies/deleteActor/${id}`,requestOptions)
      .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    window.location.href = '/actors';
                } else {
                    setIsCorrect(false);
                    setMessage("Cannot delete")
                }
            })
    }
  
    return (
        <div className="container justify-content-center">
            <div className="row">
            { Object.keys(actors).map((item) => (
                <div className="col-4 p-5">
                <p className='text-center text-uppercase text-primary'><b>{actors[item].name}</b></p><br/>
                <p className='text-center text-uppercase text-primary'><b>{actors[item].surname}</b></p><br/>
                <p className='text-center text-uppercase text-primary'><b>{actors[item].born}</b></p><br/>
                <div className='text-center'><img src={actors[item].image} width={150} height={150}/></div><br/><br/>
                {}

                { role === "admin" ? (
                    <div className='text-center'>
                    <Link to={`/editActor/${actors[item]._id}`}>
                    <button className="btn btn-primary btn-lg m-2">Edit</button></Link>
                    <button className="btn btn-danger btn-lg m-2" onClick={()=> deleteActor(actors[item]._id)}>Delete</button><br/>
                    { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
        
                    <br/><br/>
                    </div>
                ): (<p></p>)}
             </div>

            ))}
            </div>
        </div>
    )
}

export default Actor;