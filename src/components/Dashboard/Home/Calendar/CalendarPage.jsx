import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BottomMenu from "../../BottomMenu/BottomMenu";

const API_URL = "http://[::1]:3001/events"; // Cambia esto por la URL real de tu backend

const CalendarPage = () => {
  moment.locale("es");
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    location: "",
    description: "",
  });

  const messages = {
    today: "Hoy",
    previous: "Anterior",
    next: "Siguiente",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay eventos en este rango",
    showMore: (total) => `+ Ver más (${total})`,
  };

  // 🟢 Obtener eventos del backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);
        const formattedEvents = data.map((event) => ({
          id: event.id,
          title: event.title,
          location: event.location,
          description: event.description,
          start: new Date(event.start._seconds * 1000),
          end: new Date(event.end._seconds * 1000),
        }));
        console.log(formattedEvents);
        setEvents(formattedEvents);
      } catch (error) {
        console.log("Error al obtener eventos:", error);
      }
    };

    fetchEvents();
  }, []);

  // 🔵 Agregar un evento
  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) return;

    const eventToSave = {
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      location: newEvent.location,
      description: newEvent.description,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventToSave),
      });

      if (!response.ok) throw new Error("Error al agregar evento");

      const savedEvent = await response.json();
      setEvents([
        ...events,
        {
          ...savedEvent,
          start: new Date(savedEvent.start),
          end: new Date(savedEvent.end),
        },
      ]);
      setShowModal(false);
    } catch (error) {
      console.error("Error al agregar evento:", error);
    }
  };

  // 🟡 Eliminar un evento
  const handleDeleteEvent = async (eventId) => {
    try {
      await fetch(`${API_URL}/${eventId}`, { method: "DELETE" });
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error al eliminar evento:", error);
    }
  };

  return (
    <>
      <BottomMenu />
      <div className="h-screen p-5 bg-white">
        <div className="p-4 flex items-center gap-2 border-b-2 mb-5 border-gray-200 pb-4">
          <img src="./src/assets/CalendarIcon.png" alt="calendaricon" />
          <h1 className="text-2xl font-bold">Calendario</h1>
        </div>
        <div className="w-full max-w-sm h-auto min-h-[300px] md:h-[386px] rounded-lg border border-[var(--Stroke,#DDE1E6)] p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            className="bg-white p-5 rounded shadow w-l"
            messages={messages}
            onDoubleClickEvent={(event) => handleDeleteEvent(event.id)} // Doble clic para eliminar
          />
          <div>
            <button className="w-[156px] h-[48px] rounded-[10px] border border-black px-4 py-3 gap-[10px] text-black">
              Bloquear
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="w-40 h-12 rounded-lg px-4 py-3 bg-[var(--bg-primary)] text-[var(--bg-secundary)]"
            >
              Agendar
            </button>
          </div>
        </div>

        {showModal && (
          <div className="fixed z-50 inset-0 bg-gray-800/50 backdrop-blur flex justify-center items-center">
            <div className="bg-white w-md p-5 rounded-xl">
              <div className="p-4 flex items-center gap-2 border-b-2 mb-5 border-gray-200 pb-4">
                <img
                  src="./src/assets/CalendarIconBlack.png"
                  alt="calendaricon"
                />
                <h1 className="poppins-bold justify-center">Nuevo Evento</h1>
              </div>
              <input
                type="text"
                placeholder="Agregar título"
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="border-b border-gray-300 p-2 w-full my-2"
              />
              <input
                type="text"
                placeholder="Agregar ubicación"
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                className="border-b border-gray-300 p-2 w-full my-2"
              />
              <input
                type="datetime-local"
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start: e.target.value })
                }
                className="border p-2 w-full my-2"
              />
              <input
                type="datetime-local"
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end: e.target.value })
                }
                className="border p-2 w-full my-2"
              />
              <div className="flex flex-col gap-1">
                <label htmlFor="descripcion" className="noto-sans-regular">
                  Descripción
                </label>
                <input
                  id="descripcion"
                  type="text"
                  placeholder="Agrega una breve descripción"
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  className="p-2 w-full my-2 rounded-[10px] h-[128px] border border-gray-300 noto-sans-regular focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-[156px] h-[48px] rounded-[10px] border border-black px-4 py-3 gap-[10px] text-black"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddEvent}
                  className="w-40 h-12 rounded-lg px-4 py-3 bg-[var(--bg-primary)] text-[var(--bg-secundary)]"
                >
                  Agendar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CalendarPage;
