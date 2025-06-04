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
    const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
    const toggleMenuMovil = () => setMenuMovilAbierto(!menuMovilAbierto);


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
        <div className="w-full h-28 flex justify-between items-center py-3.5 text-2xl px-7 relative">

            {/* Logo */}
            <Link className="h-full" to="/">
                <img className="h-full" src="/logos/logo.webp" alt="Logo MYD" />
            </Link>

            {/* Links - versión escritorio */}
            <div className="hidden md:flex text-center w-1/2 justify-between">
                <Link className="link" to="/recetas">Recetas</Link>
                <Link className="link" to="/plan">Plan Semanal</Link>
                <Link className="link" to="/foro">Foro</Link>
            </div>

            {/* Botón de usuario o login */}
            <div className="hidden md:block">
                {usuario ? (
                    <div className="relative" ref={menuRef}>
                        <div onClick={toggleMenu} className="flex items-center cursor-pointer">
                            <img src="/iconos/usuario-icono.webp" alt="Usuario icono" className="mr-2" />
                            <div>{usuario.nombre}</div>
                        </div>
                        <AnimatePresence>
                            {menuAbierto && (
                                <motion.div
                                    className="absolute right-0 mt-2 w-48 bg-[var(--color-blanco)] border rounded shadow-lg z-50 text-base"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link to="/usuario" className="block px-4 py-2 hover:bg-gray-100">Perfil</Link>
                                    <div onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100">Logout</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <Link className="bg-[var(--color-principal)] text-[var(--color-blanco)] px-3 py-1 boton-acceder" to="/login">Acceder</Link>
                )}
            </div>

            {/* Botón menú hamburguesa - solo móvil */}
            <button className="block md:hidden relative w-8 h-8" onClick={toggleMenuMovil}>
                {/* Ícono de menú */}
                <img
                    src="/iconos/menu-icono.webp"
                    alt="Abrir menú"
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out ${menuMovilAbierto ? 'opacity-0' : 'opacity-100'
                        }`}
                />

                {/* Ícono de cerrar */}
                <img
                    src="/iconos/cerrar-icono.webp"
                    alt="Cerrar menú"
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out ${menuMovilAbierto ? 'opacity-100' : 'opacity-0'
                        }`}
                />
            </button>


            {/* Menú móvil desplegable */}
            <AnimatePresence>
                {menuMovilAbierto && (
                    <motion.div
                        className="absolute top-full left-0 w-full bg-[var(--color-blanco)] shadow-md flex flex-col items-center py-4 z-40 text-xl overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link className="py-2 w-full text-center border-b border-[var(--color-principal)] link" to="/recetas" onClick={toggleMenuMovil}>Recetas</Link>
                        <Link className="py-2 w-full text-center border-b border-[var(--color-principal)] link" to="/plan" onClick={toggleMenuMovil}>Plan Semanal</Link>
                        <Link className="py-2 w-full text-center border-b border-[var(--color-principal)] link" to="/foro" onClick={toggleMenuMovil}>Foro</Link>

                        {usuario ? (
                            <>
                                <Link className="py-2 w-full text-center border-b border-[var(--color-principal)] link" to="/usuario" onClick={toggleMenuMovil}>Perfil</Link>
                                <div className="py-2 w-full text-center border-b border-[var(--color-principal)] cursor-pointer link" onClick={() => { toggleMenuMovil(); handleLogout(); }}>
                                    Logout
                                </div>
                            </>
                        ) : (
                            <Link className="py-2 w-full text-center border-b border-gray-300" to="/login" onClick={toggleMenuMovil}>Acceder</Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

export default Header;
