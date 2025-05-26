import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const obtenerInicioSemana = () => {
  const hoy = new Date();
  const diaSemana = hoy.getDay(); // 0 = domingo
  const lunes = new Date(hoy);
  const diff = diaSemana === 0 ? -6 : 1 - diaSemana;
  lunes.setDate(hoy.getDate() + diff);
  lunes.setHours(0, 0, 0, 0);
  return lunes;
};

export default function CalendarioRecetas({ recetas, usuarioId }) {
  const { usuario } = useAuth();
  const [semana, setSemana] = useState([]);
  const [plan, setPlan] = useState({}); // { 'Lunes': receta }

  useEffect(() => {
    const lunes = obtenerInicioSemana();
    const diasSemana = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(lunes);
      d.setDate(lunes.getDate() + i);
      diasSemana.push({ nombre: dias[i], fecha: d });
    }

    setSemana(diasSemana);

    const fechaLunes = lunes.toISOString().split('T')[0];

    fetch(`http://localhost:8080/api/plan/${usuario.id}`)
      .then(res => res.json())
      .then(data => {
        const nuevoPlan = {};
        data.forEach(entry => {
          nuevoPlan[entry.dia] = entry.receta;
        });
        setPlan(nuevoPlan);
      })
      .catch(err => console.error('Error al obtener plan:', err));
  }, [usuario.id]);

  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {semana.map(({ nombre, fecha }) => {
        const receta = plan[nombre];

        return (
          <div key={nombre} className="min-w-[200px] border p-4 rounded shadow">
            <div className="font-bold mb-2">{nombre}</div>
            <div className="text-sm text-gray-500">{fecha.toLocaleDateString()}</div>

            {receta ? (
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
            ) : (
              <div className="mt-2 text-gray-400 italic">Sin receta asignada</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
