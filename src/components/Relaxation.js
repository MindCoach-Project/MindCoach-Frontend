import { Link } from "react-router-dom";

const relaxationItems = [
  { title: "Counseling", icon: "../../assets/images/counseling.png", link: "https://www.neliti.com/publications/324460/model-konseling-behavioral-untuk-anak-penderita-attention-deficit-hyperactivity", bgColor: "#C5D8A4" },
  { title: "Meditation", icon: "../../assets/images/meditation.png", link: "https://www.webmd.com/add-adhd/adhd-mindfulness-meditation-yoga", bgColor: "#FFE1E1" },
  { title: "Articles", icon: "../../assets/images/articles.png", link: "https://goinswriter.com/adhd-writing-habit/", bgColor: "#FFDAB8" },
];

const Relaxation = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-20 font-regular text-brown text-center">Relaxation</h2>
      <div className="flex justify-between">
        {relaxationItems.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="flex flex-col items-center p-4 rounded-lg min-w-[130px]"
            style={{ backgroundColor: item.bgColor }}
          >
            <img src={item.icon} alt={item.title} className="w-16 h-16 mb-2" />
            <span className="text-lg font-medium text-center">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Relaxation;
