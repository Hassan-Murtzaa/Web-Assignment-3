import React, { useState } from 'react';
import axios from 'axios';
import './Styles.css'


export default function SearchComponent(props) {
  const [title, setTitle] = useState('');
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/blog/${title}`);
      setBlog(response.data);
    } catch (error) {
      console.error('An error occurred while searching for the blog post:', error);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = async () => {
    try {
      await axios.post(`http://localhost:3000/comment/${blog._id}`, { comment });
      setMessage('Comment added successfully');
      setComment('');

      // Refresh the blog post after adding the comment
      const response = await axios.get(`http://localhost:3000/blog/${title}`);
      setBlog(response.data);
    } catch (error) {
      console.error('An error occurred while adding the comment:', error);
    }
  };

  return (
    <div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleSearch} style={{ padding: '8px 16px', marginTop: '20px' }}>Search</button>

      {blog ? (
        <div>
          <h4>User Name: {blog.user}</h4>
          <h4>Title: {blog.title}</h4>
          <h4>Content: {blog.content}</h4>
          <img src={`http://localhost:3000/uploads/${blog.image}`} alt={blog.title} />

          <div>
            <h5>Comments:</h5>
            {blog.comments && blog.comments.length > 0 ? (
              <ul>
                {blog.comments.map((comment, index) => (
                  <li key={index}>{props.email}: {comment}</li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          <div>
            <input type="text" value={comment} onChange={handleCommentChange} placeholder="Add a comment" />
            <button onClick={handleAddComment}>Add Comment</button>
            <p>{message}</p>
          </div>
        </div>
      ) : (
        <p>No blog post found.</p>
      )}
    </div>
  );
}
