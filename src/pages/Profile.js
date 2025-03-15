import React, { useState, useEffect, useRef} from "react";
import { Edit, Camera, LogOut } from "lucide-react";
import EditProfileModal from "../components/Profile/EditProfileModal";
import TaskStatusChart from "../components/Profile/TaskStatusChart";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { site_path } from "../utils";
import { getTrackingWeek } from "../api/task";

const ProfilePage = () => {
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // ✅ Lấy profile từ localStorage khi load trang
  const getStoredProfile = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          username: "John Doe",
          email: "john.doe@example.com",
          dateOfBirth: "",
          imageUrl: "/images/users/default-user",
        };
  };

  const [profileData, setProfileData] = useState(getStoredProfile);
  const [taskData, setTaskData] = useState([]);
  const [formData, setFormData] = useState({ ...profileData });

  const handleEditClick = () => {
    setFormData({ ...profileData });
    setIsEditModalOpen(true);
  };

  // ✅ Lưu dữ liệu vào localStorage khi user cập nhật profile
  const handleFormSubmit = (updatedData) => {
    setProfileData(updatedData);
    localStorage.setItem("user", JSON.stringify(updatedData)); // 🔥 Lưu vào localStorage
    setIsEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if(!file) return

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "first_time_cloudiary");
    data.append("cloud_name", "dzxszhmvr");

    const res = await fetch("https://api.cloudinary.com/v1_1/dzxszhmvr/image/upload", {
      method: "POST",
      body: data,
    });
    const uploadedUrlImage = await res.json();

    console.log("url from cloudiary", uploadedUrlImage.url)

    const updatedProfile = {
      ...profileData,
      imageUrl:uploadedUrlImage.url,
    };

    setProfileData(updatedProfile);

    localStorage.setItem("user", JSON.stringify(updatedProfile)); 
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTimeout(() => navigate(site_path.INTRO), 1000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getTrackingWeek();
        const fullWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const formattedData = fullWeek.map((day) => {
          const found = apiData.find((item) => item.date === day);
          return {
            day,
            "To Do": found ? found.toDo : 0,
            "In Progress": found ? found.inProgress : 0,
            Done: found ? found.done : 0,
          };
        });

        setTaskData(formattedData);
      } catch (error) {
        console.error("Error fetching task tracking data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between">
      <div className="relative">
  <img
    src={profileData.imageUrl}
    alt="Profile"
    className="w-28 h-28 rounded-full object-cover"
  />
  
  {/* Input file ẩn */}
  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    onChange={handleImageChange}
    className="hidden"
  />

  {/* Nút Camera để mở input file */}
  <button
    onClick={() => fileInputRef.current.click()}
    className="absolute bottom-7 right-0 bg-aqua text-white p-2 rounded-full"
  >
    <Camera size={16} />
  </button>
</div>


        <div className="flex flex-col">
          <div className="space-y-2">
            <h2 className="text-xl font-medium">{profileData.username}</h2>
            <p className="text-gray-600">
              {profileData.dateOfBirth
                ? new Date(profileData.dateOfBirth).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="text-gray-600">{profileData.email}</p>
            <div className="flex gap-2">
              <Button
                onClick={handleEditClick}
                className="mt-4 flex items-center gap-1"
              >
                <Edit size={16} />
                Update
              </Button>
              <Button
                onClick={handleLogoutClick}
                className="mt-4 flex items-center gap-1 bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <TaskStatusChart data={taskData} />

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        onChange={setFormData}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default ProfilePage;
