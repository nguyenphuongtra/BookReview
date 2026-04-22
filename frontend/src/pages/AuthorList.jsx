import React from 'react'
import { useEffect ,useState } from 'react'
import axios from 'axios'


const AuthorList = () => {

    const [authors, setAuthors] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [editedName, setEditedName] = useState("")

    const fetchAuthors = async () => {
        const api_url = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const res = await axios.get(`${api_url}/api/authors`);
        setAuthors(res.data)
    };
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAuthors();
    }, [])
    
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this author?")) {
            const api_url = import.meta.env.VITE_API_URL || 'http://localhost:8080';
            await axios.delete(`${api_url}/api/authors/${id}`);
            fetchAuthors();
        }
    };
    const handleUpdate = async (id) => {
        if (!editedName.trim()) {
            alert("Name is required");
            return;
        }
        const api_url = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        await axios.put(`${api_url}/api/authors/${id}`, { name: editedName });
        setEditingId(null);
        setEditedName("");
        fetchAuthors();
    };

    
  return (
    <div>
      <table className='custom-table'>
        <thead>
            <tr>
                <th style={{width: '60px'}}>No</th>
                <th>Name</th>
                <th style={{width: '100px'}}>Books</th>
                <th style={{width: '100px'}}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {authors.map((author, index) => (
                <tr key={author.id}>
                    <td>{index + 1}</td>
                    <td>
                        {editingId === author.id ? (
                            <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                className='edit-input'
                            />
                        ) : (
                            author.name
                        )}
                    </td>
                    <td>{author.books?.length || 0}</td>
                    <td>
                        <div className="acctions-cell">
                            {editingId === author.id ? (
                                <>
                                    <button onClick={() => handleUpdate(author.id)} className='btn-update'>Save</button>
                                    <button onClick={() => setEditingId(null)} className='btn-cancel'>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => {setEditingId(author.id); setEditedName(author.name)}} className='btn-edit'>Edit</button>
                                    <button onClick={() => handleDelete(author.id)} className='btn-delete'>Delete</button>
                                </>
                            )}
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination-container" style={{maxWidth: '800px', justifyContent: 'flex-end'}}>
        <button className='page-btn active'>1</button>
        <button className='page-btn'>2</button>
        <button className='page-btn'>3</button>
        <button className='page-btn'>4</button>
      </div>
    </div>
  )
}

export default AuthorList
