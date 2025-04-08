import '../App.css'
import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            <div className='w-full h-screen flex items-center justify-center'>
                <div className='w-2/3 bg-[var(--color-principal)] text-[var(--color-blanco)] p-5 flex flex-col items-center gap-5'>
                    <img className='h-32' src="/logos/logo-blanco.webp" alt="Logo blanco MYD" />
                    <div className='w-3/4'>
                        <form action="#">
                            <div className='flex flex-col items-center'>
                                <div className='flex flex-col text-2xl mb-3 w-full'>
                                    Usuario: 
                                    <input className='input' type="text" name="nombre" id="nombre" placeholder='Nombre de usuario'/>
                                </div>
                                <div className='flex flex-col text-2xl mb-3 w-full'>
                                    Contraseña: 
                                    <input className='input' type="password" name="contraseña" id="contraseña" placeholder='Contraseña'/>
                                </div>
                                <button className='boton-login mt-5 mb-8' type="submit">Acceder</button>
                                <hr className="border-t-2 border-[var(--color-blanco)] w-full mb-8" />
                                <div className='flex text-2xl justify-around items-center w-full'>
                                    ¿No tienes cuenta?
                                    <button className='boton-login' type="submit">Registrarse</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
