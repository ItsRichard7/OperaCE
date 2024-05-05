import React, { useState, useEffect } from "react";
import "./OperatorPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Tabs,
  Tab,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import md5 from "md5";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

//iconos
import { IoBagCheck } from "react-icons/io5";

// modals
import CreateProfeActivo from "./createProfeActivo";
import CreateEstActivo from "./createModalActivoEst";

export const OperatorPage = () => {
  useEffect(() => {
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

    const fecthActNoEntregados = async () => {
      try {
        const response = await fetch(
          "http://localhost:5074/api/ObtenerActivosNoEntregados"
        );
        if (response.ok) {
          const activoData = await response.json();
          setActSol(activoData);
        } else {
          throw new Error("Error al obtener datos de laboratorios");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fecthHistorialHoras = async () => {
      try {
        const carnet = usuario.carnet;
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

    fetchLabData(); // Llamar a la función para obtener los datos de laboratorios al cargar la página
    fetchActData(); // Llamar a la función para obtener los datos de activos al cargar la página
    fecthActNoEntregados(); // Llamar a la función para obtener los datos de activos no entregados al cargar la página
    fecthHistorialHoras(); // Llamar a la función para obtener los datos de historial de horas al cargar la página

    const cedulaString = usuario.cedula.toString(); // Convertir la cédula a cadena
    const entradaGuardada = localStorage.getItem(cedulaString);
    if (entradaGuardada) {
      setEntradaActual(entradaGuardada);
    }

    if (localStorage.getItem(cedulaString) !== null) {
      setShowEntryButton(false);
      setShowExitButton(true);
    }
  }, []);

  const location = useLocation();
  const { usuario } = location.state || {};
  const [error, setError] = useState(null);

  //listas

  const [lab, setLab] = useState([]);
  const [activo, setActivo] = useState([]);
  const [actSolAprobados, setActSol] = useState([]);
  const [horasTotales, setHorasTotales] = useState(0);
  const [historialHoras, setHistorialHoras] = useState([]);

  const activosPrestados = activo.filter((activo) => activo.prestado === true);
  const activosNoPrestados = activo.filter(
    (activo) => activo.prestado === false
  );
  // funciones y const para registro de horas

  const [showEntryButton, setShowEntryButton] = useState(true);
  const [showExitButton, setShowExitButton] = useState(false);
  const [entradaActual, setEntradaActual] = useState("");

  const handleEntryClick = () => {
    const entrada = new Date().toLocaleTimeString();
    const cedulaString = usuario.cedula.toString(); // Convertir la cédula a cadena
    localStorage.setItem(cedulaString, entrada);
    setEntradaActual(entrada);
    setShowEntryButton(false);
    setShowExitButton(true);
  };

  const formatearFecha = (fecha) => {
    const fechaFormateada = new Date(fecha).toISOString().split("T")[0];
    return fechaFormateada;
  };

  const formatearHora = (hora) => {
    const horaObj = new Date(`01/01/2022 ${hora}`);
    const horas = horaObj.getHours().toString().padStart(2, "0");
    const minutos = horaObj.getMinutes().toString().padStart(2, "0");
    const segundos = horaObj.getSeconds().toString().padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
  };

  const calcularHorasTrabajadas = (horaEntrada, horaSalida) => {
    // Parsea las horas de entrada y salida en objetos Date
    const entrada = new Date(`01/01/2022 ${horaEntrada}`);
    const salida = new Date(`01/01/2022 ${horaSalida}`);

    // Calcula la diferencia en milisegundos entre la hora de salida y la hora de entrada
    const diferenciaMs = salida - entrada;

    // Convierte la diferencia en milisegundos a horas
    const horasTrabajadas = diferenciaMs / (1000 * 60 * 60);

    // Redondea las horas trabajadas a dos decimales y retorna el resultado
    return parseFloat(horasTrabajadas.toFixed(2));
  };

  const handleExitClick = () => {
    const cedulaString = usuario.cedula.toString(); // Convertir la cédula a cadena
    const salida = new Date().toLocaleTimeString();
    const entrada = localStorage.getItem(cedulaString);
    const cedulaOperador = usuario.cedula;

    const infoRegHrs = {
      fecha: formatearFecha(new Date()),
      horaEntrada: formatearHora(entrada),
      horaSalida: formatearHora(salida), // Extrae la hora de la salida formateada
      horasRegistradas: calcularHorasTrabajadas(entrada, salida), // Puedes implementar esta función para calcular las horas trabajadas
      userCed: cedulaOperador,
    };

    fetch("http://localhost:5074/api/insertarHoras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoRegHrs),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al enviar las horas registradas al servidor");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.removeItem(cedulaString);
        setShowExitButton(false);
        setShowEntryButton(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    window.location.reload();
  };

  const Navigate = useNavigate();

  const handleLendLab = (idx) => {
    const labSelected = lab[idx];
    Navigate("/LabsEst", {
      state: { usuario: usuario, laboratorio: labSelected },
    });
  };

  // Estado y funciones para el modal de préstamo de activo a profesor
  const [showModalActivoProf, setShowModalActivoProf] = useState(false);
  const [password, setPassword] = useState("");
  const [activoIdx, setActivoIdx] = useState(null);

  const openModalActivoProf = (idx) => {
    setShowModalActivoProf(true);
    setActivoIdx(idx);
  };

  const closeModalActivoProf = () => setShowModalActivoProf(false);

  const handleLogin = async (correo, contrasena) => {
    try {
      const response = await fetch("http://localhost:5074/api/InicioSesion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data === true) {
          const usuarioResponse = await fetch(
            "http://localhost:5074/api/obtenerUsuario",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const usuariosData = await usuarioResponse.json();
          const usuarioEncontrado = usuariosData.find(
            (usuario) => usuario.correo === correo
          );

          if (usuarioEncontrado) {
            if (usuarioEncontrado.activo === false) {
              setError("Cuenta no activada");
              return;
            }

            localStorage.setItem("authenticated", JSON.stringify(true));

            if (usuarioEncontrado.rolId === 2) {
              return data;
            } else {
              throw new Error("rol erroneo");
            }
          } else {
            throw new Error("Usuario no encontrado");
          }
        } else {
          throw new Error("Contraseña incorrecta");
        }
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      throw new Error("Error al iniciar sesión");
    }
  };

  const handleVerify = async (
    correo,
    password,
    nombre1,
    nombre2,
    apellido1,
    apellido2
  ) => {
    try {
      // Verifica el inicio de sesión llamando a handleLogin
      const loginResult = await handleLogin(correo, password);

      if (loginResult === true) {
        // Continúa con la lógica de handleVerify si el inicio de sesión fue exitoso
        if (password.trim() === "") {
          console.log("La contraseña está vacía");
          return;
        }

        const fecha = formatearFecha(new Date());
        const hora = new Date().toLocaleTimeString();
        const horaFormateada = formatearHora(hora);

        const jsonData = {
          ActivoPlaca: activosNoPrestados[activoIdx].placa,
          PrimerNombre: nombre1,
          SegundoNombre: nombre2,
          PrimerApellido: apellido1,
          SegundoAPellido: apellido2,
          CorreoSolicitante: correo,
          FechaSolicitud: fecha,
          HoraSolicitud: horaFormateada,
          UsuarioCedula: usuario.cedula,
          Aprobado: true,
        };

        const response = await axios.post(
          "http://localhost:5074/api/insertarSolicitudActivo",
          jsonData
        );

        console.log("JSON generado:", jsonData);
        closeModalActivoProf();
        window.location.reload();
      } else {
        // Maneja el caso en el que el inicio de sesión no fue exitoso
        console.log("Verificación de correo fallida");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // funciones para prestamo de activos a estudiante

  const [showModalActivoEst, setShowModalActivoEst] = useState(false);

  // ojo con esto bro
  const openModalActivoEst = (idx) => {
    setShowModalActivoEst(true);
    setActivoIdx(idx);
  };

  function renderAprobador(requiereAprobador) {
    return requiereAprobador ? "Sí" : "No";
  }

  const closeModalActivoEst = () => setShowModalActivoEst(false);

  const handleLendActiveEst = (idx) => {
    const activoPrestado = activosNoPrestados[idx];
    if (activoPrestado.aprobCed === null) {
      setShowModalActivoEst(true);
      openModalActivoEst(idx);
    } else {
      setActivoIdx(idx);
      openAprobacionModal();
    }
  };

  const handleVerifyActivoEst = async (
    nombre1,
    nombre2,
    apellido1,
    apellido2,
    correo
  ) => {
    const aprobado = activosNoPrestados[activoIdx].aprobCed ? false : true;

    const fecha = formatearFecha(new Date());
    const hora = new Date().toLocaleTimeString();
    const horaFormateada = formatearHora(hora);

    const jsonData = {
      ActivoPlaca: activosNoPrestados[activoIdx].placa,
      PrimerNombre: nombre1,
      SegundoNombre: nombre2,
      PrimerApellido: apellido1,
      SegundoAPellido: apellido2,
      CorreoSolicitante: correo,
      FechaSolicitud: fecha,
      HoraSolicitud: horaFormateada,
      UsuarioCedula: usuario.cedula,
      Aprobado: aprobado,
    };

    const response = await axios.post(
      "http://localhost:5074/api/insertarSolicitudActivo",
      jsonData
    );
    console.log("JSON generado para el estudiante:", jsonData);
    closeModalActivoEst();
    window.location.reload();
  };

  const [showAprobacionModal, setShowAprobacionModal] = useState(false);

  const openAprobacionModal = () => {
    setShowAprobacionModal(true);
  };

  // funciones para Aprobados por profesores

  // funciones para Devolución de activos

  const [showDevolvioBienModal, setShowDevolvioBienModal] = useState(false);

  // Función para formatear la fecha y mostrar solo la fecha sin la hora
  function renderFechaCompra(fechaCompra) {
    if (!fechaCompra) return "No se conoce";
    const fecha = new Date(fechaCompra);
    const formattedFechaCompra = fecha.toLocaleDateString("es-ES");
    return formattedFechaCompra;
  }

  const handleConfirmDevolvioBien = async () => {
    const horaEntrega = new Date().toLocaleTimeString();
    const horaFormateada = formatearHora(horaEntrega);
    const fechaEntrega = formatearFecha(new Date());
    const jsonData = {
      activoPlaca: activosPrestados[activoIdx].placa,
      horaDevolucion: horaFormateada,
      fechaDevolucion: fechaEntrega,
      averia: "no hay averia",
    };
    localStorage.setItem("infoDevolvioBien", JSON.stringify(jsonData));
    console.log("Información de devolución sin averías guardada:", jsonData);

    try {
      const response = await axios.post(
        "http://localhost:5074/api/DevolverActivo",
        jsonData
      );
      window.location.reload();
      setShowDevolvioBienModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDevolvioBien = (idx) => {
    setActivoIdx(idx);
    setShowDevolvioBienModal(true);
  };

  const [showDevolvioMalModal, setShowDevolvioMalModal] = useState(false);
  const [detalleAveria, setDetalleAveria] = useState("");

  const handleConfirmDevolvioMal = async () => {
    const horaEntrega = new Date().toLocaleTimeString();
    const horaFormateada = formatearHora(horaEntrega);
    const fechaEntrega = formatearFecha(new Date());
    const jsonData = {
      activoPlaca: activosPrestados[activoIdx].placa,
      averia: detalleAveria,
      horaDevolucion: horaFormateada,
      fechaDevolucion: fechaEntrega,
    };

    try {
      const response = await axios.post(
        "http://localhost:5074/api/DevolverActivo",
        jsonData
      );
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
    localStorage.setItem("infoDevolvioMal", JSON.stringify(jsonData));
    console.log("Información de devolución con avería guardada:", jsonData);

    setShowDevolvioMalModal(false);
    setDetalleAveria("");
  };

  const handleDevolvioMal = (idx) => {
    setActivoIdx(idx);
    setShowDevolvioMalModal(true);
  };

  const Noaprobar = async (idx) => {
    console.log(
      "placa del activo al que hay que cambiarle el entregado: " +
        actSolAprobados[idx].correoSolicitante +
        " / " +
        actSolAprobados[idx].fechaSolicitud +
        " / " +
        actSolAprobados[idx].horaSolicitud
    );

    try {
      const response = await axios.delete(
        "http://localhost:5074/api/RechazarPrestamo",
        {
          data: {
            correoSoli: actSolAprobados[idx].correoSolicitante,
            fechaSoli: actSolAprobados[idx].fechaSolicitud,
            horaSoli: actSolAprobados[idx].horaSolicitud,
          },
        }
      );
      window.location.reload();
      console.log(response.data);
      // Actualizar el estado o realizar alguna acción adicional si es necesario
    } catch (error) {
      console.error("Error al rechazar préstamo:", error);
    }
  };

  const confirmarEntrega = async (idx) => {
    console.log(
      "placa del activo al que hay que cambiarle el entregado: " +
        actSolAprobados[idx].correoSolicitante +
        " / " +
        actSolAprobados[idx].fechaSolicitud +
        " / " +
        actSolAprobados[idx].horaSolicitud
    );

    try {
      const response = await axios.post(
        "http://localhost:5074/api/MarcarEntregado",
        {
          correoSolicitante: actSolAprobados[idx].correoSolicitante,
          fechaSolicitud: actSolAprobados[idx].fechaSolicitud,
          horaSolicitud: actSolAprobados[idx].horaSolicitud,
        }
      );
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para imprimir todas las horas de trabajo
  function handlePrintHorasTrabajadas(historialHoras, cedula, horasTotales) {
    // Redondear las horas totales a dos decimales
    const horasTotalesRedondeadas = horasTotales.toFixed(1);

    // Crear instancia de jsPDF
    const doc = new jsPDF();

    doc.text(
      "Historial de Horas del Operador: " +
        cedula +
        " / " +
        "Horas totales: " +
        horasTotalesRedondeadas,
      10,
      10
    );

    // Agregar espacio para la tabla
    doc.text("", 10, 40); // Puedes ajustar la altura según sea necesario

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
    doc.save("historial_horas_trabajadas_" + usuario.cedula + ".pdf");
  }

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
            <div>Hora de entrada: {entradaActual}</div>
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
                      <td>{activos.placa}</td>
                      <td>{activos.tipo}</td>
                      <td className="expand">{activos.marca}</td>
                      <td className="fit">
                        <span className="actions">
                          <Button onClick={() => openModalActivoProf(idx)}>
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
                    <th>Requiere Aprobador</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {activosNoPrestados.map((activos, idx) => (
                    <tr key={idx}>
                      <td>{activos.placa}</td>
                      <td>{activos.tipo}</td>
                      <td className="expand">{activos.marca}</td>
                      <td>{renderAprobador(activos.aprobCed)}</td>
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
          </Tab>
          <Tab eventKey="tab-5" title="Aprobadas por profesores">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Nombre</th>
                    <th>Apellido 1</th>
                    <th>Apellido 2</th>
                    <th>Fecha de solicitud</th>
                    <th>hora de solicitud</th>
                    <th>Correo del solicitante</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {actSolAprobados.map((sols, idx) => (
                    <tr key={idx}>
                      <td>{sols.activoPlaca}</td>
                      <td>{sols.primerNombre}</td>
                      <td>{sols.primerApellido}</td>
                      <td>{sols.segundoApellido}</td>
                      <td>{sols.fechaSolicitud}</td>
                      <td>{sols.horaSolicitud}</td>
                      <td className="expand"> {sols.correoSolicitante}</td>
                      <td className="fit">
                        <Button onClick={() => confirmarEntrega(idx)}>
                          Confirmar Entrega
                        </Button>
                        <Button onClick={() => Noaprobar(idx)}>
                          No recogió el activo
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                      <td>{activos.placa}</td>
                      <td>{activos.tipo}</td>
                      <td className="expand">{activos.marca}</td>
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
            <div className="table-wrapper">
              <p>Cédula: {usuario.cedula}</p>
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
                      handlePrintHorasTrabajadas(
                        historialHoras,
                        usuario.cedula,
                        horasTotales
                      )
                    }
                    className="geeksBtn"
                  >
                    Descargar Horas
                  </button>{" "}
                </tbody>
              </table>
            </div>
          </Tab>
        </Tabs>
      </Row>

      <CreateEstActivo
        showModal={showModalActivoEst}
        closeModal={closeModalActivoEst}
        handleVerify={handleVerifyActivoEst}
      />

      <CreateProfeActivo
        showModal={showModalActivoProf}
        closeModal={closeModalActivoProf}
        handleVerify={handleVerify}
      />

      <Modal
        show={showAprobacionModal}
        onHide={() => setShowAprobacionModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Este activo necesita aprobación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Seleccione una opción:</p>
          <Button onClick={() => openModalActivoProf(activoIdx)}>
            El profesor está cerca
          </Button>
          <Button onClick={() => openModalActivoEst(activoIdx)}>
            El profesor no está cerca
          </Button>
        </Modal.Body>
      </Modal>
      <Modal
        show={showDevolvioBienModal}
        onHide={() => setShowDevolvioBienModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de devolución sin averías</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Por favor, ingrese su contraseña para confirmar que el activo
            devuelto llegó sin averías:
          </p>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            Yo como usuario doy mi palabra que el activo devuelto llegó sin
            averías
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDevolvioBienModal(false)}
          >
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleConfirmDevolvioBien}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDevolvioMalModal}
        onHide={() => setShowDevolvioMalModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Devolución con Avería</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="detalleAveria">
            <Form.Label>Detalle de Avería</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={detalleAveria}
              onChange={(e) => setDetalleAveria(e.target.value)}
            />
          </Form.Group>
          <Button onClick={handleConfirmDevolvioMal}>Confirmar</Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
