import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './config/firebase'; // Make sure to import your Firebase Firestore instance
import './styles/Login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message
    try {
      const response = await loginUser(username, password); // Call the loginUser function
      console.log("User ID:", response.userId);
      navigate('/menu', { state: { userId: username } }); // Redirect to the menu page after successful login
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrorMessage(error.message);
    }
  };

  const loginUser = async (username, password) => {
    try {
      const collectionRef = collection(db, "Data"); // Reference to your Data collection
      const q = query(collectionRef, where("Username", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        if (userData.Password === password) {
          console.log("User Found");
          return { userId: querySnapshot.docs[0].id };
        } else {
          console.log(userData.Password);
          throw new Error("Incorrect Password");
        }
      } else {
        throw new Error("User Does Not Exist");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <Link to="/signup" className="create-account">CREATE<br />ACCOUNT</Link>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-label="Username"
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
        />
        <br />
        {errorMessage && <span className="error-message">{errorMessage}</span>}
        <br />
        <input type="submit" value="Login" className="login-button" />
      </form>
    </div>
  );
};

export default LoginPage;
