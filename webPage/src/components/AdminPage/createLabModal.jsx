import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const LabModal = ({ show, handleClose }) => {
  const [labData, setLabData] = useState({
    laboratorio: "",
    capacidad: "",
    computadoras: "",
    facilidades: [""],
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLabData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddFacilidad = () => {
    setLabData((prevData) => ({
      ...prevData,
      facilidades: [...prevData.facilidades, ""],
    }));
  };

  const handleFacilidadChange = (e, index) => {
    const { value } = e.target;
    setLabData((prevData) => ({
      ...prevData,
      facilidades: prevData.facilidades.map((facilidad, i) =>
        i === index ? value : facilidad
      ),
    }));
  };

  const handleGuardar = async () => {
    if (validateFields()) {
      const nuevoLaboratorio = {
        lab_nombre: labData.laboratorio,
        capacidad: parseInt(labData.capacidad),
        computadoras: parseInt(labData.computadoras),
      };
      console.log("Nuevo laboratorio:", nuevoLaboratorio);

      try {
        const response = await fetch(
          "http://localhost:5074/api/agregarLaboratorio",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoLaboratorio),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message);
          return;
        }

        for (let i = 0; i < labData.facilidades.length; i++) {
          const facilidad = labData.facilidades[i];
          const response2 = await fetch(
            "http://localhost:5074/api/agregarFacilidad",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                lab_nombre: labData.laboratorio,
                Descripcion: facilidad,
              }),
            }
          );

          if (!response2.ok) {
            const errorData = await response2.json();
            setError(errorData.message);
            return;
          }
        }
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateFields = () => {
    if (
      !labData.laboratorio ||
      !labData.capacidad ||
      !labData.computadoras ||
      labData.facilidades.some((facilidad) => facilidad === "")
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
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
          <Form.Group controlId="facilidades">
            <Form.Label>Facilidades</Form.Label>
            {labData.facilidades.map((facilidad, index) => (
              <Form.Control
                key={index}
                type="text"
                name={`facilidad-${index}`}
                required
                value={facilidad}
                onChange={(e) => handleFacilidadChange(e, index)}
              />
            ))}
          </Form.Group>
          <Button variant="primary" onClick={handleAddFacilidad}>
            Insertar otra facilidad
          </Button>
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
