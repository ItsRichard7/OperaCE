import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import { useLocation } from "react-router-dom";
import { Container, Row, Tabs, Tab, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//iconos
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import { FaCirclePlus, FaPersonCircleCheck } from "react-icons/fa6";
import { FaPlus, FaUserCheck } from "react-icons/fa";

//data
import labData from "../Assets/laboratorios.json";
import activoData from "../Assets/activos.json";
import usuariosData from "../Assets/usuarios.json";

export const AdminPage = () => {
  const location = useLocation();
  const { usuario } = location.state || {};

  // listas
  const [lab, setLab] = useState(labData || []);
  const [activo, setActivo] = useState(activoData || []);
  const [usuarios, setUsuarios] = useState(usuariosData || []);
  const profesores = usuarios.filter((usuario) => usuario.rol === "profesor");
  const operadores = usuarios.filter((usuario) => usuario.rol === "operador");
  const operadoresNoAp = operadores.filter(
    (operadores) => operadores.aprobado === false
  );

  // funciones para gestión de laboratorios

  // funciones para Gestión de activos
  function renderAprobador(requiereAprobador) {
    return requiereAprobador ? "Sí" : "No";
  }
  function renderFechaCompra(fechaCompra) {
    return fechaCompra ? fechaCompra : "No se conoce";
  }

  //funciones para gestión de profesores

  function calculateAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  //  funciones para gestión de operadores

  const handleResetPassword = () => {
    const email = document.getElementById("emailInput").value;
    console.log("Correo electrónico ingresado:", email);
    // Aquí puedes agregar la lógica para comprobar si el correo está en el sistema
    // y para enviar una contraseña temporal si es necesario
  };

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
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Cédula</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Edad</th>
                    <th>Fecha de Nacimiento</th>
                    <th className="expand">Correo Electrónico</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {profesores.map((profesor, idx) => (
                    <tr key={idx}>
                      <td>{profesor.cedula}</td>
                      <td>{profesor.nombre}</td>
                      <td>{`${profesor.apellido1} ${profesor.apellido2}`}</td>
                      <td>{calculateAge(profesor.fecha_nacimiento)}</td>
                      <td>{profesor.fecha_nacimiento}</td>
                      <td>{profesor.correo}</td>
                      <td className="fit">
                        <span className="actions">
                          <BsFillTrash3Fill
                            className="delete-btn"
                            /* onClick={() => deletePlato(idx)} */
                          />
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
              <div
                className="d-flex justify-content-center mt-3"
                style={{ marginTop: "10px" }}
              >
                <Button /* onClick={() => setShowCreateModal(true)} */>
                  Agregar
                </Button>
              </div>
            </div>
          </Tab>
          <Tab eventKey="tab-4" title="Aprobación de operadores">
            <div>
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Cédula</th>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Edad</th>
                      <th>Fecha de Nacimiento</th>
                      <th className="expand">Correo Electrónico</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operadoresNoAp.map((op, idx) => (
                      <tr key={idx}>
                        <td>{op.cedula}</td>
                        <td>{op.nombre}</td>
                        <td>{`${op.apellido1} ${op.apellido2}`}</td>
                        <td>{calculateAge(op.fecha_nacimiento)}</td>
                        <td>{op.fecha_nacimiento}</td>
                        <td>{op.correo}</td>
                        <td className="fit">
                          <span className="actions">
                            <FaPersonCircleCheck
                              className="add-btn"
                              /* onClick={() => openEditModal(idx)} ACORDATE DE MANDAR CORREO*/
                            />
                            <BsFillTrash3Fill
                              className="delete-btn"
                              /* onClick={() => deletePlato(idx)} */
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div
                  className="d-flex justify-content-center mt-3"
                  style={{ marginTop: "10px" }}
                >
                  <Button /* onClick={() => setShowCreateModal(true)} */>
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="tab-5" title="Cambio de contraseña">
            <div className="geeksContainer">
              <input
                type="text"
                id="emailInput"
                placeholder="Ingrese su correo electrónico"
                className="geeksInput"
              />
              <h1 className="geeksHeading"></h1>
              <button onClick={handleResetPassword} className="geeksBtn">
                Restablecer contraseña
              </button>
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
