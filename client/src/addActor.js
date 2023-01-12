import React, {useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const AddActor = () => {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [born, setBorn] = useState("");
    const [image, setImage] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] =  useState("");

    async function addFormData(e){
        e.preventDefault();

        if ((name === "") || (surname === "") || (born === "") || (image === "")){
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
            method: 'POST',
            headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(json)
        };

        fetch('http://localhost:3000/movies/addActor',requestOptions)
        .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    navigate("/actors");
                } else {
                    setMessage("Incorrect data!")
                }
            })
    }
    return (
        <div className='container'>
            <form>
                <input type="text" value = {name} className="form-control" id="name" placeholder="Enter  Actor Name" onChange={(e) => setName(e.target.value)} required /><br/>
                <input type="text" value = {surname} className="form-control" id="year" placeholder="Enter Actor Surname" onChange={(e) => setSurname(e.target.value)} required /><br/>  
                <input type="text" value = {born} className="form-control" id="born" placeholder="Enter Actor Born" onChange={(e) => setBorn(e.target.value)} required /><br/>        
                <input type="text" value = {image} className="form-control" id="logo" placeholder="Enter Actor Image" onChange={(e) => setImage(e.target.value)} required /><br/>

                <div className="text-center"><button type="submit" className="btn btn-success btn-sm"  onClick={addFormData} >Save</button></div><br/><br/>
                { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
        
            </form>
        </div>
    )
}

export default AddActor;