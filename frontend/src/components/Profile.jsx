  import React, { useEffect, useState } from 'react';
  import { useNavigate, useLocation } from 'react-router-dom';
  import { collection, query, where, getDocs } from 'firebase/firestore';
  import { db } from '../components/config/firebase'; // Import your Firebase configuration
  import './styles/Profile.css'; // Add your CSS styles in this file

  const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state.userId;
    const [username, setUsername] = useState('');

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userRef = collection(db, "Data");
          const q = query(userRef, where("Username", "==", userId));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUsername(userData.username);
          } else {
            console.error("User not found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }, [userId]);

    const handleLogout = () => {
      // Implement logout functionality here
      navigate('/');
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="profile-container">
        <h1 className="profile-title">Profile</h1>
        <div className="user-info">
          <p className="username">{userId}</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  };

  export default ProfilePage;
