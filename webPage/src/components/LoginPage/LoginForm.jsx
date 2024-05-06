import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";

// iconos
import { GrUserAdmin } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaInfoCircle, FaEye } from "react-icons/fa";
import { LuEyeOff, LuEye } from "react-icons/lu";

import usuariosData from "../Assets/usuarios.json";
import md5 from "md5";

export const LoginForm = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const Navigate = useNavigate();
  const [error, setError] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const hashedPassword = md5(contrasena);

    try {
      const response = await fetch("http://localhost:5074/api/InicioSesion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, Contrasena: hashedPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data === true) {
          const usuarioResponse = await fetch(
            "http://localhost:5074/api/obtenerUsuario",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const usuariosData = await usuarioResponse.json();
          const usuarioEncontrado = usuariosData.find(
            (usuario) => usuario.correo === correo
          );

          if (usuarioEncontrado) {
            if (usuarioEncontrado.activo === false) {
              setError("Cuenta no activada");
              return;
            }

            localStorage.setItem("authenticated", JSON.stringify(true));

            if (usuarioEncontrado.rolId === 1) {
              Navigate("/admin", { state: { usuario: usuarioEncontrado } });
            } else if (usuarioEncontrado.rolId === 2) {
              Navigate("/pro", { state: { usuario: usuarioEncontrado } });
            } else if (
              usuarioEncontrado.rolId === 3 &&
              usuarioEncontrado.activo === true
            ) {
              Navigate("/op", { state: { usuario: usuarioEncontrado } });
            }
          } else {
            setError("Usuario no encontrado");
          }
        } else {
          setError("Contraseña incorrecta");
        }
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError("Error al iniciar sesión");
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
            {" "}
            <span title="Recuperar contraseña para operadores y profesores. También se puede hablar ocn un adminisrador">
              {" "}
              <Link to="/password">Recuperar Contraseña</Link>{" "}
            </span>{" "}
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
