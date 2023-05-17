import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BlogPostManager() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch blog posts from the backend API on component mount
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/blogPosts');
      setBlogPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createBlogPost = async () => {
    try {
      const response = await axios.post('http://localhost:3000/blogPosts', { title, content });
      setBlogPosts([response.data, ...blogPosts]); // Prepend the new post to the existing array
      setTitle('');
      setContent('');
    } catch (error) {
      console.log(error);
    }
  };
  
  const updateBlogPost = async (postId, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/blogPosts/${postId}`, updatedData);
      const updatedPosts = blogPosts.map((post) => (post._id === postId ? { ...post, ...updatedData } : post));
      setBlogPosts(updatedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlogPost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/blogPosts/${postId}`);
      const updatedPosts = blogPosts.filter((post) => post._id !== postId);
      setBlogPosts(updatedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Blog Post Manager</h2>

      {/* Create Form */}
      <form onSubmit={createBlogPost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Create Post</button>
      </form>

      <ul>
  {blogPosts.map((post) => (
    <li key={post._id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <button onClick={() => updateBlogPost(post._id, { title: 'Updated Title' })}>
        Edit
      </button>
      <button onClick={() => deleteBlogPost(post._id)}>Delete</button>
    </li>
  ))}
</ul>
</div>
  )
}

