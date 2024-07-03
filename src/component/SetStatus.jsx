import React from "react";
import { useState } from "react";
import axios from 'axios';
import "./SetStatus.css"

const SetStatus = ({token})=>{

    const [mystatus, setMystatus] = useState('');
    const [message, setMessage] = useState('');

    const handleChangeStatus = (e) => {
        setMystatus(e.target.value);
      };
     


      const handleSubmit = (e) => {
        e.preventDefault();
      axios.post('http://localhost:7000/api/set-status', { mystatus, token })
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error(error);
        setMessage('Error setting status');
      });


    }
    return(<div className="status_content">
        <h3>Статус</h3>
        <form onSubmit={handleSubmit}>
          <select className="status_select" value={mystatus}  onChange={handleChangeStatus}>
            <option value="" ></option>
            <option value="increased">increased</option>
          </select>

        <button type="submit" className="status_btn">Установить</button>
        </form>
        <p className="status_p">{message}</p>

    </div>)
}

export default SetStatus