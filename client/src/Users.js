import React, {useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Users = () =>{
    const navigate=useNavigate();
    const [users, setUsers]=useState([]);
    const [korisnici, setKorisnici]=useState([]);
    

const getApiData = async () => {
  const response = await fetch(
    "http://localhost:3001/users/users"
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
    <div>
         

        {users ? users.map((item, index) => (
            <div key={item._id}>
                <div key={item._id}>{item.username}</div>
                <button text="Delete" onClick={()=>{
                    const url=`http://localhost:3001/users/${item._id}`;
                    fetch(url, {method: 'DELETE' }).then(() => {
                      window.location.reload();
                    })

                }}>Delete</button> 

            </div>
              
        )):""}

        
        <button className ='Add' onClick={()=>navigate("/Register")}>Add User</button>

        
    </div>
  )
}
export default  Users;