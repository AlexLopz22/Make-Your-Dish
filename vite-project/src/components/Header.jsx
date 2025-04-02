import '../App.css'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <div className='w-full h-28 flex justify-between items-center p-3.5 text-2xl'>
                <img className='h-full' src="./logo-sin-fondo.png" alt="Logo MYD" />
                <div className='text-center'>
                    <Link to="../app.jsx">Inicio</Link>
                </div>
                <div>
                    <button className='border rounded-2xl px-2 py-1'>Acceder</button>
                </div>
            </div>
        </>
    )
}

export default Header
