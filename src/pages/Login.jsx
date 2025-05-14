import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth(); 
  const navigate = useNavigate();

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
        <img className="h-32" src="/logos/logo-blanco.webp" alt="Logo blanco MYD" />
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
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  required
                />
              </div>
              <button className="boton-login mt-5 mb-8" type="submit">
                Acceder
              </button>
              <hr className="border-t-2 border-[var(--color-blanco)] w-full mb-8" />
              <div className="flex text-2xl justify-around items-center w-full">
                ¿No tienes cuenta?
                <button className="boton-login" type="button">
                  Registrarse
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
