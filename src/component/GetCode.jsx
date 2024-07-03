import React, {useState} from "react";
import axios from "axios";
import  encodeBase64  from "./encodeBase64.js";
import './GetCOde.css'

const GetCode = ({setToken}) =>{
    const [email, setEmail]=useState('');
    const [code, setCode]=useState('');
    const [msg , setMsg]=useState('');

    const [tokenlocal, setTokenlocal] = useState('')

    // // дополнительно
    // const [showFullCode, setShowFullCode] = useState(false);
    // const [showFullToken, setShowFullToken] = useState(false);

    const handleChange =(e)=>{
        setEmail(e.target.value)
    }


    const  Click =() =>{
        if(email){
            axios.get(`http://localhost:7000/api/get-code`, { params: { email } })
            .then(response => {const receivedCode = response.data;
                                setCode(receivedCode);
                                setMsg( receivedCode);
                                const myTokenlocal = encodeBase64(email, receivedCode);
                                setTokenlocal(myTokenlocal)
                                setToken(myTokenlocal)
            })
            .catch(error => {
                setMsg('Error fetching code');
                console.error(error);
              });
        }else{
            setMsg('No email provided');
        }
    }



    // const handleCodeClick = () => {
    //     setShowFullCode(!showFullCode);
    //   };
    
    //   const handleTokenClick = () => {
    //     setShowFullToken(!showFullToken);
    //   };

let star
{code.length>0? star='****':star =''}

     


    return(<div className="code_contant">
        <h3>Получение кода</h3>
        <input type="email" placeholder="Enter your email" value={email} onChange={handleChange} />
        <button className="code_btn" onClick={Click}>Получить код</button>
       
        <p className="code_p"  >  Ваш код: {star}{code.substr(code.length - 5)}</p>
        <p className="code_p_token" >  Ваш токен: {star}{tokenlocal.substr(tokenlocal.length - 5)}</p>
    </div>)
}
// var id = "ctl03_Tabs1";
// var lastFive = id.substr(id.length - 5);

export default GetCode;