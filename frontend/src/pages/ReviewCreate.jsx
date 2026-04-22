import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const ReviewCreate = () => {
    const [bookId, setBookId] = useState("")
    const [reviewText, setReviewText] = useState("")
    const [books, setBooks] = useState([])
    const [eror, setError] = useState({book: "", review: ""});
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get("http://localhost:8080/api/books").then(res => setBooks(res.data))
    }, [])
    const handleCreate = async () => {
        let hasError = false;
        const newError = {book: "", review: ""};
        if (!bookId) {
            newError.book = "Book is required";
            hasError = true;
        }
        if (!reviewText.trim()) {
            newError.review = "Review text is required";
            hasError = true;
        }
        setError(newError);
        if (hasError) return;
        
        try {
            await axios.post("http://localhost:8080/api/reviews", {reviewText, book: {id: bookId}});
            navigate("/reviews/list");
        } catch (error) {
            console.error("Error creating review:", error);
        }
    };

  return (
    <div className="form-container">
        <div className="form-row">
            <div className="form-label">Book:</div>
            <select
                value={bookId}
                onChange={(e) => {setBookId(e.target.value); setError({...eror, book: ""})}}
            >
                <option value="">Select a book</option>
                {books.map(book => (
                    <option key={book.id} value={book.id}>
                        {book.title}
                    </option>
                ))}
            </select>
        </div>
        {eror.book && <div className="error-msg">{eror.book}</div>}
        
        <div className="form-row">
            <div className="form-label">Review:</div>
            <textarea
                value={reviewText}
                onChange={(e) => {setReviewText(e.target.value); setError({...eror, review: ""})}}
            />
        </div>
        {eror.review && <div className="error-msg">{eror.review}</div>}
        
        <div className="submit-area">
            <button onClick={handleCreate} className='btn-create'>Create</button>
        </div>
    </div>
  )
}

export default ReviewCreate
