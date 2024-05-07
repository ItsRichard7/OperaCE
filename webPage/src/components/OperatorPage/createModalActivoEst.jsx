import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalActivoEst = ({ showModal, closeModal, handleVerify }) => {
  const [nombre1, setNombre1] = useState("");
  const [nombre2, setNombre2] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [correo, setCorreo] = useState("");

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Prestar Activo a Estudiante</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombre1">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su primer nombre"
              value={nombre1}
              onChange={(e) => setNombre1(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formNombre2">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su segundo nombre"
              value={nombre2}
              onChange={(e) => setNombre2(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formApellido1">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su primer apellido"
              value={apellido1}
              onChange={(e) => setApellido1(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formApellido2">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su segundo apellido"
              value={apellido2}
              onChange={(e) => setApellido2(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCorreo">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={() => handleVerify(nombre1, nombre2, apellido1, apellido2, correo)}
        >
          Verificar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalActivoEst;
