import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const EditLabModal = ({ show, handleClose, LabData }) => {
  const [editedLabData, setEditedLabData] = useState({
    laboratorio: LabData.Laboratorio ?? "",
    capacidad: LabData.Capacidad ?? "",
    computadoras: LabData.Computadoras ?? "",
    activos: LabData.Activos ?? "",
    facilidades: LabData.Facilidades ?? "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLabData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGuardar = () => {
    const editedLab = {
      laboratorio: editedLabData.laboratorio,
      capacidad: editedLabData.capacidad,
      Computadoras: editedLabData.computadoras,
      Activos: editedLabData.activos,
      Facilidades: editedLabData.facilidades,
    };

    localStorage.setItem("LabData", JSON.stringify(editedLab));
    console.log(editedLab);

    // Cerrar el modal
    //window.location.reload();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Laboratorio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="capacidad">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control
              type="number"
              name="capacidad"
              value={editedLabData.capacidad}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="computadoras">
            <Form.Label>Computadoras</Form.Label>
            <Form.Control
              type="number"
              name="computadoras"
              value={editedLabData.computadoras}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="activos">
            <Form.Label>Activos</Form.Label>
            <Form.Control
              type="text"
              name="activos"
              value={editedLabData.activos}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="facilidades">
            <Form.Label>Facilidades</Form.Label>
            <Form.Control
              type="text"
              name="facilidades"
              value={editedLabData.facilidades}
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

export default EditLabModal;
