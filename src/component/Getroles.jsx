import React from "react";
import { useState } from "react";
import axios from 'axios';
import  "./Getroles.css"


 function Getroles(){
    const [roles, setRoles] = useState([]);

  //доп
  const [showFRole, setshowFRole] = useState(false);
     //const [showFullToken, setShowFullToken] = useState(false);

  
    const fetchRoles = ()=>{
      axios.get('http://localhost:7000/api/get-roles')
      .then(response => {
        setRoles(response.data.roles);
        console.log(response.data.roles[1])
      })
      .catch(error => {
        console.error('There was an error fetching the roles!', error);
      });
      setshowFRole(!showFRole);      
    }
    
    return (<div className="role_container">
    
    <h3>Получить список ролей</h3>
      <button className="role_btn" onClick={fetchRoles}>Получить</button>
      <div className="role_ps">

         { (showFRole)? roles.map(role => (
          <p  className="role_p" key={role}>{role}</p>
        )) : " "  } 
      </div>
      
      
    </div>
)
}

export default Getroles;