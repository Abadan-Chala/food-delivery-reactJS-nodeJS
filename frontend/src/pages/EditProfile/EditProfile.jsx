import React, { useState, useContext } from 'react';
import './EditProfile.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const EditProfile = () => {
  const { url, setProfileImage } = useContext(StoreContext);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      const response = await axios.post(`${url}/api/user/upload-profile-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        setProfileImage(response.data.profileImage);
        alert('Profile image updated successfully!');
      } else {
        console.error('Server response:', response.data);
        alert('Failed to update profile image.');
      }
    } catch (error) {
      console.error('Error uploading profile image:', error.response ? error.response.data : error.message);
      alert('An error occurred while uploading the profile image.');
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default EditProfile;