import React, { useEffect, useState } from "react";
import BottomMenu from "../../BottomMenu/BottomMenu";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/events";

const diasSemana = ["L", "M", "X", "J", "V", "S", "D"];

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    location: "",
    description: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  // 🟢 Obtener eventos del backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const formattedEvents = data.map((event) => ({
          id: event.id,
          title: event.title,
          location: event.location,
          description: event.description,
          start: new Date(event.start._seconds * 1000 || event.start),
          end: new Date(event.end._seconds * 1000 || event.end),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.log("Error al obtener eventos:", error);
      }
    };

    fetchEvents();
  }, []);

  // 🔵 Agregar evento
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

  const renderMensual = () => {
    const diasMes = Array.from(
      {
        length: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + 1,
          0
        ).getDate(),
      },
      (_, i) => i + 1
    );

    const eventosDelDia = events.filter(
      (ev) =>
        new Date(ev.start).toDateString() === selectedDate.toDateString()
    );

    return (
      <div className="border border-gray-400 rounded-2xl p-4 mx-1 mt-4 bg-white shadow-lg">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2">
          <button
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() - 1,
                  1
                )
              )
            }
            className="text-[#714dbf] text-xl"
          >
            ❮
          </button>
          <span className="text-lg font-semibold">
            {selectedDate.toLocaleDateString("es-ES", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() + 1,
                  1
                )
              )
            }
            className="text-[#714dbf] text-xl"
          >
            ❯
          </button>
        </div>

        <div className="grid grid-cols-7 text-center border-b border-gray-300 pb-2 mt-2">
          {diasSemana.map((dia, idx) => (
            <div key={idx} className="font-bold text-sm text-gray-500">
              {dia}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 text-center gap-1 mt-2">
          {diasMes.map((dia) => {
            const date = new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              dia
            );
            const isSelected = selectedDay === dia;
            const eventosDelDia = events.filter(
              (ev) =>
                new Date(ev.start).toDateString() === date.toDateString()
            );

            return (
              <div
                key={dia}
                onClick={() => {
                  setSelectedDay(dia);
                  setSelectedDate(date);
                }}
                className={`relative p-2 cursor-pointer rounded-lg ${isSelected
                  ? "bg-[#cbb4ff] text-white"
                  : "hover:bg-gray-200 text-black"
                  }`}
              >
                <div>{dia}</div>
                {eventosDelDia.length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#714dbf]"></span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          <h2 className="font-bold mb-2">Hoy</h2>
          {eventosDelDia.length ? (
            <ul className="space-y-2">
              {eventosDelDia.map((e) => (
                <li key={e.id} className="border p-2 rounded shadow">
                  <p className="font-semibold">{e.title}</p>
                  <p className="text-sm">
                    {new Date(e.start).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(e.end).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay eventos hoy.</p>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button className="w-[156px] h-[48px] rounded-[10px] border border-black px-4 py-3 text-black">
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
    );
  };

  return (
    <>
      <BottomMenu />
      <div className="min-h-screen bg-white">
        <div className="border-b-2 border-gray-200 mb-5 pb-4 py-5 px-5 flex items-center gap-2">
          <img src="./src/assets/CalendarIcon.png" alt="calendaricon" />
          <h1 className="text-2xl font-bold">Calendario</h1>
        </div>

        {renderMensual()}

        {/* Modal */}
        {showModal && (
          <div className="fixed z-50 inset-0 bg-gray-800/50 backdrop-blur flex justify-center items-center">
            <div className="bg-white w-md p-5 rounded-xl max-w-md w-full">
              <div className="p-4 flex items-center gap-2 border-b-2 mb-5 border-gray-200 pb-4">
                <img src="./src/assets/CalendarIconBlack.png" alt="calendaricon" />
                <h1 className="font-bold">Nuevo Evento</h1>
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
              <label className="block text-sm font-semibold">Empieza</label>
              <input
                type="datetime-local"
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start: e.target.value })
                }
                className="border p-2 w-full my-2"
              />
              <label className="block text-sm font-semibold">Termina</label>
              <input
                type="datetime-local"
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end: e.target.value })
                }
                className="border p-2 w-full my-2"
              />
              <label className="block text-sm font-semibold">Descripción</label>
              <textarea
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                className="border p-2 w-full my-2 h-24 resize-none"
              ></textarea>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-[156px] h-[48px] rounded-[10px] border border-black px-4 py-3 text-black"
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
