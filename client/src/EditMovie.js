import React, {useState, useEffect, useRef}  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditMovie = () => {
    let navigate = useNavigate();
    const params = useParams();
    const [movie, setMovie] = useState("");
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
    const [currDirector, setCurrDirector] = useState("");
    const [movieGenre, setMovieGenre] = useState("");
    const [actors, setActors] = useState([]);
    const [actor, setActor] = useState("");
    const [finalActors, setFinalActors] = useState([]);
    const [prevActors, setPrevActors] = useState([]);
    const genreArray = ["Drama", "Action", "Thriller", "Crime", "Western", "Horror","Music", "Comedy", "Fantasy", "History", "Mystery", "Adventure", "Noir", "Romance" ]
    

    console.log(params);
    const [currT, setCurrT] = useState("");

    async function getMovie(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        
        const movieList = await fetch(`http://localhost:3000/movies/movie/${params.id}`, options);
        const movieJson = await movieList.json();

        setMovie(movieJson);

        const directorList = await fetch(`http://localhost:3000/movies/directors`, options);
        const directorJson = await directorList.json();

        setDirectors(directorJson.directors);
        console.log("Directors", directorJson.directors);

        const actorList = await fetch(`http://localhost:3000/movies/actors`, options);
        const actorJson = await actorList.json();

        setActors(actorJson.actors);
        console.log("Actors", actorJson.actors);

        setName(movie.name);
        setImage(movie.image);
        setGenre(movie.genre);
        setDuration(movie.duration);
        setFormat(movie.format);
        setYear(movie.year);
        setOscar(movie.oscar);
        setDirector(movie.director_id);
        setPrevActors(movie.actors);
    }

    useEffect(() => {
        getMovie();
        Object.keys(directors).map((item) => {
            if (directors[item]._id === movie.director_id){
                setCurrDirector(directors[item].name);
            }
        })
    }, []);

    async function addFormData(e)
      {
        e.preventDefault();
        if ((name === "") || (genre === "") || (image == "") || (duration === "") || (format === "") || (year === "") ){
            setIsCorrect(false);
            setMessage("Required input is empty!");
            return;
        }

            const json = {
                name: name, 
                genre: genre,
                image: image,
                duration: duration,
                format: format,
                year: year,
                oscar: oscar,
                director_id: director, 
                actors: prevActors
            }

            const requestOptions = {
                method: 'PUT',
                headers:{ 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(json)
            };

            fetch(`http://localhost:3000/movies/updateMovie/${params.id}`,requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    navigate("/");
                } else {
                    console.log("Incorrect data!")
                }
            })
      }
        
  
    return (
        <div className="container">
            <form>
            <label for="name">Name: </label><input type="text" defaultValue = {movie.name}  className="form-control" id="name"  onChange={(e) => setName(e.target.value)} /><br/>
            <label for="genre">Genre: </label><input type="text" defaultValue = {movie.genre} className="form-control" id="genre" onChange={(e) => setGenre(e.target.value)} /><br/>
            <label for="image">Image url: </label><input type="text" defaultValue = {movie.image} className="form-control" id="image" onChange={(e) => setImage(e.target.value)} /><br></br>
            <label for="duration">Duration: </label><input type="text" defaultValue = {movie.duration} className="form-control" id="duration" onChange={(e) => setDuration(e.target.value)} /><br/>
            <label for="format">Format: </label><input type="text" defaultValue = {movie.format} className="form-control" id="format"  onChange={(e) => setFormat(e.target.value)} /><br />
            <label for="year">Year: </label><input type="text" defaultValue = {movie.year} className="form-control" id="year"  onChange={(e) => setYear(e.target.value)} /><br />
            <label for="oscar">Oscar: </label><input type="text" defaultValue = {movie.oscar} className="form-control" id="oscar"  onChange={(e) => setOscar(e.target.value)} /><br />
            <label for="actors">Actors: </label><input type="text-area" defaultValue = {movie.actors} className="form-control" id="actors"  onChange={(e) => setPrevActors(e.target.value)} /><br />
            
            <label> Genre:
                    <select className="m-2" value={genre} onChange={(e) => {setGenre(e.target.value); console.log("G",{genre})}} required>
                    <option>All</option>
                    { Object.keys(genreArray).map((item) => (
                        <option value={genreArray[item]}>{genreArray[item]}</option>
                    ))}
                   
                    </select>
                    
                </label><br/><br/>

                <label> Director:
                    <select className="m-2" value={director} onChange={(e) => {setDirector(e.target.value); console.log("D",{director})}}>
                    <option>{currDirector}</option>
                    { Object.keys(directors).map((item) => (
                        <option value={directors[item]._id}>{directors[item].name} {directors[item].surname}</option>
                    ))}
                   
                    </select>
                    
                </label><br/><br/>

                
               <div className="text-center"> <button  type="submit" className="btn btn-success btn-sm"  onClick={addFormData} >Save</button></div><br/><br/>
                { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
        
            </form>
        </div>
    )
}

export default EditMovie;