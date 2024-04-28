import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const EditActModal = ({ show, handleClose, ActivoData }) => {
  const [editedActivoData, setEditedActivoData] = useState({
    Placa: ActivoData.Placa ?? "",
    Tipo: ActivoData.Tipo ?? "",
    Fecha_de_Compra: ActivoData.Fecha_de_Compra ?? "",
    Préstamo_requiere_aprobador: ActivoData.Préstamo_requiere_aprobador ?? "",
    prestado: ActivoData.prestado ?? "",
    aprob_ced: ActivoData.aprob_ced ?? "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedActivoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGuardar = () => {
    const editedActivo = {
      Placa: editedActivoData.Placa,
      Tipo: editedActivoData.Tipo,
      Fecha_de_Compra: editedActivoData.Fecha_de_Compra,
      Préstamo_requiere_aprobador: editedActivoData.Préstamo_requiere_aprobador,
      prestado: editedActivoData.prestado,
      aprob_ced:
        editedActivoData.aprob_ced === "" ? null : editedActivoData.aprob_ced,
    };

    localStorage.setItem("ActivoData", JSON.stringify(editedActivo));
    console.log(editedActivo);

    // Cerrar el modal
    //window.location.reload();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Activo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="Placa">
            <Form.Label>Placa</Form.Label>
            <Form.Control
              type="text"
              name="Placa"
              value={editedActivoData.Placa}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="Tipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              name="Tipo"
              value={editedActivoData.Tipo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="Fecha_de_Compra">
            <Form.Label>Fecha de Compra</Form.Label>
            <Form.Control
              type="date"
              name="Fecha_de_Compra"
              value={editedActivoData.Fecha_de_Compra}
            />
          </Form.Group>

          <Form.Group controlId="aprob_ced">
            <Form.Label>Cedula del aprobador</Form.Label>
            <Form.Control
              type="number"
              name="aprob_ced"
              value={editedActivoData.aprob_ced}
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
