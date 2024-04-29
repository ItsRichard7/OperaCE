import React, { useState } from "react";
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

// data
import labData from "../Assets/laboratorios.json";
import activoData from "../Assets/activos.json";
import usuariosData from "../Assets/usuarios.json";
import regHorasData from "../Assets/Reg_horas.json";
import actSolData from "../Assets/actSol.json";

//iconos
import { IoBagCheck } from "react-icons/io5";

// modals
import CreateProfeActivo from "./createProfeActivo";
import CreateEstActivo from "./createModalActivoEst";

export const OperatorPage = () => {
  const location = useLocation();
  const { usuario } = location.state || {};

  //listas

  const [lab, setLab] = useState(labData || []);
  const [activo, setActivo] = useState(activoData || []);
  const [actSol, setActSol] = useState(actSolData || []);
  const [usuarios, setUsuarios] = useState(usuariosData || []);
  const [horarios, setHorarios] = useState(regHorasData || []);
  const profesores = usuarios.filter((usuario) => usuario.rol === "profesor");
  const operadores = usuarios.filter((usuario) => usuario.rol === "operador");
  const activosPrestados = activo.filter((activo) => activo.prestado === true);
  const activosNoPrestados = activo.filter(
    (activo) => activo.prestado === false
  );

  const horariosUser = horarios.filter(
    (horario) => horario.user_ced === usuario.cedula
  );

  const actSolAprobados = actSol.filter(
    (item) => item.aprobado === true && item.entregado === false
  );

  // funciones y const para registro de horas

  const [showEntryButton, setShowEntryButton] = useState(true);
  const [showExitButton, setShowExitButton] = useState(true);
  const [entradaActual, setEntradaActual] = useState("");
  const handleEntryClick = () => {
    const entrada = new Date().toLocaleTimeString();
    localStorage.setItem("entrada", entrada);
    setEntradaActual(entrada);
    console.log("Hora de entrada guardada en el localStorage:", entrada);
    setShowEntryButton(true);
    setShowExitButton(true);
  };

  const handleExitClick = () => {
    const salida = new Date().toLocaleTimeString();
    const entrada = localStorage.getItem("entrada");
    const cedulaOperador = usuario.cedula;

    localStorage.setItem("cedulaOperador", cedulaOperador);
    localStorage.setItem("horaEntrada", entrada);
    localStorage.setItem("horaSalida", salida);

    const infoRegHrs = {
      cedula: cedulaOperador,
      horaEntrada: entrada,
      horaSalida: salida,
      fecha: new Date().toLocaleDateString(),
    };

    localStorage.setItem("infoOperador", JSON.stringify(infoRegHrs));

    console.log("Info que ocupo", infoRegHrs);

    setShowExitButton(true);
    setShowEntryButton(true);

    //window.location.href = "/";
  };

  // funciones para reservación de labs

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

  const handleVerify = (correo, password, nombre, apellido1, apellido2) => {
    if (password.trim() === "") {
      console.log("La contraseña está vacía");
      return;
    }
    const hashedPassword = md5(password);
    const jsonData = {
      Placa: activosNoPrestados[activoIdx].Placa,
      nombre: nombre,
      apellido1: apellido1,
      apellido2: apellido2,
      correo: correo,
      hashedPassword: hashedPassword,
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
      cedulaUser: usuario.cedula,
      aprobado: true,
    };
    console.log("JSON generado:", jsonData);
    closeModalActivoProf();
    //window.location.reload();
  };

  // funciones para prestamo de activos a estudiante

  const [showModalActivoEst, setShowModalActivoEst] = useState(false);

  // ojo con esto bro
  const openModalActivoEst = (idx) => {
    setShowModalActivoEst(true);
    setActivoIdx(idx);
  };

  const closeModalActivoEst = () => setShowModalActivoEst(false);

  const handleLendActiveEst = (idx) => {
    const activoPrestado = activosNoPrestados[idx];
    if (activoPrestado.aprob_ced === null) {
      setShowModalActivoEst(true);
      openModalActivoEst(idx);
    } else {
      setActivoIdx(idx);
      openAprobacionModal();
    }
  };

  const handleVerifyActivoEst = (nombre, apellido1, apellido2, correo) => {
    const aprobado = activosNoPrestados[activoIdx].aprob_ced ? false : true;
    const jsonData = {
      placa: activosNoPrestados[activoIdx].Placa,
      nombre: nombre,
      apellido1: apellido1,
      apellido2: apellido2,
      correo: correo,
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
      aprobado: aprobado,
    };
    console.log("JSON generado para el estudiante:", jsonData);
    closeModalActivoEst();
  };

  const [showAprobacionModal, setShowAprobacionModal] = useState(false);

  const openAprobacionModal = () => {
    setShowAprobacionModal(true);
  };

  // funciones para Aprobados por profesores

  // funciones para Devolución de activos

  const [showDevolvioBienModal, setShowDevolvioBienModal] = useState(false);

  const handleConfirmDevolvioBien = () => {
    const hashedPassword = md5(password);
    const horaEntrega = new Date().toLocaleTimeString();
    const fechaEntrega = new Date().toLocaleDateString();
    const jsonData = {
      placa: activosPrestados[activoIdx].Placa,
      usuario: usuario.cedula,
      hashedPassword: hashedPassword,
      horaEntrega: horaEntrega,
      fechaEntrega: fechaEntrega,
      detalleAveria: "no hay averia",
    };
    localStorage.setItem("infoDevolvioBien", JSON.stringify(jsonData));
    console.log("Información de devolución sin averías guardada:", jsonData);
    setShowDevolvioBienModal(false);
  };

  const handleDevolvioBien = (idx) => {
    setActivoIdx(idx);
    setShowDevolvioBienModal(true);
  };

  const [showDevolvioMalModal, setShowDevolvioMalModal] = useState(false);
  const [detalleAveria, setDetalleAveria] = useState("");

  const handleConfirmDevolvioMal = () => {
    const horaEntrega = new Date().toLocaleTimeString();
    const fechaEntrega = new Date().toLocaleDateString();
    const jsonData = {
      placa: activosPrestados[activoIdx].Placa,
      detalleAveria: detalleAveria,
      horaEntrega: horaEntrega,
      fechaEntrega: fechaEntrega,
    };
    localStorage.setItem("infoDevolvioMal", JSON.stringify(jsonData));
    console.log("Información de devolución con avería guardada:", jsonData);
    setShowDevolvioMalModal(false);
    setDetalleAveria("");
  };

  const handleDevolvioMal = (idx) => {
    setActivoIdx(idx);
    setShowDevolvioMalModal(true);
  };

  const confirmarEntrega = (idx) => {
    console.log(
      "placa del activo al que hay que cambiarle el entregado: " +
        actSolAprobados[idx].placa
    );

    // corregit
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
                      <td>{sols.placa}</td>
                      <td>{sols.nombre}</td>
                      <td>{sols.apellido1}</td>
                      <td>{sols.apellido2}</td>
                      <td>{sols.fecha}</td>
                      <td>{sols.hora}</td>
                      <td className="expand"> {sols.correo}</td>
                      <td className="fit">
                        <Button onClick={() => confirmarEntrega(idx)}>
                          Confirmar Entrega
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
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Hora entrada</th>
                    <th>Hora salida</th>
                    <th>Pienso</th>
                  </tr>
                </thead>
                <tbody>
                  {horariosUser.map((horarios, idx) => (
                    <tr key={idx}>
                      <td>{horarios.fecha}</td>
                      <td>{horarios.hora_entr}</td>
                      <td className="expand">{horarios.hora_sal}</td>
                      <td>pienso</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>Horas trabajadas totales: </div>
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
