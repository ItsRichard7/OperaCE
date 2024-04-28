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

  const handleReserve = (e) => {
    e.preventDefault();

    if (!hora || !fechaReserva || !cantidadHoras) {
      setError("Todos los campos son requeridos");
      return;
    }

    // Guardar la información
    const reserva = {
      correo: usuario.correo,
      fecha: fechaReserva,
      hora: hora,
      cedula: usuario.cedula,
      laboratorio: laboratorio.Laboratorio,
      nombre: usuario.nombre,
      apellido1: usuario.apellido1,
      apellido2: usuario.apellido2,
      cantidadHoras: cantidadHoras,
    };

    // Aquí puedes realizar la lógica para guardar la reserva
    console.log("Información de la reserva:", reserva);

    // Redirigir a la página de inicio o a donde sea necesario después de guardar la reserva
    //Navigate("/");
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
              onChange={(e) => setFechaReserva(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="number"
              placeholder="Cantidad de horas"
              required
              value={cantidadHoras}
              onChange={(e) => setCantidadHoras(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Registrar Laboratorio</button>
        </div>
      </form>
      <button className="see" onClick={() => console.log("ver horarios")}>
        Ver Horarios del Laboratorio
      </button>
    </div>
  );
};
