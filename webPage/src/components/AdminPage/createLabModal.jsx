import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const LabModal = ({ show, handleClose }) => {
  const [labData, setLabData] = useState({
    laboratorio: "",
    capacidad: "",
    computadoras: "",
    activos: "",
    facilidades: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLabData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = () => {
    if (
      !labData.laboratorio ||
      !labData.capacidad ||
      !labData.computadoras ||
      !labData.activos ||
      !labData.facilidades
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };
  const handleGuardar = () => {
    if (validateFields()) {
      const nuevoLaboratorio = {
        laboratorio: labData.laboratorio,
        capacidad: labData.capacidad,
        computadoras: labData.computadoras,
        activos: labData.activos,
        facilidades: labData.facilidades,
      };
      console.log("Nuevo laboratorio:", nuevoLaboratorio);
      handleClose();
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Laboratorio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="laboratorio">
            <Form.Label>Laboratorio</Form.Label>
            <Form.Control
              type="text"
              name="laboratorio"
              required
              value={labData.laboratorio}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="capacidad">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control
              type="number"
              name="capacidad"
              required
              value={labData.capacidad}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="computadoras">
            <Form.Label>Computadoras</Form.Label>
            <Form.Control
              type="number"
              name="computadoras"
              required
              value={labData.computadoras}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="activos">
            <Form.Label>Activos</Form.Label>
            <Form.Control
              type="text"
              name="activos"
              required
              value={labData.activos}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="facilidades">
            <Form.Label>Facilidades</Form.Label>
            <Form.Control
              type="text"
              name="facilidades"
              required
              value={labData.facilidades}
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

export default LabModal;
