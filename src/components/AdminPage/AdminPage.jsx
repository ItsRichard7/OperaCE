import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import { useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Tabs,
  Tab,
  Button,
  Modal,
  Alert,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//iconos
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import { FaCirclePlus, FaPersonCircleCheck } from "react-icons/fa6";
import { FaPlus, FaUserCheck } from "react-icons/fa";

//data
import labData from "../Assets/laboratorios.json";
import activoData from "../Assets/activos.json";
import usuariosData from "../Assets/usuarios.json";
import regHorasData from "../Assets/Reg_horas.json";

// modals

import ProfesorModal from "./createProfModal";
import EditModalProf from "./editProdModal";
import EditLabModal from "./editLabModal";
import EditActModal from "./editActModel";

export const AdminPage = () => {
  const location = useLocation();
  const { usuario } = location.state || {};

  // listas///////////////////
  const [lab, setLab] = useState(labData || []);
  const [activo, setActivo] = useState(activoData || []);
  const [usuarios, setUsuarios] = useState(usuariosData || []);
  const profesores = usuarios.filter((usuario) => usuario.rol === "profesor");
  const operadores = usuarios.filter((usuario) => usuario.rol === "operador");
  const operadoresNoAp = operadores.filter(
    (operadores) => operadores.aprobado === false
  );
  const operadoresAp = operadores.filter(
    (operadores) => operadores.aprobado === true
  );

  // /////////////////////funciones para gestión de laboratorios//////////////////

  const [showEditLabsModal, setShowEditLabsModal] = useState(false);
  const [labDataToEdit, setLabDataToEdit] = useState(null);

  const handleOpenEditLabsModal = (idx) => {
    setLabDataToEdit(lab[idx]);
    setShowEditLabsModal(true);
  };

  const handleCloseEditLabsModal = () => {
    setLabDataToEdit(null);
    setShowEditLabsModal(false);
  };

  // funciones para Gestión de activos///////////////////////
  function renderAprobador(requiereAprobador) {
    return requiereAprobador ? "Sí" : "No";
  }
  function renderFechaCompra(fechaCompra) {
    return fechaCompra ? fechaCompra : "No se conoce";
  }

  const [showEditActivosModal, setShowEditActivosModal] = useState(false);
  const [ActivosDataToEdit, setActivosDataToEdit] = useState(null);

  const handleOpenEditActivosModal = (idx) => {
    setActivosDataToEdit(activo[idx]);
    setShowEditActivosModal(true);
  };

  const handleCloseEditActivosModal = () => {
    setActivosDataToEdit(null);
    setShowEditActivosModal(false);
  };

  // ////////////////////////funciones para gestión de profesores//////////////////

  const [showProfesorModal, setShowProfesorModal] = useState(false);

  // crear //
  const handleOpenProfesorModal = () => setShowProfesorModal(true);
  const handleCloseProfesorModal = () => setShowProfesorModal(false);

  //editar

  const [showEditProfModal, setShowEditProfModal] = useState(false);
  const [profesorDataToEdit, setProfesorDataToEdit] = useState(null);

  const handleOpenEditProfModal = (idx) => {
    setProfesorDataToEdit(profesores[idx]);
    setShowEditProfModal(true);
  };

  const handleCloseEditProfModal = () => {
    setProfesorDataToEdit(null);
    setShowEditProfModal(false);
  };

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

  // borrar
  const handleEraseProf = (idx) => {
    const profCed = profesores[idx].cedula;

    console.log("Cedula a borrar: " + profCed);
    //window.location.reload();
  };

  /////////////// funciones para gestión de operadores //////////////////

  const aprobarOperador = (idx) => {
    console.log("Cedula a aprobar: " + operadores[idx].cedula);
    //window.location.reload();
  };

  const reprobarOperador = (idx) => {
    console.log("Cedula a borrar: " + operadores[idx].cedula);
    //window.location.reload();
  };

  const handleResetPassword = () => {
    const email = document.getElementById("emailInput").value;
    console.log(
      "Revisar si hay un correo para mandar una nueva contraseña. \n Correo: ",
      email
    );
  };

  // imprimir

  const handlePrintTable = () => {
    window.print();
  };

  // horario operadores
  const [cedula, setCedula] = useState("");
  const [historialHoras, setHistorialHoras] = useState([]);
  const [horasTotales, setHorasTotales] = useState(0);

  const handleBuscarReporte = () => {
    // Filtrar el historial de horas por la cédula ingresada
    const historialFiltrado = regHorasData.filter(
      (registro) => registro.user_ced === cedula
    );

    // Calcular las horas totales trabajadas por el operador
    const horasTotalesCalculadas = historialFiltrado.reduce(
      (totalHoras, registro) => {
        const horaEntrada = new Date("2000-01-01 " + registro.hora_entr);
        const horaSalida = new Date("2000-01-01 " + registro.hora_sal);
        const horasTrabajadas =
          (horaSalida.getTime() - horaEntrada.getTime()) / (1000 * 60 * 60);
        return totalHoras + horasTrabajadas;
      },
      0
    );

    // Actualizar el estado con el historial de horas y las horas totales
    setHistorialHoras(historialFiltrado);
    setHorasTotales(horasTotalesCalculadas);
  };

  return (
    <Container className="mt-4 py-4 ">
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
                          <BsFillPencilFill
                            className="edit-btn"
                            onClick={() => handleOpenEditLabsModal(idx)}
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

                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {activo.map((activos, idx) => (
                    <tr key={idx}>
                      <td>{activos.Placa}</td>
                      <td>{activos.Tipo}</td>
                      <td>{activos.Marca}</td>
                      <td className="expand">
                        {renderFechaCompra(activos.Fecha_de_Compra)}
                      </td>
                      <td className="fit">
                        <span className="actions">
                          <BsFillPencilFill
                            className="edit-btn"
                            onClick={() => handleOpenEditActivosModal(idx)}
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
                            onClick={() => handleEraseProf(idx)}
                          />
                          <BsFillPencilFill
                            className="edit-btn"
                            onClick={() => handleOpenEditProfModal(idx)}
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
                <Button onClick={() => handleOpenProfesorModal()}>
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
                      <th>Carnet</th>
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
                        <td>{op.carnet}</td>
                        <td>{op.nombre}</td>
                        <td>{`${op.apellido1} ${op.apellido2}`}</td>
                        <td>{calculateAge(op.fecha_nacimiento)}</td>
                        <td>{op.fecha_nacimiento}</td>
                        <td>{op.correo}</td>
                        <td className="fit">
                          <span className="actions">
                            <FaPersonCircleCheck
                              className="add-btn"
                              onClick={() => aprobarOperador(idx)}
                            />
                            <BsFillTrash3Fill
                              className="delete-btn"
                              onClick={() => reprobarOperador(idx)}
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            ACORDATE DE MANDAR CORREO
          </Tab>
          <Tab eventKey="tab-5" title="Cambio de contraseña">
            <div className="geeksContainer">
              <input
                type="text"
                id="emailInput"
                placeholder="Ingrese el correo electrónico"
                className="geeksInput"
              />
              <h1 className="geeksHeading"></h1>
              <button onClick={handleResetPassword} className="geeksBtn">
                Restablecer contraseña
              </button>
            </div>
          </Tab>
          <Tab eventKey="tab-6" title="Reporte de horas">
            <div className="table-wrapper imprimir">
              <table className="table">
                <thead>
                  <tr>
                    <th>Apellido 1</th>
                    <th>Apellido 2</th>
                    <th>Nombre</th>
                    <th className="expand">Carnet</th>
                    <th>Cantidad de horas</th>
                  </tr>
                </thead>
                <tbody>
                  {operadoresAp.map((op, idx) => (
                    <tr key={idx}>
                      <td>{op.apellido1}</td>
                      <td>{op.apellido2}</td>
                      <td>{op.nombre}</td>
                      <td>{op.carnet}</td>
                      <td>50</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-center mt-3">
                <Button onClick={() => handlePrintTable()} className="no-print">
                  Imprimir
                </Button>
              </div>
            </div>
          </Tab>
          <Tab eventKey="tab-7" title="Reporte de horas especifico">
            <div>
              <div className="geeksContainer">
                <input
                  type="text"
                  id="emailInput"
                  placeholder="Ingrese la cedula"
                  className="geeksInput"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
                <h1 className="geeksHeading"></h1>
                <button onClick={handleBuscarReporte} className="geeksBtn">
                  Buscar Reporte
                </button>
              </div>
              {historialHoras.length > 0 ? (
                <div>
                  <h2>Historial de Horas del Operador</h2>
                  <p>Cédula: {cedula}</p>
                  <p>Horas Totales: {horasTotales}</p>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Fecha de Entrada</th>
                        <th>Fecha de Salida</th>
                        <th>Horas Trabajadas</th>
                        <th>Cantidad de Horas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historialHoras.map((registro, idx) => (
                        <tr key={idx}>
                          <td>{registro.fecha}</td>
                          <td>{registro.hora_entr}</td>
                          <td>{registro.hora_sal}</td>
                          <td className="expand">
                            {(
                              (new Date(
                                "2000-01-01 " + registro.hora_sal
                              ).getTime() -
                                new Date(
                                  "2000-01-01 " + registro.hora_entr
                                ).getTime()) /
                              (1000 * 60 * 60)
                            ).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No se encontraron registros de horas para el operador.</p>
              )}
            </div>
          </Tab>
        </Tabs>
      </Row>
      {labDataToEdit && (
        <EditLabModal
          show={showEditLabsModal}
          handleClose={handleCloseEditLabsModal}
          LabData={labDataToEdit}
        />
      )}

      {ActivosDataToEdit && (
        <EditActModal
          show={showEditActivosModal}
          handleClose={handleCloseEditActivosModal}
          ActivoData={ActivosDataToEdit}
        />
      )}
      {profesorDataToEdit && (
        <EditModalProf
          show={showEditProfModal}
          handleClose={handleCloseEditProfModal}
          profesorData={profesorDataToEdit}
        />
      )}
      <ProfesorModal
        show={showProfesorModal}
        handleClose={handleCloseProfesorModal}
      />
    </Container>
  );
};
