import React, { useState } from 'react';
import axios from 'axios';
import './Styles.css'

export default function SearchComponent(props) {
  const [email, setEmail] = useState('');
  const [results, setResults] = useState([]);
  const handleSearch = async () => {
    try {
        setEmail(props.email);
     const response = await axios.get(`http://localhost:3000/alluser/${props.email}`);
      setResults(response.data);
    } catch (error) {
      console.error('An error occurred while searching for users:', error);
    }
  };

  return (
    <div>
      <input type="text" value={email}/>
      <button onClick={handleSearch} style={{ padding: '8px 16px', marginTop: '20px' }}>Search</button>

      {results.length > 0 ? (
       <ul>
       {results.map((user) => (
         <li key={user._id}>
           <h4>User Name is: {user.user}</h4>
           <h4>Title of Blog: {user.title}</h4>
           <h4>Content of Blog: {user.content}</h4>
           <img src={`http://localhost:3000/uploads/${user.image}`} alt={user.title} />
     
           {user.comments.length > 0 ? (
             <ul>
               {user.comments.map((comment, index) => (
                 <li key={index}>
                   {props.email}: {comment}
                 </li>
               ))}
             </ul>
           ) : (
             <p>No comments yet.</p>
           )}
         </li>
       ))}
     </ul>
     
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
