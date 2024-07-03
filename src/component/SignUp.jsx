import React from "react";
import { useState } from "react";
import axios from 'axios';
import "./SignUp.css"

const  SignUp = () => {
const [formData, setFormData] = useState({
   email: '', 
  first_name: '',
   last_name: '',
    
    
    role: '',
});
const [msg, setMsg] = useState('');

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  
    console.log(formData)

    axios.post('http://localhost:7000/api/sign-up', formData)
    .then(response => { setMsg(response.data);
                        // setEmail(formData.email)
                         console.log(response)})
    .catch(er => {setMsg('An error occurred');
                    console.log(er) })


  }

    return (
    <div className="Form_Sign">
    <h3>Регистрация</h3>
    <div className="container" >
    <form onSubmit={handleSubmit}>

        <div className="field">
       <label>
           Фамилия
            <input  className="input" type="text"  name="last_name" placeholder="Last name" onChange={handleChange} /></label> <br/>
        </div>
     
        <div className="field">
            < label>
            Имя
             <input className="input" type="text"  name="first_name" placeholder="First name" onChange={handleChange}/></label> <br/>
        </div>
      
        <div className="field">      
        <label > 
            Email    
             <input className="input" type="email"  name="email" placeholder="Email" onChange={handleChange} /></label> <br/> 
        </div> 
      
      <div className="field">      
        <label >
            Роль
            <input type="text"  name="role" placeholder="Role" onChange={handleChange}/></label> <br/>
          </div> 
           <button className="Form_Sign_btn" type="submit">Регистрация</button>
            <p className="Form_Sign_p" > {msg} </p>
    </form>

</div>
    </div>)
}

export default SignUp;