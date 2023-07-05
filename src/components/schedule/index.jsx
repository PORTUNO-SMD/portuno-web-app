import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

const Schedule = () => {
  const currentDate = new Date(); // Obtém a data atual
  const startDate = currentDate.toISOString().split("T")[0]; // Converte para string no formato "YYYY-MM-DD"
  const event1StartTime = "T09:00:00"; // Hora de início do evento 1
  const event1EndTime = "T13:00:00"; // Hora de término do evento 1
  const event2StartTime = "T14:00:00"; // Hora de início do evento 2
  const event2EndTime = "T15:00:00"; // Hora de término do evento 2

  const state = {
    viewType: "Resources",
    startDate: startDate,
    columns: [
      { name: "Room 1", id: "R1" },
      { name: "Room 2", id: "R2" },
      { name: "Room 3", id: "R3" },
      { name: "Room 4", id: "R4" },
      { name: "Room 5", id: "R5" },
      { name: "Room 6", id: "R6" },
      { name: "Room 7", id: "R7" },
    ],
    events: [
      {
        id: 1,
        text: "Event 1",
        start: startDate + event1StartTime,
        end: startDate + event1EndTime,
        barColor: "#fcb711",
        resource: "R1"
      },
      {
        id: 2,
        text: "Event 2",
        start: startDate + event2StartTime,
        end: startDate + event2EndTime,
        barColor: "#f37021",
        resource: "R2"
      },
    ]
  };

  return (
    <DayPilotCalendar
      {...state}
    />
  );
};

export default Schedule;
