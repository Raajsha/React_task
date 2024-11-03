// /src/components/Main.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../authContext';
import axios from 'axios';
import "./mainpage.css";

const Mainpage = () => {
  const { user, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.put('https://api.example.com/user/update', formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Failed to update profile.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div className='mainpage'>
    <div className='update_logout'>
      {!isEditing && (
        <button onClick={toggleEdit}>Update Details</button>
      )}
      <div className='update_details'>
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Save Changes</button>
          <button type="button" onClick={toggleEdit} style={{ marginLeft: '10px' }}>Cancel</button>
        </form>
      )}

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
      
      <button onClick={logout}>Logout</button> 
      </div>
    <div>
      <h1><span className='emoji'>&#127881;</span>Welcome to our website, {user?.username || 'User'}<span className='emoji'>&#127881;</span></h1>
    </div>
    </div>
    
  );
};

export default Mainpage;


