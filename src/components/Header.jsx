import { useState, useRef, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';


function Header() {
    const { usuario, logout } = useAuth();
    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuRef = useRef();

    const toggleMenu = () => {
        setMenuAbierto(prev => !prev);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Cierra el menú si se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuAbierto(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='w-full h-28 flex justify-between items-center py-3.5 text-2xl px-7'>
            <Link className='h-full' to="/">
                <img className='h-full' src="/logos/logo.webp" alt="Logo MYD" />
            </Link>

            <div className='text-center w-1/2 flex justify-between'>
                <Link className='link' to="/recetas">Recetas</Link>
                <Link className='link' to="/plan">Plan Semanal</Link>
                <Link className='link' to={'/foro'}>Foro</Link>
            </div>

            {usuario ? (
                <div className="relative" ref={menuRef}>
                    <div onClick={toggleMenu} className="flex items-center cursor-pointer">
                        <img src="/iconos/usuario-icono.webp" alt="Usuario icono" className="mr-2" />
                        <div>{usuario.nombre}</div>
                    </div>

                    <AnimatePresence>
                        {menuAbierto && (
                            <motion.div
                                className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 text-base"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link to="/usuario" className="block px-4 py-2 hover:bg-gray-100">
                                    Perfil
                                </Link>
                                <div onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100">
                                    Logout
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            ) : (
                <div>
                    <Link
                        className='bg-[var(--color-principal)] text-[var(--color-blanco)] px-3 py-1 boton-acceder'
                        to={'/login'}
                    >
                        Acceder
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Header;
