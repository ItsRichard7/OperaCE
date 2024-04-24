import React, { useState, useEffect } from "react";
import "./OperatorPage.css";
import { useLocation } from "react-router-dom";
import { Container, Row, Tabs, Tab, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const OperatorPage = () => {
  const location = useLocation();
  //const { usuario } = location.state || {};

  return (
    <Container className="py-4">
      <h1>Bienvenido Operador</h1>
      <Row className="justify-content-center">
        <Tabs
          justify
          variant="pills"
          defaultActiveKey="tab-1"
          className="mb-1 p-0"
        >
          <Tab eventKey="tab-1" title="Registro">
            <div>Botón Hora entrada</div>
            <div>Botón Hora salida</div>
            <div>Nunca los dos se muestran al mismo tiempo</div>
          </Tab>
          <Tab eventKey="tab-2" title="Reservación de los laboratorios">
            <div>Lo mismo que con profes.</div>
          </Tab>
          <Tab eventKey="tab-3" title="Préstamo de activo a profesor">
            <div>
              Mostrar activos disponibles. Botón de reservar. Aparece ventana,
              para colocar correo y contraseña del profesor.
            </div>
          </Tab>
          <Tab eventKey="tab-4" title="Préstamo de activo a estudiante">
            No ocupa profe, se solicita carnet del estudiante, y se agarra al
            operador ya logueado. En caso de que ocupe profesor lo mismo que a
            profesores, solo que ahora hay dos botones. primero, está el
            profesor cerca? mismo que a profesores. no está el profesor cerca?
            se registra para que le salga a profesores. Se pasa a la siguiente
            Tab
          </Tab>
          <Tab eventKey="tab-5" title="Aprobadas por profesores">
            acá hay que mostrar los que ya aprobaron los profesores. botoncito
            para aceptar, se registra al operador que lo dió
          </Tab>
          <Tab eventKey="tab-6" title="Devolución de activos">
            Se muestran los activos prestados y dos botones. Recibido sin daños.
            Averias. Averias es una mini ventana. donde pregunta el detalle en
            una caja de texto. Cuando se acepta, se cierra el préstamo.
          </Tab>
          <Tab eventKey="tab-6" title="Horas trabajadas">
            Lo mismo que en admin, pero
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};
