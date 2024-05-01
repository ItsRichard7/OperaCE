import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useLocation, useNavigate } from "react-router-dom";
import "./LabsPage.css"; // Importa tu archivo CSS para los estilos personalizados

import SolLabs from "../Assets/LabSol.json";

function procesarSolicitudes(solicitudes) {
  return solicitudes.map((solicitud) => {
    const { fecha, hora, cant_horas, lab, p_nombre, p_apellido } = solicitud;
    const fechaHoraInicio = new Date(`${fecha}T${hora}`);
    const fechaHoraFin = new Date(
      fechaHoraInicio.getTime() + cant_horas * 60 * 60 * 1000
    );

    return {
      title: `${lab} - ${p_nombre} ${p_apellido}`,
      start: fechaHoraInicio.toISOString(),
      end: fechaHoraFin.toISOString(),
      ...solicitud,
    };
  });
}

function Calendar() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { usuario, laboratorio } = state || {};

  const solicitudesFiltradas = SolLabs.filter(
    (solicitud) => solicitud.lab === laboratorio?.Laboratorio
  );

  const eventos = procesarSolicitudes(solicitudesFiltradas);

  const handleBack = () => {
    navigate(-1, { state: { usuario, laboratorio } });
  };

  return (
    <div className="calendar-container">
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
