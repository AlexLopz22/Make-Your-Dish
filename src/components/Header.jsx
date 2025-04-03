import '../App.css'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <div className='w-full h-28 flex justify-between items-center py-3.5 text-2xl px-7 '>
                <img className='h-full' src="./logo.png" alt="Logo MYD" />
                <div className='text-center w-1/2 flex justify-between'>
                    <Link className='link' to="/">Inicio</Link>
                    <Link className='link' to="/recetas">Recetas</Link>
                    <Link className='link'>Plan Semanal</Link>
                    <Link className='link'>Foro</Link>
                </div>
                <div>
                    <button className='bg-[var(--color-principal)] text-[var(--color-blanco)] px-3 py-1 boton-acceder'>Acceder</button>
                </div>
                <div style={{ display: "none" }}>
                    <Link className='flex items-center '>
                        <img src="./usuario-icono.png" alt="Usuario icono" className='mr-2' />
                        <div>Usuario</div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Header
