import React, {useState, useEffect}  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
    let navigate = useNavigate();
    const params = useParams();
    const userID = localStorage.getItem("_id");
    const userRole=localStorage.getItem("role");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] = useState("");

    const [currT, setCurrT] = useState("");

    async function getUser(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const userList = await fetch(`http://localhost:3001/users/user/${params.id}`, options);
        
        const userJson = await userList.json();
        console.log("USER", userJson)
        setUser(userJson);
    
        setName(user.name);
        setSurname(user.surname);
        setUsername(user.username);
        setEmail(user.email);
        setPassword(user.password);
    }

    useEffect(() => {
        getUser();
        
    }, []);

    async function addFormData(e)
      {
        e.preventDefault();
        if ((name === "") || (surname === "") || (username == "") || (email === "") || (password === "")){
            setIsCorrect(false);
            setMessage("Required input is empty!");
            return;
        }

            const json = {
                "name": name, 
                "surname": surname,
                "username": username,
                "email": email,
                "password": password,
                "role": userRole
            }

            const requestOptions = {
                method: 'PUT',
                headers:{ 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(json)
            };

            fetch(`http://localhost:3001/users/updateUser/${params.id}`,requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if (data.success){
                    localStorage.removeItem("token");
                    localStorage.removeItem("id")
                    navigate("/");
                } else {
                    console.log("Incorrect data!")
                }
            })
      }
        
  
      return (
        <div className='container'>
            <form>
               <label for="name">Name: </label> <input type="text" defaultValue = {user.name} className="form-control" id="name" onChange={(e) => setName(e.target.value)} /><br/>
               <label for="name">Surname: </label><input type="text" defaultValue = {user.surname} className="form-control" id="surname" onChange={(e) => setSurname(e.target.value)} /><br/>  
               <label for="name">Username: </label><input type="text" defaultValue = {user.username} className="form-control" id="username"  onChange={(e) => setUsername(e.target.value)} /><br/>        
                <label for="name">Email: </label><input type="text" defaultValue = {user.email} className="form-control" id="email"  onChange={(e) => setEmail(e.target.value)} /><br/>
                <label for="name">Password: </label><input type="password" defaultValue = {user.password} className="form-control" id="password"  onChange={(e) => setPassword(e.target.value)} /><br/>

                <div className='text-center'><button type="submit" className="btn btn-success btn-sm"  onClick={addFormData} >Save</button></div><br/><br/>
                { !isCorrect ? (<div className="alert alert-danger" role="alert">Error: { message }!</div>) : null }
        
            </form>
        </div>
    )
}

export default EditUser;