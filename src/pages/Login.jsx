import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false);

  const toggleMostrarConfirmarContrasena = () => {
    setMostrarConfirmarContrasena(prev => !prev);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const contraseña = e.target.password.value;

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          contraseña,
        }),
      });

      if (!res.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await res.json();

      login(data);

      navigate("/");

    } catch (err) {
      alert("Error en login: " + (err.message || "Error desconocido"));
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-2/3 bg-[var(--color-principal)] text-[var(--color-blanco)] p-5 flex flex-col items-center gap-5">
        <Link to='/'><img className="h-32" src="/logos/logo-blanco.webp" alt="Logo blanco MYD" /></Link>
        <div className="w-3/4">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col items-center">
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
                Acceder
              </button>
              <hr className="border-t-2 border-[var(--color-blanco)] w-full mb-8" />
              <div className="flex text-2xl justify-around items-center w-full">
                ¿No tienes cuenta?
                <Link to='/registro'>
                  <button className="boton-login" type="button">
                    Registrarse
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
