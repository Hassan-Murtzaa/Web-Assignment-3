import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);

      await axios.put(`http://localhost:3000/blog/${title}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Clear the form after successful submission
      setTitle('');
      setContent('');
      setImage(null);

      setMessage("File Successfully Submitted"); // Set the response data in the component state
    } catch (error) {
      setMessage("File Not Successfully Submitted"); // Set the response data in the component state
      console.error(error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginLeft: '5px' }}>
        <label htmlFor="title">Search by Title:</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} required />
      </div>
      <div style={{ marginLeft: '5px', marginTop: '15px' }}>
        <label htmlFor="content">Content:</label>
        <textarea id="content" value={content} onChange={handleContentChange} required />
      </div>
      <div style={{ marginLeft: '5px', marginTop: '15px' }}>
        <label htmlFor="image">Select Image:</label>
        <input type="file" id="image" accept="image/*" onChange={handleImageChange} required />
      </div>
      <button type="submit" style={{ padding: '8px 16px', marginTop: '20px' }}>Submit</button>

      <h1>{message}</h1>
    </form>
  );
};

export default BlogForm;