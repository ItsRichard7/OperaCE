import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const EditLabModal = ({ show, handleClose, LabData }) => {
  const [error, setError] = useState(null);

  const [editedLabData, setEditedLabData] = useState({
    nombre: LabData.nombre ?? "",
    capacidad: LabData.capacidad ?? "",
    computadoras: LabData.computadoras ?? "",
    descripcion: LabData.descripcion ?? "",
  });

  const [facilidades, setFacilidades] = useState([]);

  // Use useEffect to update state when LabData changes
  useEffect(() => {
    setEditedLabData({
      nombre: LabData.nombre ?? "",
      capacidad: LabData.capacidad ?? "",
      computadoras: LabData.computadoras ?? "",
      descripcion: LabData.descripcion ?? "",
    });
    setFacilidades(
      LabData.descripcion
        ? LabData.descripcion.split(".").map((facilidad) => facilidad.trim())
        : []
    );
  }, [LabData]);

  const handleChangeFacilidad = (e, index) => {
    const { value } = e.target;
    let newFacilidades;
    setFacilidades((prevFacilidades) => {
      newFacilidades = [...prevFacilidades];
      newFacilidades[index] = value;
      return newFacilidades;
    });

    // Verificar si newFacilidades está definido antes de llamar a join
    if (newFacilidades !== undefined) {
      setEditedLabData((prevData) => ({
        ...prevData,
        descripcion: newFacilidades.join("."),
      }));
    }
  };

  const handleAgregarFacilidad = () => {
    setFacilidades((prevFacilidades) => [...prevFacilidades, ""]);
  };

  const handleGuardar = async () => {
    const LabDataEditada = {
      nombre: LabData.nombre.trim(),
      capacidad: parseInt(editedLabData.capacidad),
      computadoras: parseInt(editedLabData.computadoras),
      descripcion: LabData.descripcion ?? "",
    };

    try {
      const response = await fetch("http://localhost:5074/api/editarLab", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(LabDataEditada), // No envuelvas LabDataEditada en otro objeto
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }

      const elimResponse = await fetch(
        `http://localhost:5074/api/elimFacilidad/${LabDataEditada.nombre}`,
        {
          method: "DELETE",
        }
      );

      if (!elimResponse.ok) {
        const errorData = await elimResponse.json();
        setError(errorData.message);
        return;
      }

      for (const facilidad of facilidades) {
        const response2 = await fetch(
          "http://localhost:5074/api/agregarFacilidad",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lab_nombre: LabDataEditada.nombre,
              Descripcion: facilidad,
            }),
          }
        );

        if (!response2.ok) {
          const errorData = await response2.json();
          setError(errorData.message);
          return;
        }

        window.location.reload();
      }
    } catch (error) {
      console.error("Error al editar laboratorio:", error);
    }
    //handleClose();
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
              onChange={(e) =>
                setEditedLabData({
                  ...editedLabData,
                  capacidad: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="computadoras">
            <Form.Label>Computadoras</Form.Label>
            <Form.Control
              type="number"
              name="computadoras"
              value={editedLabData.computadoras}
              onChange={(e) =>
                setEditedLabData({
                  ...editedLabData,
                  computadoras: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="descripcion">
            <Form.Label>Facilidades</Form.Label>
            {facilidades.map((facilidad, index) => (
              <Form.Control
                key={index}
                type="text"
                name={`descripcion-${index}`}
                value={facilidad}
                onChange={(e) => handleChangeFacilidad(e, index)}
              />
            ))}
            <Button variant="primary" onClick={handleAgregarFacilidad}>
              Agregar Facilidad
            </Button>
          </Form.Group>
        </Form>
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
