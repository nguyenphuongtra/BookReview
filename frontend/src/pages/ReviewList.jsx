import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const ReviewList = () => {
  const [reviews, setReviews] = useState([])

    const fetchReviews = async () => {
        const res = await axios.get("http://localhost:8080/api/reviews");
        setReviews(res.data)
    };
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchReviews();
    }, [])
    
     const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            await axios.delete(`http://localhost:8080/api/reviews/${id}`);
            fetchReviews();
        }
    };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Review</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id}>
              <td>{review.book.title}</td>
              <td>{review.book?.author?.name}</td>
              <td>{review.reviewText}</td>
              <td>
                <div className="acction-cell">
                    <button className='btn-icon'></button>
                    <button onClick={() => handleDelete(review.id)} className='btn-icon'>Delete</button>
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

export default ReviewList
