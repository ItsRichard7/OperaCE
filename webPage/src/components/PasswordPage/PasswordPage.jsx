import React from "react";
import "./PasswordPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import md5 from "md5";
import axios from "axios";
import emailjs from "@emailjs/browser";

// iconos
import { GrUserAdmin } from "react-icons/gr";
import { send } from "@emailjs/browser";

export const PasswordPage = () => {
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const Navigate = useNavigate();

  const generateRandomPassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|:;<>,.?/";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const sendEmail = (password, email) => {
    emailjs.init({
      publicKey: "VWZmvAnq8_A-rtAVB",
      // Do not allow headless browsers
      blockHeadless: true,
      blockList: {
        // Block the suspended emails
        list: ["foo@emailjs.com", "bar@emailjs.com"],
        // The variable contains the email address
        watchVariable: "userEmail",
      },
      limitRate: {
        // Set the limit rate for the application
        id: "app",
        // Allow 1 request per 10s
        throttle: 10000,
      },
    });

    var templateParams = {
      to_name: "estimado(a)",
      to_password: password,
      to_email: email,
    };

    emailjs.send("service_72s6juh", "template_492yn1d", templateParams).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
  };

  const handleResetPassword = async () => {
    try {
      const email = document.getElementById("emailInput").value;

      // Generar una contraseña aleatoria
      const newPassword = generateRandomPassword();

      // Guardar la contraseña momentáneamente (para enviar por correo a futuro)
      // Aquí puedes hacer lo que necesites con la contraseña, como enviarla por correo

      // Convertir la contraseña a su hash MD5
      const hashedPassword = md5(newPassword);

      // Enviar la contraseña con su hash MD5 por la API
      const response = await axios.put(
        "http://localhost:5074/api/actualizarContrasena",
        { correo: email, contrasena: hashedPassword }
      );

      sendEmail(newPassword, email);

      Navigate("/"); // Redirigir a la página anterior (Inicio de Sesión
    } catch (error) {
      console.error("Error al resetear la contraseña:", error);
      // Manejar errores
    }
  };

  const handleGoBack = () => {
    Navigate(-1);
  };

  return (
    <div className="wrapper">
      <form>
        <h1>OperaCE</h1>
        <h2>Recuperar Contraseña</h2>
        <div>
          <div className="input-box">
            <input id="emailInput" type="text" placeholder="Correo" required />
            <span title="Correo Institucional. itcr o estudiantec.">
              <GrUserAdmin className="icon" />
            </span>
          </div>
          <div className="forget">
            <a href="#" onClick={handleResetPassword}>
              Recuperar Contraseña
            </a>
          </div>
          <button type="submit" onClick={handleGoBack}>
            Volver al Inicio de Sesión
          </button>
        </div>
      </form>
    </div>
  );
};
