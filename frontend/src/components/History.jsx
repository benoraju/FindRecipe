import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './config/firebase'; // Import your Firebase configuration
import './styles/History.css'; // Add your CSS styles in this file

const HistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.userId;

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const searchDataRef = collection(db, "SearchData");
        const q = query(searchDataRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const historyList = [];
        let searchNumber = 1;
        querySnapshot.forEach(doc => {
          const data = doc.data().search;
          const formattedHistory = data.map((item, index) => (
            <li key={`${doc.id}-${index}`}>
              <strong className="search-number">Search {searchNumber++}:</strong> {item}
            </li>
          ));
          historyList.push(formattedHistory);
        });
        setSearchHistory(historyList);
      } catch (error) {
        console.error("Error fetching search history:", error);
      }
    };

    fetchSearchHistory();
  }, [userId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="history-container">
      <h1 className="history-title">History</h1>
      <ul className="history-list">
        {searchHistory.map((docHistory, index) => (
          <li key={index}>
            <ul>{docHistory}</ul>
          </li>
        ))}
      </ul>
      <button className="back-btn" onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default HistoryPage;
