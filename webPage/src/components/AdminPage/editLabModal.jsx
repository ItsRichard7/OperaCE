import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const EditLabModal = ({ show, handleClose, LabData }) => {
  const [editedLabData, setEditedLabData] = useState({
    nombre: LabData.nombre ?? "", // Acceso a la propiedad "nombre"
    capacidad: LabData.capacidad ?? "", // Acceso a la propiedad "capacidad"
    computadoras: LabData.computadoras ?? "", // Acceso a la propiedad "computadoras"
    activos: LabData.activos ?? "", // No hay propiedad "activos" en el JSON proporcionado, asegúrate de qué propiedad quieres editar aquí
    descripcion: LabData.descripcion ?? "", // Acceso a la propiedad "descripcion"
  });

  const [error, setError] = useState(null);

    // Use useEffect to update state when LabData changes
    useEffect(() => {
      setEditedLabData({
        nombre: LabData.nombre ?? "",
        capacidad: LabData.capacidad ?? "",
        computadoras: LabData.computadoras ?? "",
        descripcion: LabData.descripcion ?? "",
      });
    }, [LabData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLabData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGuardar = async () => {
    try {
      const response = await fetch("http://localhost:5074/api/editarLab", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedLabData), // Enviar los datos editados del nombre
      });

      console.log(editedLabData)
  
      if (response.ok) {
        handleClose();
      } else {
        // Si hay un error en la solicitud, mostrar el mensaje de error
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      // Si hay un error en la conexión o en el proceso de la solicitud, mostrar un mensaje genérico
      setError("Error al intentar guardar los cambios.");
    }
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
          <Form.Group controlId="descripcion">
            <Form.Label>Facilidades</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={editedLabData.descripcion}
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
