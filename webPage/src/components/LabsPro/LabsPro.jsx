import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LabsPro.css";
import md5 from "md5";

// iconos
import { GrUserAdmin } from "react-icons/gr";

export const LabsPro = () => {
  const [hora, setHora] = useState("");
  const [fechaReserva, setFechaReserva] = useState("");
  const [cantidadHoras, setCantidadHoras] = useState("");
  const location = useLocation();
  const { usuario, laboratorio } = location.state || {};

  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleReserve = async (e) => {
    e.preventDefault();

    if (!hora || !fechaReserva || !cantidadHoras) {
      setError("Todos los campos son requeridos");
      return;
    }

    if (parseInt(cantidadHoras) <= 0) {
      setError("La cantidad de horas debe ser mayor que cero");
      return;
    }

    const reserva = {
      correoSoli: usuario.correo,
      fechaSoli: fechaReserva + "T00:00:00.000Z",
      horaSoli: hora + ":00",
      carnet: 12,
      pNombre: usuario.primerNombre,
      sNombre: usuario.segundoNombre,
      pApellido: usuario.primerApellido,
      sApellido: usuario.segundoApellido,
      cantHoras: parseInt(cantidadHoras),
      labNombre: laboratorio.nombre.trim(),
      userCed: usuario.cedula,
    };

    try {
      /* const conflict = await checkReservationConflict(
        reserva.labNombre,
        reserva.fechaSoli,
        reserva.horaSoli,
        reserva.cantHoras
      );

      if (conflict) {
        setError("Ya hay una reserva a esa hora");
        console.log("Hay conflicto");
        return;
      } */

      console.log("No hay conflicto");

      const response = await fetch(
        "http://localhost:5074/api/InsertarSoliLab",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reserva),
        }
      );

      if (response.ok) {
        // La solicitud fue exitosa, puedes hacer algo como redirigir a otra página
        Navigate(-1, { state: { usuario } });
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Hubo un error al procesar la solicitud");
      }
    } catch (error) {
      setError("Hubo un error al procesar la solicitud");
      console.error("Error:", error);
    }
  };

  const handleVerHorarios = () => {
    Navigate("/calendar", {
      state: { laboratorio: laboratorio, usuario: usuario },
    });
  };

  const handleBack = () => {
    Navigate(-1, { state: { usuario } });
  };

  const checkReservationConflict = async (
    labNombre,
    fechaSoli,
    horaSoli,
    cantHoras
  ) => {
    try {
      const response = await fetch(
        "http://localhost:5074/api/HayChoqueReservas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            LabNombre: labNombre,
            HoraInicio: horaSoli,
            CantHoras: cantHoras,
          }),
        }
      );

      if (response.ok) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleReserve}>
        <h1>OperaCE</h1>
        <h2>Registrar Reserva de Laboratorio</h2>
        <div>
          <div className="input-box">
            <input
              type="time"
              placeholder="Hora"
              required
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="date"
              placeholder="Fecha de la reserva"
              required
              value={fechaReserva}
              min={new Date().toISOString().split("T")[0]} // Establece la fecha mínima como la fecha de hoy
              onChange={(e) => setFechaReserva(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="number"
              placeholder="Cantidad de horas"
              required
              value={cantidadHoras}
              onChange={(e) => {
                const value = e.target.value;
                if (parseInt(value) <= 0) {
                  setError("La cantidad de horas debe ser mayor que cero");
                } else {
                  setCantidadHoras(value);
                  setError("");
                }
              }}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Registrar Laboratorio</button>
        </div>
      </form>
      <button className="see" onClick={handleVerHorarios}>
        Ver Horarios del Laboratorio del {laboratorio.nombre}
      </button>

      <button className="see" onClick={handleBack}>
        Volver
      </button>
    </div>
  );
};
