import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import { useLocation } from "react-router-dom";
import { Container, Row, Tabs, Tab, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";

import labData from "../Assets/laboratorios.json";
import activoData from "../Assets/activos.json";

export const AdminPage = () => {
  const location = useLocation();
  const { usuario } = location.state || {};

  // listas
  const [lab, setLab] = useState(labData || []);
  const [activo, setActivo] = useState(activoData || []);

  function renderAprobador(requiereAprobador) {
    return requiereAprobador ? "Sí" : "No";
  }

  function renderFechaCompra(fechaCompra) {
    return fechaCompra ? fechaCompra : "No se conoce";
  }

  return (
    <Container className="mt-4 py-4">
      <h1>Bienvenido Administrador {usuario.nombre}</h1>
      <Row className="justify-content-center">
        <Tabs
          justify
          variant="pills"
          defaultActiveKey="tab-1"
          className="mb-1 p-0"
        >
          <Tab eventKey="tab-1" title="Gestión de Laboratorios">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Laboratorio</th>
                    <th>Capacidad</th>
                    <th>Computadoras</th>
                    <th>Activos que tiene</th>
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
                      <td>{labs.Activos}</td>
                      <td className="expand">{labs.Facilidades}</td>
                      <td className="fit">
                        <span className="actions">
                          <BsFillPencilFill
                            className="edit-btn"
                            /* onClick={() => openEditModal(idx)} */
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="tab-2" title="Gestión de Activos">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Tipo</th>
                    <th>Marca</th>
                    <th>Fecha de Compra</th>
                    <th>Requiere aprobador</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {activo.map((activos, idx) => (
                    <tr key={idx}>
                      <td>{activos.Placa}</td>
                      <td>{activos.Tipo}</td>
                      <td>{activos.Marca}</td>
                      <td>{renderFechaCompra(activos.Fecha_de_Compra)}</td>
                      <td className="expand">
                        {renderAprobador(activos.Préstamo_requiere_aprobador)}
                      </td>
                      <td className="fit">
                        <span className="actions">
                          <BsFillPencilFill
                            className="edit-btn"
                            /* onClick={() => openEditModal(idx)} */
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="tab-3" title="Gestión de profesores">
            <div>
              Acá se da de alta, modificar, eliminar profesores o agregarlos
            </div>
          </Tab>
          <Tab eventKey="tab-4" title="Aprobación de operadores">
            <div>
              Acá se aceptan o rechazan solicitudes de registro de operadores
            </div>
          </Tab>
          <Tab eventKey="tab-5" title="Cambio de contraseña">
            <div>
              Acá se colocará un correo, y se envía una contraseña temporal a
              ese correo. Hay que revisar si está en el sistema
            </div>
          </Tab>
          <Tab eventKey="tab-6" title="Reporte de horas">
            <div>
              Mostrar, Apellido 1, Apellido 2, Nombre, Cantidad de horas totales
              Debe poder imprimirse
            </div>
          </Tab>
          <Tab eventKey="tab-7" title="Reporte de horas especifico">
            <div>
              Colocar correo, mostrar todo el historial del operador Mostrar
              apellidos, nombre, Fecha, ingreso, salida, horas totales. Esto
              está complejo
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};
