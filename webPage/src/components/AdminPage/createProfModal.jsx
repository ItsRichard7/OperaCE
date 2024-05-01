import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import md5 from "md5";
import axios from "axios";

// modal para guardar profesor //
const ProfesorModal = ({ show, handleClose }) => {
  const [profesorData, setProfesorData] = useState({
    cedula: "",
    pnombre: "",
    snombre: "",
    apellido1: "",
    apellido2: "",
    fechaNacimiento: "",
    correo: "",
    contrasena: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfesorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateFields = () => {
    if (
      !profesorData.cedula ||
      !profesorData.pnombre ||
      !profesorData.apellido1 ||
      !profesorData.apellido2 ||
      !profesorData.fechaNacimiento ||
      !profesorData.correo ||
      !profesorData.contrasena
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleGuardar = async () => {
    if (validateFields()) {
      try {
        const hashedPassword = md5(profesorData.contrasena);
  
        const newUser = {
          cedula: profesorData.cedula,
          correo: profesorData.correo,
          contrasena: hashedPassword,
          carnet: null, 
          primerNombre: profesorData.pnombre,
          segundoNombre: profesorData.snombre || null, // Manejar explícitamente el valor nulo
          primerApellido: profesorData.apellido1,
          segundoApellido: profesorData.apellido2 || null, // Manejar explícitamente el valor nulo
          fechaNacimiento: profesorData.fechaNacimiento,
          activo: true, // Opcional: establecer el usuario como activo por defecto
          rolId: 2, // Opcional: asignar el ID del rol de profesor
        };
  
        const response = await axios.post(
          "http://localhost:5074/api/Usuario",
          newUser
        );
  
        console.log(response.data); // Puedes hacer algo con la respuesta si lo necesitas
  
        // Cerrar el modal o realizar alguna otra acción después de guardar exitosamente
        handleClose();
      } catch (error) {
        console.error("Error al insertar usuario:", error);
        setError("Error al insertar usuario. Por favor, intenta nuevamente.");
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Profesor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="cedula">
            <Form.Label>Número de Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              required
              value={profesorData.cedula}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="pnombre">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="pnombre"
              required
              value={profesorData.pnombre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="snombre">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="snombre"
              value={profesorData.snombre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="apellido1">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido1"
              required
              value={profesorData.apellido1}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="apellido2">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido2"
              required
              value={profesorData.apellido2}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="fechaNacimiento">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              required
              name="fechaNacimiento"
              value={profesorData.fechaNacimiento}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="correo">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="correo"
              required
              value={profesorData.correo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="contrasena">
            <Form.Label>Contrasena</Form.Label>
            <Form.Control
              type="text"
              required
              name="contrasena"
              value={profesorData.contrasena}
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

export default ProfesorModal;
