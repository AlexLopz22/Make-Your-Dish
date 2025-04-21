import '../App.css'
import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion, AnimatePresence } from 'framer-motion';


function Recetas() {
    const [recetas, setRecetas] = useState([]);  // Recetas sin filtrar
    const [recetasFiltradas, setRecetasFiltradas] = useState([]);  // Recetas filtradas
    const [ingredientes, setIngredientes] = useState([]);  // Ingredientes disponibles
    const [pagina, setPagina] = useState(1);  // Página actual
    const [limite, setLimite] = useState(6);  // Recetas por página
    const [totalRecetas, setTotalRecetas] = useState(0);  // Total de recetas
    const [filtros, setFiltros] = useState({
        dificultad: [],
        tiempo: [],
        ingrediente: "",
    });

    const cargarRecetas = () => {
        fetch("http://localhost:8080/api/recetas")
            .then(response => response.json())
            .then(data => {
                setRecetas(data);
            })
            .catch(error => console.error('Error al cargar las recetas:', error));
    };

    const cargarIngredientes = () => {
        fetch('http://localhost:8080/api/ingredientes')
            .then(response => response.json())
            .then(data => {
                setIngredientes(data);
            })
            .catch(error => console.error('Error al cargar los ingredientes:', error));
    };

    const dificultad_receta = (minutos) => {
        if (minutos < 20) {
            return "Fácil"
        } else if (minutos >= 20 && minutos < 40) {
            return "Media"
        } else {
            return "Difícil"
        }
    }

    const handleFiltroChange = (event) => {
        const { name, value, checked, type } = event.target;
        const nuevosFiltros = { ...filtros };

        if (type === "checkbox") {
            if (name.startsWith("menos") || name.startsWith("entre") || name.startsWith("mas")) {
                if (checked) {
                    nuevosFiltros.tiempo.push(name);
                } else {
                    nuevosFiltros.tiempo = nuevosFiltros.tiempo.filter(f => f !== name);
                }
            }
            if (name.startsWith("dificultad")) {
                if (checked) {
                    nuevosFiltros.dificultad.push(name);
                } else {
                    nuevosFiltros.dificultad = nuevosFiltros.dificultad.filter(f => f !== name);
                }
            }
        } else if (type === "select-one") {
            nuevosFiltros.ingrediente = value;
        }
        setFiltros(nuevosFiltros);
        setPagina(1);
    };

    const aplicarFiltros = (filtrosActivos) => {
        let filtradas = recetas;

        if (filtrosActivos.tiempo.length > 0) {
            filtradas = filtradas.filter(receta => {
                return filtrosActivos.tiempo.some(filtro => {
                    switch (filtro) {
                        case "menos-20":
                            return receta.totalTimeMinutes < 20;
                        case "entre-20-30":
                            return receta.totalTimeMinutes >= 20 && receta.totalTimeMinutes <= 30;
                        case "entre-30-40":
                            return receta.totalTimeMinutes > 30 && receta.totalTimeMinutes <= 40;
                        case "mas-40":
                            return receta.totalTimeMinutes > 40;
                        default:
                            return true;
                    }
                });
            });
        }

        if (filtrosActivos.dificultad.length > 0) {
            filtradas = filtradas.filter(receta =>
                filtrosActivos.dificultad.some(filtro => {
                    switch (filtro) {
                        case "dificultad-facil":
                            return dificultad_receta(receta.totalTimeMinutes) === "Fácil";
                        case "dificultad-media":
                            return dificultad_receta(receta.totalTimeMinutes) === "Media";
                        case "dificultad-dificil":
                            return dificultad_receta(receta.totalTimeMinutes) === "Difícil";
                        default:
                            return true;
                    }
                })
            );
        }

        if (filtrosActivos.ingrediente && filtrosActivos.ingrediente !== "-") {
            filtradas = filtradas.filter(receta =>
                receta.ingredientePrincipal === filtrosActivos.ingrediente
            );
        }

        setRecetasFiltradas(filtradas);
        setTotalRecetas(Math.max(1, Math.ceil(filtradas.length / limite)));
    };

    useEffect(() => {
        cargarIngredientes();
        cargarRecetas();
    }, []);

    useEffect(() => {
        aplicarFiltros(filtros);
    }, [recetas, filtros]);


    console.log(((pagina - 1) * limite) + "dad" + (pagina * limite))
    console.log(recetas)
    console.log(recetasFiltradas)
    return (
        <>
            <Header />
            <div className='w-full p-5 flex flex-col justify-center'>
                <div className='w-4/5 mx-auto p-3'>
                    <div className='text-3xl mb-5'>Recetas</div>
                    <div className='flex'>
                        {/* Filtros */}
                        <div className='bg-[var(--color-principal)] text-[var(--color-blanco)] p-5 w-1/4'>
                            <form action="#">
                                <div className='texto-normal'>Dificultad</div>
                                <ul className='p-4'>
                                    <li><input type="checkbox" name="dificultad-facil" id="dificultad-facil" onChange={handleFiltroChange} /> Fácil</li>
                                    <li><input type="checkbox" name="dificultad-media" id="dificultad-media" onChange={handleFiltroChange} /> Media</li>
                                    <li><input type="checkbox" name="dificultad-dificil" id="dificultad-dificil" onChange={handleFiltroChange} /> Difícil</li>
                                </ul>
                                <hr />
                                <div className='texto-normal'>Tiempo de preparación</div>
                                <ul className='p-4'>
                                    <li><input type="checkbox" name="menos-20" id="menos-20" onChange={handleFiltroChange} /> &lt; 20 minutos</li>
                                    <li><input type="checkbox" name="entre-20-30" id="entre-20-30" onChange={handleFiltroChange} /> 20-30 minutos</li>
                                    <li><input type="checkbox" name="entre-30-40" id="entre-30-40" onChange={handleFiltroChange} /> 30-40 minutos</li>
                                    <li><input type="checkbox" name="mas-40" id="mas-40" onChange={handleFiltroChange} /> &gt; 40 minutos</li>
                                </ul>
                                <hr />
                                <div className='texto-normal'>Ingrediente principal</div>
                                <ul className='p-4'>
                                    <li>
                                        <select name="ingrediente-principal" id="ingrediente-principal" onChange={handleFiltroChange}>
                                            <option value="-">-</option>
                                            {ingredientes.map((ingrediente) => (
                                                <option key={ingrediente.id} value={ingrediente.id}>
                                                    {ingrediente.name}
                                                </option>
                                            ))}
                                        </select>
                                    </li>
                                </ul>
                            </form>
                        </div>

                        {/* Recetas */}
                        <div className='w-3/4 pl-5'>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={
                                        recetasFiltradas.length === 0 || recetas.length === 0
                                            ? 'no-recetas'
                                            : `pagina-${pagina}-${recetasFiltradas.length}`
                                    }
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className='grid grid-cols-3 gap-2.5 h-full'
                                >
                                    {(recetasFiltradas.length === 0 || recetas.length === 0) ? (
                                        <div className='col-span-full text-center flex justify-center items-center h-full bg-[#eaf5d4]'>
                                            No hay recetas disponibles.
                                        </div>
                                    ) : (
                                        <>
                                            {(recetasFiltradas.length > 0 ? recetasFiltradas : recetas)
                                                .slice((pagina - 1) * limite, pagina * limite)
                                                .map((receta) => (
                                                    <div key={receta.id} className='border-2 flex flex-col justify-between'>
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
                                                    </div>
                                                ))
                                            }

                                            <div className='text-right w-full col-span-full px-2 texto-normal'>
                                                <button disabled={pagina === 0} onClick={() => setPagina(pagina - 1)}>&lt;</button>
                                                {pagina} de {totalRecetas}
                                                <button disabled={pagina === totalRecetas} onClick={() => setPagina(pagina + 1)}>&gt;</button>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Recetas;
