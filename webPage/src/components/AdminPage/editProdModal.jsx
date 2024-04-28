import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const EditModalProf = ({ show, handleClose, profesorData }) => {
  // Establecer valores predeterminados para campos indefinidos
  const [editedProfesorData, setEditedProfesorData] = useState({
    correo: profesorData.correo ?? "",
    nombre: profesorData.nombre ?? "",
    snombre: profesorData.snombre ?? "",
    apellido1: profesorData.apellido1 ?? "",
    fechaNacimiento: profesorData.fecha_nacimiento,
    apellido2: profesorData.apellido2 ?? "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfesorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGuardar = () => {
    const editedProfesor = {
      correo: editedProfesorData.correo,
      nombre: editedProfesorData.nombre,
      snombre: editedProfesorData.snombre,
      apellido1: editedProfesorData.apellido1,
      apellido2: editedProfesorData.apellido2,
      fechaNacimiento: editedProfesorData.fechaNacimiento,
    };

    localStorage.setItem("profesorData", JSON.stringify(editedProfesor));
    console.log(editedProfesor);

    // Cerrar el modal
    //window.location.reload();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Profesor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={editedProfesorData.nombre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="apellido1">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido1"
              value={editedProfesorData.apellido1}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="apellido2">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido2"
              value={editedProfesorData.apellido2}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="fechaNacimiento">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="fechaNacimiento"
              value={editedProfesorData.fechaNacimiento} // Usar fecha_nacimiento en lugar de fechaNacimiento
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="correo">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="correo"
              value={editedProfesorData.correo}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        {error && <Alert variant="danger">{error}</Alert>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleGuardar}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModalProf;
