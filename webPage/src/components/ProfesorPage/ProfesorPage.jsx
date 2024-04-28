import React, { useState, useEffect } from "react";
import "./ProfesorPage.css";
import { useLocation, useHistory, Link, useNavigate } from "react-router-dom";
import { Container, Row, Tabs, Tab, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// data
import labData from "../Assets/laboratorios.json";
import activoData from "../Assets/activos.json";
import usuariosData from "../Assets/usuarios.json";

export const ProfesorPage = () => {
  const location = useLocation();
  const { usuario } = location.state || {};
  const Navigate = useNavigate();

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

  // funciones para solicitud de prestamos

  // funciones para Prestamos que aprobé

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
            <div>Salen los prestamos, y un botón de aceptar</div>
          </Tab>
          <Tab eventKey="tab-2" title="Prestamos que aprobé">
            <div>
              Lista de prestamos que aprobó el profesor, mostrar horas, por
              siaca
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
