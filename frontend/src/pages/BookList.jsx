import React from 'react'
import { useEffect ,useState } from 'react'
import axios from 'axios'


const BookList = () => {

    const [books, setBooks] = useState([])
    
    const fetchBooks = async () => {
        const res = await axios.get("http://localhost:8080/api/books");
        setBooks(res.data)
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchBooks();
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            await axios.delete(`http://localhost:8080/api/books/${id}`);
            fetchBooks();
        }
    };

  return (
    <div>
        <table className='custom-table'>
            <thead>
                <tr>
                    <th style={{width: '60px'}}>No</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th style={{width: '100px'}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => (
                    <tr key={book.id}>
                        <td>{index + 1}</td>
                        <td>{book.title}</td>
                        <td>{book.author?.name || 'Unknown Author'}</td>
                        <td>
                            <div className="actions-cell">
                                <button className='btn-icon'></button>
                                <button onClick={() => handleDelete(book.id)} className='btn-icon'>Delete</button>
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

export default BookList