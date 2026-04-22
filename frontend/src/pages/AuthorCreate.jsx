import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const AuthorCreate = () => {
    const [name, setName] = useState("")
    const [eror, setError] = useState("")
    const navigate = useNavigate()

    const handleCreate = async () => {
        if ( !name.trim()) {
            setError("Name is required")
            return
        }
        try {
            await axios.post("http://localhost:8080/api/authors", {name});
            navigate("/authors/list");
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className="form-container">
        <div className="form-row">
            <div className="form-label">Name:</div>
            <input
                type="text"
                value={name}
                onChange={(e) => {setName(e.target.value); setError("")}}
            />
        </div>
        {eror && <div className="error-msg">{eror}</div>}
        <div className="submit-area">
            <button onClick={handleCreate} className='btn-create'>Create</button>
        </div>
    </div>
  )
}

export default AuthorCreate
