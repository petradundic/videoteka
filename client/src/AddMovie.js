import React, {useState, useEffect, useRef}  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
    let navigate = useNavigate();
    const [directors, setDirectors] = useState([]);
    const [director, setDirector] = useState("");
    const [name, setName] =  useState("");
    const [genre, setGenre] = useState("");
    const [image, setImage] = useState("");
    const [duration, setDuration] = useState("");
    const [format, setFormat] = useState("");
    const [year, setYear] = useState("");
    const [oscar, setOscar] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] = useState("");
    const [movieGenre, setMovieGenre] = useState("");
    const [actors, setActors] = useState([]);
    const [actor, setActor] = useState("");
    const [finalActors, setFinalActors] = useState([]);
    const [timesBorrowed, setTimesBorrowed] = 0;

    async function getDirector(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const directorList = await fetch(`http://localhost:3000/movies/directors`, options);
        const directorJson = await directorList.json();
        console.log(directorJson);
        setDirectors(directorJson.directors);
    }

    async function getActors(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const actorList = await fetch(`http://localhost:3000/movies/actors`, options);
        const actorJson = await actorList.json();
        console.log(actorJson);
        setActors(actorJson.actors);
    }

    useEffect(() => {
        getDirector();
        getActors();
    }, []);

    const genreArray = ["Drama", "Action", "Thriller", "Crime", "Western", "Horror","Music", "Comedy", "Fantasy", "History", "Mystery", "Adventure", "Noir", "Romance" ]
    async function addFormData(e){
        e.preventDefault();
        if ((name === "") || (image === "") || (genre == "") || (duration === "") || (format === "") || (year === "") || (director === "") ){
            setIsCorrect(false);
            setMessage("Required input is empty!");
            return;
        }

            const json = {
                "name": name, 
                "image": image,
                "genre": movieGenre,
                "duration": duration,
                "format": format,
                "year": year,
                "director_id": director,
                "oscar": oscar,
                "actors": finalActors,
                "timesBorrowed":timesBorrowed
            }

            const requestOptions = {
                method: 'POST',
                headers:{ 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(json)
            };


            fetch('http://localhost:3000/movies/addMovie',requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    navigate("/");
                } else {
                    setMessage("Incorrect data!")
                }
            })
      }
        
  
    return (
        <div className="container">
            <form>
                <input type="text" value = {name} className="form-control" id="name" placeholder="Enter Movie Name" onChange={(e) => setName(e.target.value)} required /><br/>
                <input type="text" value = {image} className="form-control" id="image" placeholder="Enter Movie Image Url" onChange={(e) => setImage(e.target.value)} required /><br></br>
                <input type="text" value = {duration} className="form-control" id="duration" placeholder="Enter Duration" onChange={(e) => setDuration(e.target.value)} required /><br/>
                <input type="text" value = {format} className="form-control" id="format" placeholder="Enter Format" onChange={(e) => setFormat(e.target.value)} required /><br />
                <input type="text" value = {year} className="form-control" id="year" placeholder="Enter Year" onChange={(e) => setYear(e.target.value)} required /><br />
                <input type="text" value = {oscar} className="form-control" id="oscar" placeholder="Enter oscar" onChange={(e) => setOscar(e.target.value)} required /><br />
                
                <label> Genre:
                    <select className="m-2" value={movieGenre} onChange={(e) => {setMovieGenre(e.target.value); console.log("G",{movieGenre})}} required>
                    <option>All</option>
                    { Object.keys(genreArray).map((item) => (
                        <option value={genreArray[item]}>{genreArray[item]}</option>
                    ))}
                   
                    </select>
                    
                </label><br/><br/>
                
                <label> Director:
                    <select className="m-2" value={director} onChange={(e) => {setDirector(e.target.value); console.log("D",{director})}} required>
                    <option>All</option>
                    { Object.keys(directors).map((item) => (
                        <option value={directors[item]._id}>{directors[item].name} {directors[item].surname}</option>
                    ))}
                   
                    </select>
                    
                </label><br/><br/>
                <label> Add actors on movie:
                    <select className="m-2" value={actor} onChange={(e) => {setActor(e.target.value); console.log("D",{director}); finalActors.push(actor + " ");console.log("ACTORS", finalActors)}} required>
                    <option>All</option>
                    { Object.keys(actors).map((item) => (
                        <option value={actors[item].name + " " + actors[item].surname}>{actors[item].name} {actors[item].surname}</option>
                    ))}
                   
                    </select>
                    
                </label><br/><br/>
                <div className="text-center"><button type="submit" className="btn btn-success btn-sm"  onClick={addFormData} >Save</button></div><br/><br/>
                { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
        
            </form>
        </div>
    )
}

export default AddMovie;