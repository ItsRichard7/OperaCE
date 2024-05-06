import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const EditActModal = ({ show, handleClose, ActivoData }) => {
  const [editedActivoData, setEditedActivoData] = useState({
    placa: ActivoData.placa ?? "",
    tipo: ActivoData.tipo ?? "",
    fCompra: ActivoData.fCompra ?? "",
    marca: ActivoData.marca ?? "",
    Préstamo_requiere_aprobador: ActivoData.Préstamo_requiere_aprobador ?? "",
    prestado: ActivoData.prestado ?? "",
    aprobCed: ActivoData.aprobCed ?? "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedActivoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGuardar = async () => {
    try {
      const editedActivo = {
        placa: editedActivoData.placa,
        tipo: editedActivoData.tipo,
        fCompra: editedActivoData.fCompra,
        marca: editedActivoData.marca,
        aprobCed:
          editedActivoData.aprobCed === "" ? null : editedActivoData.aprobCed,
      };

      const response = await axios.put(
        "http://localhost:5074/api/EditarActivo",
        editedActivo
      );
      handleClose(); // Cerrar el modal después de guardar exitosamente
    } catch (error) {
      setError(error.response.data); // Manejar errores y mostrar mensaje de error en el componente
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Activo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="placa">
            <Form.Label>Placa</Form.Label>
            <Form.Control
              type="text"
              name="placa"
              value={editedActivoData.placa}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="tipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              name="tipo"
              value={editedActivoData.tipo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="fCompra">
            <Form.Label>Fecha de Compra</Form.Label>
            <Form.Control
              type="date"
              name="fCompra"
              value={editedActivoData.fCompra.split("T")[0]} // Mostrar solo la fecha
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="marca">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type="text"
              name="marca"
              value={editedActivoData.marca}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="aprobCed">
            <Form.Label>Cedula del aprobador</Form.Label>
            <Form.Control
              type="number"
              name="aprobCed"
              value={editedActivoData.aprobCed}
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

export default EditActModal;
