import React, {useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Users = () =>{
    const navigate=useNavigate();
    const [users, setUsers]=useState([]);
    const [korisnici, setKorisnici]=useState([]);
    

const getApiData = async () => {
  const response = await fetch(
    "http://localhost:3000/users/users"
  ).then((response) => response.json());
   console.log("apidata", response)
  setUsers(response);
};

const getKorisnici = async () => {
   
    let allUsers=[];
    let tempUsers=users;

    users.forEach(el => {
        tempUsers=tempUsers.filter(item=>item.role==="user")
        
    });
    allUsers=tempUsers;
setKorisnici(allUsers)

}

useEffect(() => {
  getApiData();
  
},[]);

useEffect(() => {
 getKorisnici();
},[users]);

  return (
    <div className='container justify-content-center'>
      <br/>
        <button text="Home" className="btn btn-outline-secondary" onClick={()=>navigate("/")}>Home</button> 
        <button text="Logout" className="btn btn-outline-secondary" onClick={()=>navigate("/Logout")}>Logout</button>
        <button text="Posudeni filmovi" className="btn btn-outline-secondary" onClick={()=>navigate("/BorrowedMovies")}>Posudeni filmovi</button>
        <button text="AddMovie" className="btn btn-outline-secondary" onClick={()=>navigate("/AddMovie")}>AddMovie</button> 
        <button text="AddDirector" className="btn btn-outline-secondary" onClick={()=>navigate("/AddDirector")}>AddDirector</button>
        <button text="AddActor" className="btn btn-outline-secondary" onClick={()=>navigate("/AddActor")}>AddActor</button>  
        <button text="AddUser" className="btn btn-outline-secondary" onClick={()=>navigate("/Register")}>AddUser</button>
      <br/><br/>
        {users ? users.map((item) => (
            
                <div className="row" key={item._id}>
                  <div className='col-2'><p class="p-1">{item.username}  </p> </div>
                  <div className='col-1'><p class="p-1"><button className="btn btn-danger" text="Delete" onClick={()=>{
                        const url=`http://localhost:3000/users/${item._id}`;
                        fetch(url, {method: 'DELETE' }).then(() => {
                          window.location.reload();
                        })

                    }}>Delete</button></p></div> 
                    <div className='col-6'><p class="p-1">
                    <Link to={`/editUser/${item._id}`} className="text-decoration-none"><button className="btn btn-success" text="Edit">
                      
                    Edit</button></Link></p></div> 
                    

                </div>
              
        )):""}

        <br/>

        
    </div>
  )
}
export default  Users;