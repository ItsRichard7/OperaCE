import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import data from "./Prueb.json"; //Llama al json que almacena los eventos(Reservas)
//Pueden verlo en Prueb.json, por cada isntancia almacena el title(Comentario), la fecha de inicio y final

function Calendar() {
    const events = data; //Iniciacion
    return (
        <div>
            <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"} // Inicialmente esmpieza en la vista de mes del dia actual
                headerToolbar={{
                    start: "today prev,next", // Botones de la izquierda superior
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay", // Botones de la derecha superior
                }}
                height={"90vh"}
                events={events} //Carga los eventos
                locales={'es'} //Lo pone en espanol
                locale={'es'} //Pero por alguna razon los botones siguen en ingles
            />
        </div>
    );
}

export default Calendar;