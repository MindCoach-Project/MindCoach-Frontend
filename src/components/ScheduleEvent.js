const ScheduleEvent = ({ startTime, endTime, title }) => {
  return (
      <div className="text-16 p-2 bg-greenDark text-white rounded-md">
        {startTime} - {endTime} {title}
      </div>
  
  );
};
export default ScheduleEvent;
