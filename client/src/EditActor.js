import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const EditActor = () => {
    let navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [born, setBorn] = useState("");
    const [image, setImage] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] = useState("");
    const [actor, setActor] = useState("");

    async function getActor(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const actorList = await fetch(`http://localhost:3000/movies/actor/${params.id}`, options);
        const actorJson = await actorList.json();
        setActor(actorJson);
    
        setName(actor.name);
        setSurname(actor.surname);
        setBorn(actor.born);
        setImage(actor.image);
    }

    useEffect(() => {
        getActor();
    }, []);

    async function addFormData(e){
        e.preventDefault();
        if ((name === "") || (surname === "") || (born == "") || (image === "")){
            setIsCorrect(false);
            setMessage("Required input is empty!");
            return;
        }

        const json = {
            "name": name,
            "surname": surname,
            "born": born,
            "image": image
        }
        const requestOptions = {
            method: 'PUT',
            headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(json)
        };

        fetch(`http://localhost:3000/movies/updateActor/${params.id}`,requestOptions)
        .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    navigate("/actors");
                } else {
                    console.log("Incorrect data!");
                }
            })
    }
    return (
        <div className='container'>
            <form>
               <label for="name">Name: </label> <input type="text" defaultValue = {actor.name} className="form-control" id="name" onChange={(e) => setName(e.target.value)} /><br/>
               <label for="name">Surname: </label><input type="text" defaultValue = {actor.surname} className="form-control" id="surname" onChange={(e) => setSurname(e.target.value)} /><br/>  
               <label for="name">Born: </label><input type="text" defaultValue = {actor.born} className="form-control" id="born"  onChange={(e) => setBorn(e.target.value)} /><br/>        
                <label for="name">Image: </label><input type="text" defaultValue = {actor.image} className="form-control" id="image"  onChange={(e) => setImage(e.target.value)} /><br/>

                <div className='text-center'><button type="submit" className="btn btn-success btn-sm"  onClick={addFormData} >Save</button></div><br/><br/>
                { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
        
            </form>
        </div>
    )
}

export default EditActor;