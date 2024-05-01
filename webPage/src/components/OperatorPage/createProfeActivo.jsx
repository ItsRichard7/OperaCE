import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import md5 from "md5";

const CreateProfeActivo = ({ showModal, closeModal, handleVerify }) => {
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
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
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre del solicitante</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formApellido1">
            <Form.Label>Apellido 1 del solicitante</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el apellido 1 del solicitante"
              value={apellido1}
              onChange={(e) => setApellido1(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formApellido2">
            <Form.Label>Apellido 2 del solicitante</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el apellido 2 del solicitante"
              value={apellido2}
              onChange={(e) => setApellido2(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCorreo">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese correo de profesor"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese contraseña de profesor"
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
            handleVerify(correo, password, nombre, apellido1, apellido2)
          }
        >
          Verificar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProfeActivo;
