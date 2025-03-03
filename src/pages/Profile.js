// ProfilePage.js
import React, { useState } from 'react';
import { Edit, Camera } from 'lucide-react';
import EditProfileModal from '../components/Profile/EditProfileModal';
import TaskStatusChart from '../components/Profile/TaskStatusChart';
import { Button } from '../components/ui/Button';
const ProfilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    dateOfBirth: '1990-01-01',
    email: 'john.doe@example.com',
    profileImage: '/api/placeholder/150/150'
  });

  // Temporary state for form data
  const [formData, setFormData] = useState({...profileData});
  
  // Simulated chart data for the week
  const taskData = [
    { day: 'M', 'To Do': 3, 'In Progress': 4, 'Done': 5 },
    { day: 'T', 'To Do': 2, 'In Progress': 5, 'Done': 6 },
    { day: 'W', 'To Do': 4, 'In Progress': 3, 'Done': 7 },
    { day: 'T', 'To Do': 3, 'In Progress': 6, 'Done': 5 },
    { day: 'F', 'To Do': 5, 'In Progress': 4, 'Done': 4 },
    { day: 'S', 'To Do': 2, 'In Progress': 3, 'Done': 8 },
    { day: 'S', 'To Do': 4, 'In Progress': 5, 'Done': 6 },
  ];
  

  const handleEditClick = () => {
    setFormData({...profileData});
    setIsEditModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (updatedData) => {
    setProfileData(updatedData);
    setIsEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleImageChange = () => {
    const imageId = Math.floor(Math.random() * 1000);
    setProfileData(prev => ({
      ...prev,
      profileImage: `/api/placeholder/150/150?id=${imageId}`
    }));
  };

  return (
    <div>
      {/* Section 1: Top Section */}
      <div className="flex flex-row justify-between">
          {/* Profile Image */}
          <div className="relative">
            <img
              // src={profileData.profileImage}
              src="https://cdn-icons-png.flaticon.com/512/8792/8792047.png"
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover"
            />
            <button 
              onClick={handleImageChange}
              className="absolute bottom-7 right-0 bg-aqua text-white p-2 rounded-full"
            >
              <Camera size={16} />
            </button>
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <div className="space-y-2">
              <h2 className="text-xl font-medium">{profileData.name}</h2>
              <p className="text-gray-600">
                {new Date(profileData.dateOfBirth).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                {profileData.email}
              </p>
              <Button
                onClick={handleEditClick}
                className="mt-4 flex items-center gap-2"
              >
                <Edit size={16} />
                Update
              </Button>
            </div>
          </div>
      </div>

      {/* Section 2: Bottom Section */}
      <TaskStatusChart data={taskData} />

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default ProfilePage;