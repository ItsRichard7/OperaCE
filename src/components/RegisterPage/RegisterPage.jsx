import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import md5 from "md5";

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
  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [carnet, setCarnet] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const Navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const hashedPassword = md5(contrasena);

    // dylan acá va la logica para guardarlo, usted decida como agarrar la info.
    const newUser = {
      correo,
      contrasena: hashedPassword,
      cedula,
      nombre,
      apellido1,
      apellido2,
      fechaNacimiento,
      carnet,
      rol: "operador",
      aprobado: false,
    };
    localStorage.setItem("userData", JSON.stringify(newUser));
    console.log("Contraseña cifrada:", hashedPassword);
    console.log(localStorage.getItem("userData"));
    Navigate("/");
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleRegister}>
        <h1>OperaCE</h1>
        <h2>Registrarse</h2>
        <div>
          <div className="input-box">
            <input
              type="text"
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
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Primer Apellido"
              required
              value={apellido1}
              onChange={(e) => setApellido1(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Segundo Apellido"
              required
              value={apellido2}
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
