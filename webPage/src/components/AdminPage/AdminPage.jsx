import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import md5 from 'md5';
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

export const AdminPage = () => {
  const location = useLocation();
  const { usuario } = location.state || {};

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
          console.log(labData);
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
          console.log(activoData);
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
          console.log(usuariosData);
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
          console.log(operadorDataHorario);
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
    console.log(lab[idx]);
    console.log(labDataToEdit);
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
  const handleCloseProfesorModal = () => {setShowProfesorModal(false); window.location.reload();}

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
      const response = await axios.delete(`http://localhost:5074/api/eliminarProfesor/${profCed}`);
      console.log(response.data); // Puedes hacer algo con la respuesta si lo necesitas
      //window.location.reload(); // Recargar la página después de eliminar exitosamente el profesor
    } catch (error) {
      console.error(error.response.data); // Manejar errores y mostrar mensaje de error en la consola
    }
    window.location.reload();
  };
  

  /////////////// funciones para gestión de operadores //////////////////

  const aprobarOperador = async (cedula) => {
    try {
      const response = await axios.post(`http://localhost:5074/api/AprobarOp/${cedula}`);
      console.log(response.data); // Puedes hacer algo con la respuesta si lo necesitas
      window.location.reload(); // Otra acción después de aprobar el operador
    } catch (error) {
      console.error("Error al aprobar operador:", error);
      // Manejar errores
    }
  };
  
  const reprobarOperador = async (idx) => {
    try {
      const cedula = operadores[idx].cedula; // Suponiendo que operadores es tu array de operadores
      const response = await axios.delete(`http://localhost:5074/api/RechazarOperador/${cedula}`);
      console.log(response.data); // Puedes hacer algo con la respuesta si lo necesitas
      window.location.reload(); // Otra acción después de rechazar el operador
    } catch (error) {
      console.error("Error al rechazar operador:", error);
      // Manejar errores
    }
  };
  
// Función para generar una contraseña aleatoria
const generateRandomPassword = () => {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|:;<>,.?/";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
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
    const response = await axios.put("http://localhost:5074/api/actualizarContrasena", { correo: email, contrasena: hashedPassword });
    console.log(response.data); // Puedes hacer algo con la respuesta si lo necesitas
    // Otra acción después de resetear la contraseña
  } catch (error) {
    console.error("Error al resetear la contraseña:", error);
    // Manejar errores
  }
};
  

  // imprimir

  const handlePrintTable = () => {
    window.print();
  };

const [cedula, setCedula] = useState("");
const [historialHoras, setHistorialHoras] = useState([]);
const [horasTotales, setHorasTotales] = useState(0);

const fecthHistorialHoras = async () => {
  try {
    const carnet = document.getElementById("carnetInput").value;
    const response = await axios.get(`http://localhost:5074/api/registroHorasOP/${carnet}`);
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
                      <td>{`${profesor.primerNombre} ${profesor.segundoNombre ? profesor.segundoNombre : ''}`}</td>
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
                        <td>{`${op.primerNombre} ${op.segundoNombre ? op.segundoNombre : ''}`}</td>
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
                  placeholder="Ingrese la cedula"
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
