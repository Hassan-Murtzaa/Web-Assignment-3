import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styles.css'

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get('http://localhost:3000/read');
      setBlogs(response.data);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Blog List</h2>
      {blogs.map((blog) => (
        <div key={blog._id}>
            <h3>The User:{blog.user}</h3>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <img src={`http://localhost:3000/uploads/${blog.image}`} alt={blog.title} />
          {blog.comments.length > 0 ? (
             <ul>
               {blog.comments.map((comment, index) => (
                 <li key={index}>
                   {blog.email}: {comment}
                 </li>
               ))}
             </ul>
           ) : (
             <p>No comments yet.</p>
           )}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
