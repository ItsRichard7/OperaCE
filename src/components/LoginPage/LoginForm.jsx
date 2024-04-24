import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";

// iconos
import { GrUserAdmin } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaInfoCircle, FaEye } from "react-icons/fa";
import { LuEyeOff, LuEye } from "react-icons/lu";

import usuariosData from "../Assets/usuarios.json";

export const LoginForm = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const Navigate = useNavigate();
  const [error, setError] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const usuarioEncontrado = usuariosData.find(
      (usuario) =>
        usuario.correo === correo && usuario.contrasena === contrasena
    );
    if (usuarioEncontrado) {
      localStorage.setItem("authenticated", JSON.stringify(true));

      if (usuarioEncontrado.rol === "operador") {
        Navigate("/op", { state: { usuario: usuarioEncontrado } });
      } else if (usuarioEncontrado.rol === "administrador") {
        Navigate("/admin", { state: { usuario: usuarioEncontrado } });
      } else if (usuarioEncontrado.rol === "profesor") {
        Navigate("/pro", { state: { usuario: usuarioEncontrado } });
      }
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>OperaCE</h1>
        <h2>Iniciar Sesión</h2>
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
          {error && <p className="error-message">{error}</p>}{" "}
          <div className="forget">
            <a href="#">Recuperar Contraseña</a>
          </div>
          <button type="submit">Iniciar Sesión</button>
          <div className="register">
            <span title="Solo operadores se pueden registrar. Si son profesores y ocupan este proceso, hablar con el administrador al correo: betico@betico.com">
              <Link to="/reg">Registrarse</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
