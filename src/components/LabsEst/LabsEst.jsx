import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LabsEst.css";
import md5 from "md5";

// iconos
import { GrUserAdmin } from "react-icons/gr";

export const LabsEst = () => {
  const [hora, setHora] = useState("");
  const [fechaReserva, setFechaReserva] = useState("");
  const [cantidadHoras, setCantidadHoras] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [carnet, setCarnet] = useState("");
  const [correo, setCorreo] = useState("");
  const location = useLocation();
  const { usuario, laboratorio } = location.state || {};

  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleReserve = (e) => {
    e.preventDefault();

    if (
      !hora ||
      !fechaReserva ||
      !cantidadHoras ||
      !carnet ||
      !nombre ||
      !correo ||
      !apellidos
    ) {
      setError("Todos los campos son requeridos");
      return;
    }

    // Validar que la cantidad de horas no sea cero ni negativa
    if (parseInt(cantidadHoras) <= 0) {
      setError("La cantidad de horas debe ser mayor que cero");
      return;
    }

    if (parseInt(carnet) <= 0) {
      setError("Carnet inválido");
      return;
    }

    // Guardar la información
    const reserva = {
      correo: correo,
      fecha: fechaReserva,
      hora: hora,
      carnet: carnet,
      laboratorio: laboratorio.Laboratorio,
      nombre: nombre,
      apellido1: apellidos,
      cantidadHoras: cantidadHoras,
    };

    console.log("Información de la reserva:", reserva);

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
          <div className="input-box">
            <input
              type="text"
              placeholder="Nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Apellidos"
              required
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Correo"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="number"
              placeholder="Carnet"
              required
              value={carnet}
              onChange={(e) => {
                const value = e.target.value;
                if (parseInt(value) <= 0) {
                  setError("Carnet inválido");
                } else {
                  setCarnet(value);
                  setError("");
                }
              }}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Registrar Laboratorio</button>
        </div>
      </form>
      <button className="see" onClick={() => console.log(laboratorio)}>
        Ver Horarios del Laboratorio del {laboratorio.Laboratorio}
      </button>
    </div>
  );
};
