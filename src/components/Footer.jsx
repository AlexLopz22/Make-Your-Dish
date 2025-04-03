import '../App.css'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <div className='w-full bg-[var(--color-principal)] text-[var(--color-blanco)] p-8 text-center flex flex-col items-center'>
                <div className='flex w-[60%] justify-around items-center'>
                    <img src="./logo-blanco.png" alt="Logo MYD Blanco" className="mb-5 h-32" />
                    <div className='mb-5 flex items-center h-[300px]'>
                        <div className='text-left'>
                            <div><a href="#">- Cookies</a></div>
                            <div><a href="#">- Términos y condiciones</a></div>
                            <div><a href="#">- ¿Quiénes somos?</a></div>
                            <div>
                                - Redes:
                                <div className='flex justify-around'>
                                    <a href="#"><img src="./instagram-icono.png" alt="Instagram Icono" className='w-7' /></a>
                                    <a href="#"><img src="./facebook-icono.png" alt="Facebook Icono" className='w-7' /></a>
                                    <a href="#"><img src="./twitter-icono.png" alt="Twitter Icono" className='w-7' /></a>
                                </div>
                            </div>

                        </div>

                        {/* Línea divisoria */}
                        <div className='border-l border-[var(--color-blanco)] mx-5 h-full'></div>

                        <div className='text-left'>
                            <div className='font-normal'>Formulario de Contacto:</div>
                            <form action="#">
                                <div>- Nombre: </div>
                                <input className='bg-[var(--color-blanco)] mb-2.5 w-full' type="text" name="nombre-form" id="nombre-form" required />
                                <div>- Asunto: </div>
                                <input className='bg-[var(--color-blanco)] mb-2.5 w-full' type="text" name="asunto-form" id="asunto-form" required />
                                <div>- Mensaje: </div>
                                <textarea className='bg-[var(--color-blanco)] mb-2.5 w-full' name="mensaje-form" id="mensaje-form" required></textarea>
                                <button type="submit" className='boton-enviar-form'>Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>



                <div className='text-xs'>Creado por Alejandro López Olmedo</div>
            </div>
        </>
    )
}

export default Footer
