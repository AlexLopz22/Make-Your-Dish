import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const FormularioContacto = () => {
  const form = useRef();

  const enviarEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_tctyk3d", "template_quo6imm", form.current, "TllFEVCCdbD087sqE")
      .then(
        (result) => {
          alert("Correo enviado con éxito");
          form.current.reset();
        },
        (error) => {
          alert("Error al enviar: " + error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={enviarEmail} className="text-[var(--color-principal)] max-h-full">
      <div className='font-normal text-[var(--color-blanco)]'>Formulario de Contacto:</div>
      <div className="text-[var(--color-blanco)]">- Nombre: </div>
      <input
        className="bg-[var(--color-blanco)] mb-2.5 w-full p-1"
        type="text"
        name="nombre"
        required
      />
      <div className="text-[var(--color-blanco)]">- Mensaje: </div>
      <textarea
        className="bg-[var(--color-blanco)] mb-2.5 w-full p-1"
        name="mensaje"
        required
      ></textarea>
      <button type="submit" className="boton-enviar-form">
        Enviar
      </button>
    </form>
  );
};

export default FormularioContacto;
