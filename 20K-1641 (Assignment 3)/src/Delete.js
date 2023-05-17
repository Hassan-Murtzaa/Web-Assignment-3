import React, { useState } from 'react';
import axios from 'axios';

const BlogDeleteForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(`http://localhost:3000/blog/${encodeURIComponent(title)}`);

      setTitle('');
      setMessage('Blog post deleted successfully');
    } catch (error) {
      setMessage('Error deleting blog post');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} required />
      </div>
      <button type="submit" style={{ padding: '8px 16px', marginTop: '20px' }}>Delete</button>

      <h1>{message}</h1>
    </form>
  );
};

export default BlogDeleteForm;
