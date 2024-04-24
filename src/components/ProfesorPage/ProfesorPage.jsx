import React, { useState, useEffect } from "react";
import "./ProfesorPage.css";
import { useLocation } from "react-router-dom";
import { Container, Row, Tabs, Tab, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const ProfesorPage = () => {
  const location = useLocation();
  //const { usuario } = location.state || {};

  return (
    <Container className="py-4">
      <h1>Bienvenido Profesor</h1>
      <Row className="justify-content-center">
        <Tabs
          justify
          variant="pills"
          defaultActiveKey="tab-1"
          className="mb-1 p-0"
        >
          <Tab eventKey="tab-1" title="Solicitud de prestamos">
            <div>Salen los prestamos, y un botón de aceptar</div>
          </Tab>
          <Tab eventKey="tab-2" title="Prestamos que aprobé">
            <div>
              Lista de prestamos que aprobó el profesor, mostrar horas, por
              siaca
            </div>
          </Tab>
          <Tab eventKey="tab-3" title="Reservación de Laboratorios">
            Mostrar labs: Laboratorio, capacidad, Computadoras, facilidades,
            activos que tiene. Botón reservar, que te envía a otra pag, que
            muestra un schedule y Ahí es donde me tengo que agarrar a pichazo
            limpio. Al final debo enviar un correo, cuidado se me olvida.
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};
