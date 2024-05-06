import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const ActivoModal = ({ show, handleClose }) => {
  const [activoData, setActivoData] = useState({
    placa: "",
    tipo: "",
    marca: "",
    fechaCompra: "",
    prestado: false,
    aprobadoPor: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setActivoData((prevData) => ({
      ...prevData,
      [name]: name === "fechaCompra" && value === "" ? null : newValue,
    }));
  };

  const validateFields = () => {
    if (
      !activoData.placa ||
      !activoData.tipo ||
      !activoData.marca ||
      !activoData.aprobadoPor
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleGuardar = () => {
    if (validateFields()) {
      const nuevoActivo = {
        placa: activoData.placa,
        tipo: activoData.tipo,
        marca: activoData.marca,
        fechaCompra: activoData.fechaCompra,
        aprobadoPor: activoData.aprobadoPor,
      };
      console.log("Nuevo activo:", nuevoActivo);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Activo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="placa">
            <Form.Label>Placa</Form.Label>
            <Form.Control
              type="text"
              name="placa"
              required
              value={activoData.placa}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="tipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              name="tipo"
              required
              value={activoData.tipo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="marca">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type="text"
              name="marca"
              required
              value={activoData.marca}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="fechaCompra">
            <Form.Label>Fecha de Compra</Form.Label>
            <Form.Control
              type="date"
              name="fechaCompra"
              value={activoData.fechaCompra}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="aprobadoPor">
            <Form.Label>Aprobado Por</Form.Label>
            <Form.Control
              type="number"
              name="aprobadoPor"
              value={activoData.aprobadoPor}
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

export default ActivoModal;
