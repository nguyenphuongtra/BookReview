import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const BookCreate = () => {
    const [title, setTitle] = useState("")
    const [authorId, setAuthorId] = useState("")
    const [authors, setAuthors] = useState([])
    const [eror, setError] = useState({title: "", author: ""});
    const navigate = useNavigate()

    useEffect(() => {
        const api_url = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        axios.get(`${api_url}/api/authors`).then(res => setAuthors(res.data))
    }, [])
    
    const handleCreate = async () => {
        let hasError = false;
        const newError = {title: "", author: ""};
        if (!title.trim()) {
            newError.title = "Title is required";
            hasError = true;
        }
        if (!authorId) {
            newError.author = "Author is required";
            hasError = true;
        }
        setError(newError);
        if (hasError) return;

        try {
            const api_url = import.meta.env.VITE_API_URL || 'http://localhost:8080';
            await axios.post(`${api_url}/api/books`, {title, author: {id: authorId}});
            navigate("/books/list");
        } catch (error) {
            console.error("Error creating book:", error);
        }
    };

  return (
    <div className="form-container">
        <div className="form-row">
            <div className="form-label">Title:</div>
            <input
                type="text"
                value={title}
                onChange={(e) => {setTitle(e.target.value); setError({...eror, title: ""})}}
            />
        </div>
        {eror.title && <div className="error-msg">{eror.title}</div>}
        
        <div className="form-row">
            <div className="form-label">Author:</div>
            <select
                value={authorId}
                onChange={(e) => {setAuthorId(e.target.value); setError({...eror, author: ""})}}
            >
                <option value="">Select an author</option>
                {authors.map(author => (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                ))}
            </select>
        </div>
        {eror.author && <div className="error-msg">{eror.author}</div>}
        <div className="submit-area">
            <button onClick={handleCreate} className='btn-create'>Create</button>
        </div>
    </div>
  )
}

export default BookCreate
