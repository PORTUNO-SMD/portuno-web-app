import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

const Schedule = ({ rooms, selectClasses }) => {
  const currentDate = new Date();
  const startDate = currentDate.toISOString().split("T")[0];
  const events = [];

  selectClasses.forEach((classItem, index) => {
    const startTime = `T${classItem.start_hour}`;
    const endTime = `T${classItem.start_hour}`;

    events.push({
      id: index + 1,
      text: classItem.subject,
      start: startDate + startTime,
      end: startDate + endTime,
      barColor: "#fcb711",
      resource: "Sala 01"
    });
  });

  const state = {
    viewType: "Resources",
    startDate: startDate,
    columns: rooms.map(room => ({ name: room, id: room })),
    events: events
  };

  return (
    <DayPilotCalendar {...state} />
  );
};

export default Schedule;
