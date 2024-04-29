import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import md5 from "md5";

const CreateProfeActivo = ({ showModal, closeModal, handleVerify }) => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Prestar Activo a Profesor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCorreo">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
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
          onClick={() => handleVerify(correo, password)}
        >
          Verificar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProfeActivo;
