import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './config/firebase'; // Make sure to import your Firebase Firestore instance
import './styles/Signup.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { firstname, lastname, username, password } = formData;

    if (firstname && lastname && username && password) {
      try {
        // Add user to the Data collection
        const userRef = await addDoc(collection(db, "Data"), {
          FirstName: firstname,
          LastName: lastname,
          Username: username,
          Password: password, // Remember to hash the password in a real application
        });
        console.log("User signed up with ID:", userRef.id);
        setSuccess(true);
        setTimeout(() => {
          navigate('/menu', { state: { userId: username } });
        }, 1000); // Redirect to /menu after 1 second
      } catch (error) {
        setError("Error adding document: " + error.message);
        console.error("Error adding document: ", error);
      }
    } else {
      setError("Please fill in all fields");
      console.error("Please fill in all fields");
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form id="signup-form" onSubmit={handleSignUp}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="username"
          placeholder="Email"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <input type="submit" value="Create Account" />
        {success && (
          <>
            <p className="success-message">Account created successfully!</p>
            <span className="success-icon">&#10004;</span>
          </>
        )}
        {error && (
          <>
            <p className="error-message">{error}</p>
          </>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
