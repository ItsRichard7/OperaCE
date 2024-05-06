import React, { useState, useEffect } from "react";
import "./ProfesorPage.css";
import {
  useLocation,
  useHistory,
  Link,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { Container, Row, Tabs, Tab, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// data
import axios from "axios";

export const ProfesorPage = () => {
  const location = useLocation();
  const { usuario } = location.state || {};
  const Navigate = useNavigate();

  //listas

  const [lab, setLab] = useState([]);
  const [actSol, setActSol] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de laboratorios desde la API
    const fetchLabData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5074/api/obtenerLabAdmin"
        );
        if (response.ok) {
          const labData = await response.json();
          setLab(labData);
        } else {
          throw new Error("Error al obtener datos de laboratorios");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fectSolData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5074/api/ActivosNoAprobados/${usuario.cedula}`
        );
        if (response.ok) {
          const actSolData = await response.json();
          setActSol(actSolData);
        } else {
          throw new Error("Error al obtener datos de laboratorios");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchLabData(); // Llamar a la función para obtener los datos de laboratorios al cargar la página
    fectSolData(); // Llamar a la función para obtener los datos de operadores al cargar la página
  }, []);

  // funciones para solicitud de prestamos

  const aprobar = async (idx) => {
    try {
      const response = await axios.put(
        "http://localhost:5074/api/AprobarPrestamo",
        {
          correoSoli: actSol[idx].correoSolicitud,
          fechaSoli: actSol[idx].fechaSolicitud,
          horaSoli: actSol[idx].horaSolicitud,
        }
      );
      window.location.reload();
      // Actualizar el estado o realizar alguna acción adicional si es necesario
    } catch (error) {
      console.error("Error al aprobar préstamo:", error);
    }
  };

  const Noaprobar = async (idx) => {
    try {
      const response = await axios.delete(
        "http://localhost:5074/api/RechazarPrestamo",
        {
          data: {
            correoSoli: actSol[idx].correoSolicitud,
            fechaSoli: actSol[idx].fechaSolicitud,
            horaSoli: actSol[idx].horaSolicitud,
          },
        }
      );
      window.location.reload();
      // Actualizar el estado o realizar alguna acción adicional si es necesario
    } catch (error) {
      console.error("Error al rechazar préstamo:", error);
    }
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
      <Button variant="danger" className="logout-button">
        <NavLink to="/">Cerrar Sesión</NavLink>
      </Button>
      <h1>Bienvenido Profesor {usuario.primerNombre}</h1>
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
                    <th>Primer Nombre</th>
                    <th>Segundo Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>Fecha de solicitud</th>
                    <th>Hora de Solicitud</th>
                    <th>Correo del solicitante</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {actSol.map((sols, idx) => (
                    <tr key={idx}>
                      <td>{sols.placa}</td>
                      <td>{sols.pNombre}</td>
                      <td>{sols.sNombre}</td>
                      <td>{sols.pApellido}</td>
                      <td>{sols.sApellido}</td>
                      <td>{sols.fechaSolicitud}</td>
                      <td>{sols.horaSolicitud}</td>
                      <td className="expand"> {sols.correoSolicitud}</td>
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
                      <td>{labs.nombre}</td>
                      <td>{labs.capacidad}</td>
                      <td>{labs.computadoras}</td>

                      <td className="expand">
                        {labs.descripcion.split(".").map((line, index) => (
                          <p key={index}>{line.trim()}</p>
                        ))}
                      </td>
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
