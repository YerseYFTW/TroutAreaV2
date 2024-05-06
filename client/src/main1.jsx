import React, { useState } from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Conectat from './routes/Conectat.jsx';
import './index.css';

function Main() {
  // Define state to store form data
  const [formData, setFormData] = useState({});

  // Function to handle form submission and update form data
  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  // Render the application using ReactDOM.createRoot
  return(
    <Router>
      <Routes>
        {/* Route to App component */}
        <Route 
          path="/" 
          element={<App setFormData={handleFormSubmit} />} 
        />
        {/* Route to Conectat component */}
        <Route
          path="/con"
          element={<Conectat formData={formData} />}
        />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default Main;
