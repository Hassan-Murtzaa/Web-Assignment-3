import React, { useState } from 'react';
import './Login.css'
import axios from 'axios';
// import Homepage from './Homepage';
import Buttons from './Buttons';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  function handleSubmitSignUp(event) {
    event.preventDefault();

    // username, email, password
    // Make a POST request to the server
    axios.post('http://localhost:3000/submitSignUp', {
      email: email,
      password: password,
    })
      .then(function (response) {
        console.log(response);
        alert('Successfully SignUP');

      })
      .catch(function (error) {
        console.log(error);
        alert('Error posting data');
      });
  }

  function handleSubmitLogin(event) {
    event.preventDefault();

    // Make a POST request to the server
    axios.post('http://localhost:3000/submitLogin', {
      email: email,
      password: password,
    })
      .then(function (response) {
        console.log(response);
        alert('Successfully Login as UserFound');
        setIsLoggedIn(true);

      })
      .catch(function (error) {
        console.log(error);
        alert('User Not Found');
      });
  }

  // Update

  function handleSubmitUpdate(event) {
    event.preventDefault();

    // Make a POST request to the server to update the user's information
    axios.post('http://localhost:3000/updatePassword', {
      email: email,
      password: password,
    })
      .then(function (response) {
        console.log(response);
        alert('Successfully updated user information');
      })
      .catch(function (error) {
        console.log(error);
        alert('Error updating user information');
      });
  }


  const handleSubmit = (event) => {
    event.preventDefault();
  };


  if (isLoggedIn) {
    return <Buttons email={email} />;
  }


  return (
    <div className="signup-form">
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button onClick={handleSubmitSignUp} type="submit" className="action-button">Sign Up</button>
        <button onClick={handleSubmitLogin} type="submit" className="action-button">Log In</button>
        <button onClick={handleSubmitUpdate} type="submit" className="action-button">Reset Password</button>


      </form>
    </div>
  );
}

export default SignUpForm;