import {useRef} from "react";
import emailjs from "@emailjs/browser";
import infos from "./components/Info.json"; 

function App() { //Llama a calendar
    const form = useRef();
    const sendEmail = (e) => {
      e.preventDefault();

      //Informacion del envio de correo, service id, templade, id, y finalmente, Public key, ver tutorial
      emailjs.sendForm(infos.Service,infos.Templade,form.current,infos.Namekey)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      })

    };
  return ( //Form basico, toma el email al que se le envia, y un mensaje, aunque se puede cambiar el mensaje para ser preterminado o editable
    // Aqui es una solucion temporal
    // Por alguna razon yo le digo que se centre y no lo hace
    <div className="App">
      <form ref={form} onSubmit={sendEmail} className="--form-control --card --flex-center --dir-column"> 
          <input type="email" placeholder="Email" name="user_email" required></input>
          <textarea name="message" cols={"30"} rows={"10"}></textarea>
          <button type="submit" className="--btn --btn-primary">Enviar</button>
      </form>
    </div>
  );
}

export default App;
