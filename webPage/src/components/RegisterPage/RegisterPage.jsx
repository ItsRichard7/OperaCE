import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import md5 from "md5";
import axios from "axios";

// iconos
import { GrUserAdmin } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaInfoCircle, FaEye } from "react-icons/fa";
import { LuEyeOff, LuEye } from "react-icons/lu";

// data necesaria
import usuariosData from "../Assets/usuarios.json";

export const RegisterPage = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [cedula, setCedula] = useState("");
  const [primerNombre, setNombre] = useState("");
  const [segundoNombre, setSnombre] = useState("");
  const [primerApellido, setApellido1] = useState("");
  const [segundoApellido, setApellido2] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [carnet, setCarnet] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const Navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const hashedPassword = md5(contrasena);

    const formattedFechaNacimiento = new Date(fechaNacimiento + "T00:00:00.000Z");


    const newUser = {
      correo,
      contrasena: hashedPassword,
      cedula,
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      fechaNacimiento: formattedFechaNacimiento.toISOString(), // Formatea la fecha según lo requerido
      carnet,
      rolId: 3, // Valor fijo para rol_id
      activo: false, // Valor fijo para activo
    };

    console.log(newUser);

    try {
      // Realiza el llamado a la API para insertar el nuevo usuario
      const response = await axios.post(
        "http://localhost:5074/api/Usuario",
        newUser
      );

      console.log("Respuesta de la API:", response.data);

      Navigate("/"); // Redirige al usuario después del registro
    } catch (error) {
      setError("Error al registrar usuario");
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleRegister}>
        <h1>OperaCE</h1>
        <h2>Registrarse</h2>
        <div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Correo"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <span title="Correo Institucional. itcr o estudiantec.">
              <GrUserAdmin className="icon" />
            </span>
          </div>
          <div className="input-box">
            <input
              type={mostrarContrasena ? "text" : "password"}
              placeholder="Contraseña"
              required
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <span
              title={
                mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              onClick={() => setMostrarContrasena(!mostrarContrasena)}
            >
              {mostrarContrasena ? (
                <LuEyeOff className="icon" />
              ) : (
                <LuEye className="icon" />
              )}
            </span>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Cédula"
              required
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Nombre"
              required
              value={primerNombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Segundo Nombre"
              value={segundoNombre}
              onChange={(e) => setSnombre(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Primer Apellido"
              required
              value={primerApellido}
              onChange={(e) => setApellido1(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Segundo Apellido"
              required
              value={segundoApellido}
              onChange={(e) => setApellido2(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="date"
              placeholder="Fecha de Nacimiento"
              required
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Carnet"
              required
              value={carnet}
              onChange={(e) => setCarnet(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Registrarse</button>
        </div>
      </form>
    </div>
  );
};
