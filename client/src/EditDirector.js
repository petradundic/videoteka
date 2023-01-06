import Reacr, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const EditDirector = () => {
    let navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [born, setBorn] = useState("");
    const [image, setImage] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] = useState("");
    const [director, setDirector] = useState("");

    async function getDirector(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const directorList = await fetch(`http://localhost:3000/movies/director/${params.id}`, options);
        const directorJson = await directorList.json();
        setDirector(directorJson);
    
        setName(director.name);
        setSurname(director.surname);
        setBorn(director.born);
        setImage(director.image);
    }

    useEffect(() => {
        getDirector();
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

        fetch(`http://localhost:3000/movies/updateDirector/${params.id}`,requestOptions)
        .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    navigate("/directors");
                } else {
                    console.log("Incorrect data!");
                }
            })
    }
    return (
        <div className='container'>
            <form>
               <label for="name">Name: </label> <input type="text" defaultValue = {director.name} className="form-control" id="name" onChange={(e) => setName(e.target.value)} /><br/>
               <label for="name">Surname: </label><input type="text" defaultValue = {director.surname} className="form-control" id="surname" onChange={(e) => setSurname(e.target.value)} /><br/>  
               <label for="name">Born: </label><input type="text" defaultValue = {director.born} className="form-control" id="born"  onChange={(e) => setBorn(e.target.value)} /><br/>        
                <label for="name">Image: </label><input type="text" defaultValue = {director.image} className="form-control" id="image"  onChange={(e) => setImage(e.target.value)} /><br/>

                <div className='text-center'><button type="submit" className="btn btn-success btn-sm"  onClick={addFormData} >Save</button></div><br/><br/>
                { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
        
            </form>
        </div>
    )
}

export default EditDirector;