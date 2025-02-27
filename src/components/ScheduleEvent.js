const ScheduleEvent = ({ startTime, endTime, title, onClick }) => {
  return (
      <div className="text-16 p-2 bg-[#D6EFD8] text-black rounded-md" onClick={onClick}>
        {startTime} - {endTime} {title}
      </div>
  
  );
};
export default ScheduleEvent;
