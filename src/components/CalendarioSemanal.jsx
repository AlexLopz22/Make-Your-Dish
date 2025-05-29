import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const obtenerInicioSemana = () => {
  const hoy = new Date();
  const diaSemana = hoy.getDay();
  const lunes = new Date(hoy);
  const diff = diaSemana === 0 ? -6 : 1 - diaSemana;
  lunes.setDate(hoy.getDate() + diff);
  lunes.setHours(0, 0, 0, 0);
  return lunes;
};

export default function CalendarioRecetas({ recetas, usuarioId }) {
  const { usuario } = useAuth();
  const [semana, setSemana] = useState([]);
  const [plan, setPlan] = useState({});
  const [isLoadingPlan, setIsLoadingPlan] = React.useState(true);
  const [eliminando, setEliminando] = useState(false);
  const navigate = useNavigate();

  const onEliminar = async (nombre) => {
    setEliminando(nombre);
    await handleEliminarReceta(nombre);
    setEliminando(null);
  };

  const handleEliminarReceta = async (nombreDia) => {
    try {
      const respuesta = await fetch(`https://makeyourdish-api.onrender.com/api/plan/eliminar?usuarioId=${usuario.id}&dia=${encodeURIComponent(nombreDia)}`, {
        method: "DELETE",
      });

      const texto = await respuesta.text();

      if (respuesta.ok) {
        alert(`Receta eliminada para el día ${nombreDia}`);

        window.location.reload();
      } else {
        alert(`Error al eliminar receta: ${texto}`);
      }
    } catch (error) {
      console.error("Error al eliminar receta:", error);
      alert("Ocurrió un error al intentar eliminar la receta.");
    }
  };


  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const lunes = obtenerInicioSemana();
        const diasSemana = [];

        for (let i = 0; i < 7; i++) {
          const d = new Date(lunes);
          d.setDate(lunes.getDate() + i);
          diasSemana.push({ nombre: dias[i], fecha: d });
        }

        setSemana(diasSemana);

        const response = await fetch(`https://makeyourdish-api.onrender.com/api/plan/${usuario.id}`);
        const data = await response.json();

        const nuevoPlan = {};
        data.forEach(entry => {
          nuevoPlan[entry.dia] = entry.receta;
        });

        setPlan(nuevoPlan);
      } catch (error) {
        console.error('Error al obtener plan:', error);
      } finally {
        setIsLoadingPlan(false);
      }
    };

    setIsLoadingPlan(true);
    fetchPlan();
  }, [usuario.id]);

  return (
    <div>
      {isLoadingPlan ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[var(--color-principal)]"></div>
        </div>
      ) : (
        <div className="flex gap-4 p-4 overflow-x-auto">
          {semana.map(({ nombre, fecha }) => {
            const receta = plan[nombre];

            return (
              <div key={nombre} className="min-w-[200px] border p-4 rounded shadow relative">
                <div className="font-bold mb-2">{nombre}</div>
                <div className="text-sm text-gray-500">{fecha.toLocaleDateString()}</div>

                {receta ? (
                  <>
                    <button
                      onClick={() => onEliminar(nombre)}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full min-w-20 h-6 p-1 flex items-center justify-center font-bold text-sm"
                      aria-label={`Eliminar receta del día ${nombre}`}
                      title={`Eliminar receta del día ${nombre}`}
                      disabled={eliminando === nombre}
                    >
                      {eliminando=== nombre ? 'Eliminando...' : 'Eliminar'}
                    </button>

                    <Link to={`/receta/${receta.id}`}>
                      <div className="mt-2">
                        <img
                          src={receta.image_url}
                          alt={receta.title}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                        <div className="font-semibold">{receta.title}</div>
                        <div className="text-sm text-gray-600">{receta.description}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {receta.totalTimeMinutes} min | {receta.caloriesPerServing} cal/porción
                        </div>
                      </div>
                    </Link>
                  </>
                ) : (
                  <div className="mt-2 text-gray-400 italic">Sin receta asignada</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
