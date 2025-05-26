import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ListaRecetas = ({ recetas, recetasFiltradas, pagina, limite, dificultad_receta }) => {
  const recetasAMostrar = (recetasFiltradas.length > 0 ? recetasFiltradas : recetas)
    .slice((pagina - 1) * limite, pagina * limite);

  return (
    <>
      {recetasAMostrar.map((receta) => (
        <Link to={`/receta/${receta.id}`} key={receta.id}>
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}
            className='border-2 flex flex-col h-full justify-between cursor-pointer transition-all duration-300 ease-in-out'
          >
            <img className='w-full' src={receta.image_url} alt={receta.title} />
            <div className='text-center texto-normal font-medium mb-2' id={`receta_${receta.id}`}>
              {receta.title}
            </div>
            <div className='px-3 text-center'>{receta.description}</div>
            <div className='w-2/3 self-center justify-between flex'>
              <div className='flex flex-col items-center mb-2 w-1/2'>
                <img className='w-15' src="/iconos/reloj.webp" alt="Reloj Icono" />
                <div>{receta.totalTimeMinutes} m</div>
              </div>
              <div className='flex flex-col items-center w-1/2'>
                <img className='w-15' src="/iconos/dificultad-icono.png" alt="Dificultad Icono" />
                <div>{dificultad_receta(receta.totalTimeMinutes)}</div>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </>
  );
};

export default ListaRecetas;
