import '../App.css'
import { Link } from 'react-router-dom';
import FormularioContacto from './FormularioContacto';

function Footer() {
    return (
        <>
            <div className="w-full bg-[var(--color-principal)] text-[var(--color-blanco)] p-8 text-center flex flex-col items-center">
                <div className="flex flex-col md:flex-row w-full md:w-[60%] justify-around items-center">

                    {/* Logo */}
                    <img
                        src="/logos/logo-blanco.webp"
                        alt="Logo MYD Blanco"
                        className="mb-5 md:mb-0 h-20 md:h-32"
                    />

                    {/* Contenido links y formulario */}
                    <div className="flex flex-col md:flex-row items-center md:items-start">

                        {/* Links */}
                        <div className="text-left mb-5 md:mb-0 md:mr-5">
                            <div><a href="#" className="hover:underline">- Cookies</a></div>
                            <div><a href="#" className="hover:underline">- Términos y condiciones</a></div>
                            <div><a href="#" className="hover:underline">- ¿Quiénes somos?</a></div>
                        </div>

                        {/* Separador solo en md+ */}
                        <div className="hidden md:block border-l border-[var(--color-blanco)] mx-5 h-40"></div>

                        {/* Formulario */}
                        <div className="text-left w-full md:w-auto md:h-60">
                            <FormularioContacto />
                        </div>
                    </div>
                </div>

                <div className="text-xs mt-8">Creado por Alejandro López Olmedo</div>
            </div>
        </>
    )
}

export default Footer
