export default function TaskTemplateCard ({ icon, title, onClick, className = "" }) {
    return (
      <div
        className={`${className} flex flex-col items-center justify-center border rounded-lg p-4 shadow-md cursor-pointer transition`}
        onClick={onClick}
      >
        <div className="mb-2 flex justify-center">{icon}</div>
        <h3 className="text-lg font-medium text-center">{title}</h3>
      </div>
    );
  }
  