import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import md5 from "md5";

const CreateProfeActivo = ({ showModal, closeModal, handleVerify }) => {
  const [correo, setCorreo] = useState("");
  const [nombre1, setNombre1] = useState("");
  const [nombre2, setNombre2] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Prestar Activo a Profesor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombre1">
            <Form.Label>Nombre 1 del solicitante</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del solicitante"
              value={nombre1}
              onChange={(e) => setNombre1(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formNombre2">
            <Form.Label>Nombre 2 del solicitante</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el segundo nombre del solicitante"
              value={nombre2}
              onChange={(e) => setNombre2(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formApellido1">
            <Form.Label>Apellido 1 del solicitante</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el primer apellido del solicitante"
              value={apellido1}
              onChange={(e) => setApellido1(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formApellido2">
            <Form.Label>Apellido 2 del solicitante</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el segundo apellido del solicitante"
              value={apellido2}
              onChange={(e) => setApellido2(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCorreo">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese correo del profesor"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese contraseña del profesor"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          onClick={() =>
            handleVerify(correo, password, nombre1, nombre2, apellido1, apellido2)
          }
        >
          Prestar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProfeActivo;
