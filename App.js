import logo from './logo.svg';
import './App.css';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {useEffect, useState} from 'react'
import data from "./components/Prueb.json"; //Llama al json que queremos
pdfMake.vfs = pdfFonts.pdfMake.vfs


function App() {
  const docDefinition = { //Contenido del documento
    content: [
      {text: "Informe de horarios de laboratorios", style: 'header'},
      data.map(dat => {return "Titulo:" + dat.title + ",              Inicio:" + dat.start + ",              Final:" + dat.end}),
    ],

    styles: {
      header: {
        fontSize: 22,
        bold: true,
      },
      anotherStyle: {
        italics: true,
        alignment: 'right',
      },
    },
  };

  const createPdf = () => { //Crea pdf
    const pdfGenerator = pdfMake.createPdf(docDefinition);
    pdfGenerator.getBlob((blob) => {
    })
    pdfGenerator.download()
  }

  return (
    <div className="App">
      <button onClick={createPdf}>Generate PDF</button>
    </div>
  );
}

export default App;