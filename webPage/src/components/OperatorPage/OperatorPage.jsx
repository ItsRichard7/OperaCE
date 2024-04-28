import React, { useState, useEffect } from "react";
import "./OperatorPage.css";
import { useLocation } from "react-router-dom";
import { Container, Row, Tabs, Tab, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// data
import labData from "../Assets/laboratorios.json";
import activoData from "../Assets/activos.json";
import usuariosData from "../Assets/usuarios.json";

//iconos
import { IoBagCheck } from "react-icons/io5";

export const OperatorPage = () => {
  const location = useLocation();
  const { usuario } = location.state || {};

  //listas

  const [lab, setLab] = useState(labData || []);
  const [activo, setActivo] = useState(activoData || []);
  const [usuarios, setUsuarios] = useState(usuariosData || []);
  const profesores = usuarios.filter((usuario) => usuario.rol === "profesor");
  const operadores = usuarios.filter((usuario) => usuario.rol === "operador");
  const activosPrestados = activo.filter((activo) => activo.prestado === true);
  const activosNoPrestados = activo.filter(
    (activo) => activo.prestado === false
  );

  // funciones y const para registro de horas

  const [showEntryButton, setShowEntryButton] = useState(true);
  const [showExitButton, setShowExitButton] = useState(false);
  const handleEntryClick = () => {
    const entrada = new Date().toLocaleTimeString();
    localStorage.setItem("entrada", entrada);
    console.log("Hora de entrada guardada en el localStorage:", entrada);
    setShowEntryButton(false);
    setShowExitButton(true);
  };

  const handleExitClick = () => {
    const salida = new Date().toLocaleTimeString();
    const entrada = localStorage.getItem("entrada");
    const correoOperador = usuario.correo;

    localStorage.setItem("correoOperador", correoOperador);
    localStorage.setItem("horaEntrada", entrada);
    localStorage.setItem("horaSalida", salida);

    const infoRegHrs = {
      correo: correoOperador,
      horaEntrada: entrada,
      horaSalida: salida,
    };

    localStorage.setItem("infoOperador", JSON.stringify(infoRegHrs));

    console.log("Info que ocupo", infoRegHrs);

    setShowExitButton(false);
    setShowEntryButton(true);

    window.location.href = "/";
  };

  // funciones para reservación de labs

  const handleLendLab = (idx) => {
    const labName = lab[idx].Laboratorio;
    console.log("Nombre del laboratorio: " + labName);
    // Aquí puedes realizar cualquier acción que necesites con el nombre del laboratorio
  };

  // funciones para prestamo de activos a profesor

  const handleLendActiveProf = (idx) => {
    const activoPrestado = activosNoPrestados[idx];
    console.log(
      "Activo a prestar al profesor:" + activosNoPrestados[idx].Placa
    );
    //window.location.reload();
  };

  // funciones para prestamo de activos a estudiante

  const handleLendActiveEst = (idx) => {
    const activoPrestado = activosNoPrestados[idx];

    console.log(
      "Activo a prestar al estudiante:" + activosNoPrestados[idx].Placa
    );

    //window.location.reload();
  };

  // funciones para Aprobados por profesores

  // funciones para Devolución de activos

  const handleDevolvioBien = (idx) => {
    const horaEntrega = new Date().toLocaleTimeString();
    localStorage.setItem("horaSalida", horaEntrega);
    console.log(
      "Devuelto el activo: " +
        activosPrestados[idx].Placa +
        " en el turno del usuario: " +
        usuario.correo +
        " a la hora " +
        horaEntrega
    );
  };

  const handleDevolvioMal = (idx) => {
    const horaEntrega = new Date().toLocaleTimeString();
    localStorage.setItem("horaSalida", horaEntrega);
    console.log(
      "Devuelto con averia el activo: " +
        activosPrestados[idx].Placa +
        " en el turno del usuario: " +
        usuario.nombre +
        " a la hora " +
        horaEntrega
    );
  };

  // funciones para horas trabajadas

  return (
    <Container className="py-4">
      <h1>Bienvenido Operador {usuario.carnet}</h1>
      <Row className="justify-content-center">
        <Tabs
          justify
          variant="pills"
          defaultActiveKey="tab-1"
          className="mb-1 p-0"
        >
          <Tab eventKey="tab-1" title="Registro de horas">
            <div>
              {showEntryButton && (
                <Button onClick={handleEntryClick}>Hora entrada</Button>
              )}
              {showExitButton && (
                <Button onClick={handleExitClick}>Hora salida</Button>
              )}
            </div>
          </Tab>
          <Tab eventKey="tab-2" title="Reservación de los laboratorios">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Laboratorio</th>
                    <th>Capacidad</th>
                    <th>Computadoras</th>
                    <th>Facilidades</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {lab.map((labs, idx) => (
                    <tr key={idx}>
                      <td>{labs.Laboratorio}</td>
                      <td>{labs.Capacidad}</td>
                      <td>{labs.Computadoras}</td>

                      <td className="expand">{labs.Facilidades}</td>
                      <td className="fit">
                        <span className="actions">
                          <Button onClick={() => handleLendLab(idx)}>
                            Reservar
                          </Button>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="tab-3" title="Préstamo de activo a profesor">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Tipo</th>
                    <th>Marca</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {activosNoPrestados.map((activos, idx) => (
                    <tr key={idx}>
                      <td>{activos.Placa}</td>
                      <td>{activos.Tipo}</td>
                      <td className="expand">{activos.Marca}</td>
                      <td className="fit">
                        <span className="actions">
                          <Button onClick={() => handleLendActiveProf(idx)}>
                            Prestar
                          </Button>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="tab-4" title="Préstamo de activo a estudiante">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Tipo</th>
                    <th>Marca</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {activosNoPrestados.map((activos, idx) => (
                    <tr key={idx}>
                      <td>{activos.Placa}</td>
                      <td>{activos.Tipo}</td>
                      <td className="expand">{activos.Marca}</td>
                      <td className="fit">
                        <Button onClick={() => handleLendActiveEst(idx)}>
                          Prestar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            No ocupa profe, se solicita carnet del estudiante, y se agarra al
            operador ya logueado. En caso de que ocupe profesor lo mismo que a
            profesores, solo que ahora hay dos botones. primero, está el
            profesor cerca? mismo que a profesores. no está el profesor cerca?
            se registra para que le salga a profesores. Se pasa a la siguiente
            Tab
          </Tab>
          <Tab eventKey="tab-5" title="Aprobadas por profesores">
            acá hay que mostrar los que ya aprobaron los profesores. botoncito
            para aceptar, se registra al operador que lo dió
          </Tab>
          <Tab eventKey="tab-6" title="Devolución de activos">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Tipo</th>
                    <th>Marca</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {activosPrestados.map((activos, idx) => (
                    <tr key={idx}>
                      <td>{activos.Placa}</td>
                      <td>{activos.Tipo}</td>
                      <td className="expand">{activos.Marca}</td>
                      <td className="fit">
                        <span className="actions">
                          <Button onClick={() => handleDevolvioBien(idx)}>
                            Retorno
                          </Button>
                          <Button onClick={() => handleDevolvioMal(idx)}>
                            Retorno con Averia
                          </Button>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="tab-7" title="Horas trabajadas">
            opaaa
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};
