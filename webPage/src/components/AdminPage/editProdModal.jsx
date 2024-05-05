import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const EditModalProf = ({ show, handleClose, profesorData }) => {
  // Establecer valores predeterminados para campos indefinidos
  const [editedProfesorData, setEditedProfesorData] = useState({
    correo: profesorData.correo ?? "",
    primerNombre: profesorData.primerNombre ?? "",
    segundoNombre: profesorData.segundoNombre ?? "",
    primerApellido: profesorData.primerApellido ?? "",
    fechaNacimiento: profesorData.fechaNacimiento,
    segundoApellido: profesorData.segundoApellido ?? "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfesorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGuardar = async () => {
    try {
      const editedProfesor = {
        cedula: profesorData.cedula,
        correo: editedProfesorData.correo,
        pNombre: editedProfesorData.primerNombre,
        sNombre: editedProfesorData.segundoNombre,
        pApellido: editedProfesorData.primerApellido,
        sApellido: editedProfesorData.segundoApellido,
        edad: profesorData.edad,
        fNacimiento: editedProfesorData.fechaNacimiento,
      };

      const response = await axios.put(
        "http://localhost:5074/api/editarProfesor",
        editedProfesor
      );

      handleClose(); // Cerrar el modal después de guardar exitosamente
    } catch (error) {
      const errorMessage = error.response.data.errors.message; // Accede directamente al mensaje de error
      setError(errorMessage);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Profesor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="primerNombre">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="primerNombre"
              value={editedProfesorData.primerNombre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="segundoNombre">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="segundoNombre"
              value={editedProfesorData.segundoNombre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="primerApellido">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="primerApellido"
              value={editedProfesorData.primerApellido}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="segundoApellido">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="segundoApellido"
              value={editedProfesorData.segundoApellido}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="fechaNacimiento">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="fechaNacimiento"
              value={editedProfesorData.fechaNacimiento.split("T")[0]} // Mostrar solo la fecha
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
