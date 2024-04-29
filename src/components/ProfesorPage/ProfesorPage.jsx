import React, { useState, useEffect } from "react";
import "./ProfesorPage.css";
import { useLocation, useHistory, Link, useNavigate } from "react-router-dom";
import { Container, Row, Tabs, Tab, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// data
import labData from "../Assets/laboratorios.json";
import activoData from "../Assets/activos.json";
import usuariosData from "../Assets/usuarios.json";
import actSolData from "../Assets/actSol.json";

export const ProfesorPage = () => {
  const location = useLocation();
  const { usuario } = location.state || {};
  const Navigate = useNavigate();

  //listas

  const [lab, setLab] = useState(labData || []);
  const [activo, setActivo] = useState(activoData || []);
  const [usuarios, setUsuarios] = useState(usuariosData || []);
  const [actSol, setActSol] = useState(actSolData || []);
  const profesores = usuarios.filter((usuario) => usuario.rol === "profesor");
  const operadores = usuarios.filter((usuario) => usuario.rol === "operador");
  const activosPrestados = activo.filter((activo) => activo.prestado === true);
  const activosNoPrestados = activo.filter(
    (activo) => activo.prestado === false
  );

  // funciones para solicitud de prestamos

  const actSolNecesitanApro = actSol.filter((item) => item.aprobado === false);

  const aprobar = (idx) => {
    console.log(
      "placa del activo al que hay que cambiarle el aprobado: " +
        actSolNecesitanApro[idx].placa
    );
  };

  const Noaprobar = (idx) => {
    console.log("Borrar " + actSolNecesitanApro[idx].placa);
  };

  // Reservación de laboratorios

  const handleLendLab = (idx) => {
    const labSelected = lab[idx]; // Obtener el laboratorio seleccionado
    Navigate("/LabsPro", {
      state: { usuario: usuario, laboratorio: labSelected },
    });
  };

  return (
    <Container className="py-4">
      <h1>Bienvenido Profesor {usuario.nombre}</h1>
      <Row className="justify-content-center">
        <Tabs
          justify
          variant="pills"
          defaultActiveKey="tab-1"
          className="mb-1 p-0"
        >
          <Tab eventKey="tab-1" title="Solicitud de prestamos">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Nombre</th>
                    <th>Apellido 1</th>
                    <th>Apellido 2</th>
                    <th>Fecha de solicitud</th>
                    <th>Hora de Solicitud</th>
                    <th>Correo del solicitante</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {actSolNecesitanApro.map((sols, idx) => (
                    <tr key={idx}>
                      <td>{sols.placa}</td>
                      <td>{sols.nombre}</td>
                      <td>{sols.apellido1}</td>
                      <td>{sols.apellido2}</td>
                      <td>{sols.fecha}</td>
                      <td>{sols.hora}</td>
                      <td className="expand"> {sols.correo}</td>
                      <td className="fit">
                        <Button onClick={() => aprobar(idx)}>
                          Confirmar Entrega
                        </Button>
                        <Button onClick={() => Noaprobar(idx)}>
                          Rechazar Entrega
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="tab-3" title="Reservación de Laboratorios">
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
            </div>{" "}
            Al final debo enviar un correo, cuidado se me olvida.
          </Tab>
          <Tab eventKey="tab-4" title="Mis reservaciones">
            Mostrar que labs tiene reservados y los horarios.
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};
