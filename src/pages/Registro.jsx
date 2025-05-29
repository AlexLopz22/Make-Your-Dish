import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Registro() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleMostrarConfirmarContrasena = () => {
        setMostrarConfirmarContrasena(prev => !prev);
    };

    const handleRegistro = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        const nombre = e.target.nombre.value;
        const email = e.target.email.value;
        const contraseña = e.target.password.value;
        const contraseña2 = e.target.password2.value;

        if (contraseña != contraseña2) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const res = await fetch("https://makeyourdish-api.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    email,
                    contraseña,
                }),
            });

            if (!res.ok) {
                throw new Error("Usuario ya registrado");
            }

            navigate("/login");

            setTimeout(() => alert("Perfil guardado correctamente. Por favor, inicia sesión"), 100);

        } catch (err) {
            alert("Error en el registro: " + (err.message || "Error desconocido"));
        } finally{
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-2/3 bg-[var(--color-principal)] text-[var(--color-blanco)] p-5 flex flex-col items-center gap-5">
                <Link to="/"><img className="h-32" src="/logos/logo-blanco.webp" alt="Logo blanco MYD" /></Link> 
                <div className="w-3/4">
                    <form onSubmit={handleRegistro}>
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col text-2xl mb-3 w-full">
                                Nombre:
                                <input
                                    className="input"
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    placeholder="Nombre"
                                    required
                                />
                            </div>
                            <div className="flex flex-col text-2xl mb-3 w-full">
                                Usuario:
                                <input
                                    className="input"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Correo electrónico"
                                    required
                                />
                            </div>
                            <div className="flex flex-col text-2xl mb-3 w-full">
                                Contraseña:
                                <input
                                    className="input"
                                    type={mostrarConfirmarContrasena ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Contraseña"
                                    required
                                />
                            </div>
                            <div className="flex flex-col text-2xl mb-3 w-full">
                                Confirmar contraseña:
                                <input
                                    className="input"
                                    type={mostrarConfirmarContrasena ? "text" : "password"}
                                    name="password2"
                                    id="password2"
                                    placeholder="Confirma contraseña"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={toggleMostrarConfirmarContrasena}
                                tabIndex={-1}
                            >
                                {mostrarConfirmarContrasena ? (
                                    <div className="flex items-center h-10 space-x-2 justify-left">
                                        <img src="/iconos/ojo-abierto-blanco.webp" alt="Ojo abierto" className="w-6" />
                                        <span>Ocultar contraseña</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center h-10 space-x-2 justify-left">
                                        <img src="/iconos/ojo-cerrado-blanco.webp" alt="Ojo cerrado" className="w-6" />
                                        <span>Mostrar contraseña</span>
                                    </div>
                                )}
                            </button>
                            <button className="boton-login mt-5 mb-8" type="submit">
                                {isSubmitting ? 'Registrando...' : 'Registrarse'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registro;
