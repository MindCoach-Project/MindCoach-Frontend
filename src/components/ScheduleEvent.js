const ScheduleEvent = ({ startTime, endTime, title }) => {
  return (
    <div className="rounded-lg p-3 text-gray-800 border border-orange flex flex-col gap-12">
      <div className="text-16 p-2 bg-greenDark text-white rounded-md">
        {startTime} - {endTime} {title}
      </div>
    </div>
  );
};
export default ScheduleEvent;
