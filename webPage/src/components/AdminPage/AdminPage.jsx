import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import { useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import md5 from "md5";
import emailjs from "@emailjs/browser";
import jsPDF from "jspdf";
import "jspdf-autotable";
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
import regHorasData from "../Assets/Reg_horas.json";

// modals

import ProfesorModal from "./createProfModal";
import EditModalProf from "./editProdModal";
import EditLabModal from "./editLabModal";
import EditActModal from "./editActModel";
import LabModal from "./createLabModal";
import ActivoModal from "./createActivoModal";

export const AdminPage = () => {
  const location = useLocation();
  const { usuario } = location.state || {};
  const [error, setError] = useState(null);

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

    const fetchActData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5074/api/obtenerActivo/activos"
        );
        if (response.ok) {
          const activoData = await response.json();
          setActivo(activoData);
        } else {
          throw new Error("Error al obtener datos de laboratorios");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fecthUsuariosData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5074/api/obtenerUsuario"
        );
        if (response.ok) {
          const usuariosData = await response.json();
          setUsuarios(usuariosData);
        } else {
          throw new Error("Error al obtener datos de laboratorios");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fecthOperadorHorarioData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5074/api/MostrarOperadores"
        );
        if (response.ok) {
          const operadorDataHorario = await response.json();
          setOperadoresHorarios(operadorDataHorario);
        } else {
          throw new Error("Error al obtener datos de laboratorios");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchLabData(); // Llamar a la función para obtener los datos de laboratorios al cargar la página
    fetchActData(); // Llamar a la función para obtener los datos de activos al cargar la página
    fecthUsuariosData(); // Llamar a la función para obtener los datos de usuarios al cargar la página
    fecthOperadorHorarioData(); // Llamar a la función para obtener los datos de operadores al cargar la página
  }, []);

  // listas///////////////////
  const [lab, setLab] = useState([]);
  const [activo, setActivo] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [operadoresHorarios, setOperadoresHorarios] = useState([]);
  const profesores = usuarios.filter((usuario) => usuario.rolId === 2);
  const operadores = usuarios.filter((usuario) => usuario.rolId === 3);
  const operadoresNoAp = operadores.filter(
    (operadores) => operadores.activo === false
  );
  const operadoresAp = operadores.filter(
    (operadores) => operadores.activo === true
  );

  // /////////////////////funciones para gestión de laboratorios//////////////////

  const [showEditLabsModal, setShowEditLabsModal] = useState(false);
  const [labDataToEdit, setLabDataToEdit] = useState(false);

  const handleOpenEditLabsModal = (idx) => {
    setLabDataToEdit(lab[idx]);
    setShowEditLabsModal(true);
  };

  const handleCloseEditLabsModal = () => {
    setLabDataToEdit([null]);
    setShowEditLabsModal(false);
    window.location.reload();
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
    window.location.reload();
  };

  // ////////////////////////funciones para gestión de profesores//////////////////

  const [showProfesorModal, setShowProfesorModal] = useState(false);

  // crear //
  const handleOpenProfesorModal = () => setShowProfesorModal(true);
  const handleCloseProfesorModal = () => {
    setShowProfesorModal(false);
    window.location.reload();
  };

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
  const handleEraseProf = async (idx) => {
    const profCed = profesores[idx].cedula;

    try {
      const response = await axios.delete(
        `http://localhost:5074/api/eliminarProfesor/${profCed}`
      );
      window.location.reload(); // Recargar la página después de eliminar exitosamente el profesor
    } catch (error) {
      console.error(error.response.data); // Manejar errores y mostrar mensaje de error en la consola
    }
    window.location.reload();
  };

  /////////////// funciones para gestión de operadores //////////////////
  const aprobarOperador = async (idx) => {
    try {
      const cedula = operadores[idx].cedula; // Suponiendo que operadores es tu array de operadores
      const response = await axios.post(
        `http://localhost:5074/api/AprobarOp/${cedula}`
      );
      window.location.reload(); // Otra acción después de aprobar el operador
    } catch (error) {
      console.error("Error al aprobar operador:", error);
      // Manejar errores
    }
  };

  const reprobarOperador = async (idx) => {
    try {
      const cedula = operadores[idx].cedula; // Suponiendo que operadores es tu array de operadores
      const response = await axios.delete(
        `http://localhost:5074/api/RechazarOperador/${cedula}`
      );
      window.location.reload(); // Otra acción después de rechazar el operador
    } catch (error) {
      console.error("Error al rechazar operador:", error);
      // Manejar errores
    }
  };

  /////////////// funciones para gestiones extras //////////////////
  const [showLabModal, setShowLabModal] = useState(false);
  const handleOpenLabModal = () => setShowLabModal(true);
  const handleCloseLabModal = () => setShowLabModal(false);

  const [showActivoModal, setShowActivoModal] = useState(false);
  const handleOpenActivoModal = () => setShowActivoModal(true);
  const handleCloseActivoModal = () => setShowActivoModal(false);

  const handleEraseLab = async (idx) => {
    const labid = lab[idx].nombre;

    const elimResponse1 = await fetch(
      `http://localhost:5074/api/elimFacilidad/${labid}`,
      {
        method: "DELETE",
      }
    );

    if (!elimResponse1.ok) {
      const errorData = await elimResponse.json();
      setError(errorData.message);
      return;
    }

    const elimResponse = await fetch(
      `http://localhost:5074/api/eliminarLaboratorio/${labid}`,
      {
        method: "DELETE",
      }
    );

    if (!elimResponse.ok) {
      const errorData = await elimResponse.json();
      setError(errorData.message);
      return;
    }
    window.location.reload();
  };

  const handleEraseActivo = async (idx) => {
    const Placa = activo[idx].placa;

    const elimResponse = await fetch(
      `http://localhost:5074/api/eliminarActivo/${Placa}`,
      {
        method: "DELETE",
      }
    );
    window.location.reload();
  };

  // Función para generar una contraseña aleatoria
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

      sendEmail(newPassword, email);

      // Convertir la contraseña a su hash MD5
      const hashedPassword = md5(newPassword);

      // Enviar la contraseña con su hash MD5 por la API
      const response = await axios.put(
        "http://localhost:5074/api/actualizarContrasena",
        { correo: email, contrasena: hashedPassword }
      );
      console.log(response.data); // Puedes hacer algo con la respuesta si lo necesitas
      // Otra acción después de resetear la contraseña
    } catch (error) {
      console.error("Error al resetear la contraseña:", error);
      // Manejar errores
    }
  };

  // Función para imprimir todas las horas del operador
  function handlePrintHoras(historialHoras, cedula, horasTotales) {
    // Crear instancia de jsPDF
    const doc = new jsPDF();
    const horasTotalesRedondeadas = horasTotales.toFixed(1);

    // Título del PDF
    doc.text(
      "Historial de Horas del Operador: " +
        cedula +
        " / " +
        "Horas totales: " +
        horasTotalesRedondeadas,
      10,
      10
    );

    // Crear tabla para el historial de horas
    const tabla = document.createElement("table");
    const tbody = document.createElement("tbody");

    // Llenar la tabla con los datos del historial de horas
    historialHoras.forEach((registro) => {
      const tr = document.createElement("tr");
      Object.values(registro).forEach((valor) => {
        const td = document.createElement("td");
        td.textContent = valor.toString();
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    tabla.appendChild(tbody);

    // Convertir tabla a HTML
    doc.autoTable({ html: tabla });

    // Descargar el PDF
    doc.save("historial_horas_" + cedula + ".pdf");
  }

  // Función para convertir la tabla a PDF
  function handlePrintTable() {
    // Crear instancia de jsPDF
    const doc = new jsPDF();

    // Título del PDF
    doc.text("Operadores Horarios", 10, 10);

    // Convertir tabla a HTML
    const tabla = document.createElement("table");
    const tbody = document.createElement("tbody");

    // Llenar la tabla con los datos
    operadoresHorarios.forEach((op) => {
      const tr = document.createElement("tr");
      Object.values(op).forEach((valor) => {
        const td = document.createElement("td");
        td.textContent = valor.toString();
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    tabla.appendChild(tbody);

    // Convertir tabla a HTML
    doc.autoTable({ html: tabla });

    // Descargar el PDF
    doc.save("operadores_horarios.pdf");
  }

  const [cedula, setCedula] = useState("");
  const [historialHoras, setHistorialHoras] = useState([]);
  const [horasTotales, setHorasTotales] = useState(0);

  const fecthHistorialHoras = async () => {
    try {
      const carnet = document.getElementById("carnetInput").value;
      const response = await axios.get(
        `http://localhost:5074/api/registroHorasOP/${carnet}`
      );
      if (response.status === 200) {
        const historialHora = response.data;
        setHistorialHoras(historialHora);
        const horasTotalesCalculadas = historialHora.reduce(
          (totalHoras, registro) => totalHoras + registro.horasReg,
          0
        );
        setHorasTotales(horasTotalesCalculadas);
      } else {
        throw new Error("Error al obtener datos de laboratorios");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función para formatear la fecha y mostrar solo la fecha sin la hora
  function renderFechaCompra(fechaCompra) {
    if (!fechaCompra) return "No se conoce";
    const fecha = new Date(fechaCompra);
    const formattedFechaCompra = fecha.toLocaleDateString("es-ES");
    return formattedFechaCompra;
  }

  return (
    <Container className="mt-4 py-4 ">
      <Button variant="danger" className="logout-button">
        <NavLink to="/">Cerrar Sesión</NavLink>
      </Button>
      <h1>Bienvenido Administrador {usuario.primerNombre}</h1>
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
                          <BsFillTrash3Fill
                            className="delete-btn"
                            onClick={() => handleEraseLab(idx)}
                          />
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
              <div
                className="d-flex justify-content-center mt-3"
                style={{ marginTop: "10px" }}
              >
                <Button onClick={() => handleOpenLabModal()}>Agregar</Button>
              </div>
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
                    <th>Requiere Aprobador</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {activo.map((activos, idx) => (
                    <tr key={idx}>
                      <td>{activos.placa}</td>
                      <td>{activos.tipo}</td>
                      <td>{activos.marca}</td>
                      <td className="expand">
                        {renderFechaCompra(activos.fCompra)}
                      </td>
                      <td>{renderAprobador(activos.aprobCed)}</td>
                      <td className="fit">
                        <span className="actions">
                          <BsFillTrash3Fill
                            className="delete-btn"
                            onClick={() => handleEraseActivo(idx)}
                          />
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
              <div
                className="d-flex justify-content-center mt-3"
                style={{ marginTop: "10px" }}
              >
                <Button onClick={() => handleOpenActivoModal()}>Agregar</Button>
              </div>
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
                      <td>{`${profesor.primerNombre} ${
                        profesor.segundoNombre ? profesor.segundoNombre : ""
                      }`}</td>
                      <td>{`${profesor.primerApellido} ${profesor.segundoApellido}`}</td>
                      <td>{calculateAge(profesor.fechaNacimiento)}</td>
                      <td>{renderFechaCompra(profesor.fechaNacimiento)}</td>
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
                        <td>{`${op.primerNombre} ${
                          op.segundoNombre ? op.segundoNombre : ""
                        }`}</td>
                        <td>{`${op.primerApellido} ${op.segundoApellido}`}</td>
                        <td>{calculateAge(op.fechaNacimiento)}</td>
                        <td>{renderFechaCompra(op.fechaNacimiento)}</td>
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
                    <th>Primer Nombre</th>
                    <th>Segundo Nombre</th>
                    <th className="expand">Carnet</th>
                    <th>Cantidad de horas</th>
                  </tr>
                </thead>
                <tbody>
                  {operadoresHorarios.map((op, idx) => (
                    <tr key={idx}>
                      <td>{op.pApellido}</td>
                      <td>{op.sApellido}</td>
                      <td>{op.pNombre}</td>
                      <td>{op.sNombre}</td>
                      <td>{op.carnet}</td>
                      <td>{op.horasTotales}</td>
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
                  id="carnetInput"
                  placeholder="Ingrese el carnet"
                  className="geeksInput"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
                <h1 className="geeksHeading"></h1>
                <button onClick={fecthHistorialHoras} className="geeksBtn">
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
                        <th>Hora de Entrada</th>
                        <th>Hora de Salida</th>
                        <th>Cantidad de Horas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historialHoras.map((registro, idx) => (
                        <tr key={idx}>
                          <td>{renderFechaCompra(registro.fecha)}</td>
                          <td>{registro.horaEntr}</td>
                          <td>{registro.horaSal}</td>
                          <td className="expand">
                            {(
                              (new Date(
                                "2000-01-01 " + registro.horaSal
                              ).getTime() -
                                new Date(
                                  "2000-01-01 " + registro.horaEntr
                                ).getTime()) /
                              (1000 * 60 * 60)
                            ).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <button
                        onClick={() =>
                          handlePrintHoras(historialHoras, cedula, horasTotales)
                        }
                        className="geeksBtn"
                      >
                        Imprimir Historial de Horas
                      </button>
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

      <LabModal show={showLabModal} handleClose={handleCloseLabModal} />
      <ActivoModal
        show={showActivoModal}
        handleClose={handleCloseActivoModal}
      />
    </Container>
  );
};
