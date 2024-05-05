import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./LabsPage.css"; // Importa tu archivo CSS para los estilos personalizados

function procesarSolicitudes(solicitudes) {
  return solicitudes.map((solicitud) => {
    const { fechaSoli, horaSoli, cantHoras, labNombre, pNombre, pApellido } =
      solicitud;
    const fecha = fechaSoli.split("T")[0];
    const fechaHoraInicio = new Date(`${fecha}T${horaSoli}`);
    const fechaHoraFin = new Date(
      fechaHoraInicio.getTime() + cantHoras * 60 * 60 * 1000
    );

    return {
      title: `${labNombre.trim()} - ${pNombre} ${pApellido}`,
      start: fechaHoraInicio.toISOString(),
      end: fechaHoraFin.toISOString(),
      ...solicitud,
    };
  });
}

function Calendar() {
  useEffect(() => {
    const fectSolData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5074/api/ObtSolisLab/${laboratorio.nombre}`
        );
        if (response.ok) {
          const actSolData = await response.json();
          setActSol(actSolData);
        } else {
          throw new Error("Error al obtener datos de laboratorios");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fectSolData(); // Llamar a la función para obtener los datos de operadores al cargar la página
  }, []);

  const { state } = useLocation();
  const navigate = useNavigate();
  const { usuario, laboratorio } = state || {};

  const [solicitudesFiltradas, setActSol] = useState([]);

  const eventos = procesarSolicitudes(solicitudesFiltradas);

  const handleBack = () => {
    navigate(-1, { state: { usuario, laboratorio } });
  };

  return (
    <div className="calendar-container dark-background">
      <div className="button-container">
        <button className="back-button" onClick={handleBack}>
          Volver
        </button>
      </div>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={eventos}
        locales={"es"}
        locale={"es"}
      />
    </div>
  );
}

export default Calendar;
