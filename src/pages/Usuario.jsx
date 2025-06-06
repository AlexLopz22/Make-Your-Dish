import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { div, img } from "framer-motion/client";

function Usuario() {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();
    const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        cambiarContrasena: false,
        nuevaContrasena: '',
        confirmarContrasena: ''
    });

    const toggleMostrarConfirmarContrasena = () => {
        setMostrarConfirmarContrasena(prev => !prev);
    };


    useEffect(() => {

        if (usuario) {
            setFormData({
                nombre: usuario.nombre || '',
                correo: usuario.email || '',
                cambiarContrasena: false,
                nuevaContrasena: '',
                confirmarContrasena: ''
            });
        }
    }, [usuario]);

    if (!usuario) {
        return <div>Cargando usuario...</div>;
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        if (formData.cambiarContrasena && formData.nuevaContrasena !== formData.confirmarContrasena) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const datosActualizados = {
            id: usuario.id,
            nombre: formData.nombre,
            correo: formData.correo,
            ...(formData.cambiarContrasena && { contraseña: formData.nuevaContrasena })
        };

        try {
            const respuesta = await fetch("https://makeyourdish-api.onrender.com/api/auth/modificar", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosActualizados)
            });

            const texto = await respuesta.text();

            if (respuesta.ok) {
                logout();

                navigate('/', { state: { mensaje: "Perfil actualizado correctamente." } });

                setTimeout(() => alert("Perfil actualizado correctamente."), 100);
            } else {
                alert("Error: " + texto);
            }
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            alert("Hubo un error al actualizar el perfil.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <form onSubmit={handleSubmit} className="w-full min-h-[500px] flex items-center justify-center p-4 sm:p-6 lg:p-10">
                <div className="w-full max-w-4xl lg:w-2/3 p-3 sm:p-5">
                    <div className="border-[var(--color-principal)] border-2 p-4 sm:p-5">
                        <div className="text-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Editar perfil</div>
                        <div>
                            {/* Correo */}
                            <div className="text-lg sm:text-2xl mb-1 text-[var(--color-principal-apagado)]">Correo:</div>
                            <input
                                className="w-full border px-2 py-1 mb-4 sm:mb-5 rounded text-[var(--color-principal-apagado)] text-sm sm:text-base"
                                type="email"
                                name="correo"
                                id="correo"
                                value={formData.correo}
                                readOnly
                            />

                            {/* Nombre */}
                            <div className="text-lg sm:text-2xl mb-1">Nombre y apellido:</div>
                            <input
                                className="w-full border px-2 py-1 mb-4 sm:mb-5 rounded text-sm sm:text-base"
                                type="text"
                                name="nombre"
                                id="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                            />

                            {/* Checkbox */}
                            <div className="flex items-center space-x-2 mb-2">
                                <input
                                    type="checkbox"
                                    name="cambiarContrasena"
                                    id="cambiarContrasena"
                                    checked={formData.cambiarContrasena}
                                    onChange={handleChange}
                                    className="appearance-none w-4 h-4 border border-[var(--color-principal)] bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer"
                                />
                                <label htmlFor="cambiarContrasena" className="cursor-pointer text-sm sm:text-base">
                                    ¿Quieres cambiar la contraseña?
                                </label>
                            </div>

                            {/* Campos de contraseña condicionales */}
                            {formData.cambiarContrasena && (
                                <>
                                    {/* Nueva contraseña */}
                                    <div className="mt-4 relative">
                                        <label htmlFor="nuevaContrasena" className="text-lg sm:text-2xl mb-1 block">
                                            Nueva contraseña
                                        </label>
                                        <input
                                            type={mostrarConfirmarContrasena ? "text" : "password"}
                                            id="nuevaContrasena"
                                            name="nuevaContrasena"
                                            value={formData.nuevaContrasena}
                                            onChange={handleChange}
                                            required
                                            className="w-full border px-2 py-1 rounded mb-4 sm:mb-5 pr-12 text-sm sm:text-base"
                                        />
                                    </div>

                                    {/* Confirmar contraseña */}
                                    <div className="mt-4 relative">
                                        <label htmlFor="confirmarContrasena" className="text-lg sm:text-2xl mb-1 block">
                                            Confirmar contraseña
                                        </label>
                                        <input
                                            type={mostrarConfirmarContrasena ? "text" : "password"}
                                            id="confirmarContrasena"
                                            name="confirmarContrasena"
                                            value={formData.confirmarContrasena}
                                            onChange={handleChange}
                                            required
                                            className="w-full border px-2 py-1 rounded mb-4 sm:mb-5 pr-12 text-sm sm:text-base"
                                        />
                                        <button
                                            type="button"
                                            onClick={toggleMostrarConfirmarContrasena}
                                            tabIndex={-1}
                                            className="mt-2"
                                        >
                                            {mostrarConfirmarContrasena ? (
                                                <div className="flex items-center h-8 sm:h-10 space-x-2 justify-center">
                                                    <img src="/iconos/ojo-abierto.webp" alt="Ojo abierto" className="w-5 sm:w-6" />
                                                    <span className="text-sm sm:text-base">Ocultar contraseña</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center h-8 sm:h-10 space-x-2 justify-center">
                                                    <img src="/iconos/ojo-cerrado.webp" alt="Ojo cerrado" className="w-5 sm:w-6" />
                                                    <span className="text-sm sm:text-base">Mostrar contraseña</span>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Botón guardar */}
                            <div className="w-full flex justify-center mt-4 sm:mt-6">
                                <button
                                    type="submit"
                                    className="w-full max-w-60 bg-[var(--color-principal)] boton-acceder text-[var(--color-blanco)] px-3 py-2 sm:py-1 text-center rounded-2xl text-sm sm:text-base"
                                >
                                    {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </>
    );
}

export default Usuario;
