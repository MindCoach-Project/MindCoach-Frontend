import { useNavigate } from "react-router-dom";

const relaxationItems = [
  { 
    title: "Counseling", 
    icon: "../../assets/images/counseling.png", 
    link: "https://www.webmd.com/balance/grief-counseling", 
    bgColor: "#C5D8A4" 
  },
  { 
    title: "Meditation", 
    icon: "../../assets/images/meditation.png", 
    link: "https://www.webmd.com/add-adhd/adhd-mindfulness-meditation-yoga", 
    bgColor: "#FFE1E1" 
  },
  { 
    title: "Articles", 
    icon: "../../assets/images/articles.png", 
    link: "https://blogs.webmd.com/psoriasis/20240118/psoriasis-my-story-and-how-i-approach-it", 
    bgColor: "#FFDAB8" 
  },
];

const Relaxation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-20 font-regular text-brown text-center">Relaxation</h2>
      <div className="flex justify-between gap-4">
        {relaxationItems.map((item) => (
          <button
            key={item.title}
            onClick={() => navigate(`/blog/${encodeURIComponent(item.link)}`)}
            className="w-1/3 flex flex-col items-center p-2 rounded-lg"
            style={{ backgroundColor: item.bgColor }}
          >
            <img src={item.icon} alt={item.title} className="w-16 h-16 mb-2" />
            <span className="text-16 font-medium text-center">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Relaxation;
